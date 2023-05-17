import { headers } from "./../utils/headers";
import useSWRImmutable from "swr/immutable";

export const useFetchData = (url: string) => {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
      headers: { ...headers },
    });
    if (res.status !== 200) {
      throw new Error("Error Fetch");
    }
    return await res.json();
  };

  const { data, error, mutate } = useSWRImmutable(``, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
