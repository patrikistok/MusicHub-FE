import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 2,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

export default queryClient;
