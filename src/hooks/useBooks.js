import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useBooks({
  page = 1,
  limit = 10,
  search = "",
  genre = "",
  status = "",
}) {
  return useQuery({
    queryKey: ["books", { page, limit, search, genre, status }],
    queryFn: async () => {
      const params = { _page: page, _limit: limit };

      if (search) params.q = search; // json-server full-text search
      if (genre) params.genre = genre;
      if (status) params.status = status;

      const res = await api.get("/books", { params });
      const total = parseInt(
        res.headers["x-total-count"] || res.data.length,
        10
      );

      return { data: res.data, total };
    },
    keepPreviousData: true,
  });
}
