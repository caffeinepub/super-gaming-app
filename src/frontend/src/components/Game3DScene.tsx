import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';
import { useGameControls } from '../hooks/useGameControls';
import { useGameEngine } from '../hooks/useGameEngine';

interface Game3DSceneProps {
  onGameOver: (score: number) => void;
  onScoreUpdate: (score: number) => void;
  onPowerUpCollected: () => void;
  onPowerUpExpired: () => void;
}

interface Orb {
  id: number;
  position: THREE.Vector3;
  collected: boolean;
}

interface Obstacle {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

function Player({ position }: { position: THREE.Vector3 }) {
  return (
    <Sphere args={[0.5, 32, 32]} position={position}>
      <meshStandardMaterial 
        color="#00ffff" 
        emissive="#00ffff" 
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  );
}

function OrbComponent({ position, collected }: { position: THREE.Vector3; collected: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && !collected) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  if (collected) return null;

  return (
    <Sphere ref={meshRef} args={[0.3, 16, 16]} position={position}>
      <meshStandardMaterial 
        color="#ffff00" 
        emissive="#ffff00" 
        emissiveIntensity={1}
        metalness={0.5}
        roughness={0.3}
      />
    </Sphere>
  );
}

function ObstacleComponent({ position }: { position: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box args={[1, 1, 1]} position={position} ref={meshRef}>
      <meshStandardMaterial 
        color="#ff00ff" 
        emissive="#ff00ff" 
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </Box>
  );
}

function GameScene({ onGameOver, onScoreUpdate, onPowerUpCollected, onPowerUpExpired }: Game3DSceneProps) {
  const { keys } = useGameControls();
  const playerRef = useRef(new THREE.Vector3(0, 0, 0));
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [hasPowerUp, setHasPowerUp] = useState(false);
  const powerUpTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const gameOverRef = useRef(false);

  const { checkCollision, spawnOrb, spawnObstacle } = useGameEngine();

  // Initialize game objects
  useEffect(() => {
    const initialOrbs: Orb[] = [];
    for (let i = 0; i < 10; i++) {
      initialOrbs.push(spawnOrb(i));
    }
    setOrbs(initialOrbs);

    const initialObstacles: Obstacle[] = [];
    for (let i = 0; i < 5; i++) {
      initialObstacles.push(spawnObstacle(i));
    }
    setObstacles(initialObstacles);

    return () => {
      if (powerUpTimeoutRef.current) {
        clearTimeout(powerUpTimeoutRef.current);
      }
    };
  }, []);

  useFrame((state, delta) => {
    if (gameOverRef.current) return;

    // Player movement
    const speed = 5 * delta;
    if (keys.w || keys.ArrowUp) playerRef.current.z -= speed;
    if (keys.s || keys.ArrowDown) playerRef.current.z += speed;
    if (keys.a || keys.ArrowLeft) playerRef.current.x -= speed;
    if (keys.d || keys.ArrowRight) playerRef.current.x += speed;

    // Constrain player to bounds
    playerRef.current.x = Math.max(-10, Math.min(10, playerRef.current.x));
    playerRef.current.z = Math.max(-10, Math.min(10, playerRef.current.z));

    // Move obstacles
    setObstacles((prev) =>
      prev.map((obstacle) => {
        const newPos = obstacle.position.clone().add(obstacle.velocity.clone().multiplyScalar(delta));
        
        // Wrap around or respawn
        if (newPos.z > 12 || newPos.z < -12 || newPos.x > 12 || newPos.x < -12) {
          return spawnObstacle(obstacle.id);
        }

        return { ...obstacle, position: newPos };
      })
    );

    // Check orb collection
    setOrbs((prev) =>
      prev.map((orb) => {
        if (!orb.collected && checkCollision(playerRef.current, orb.position, 0.8)) {
          const newScore = score + 100;
          setScore(newScore);
          onScoreUpdate(newScore);

          // Random power-up chance
          if (Math.random() < 0.2 && !hasPowerUp) {
            setHasPowerUp(true);
            onPowerUpCollected();
            if (powerUpTimeoutRef.current) clearTimeout(powerUpTimeoutRef.current);
            powerUpTimeoutRef.current = setTimeout(() => {
              setHasPowerUp(false);
              onPowerUpExpired();
            }, 5000);
          }

          // Respawn orb
          setTimeout(() => {
            setOrbs((current) =>
              current.map((o) => (o.id === orb.id ? spawnOrb(orb.id) : o))
            );
          }, 1000);

          return { ...orb, collected: true };
        }
        return orb;
      })
    );

    // Check obstacle collision (unless power-up is active)
    if (!hasPowerUp) {
      for (const obstacle of obstacles) {
        if (checkCollision(playerRef.current, obstacle.position, 1.5)) {
          gameOverRef.current = true;
          onGameOver(score);
          break;
        }
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      
      <Player position={playerRef.current} />
      
      {orbs.map((orb) => (
        <OrbComponent key={orb.id} position={orb.position} collected={orb.collected} />
      ))}
      
      {obstacles.map((obstacle) => (
        <ObstacleComponent key={obstacle.id} position={obstacle.position} />
      ))}

      {/* Grid floor */}
      <gridHelper args={[40, 40, '#00ffff', '#ff00ff']} position={[0, -2, 0]} />
    </>
  );
}

export default function Game3DScene(props: Game3DSceneProps) {
  return (
    <Canvas camera={{ position: [0, 10, 15], fov: 60 }}>
      <color attach="background" args={['#0a0015']} />
      <fog attach="fog" args={['#0a0015', 10, 50]} />
      <GameScene {...props} />
    </Canvas>
  );
}
