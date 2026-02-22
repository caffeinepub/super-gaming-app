import * as THREE from 'three';

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

export function useGameEngine() {
  const checkCollision = (pos1: THREE.Vector3, pos2: THREE.Vector3, threshold: number): boolean => {
    return pos1.distanceTo(pos2) < threshold;
  };

  const spawnOrb = (id: number): Orb => {
    const x = (Math.random() - 0.5) * 18;
    const z = (Math.random() - 0.5) * 18;
    return {
      id,
      position: new THREE.Vector3(x, 0, z),
      collected: false,
    };
  };

  const spawnObstacle = (id: number): Obstacle => {
    const side = Math.floor(Math.random() * 4);
    let x = 0, z = 0;
    let vx = 0, vz = 0;

    switch (side) {
      case 0: // Top
        x = (Math.random() - 0.5) * 20;
        z = -12;
        vz = Math.random() * 2 + 1;
        break;
      case 1: // Bottom
        x = (Math.random() - 0.5) * 20;
        z = 12;
        vz = -(Math.random() * 2 + 1);
        break;
      case 2: // Left
        x = -12;
        z = (Math.random() - 0.5) * 20;
        vx = Math.random() * 2 + 1;
        break;
      case 3: // Right
        x = 12;
        z = (Math.random() - 0.5) * 20;
        vx = -(Math.random() * 2 + 1);
        break;
    }

    return {
      id,
      position: new THREE.Vector3(x, 0, z),
      velocity: new THREE.Vector3(vx, 0, vz),
    };
  };

  return {
    checkCollision,
    spawnOrb,
    spawnObstacle,
  };
}
