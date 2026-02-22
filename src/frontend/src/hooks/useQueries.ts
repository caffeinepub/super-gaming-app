import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ScoreEntry } from '../backend';

export function useGetAllScoresDescending() {
  const { actor, isFetching } = useActor();

  return useQuery<ScoreEntry[]>({
    queryKey: ['scores', 'descending'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllScoresDescending();
    },
    enabled: !!actor && !isFetching,
  });
}
