import { useGetAllScoresDescending } from './useQueries';

export function useLeaderboard() {
  const { data: scores, isLoading, error, refetch } = useGetAllScoresDescending();

  return {
    scores: scores || [],
    isLoading,
    error,
    refresh: refetch,
  };
}
