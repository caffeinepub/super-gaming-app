import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useScoreSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: async (score: number) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.recordScore(BigInt(score));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
    },
  });

  const submitScore = async (score: number) => {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(score);
    } catch (error) {
      console.error('Failed to submit score:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitScore,
    isSubmitting,
    error: mutation.error,
  };
}
