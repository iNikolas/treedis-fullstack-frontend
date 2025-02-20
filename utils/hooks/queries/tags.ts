import { useQuery } from "@tanstack/react-query";

import { getTagsList } from "@/apis/tags";

export function useTagsListQueryData() {
  const query = useQuery({
    queryKey: ["tags-list"],
    queryFn: async () => {
      const data = await getTagsList();
      return data;
    },
    staleTime: Infinity,
  });

  return query;
}
