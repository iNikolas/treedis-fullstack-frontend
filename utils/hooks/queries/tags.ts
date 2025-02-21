import { useQuery } from "@tanstack/react-query";

import { getTagsList } from "@/apis/tags";
import { useSearchTagStore } from "@/store";

export function useTagsListQueryData() {
  const { value } = useSearchTagStore();
  const query = useQuery({
    queryKey: ["tags-list", value],
    queryFn: async () => {
      const data = await getTagsList({ search: value });
      return data;
    },
    staleTime: Infinity,
  });

  return query;
}
