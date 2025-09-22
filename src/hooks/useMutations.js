import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

// Add Book
export function useAddBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newBook) => api.post("/books", newBook),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
}

// Edit Book
export function useEditBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...book }) => api.put(`/books/${id}`, book),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
}

// Delete Book
export function useDeleteBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/books/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
}
