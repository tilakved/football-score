import { useQuery } from "react-query";
import { fetchFixturesByDate } from "../utils/api";

export const useFetchFixtures = (date: string) => {
  return useQuery(["fixtures", date], () => fetchFixturesByDate(date), {
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
