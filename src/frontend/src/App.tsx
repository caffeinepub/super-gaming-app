import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import GamePage from './pages/GamePage';
import LeaderboardPage from './pages/LeaderboardPage';
import GameLayout from './components/GameLayout';

const rootRoute = createRootRoute({
  component: () => (
    <GameLayout>
      <Outlet />
    </GameLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: GamePage,
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game',
  component: GamePage,
});

const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
  component: LeaderboardPage,
});

const routeTree = rootRoute.addChildren([indexRoute, gameRoute, leaderboardRoute]);

const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}
