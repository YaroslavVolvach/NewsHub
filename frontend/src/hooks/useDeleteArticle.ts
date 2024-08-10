import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to delete an article
const deleteArticle = async (articleId: number): Promise<void> => {
  await axios.delete(`${BaseAPI}/api/articles/${articleId}/`);
};

// Hook for deleting an article
export const useDeleteArticle = (
  options: UseMutationOptions<void, Error, number> = {}
) => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const mutation = useMutation({
    mutationFn: deleteArticle,
    ...options,
    onMutate: () => {
      setIsDeleting(true); // Start loading
    },
    onSuccess: (data, variables, context) => {
      // Invalidate 'articles' query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['articles'] });

      // Call the user-defined onSuccess handler if provided
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      // Call the user-defined onError handler if provided
      options.onError?.(error, variables, context);
    },
    onSettled: () => {
      setIsDeleting(false); // End loading
    },
  });

  return {
    ...mutation,
    isDeleting,
  };
};
