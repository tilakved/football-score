import { useState, useEffect } from "react";
import MatchCard from "../components/MatchCard";
import DateSwitcher from "../components/DateSwitcher";
import { useFetchFixtures } from "../hooks/useFetchFixtures";
import bannerImage from "../assets/images/main_banner.png";
import { ChevronDown } from "lucide-react";

export default function MatchPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { data, isLoading, error } = useFetchFixtures(selectedDate);
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds

  // Process API Data: Group by league and count live matches
  const groupedMatches = (data?.data || []).reduce((acc: any, match: any) => {
    const league = `League ${match.league_id}`; // Placeholder name (replace with actual league names if available)
    if (!acc[league]) {
      acc[league] = [];
    }

    acc[league].push({
      id: match.id,
      time: new Date(match.starting_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      home: match.name.split(" vs ")[0],
      away: match.name.split(" vs ")[1],
      score: match.result_info || "-", // Placeholder until real scores are available
      isLive:
        currentTimestamp >= match.starting_at_timestamp &&
        currentTimestamp < match.starting_at_timestamp + match.length * 60,
    });

    return acc;
  }, {});

  // Count live matches
  const liveMatchesCount =
  Object.values(groupedMatches || {})
    .flat()
    .filter((match: any) => match.isLive).length || 0;


  return (
    <div className="flex-grow text-white bg-gray-100 dark:bg-gray-900 rounded-2xl">
      {/* Header Banner */}
      <div className="relative w-full px-4">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-40 object-cover rounded-2xl object-top"
        />
      </div>

      <div className="flex items-center justify-between gap-2 p-4 pb-0">
        {/* Live Indicator */}
        <div className="bg-gray-800 flex items-center p-[6px] rounded-md space-x-2 text-green-500">
          <span className="font-bold">● Live</span>
          <span
            className={`bg-green-700 px-2 py-1 text-xs rounded-md ${
              liveMatchesCount === 0 ? "opacity-50" : ""
            }`}
          >
            {liveMatchesCount}
          </span>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search For Matches"
          className="px-3 py-2 bg-gray-800 rounded-md text-sm w-60 flex-1 text-center"
        />

        {/* Dropdown Button */}
        <button className="bg-gray-800 flex hover:text-white items-center p-2 rounded-md text-gray-400 text-sm transition">
          All Matches <ChevronDown size={16} className="ml-1" />
        </button>
      </div>

      <div className="p-4 container mx-auto">
        {/* Date Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <DateSwitcher onDateChange={setSelectedDate} />
        </div>

        {/* Match List */}
        <div className="mt-6 space-y-6">
          {isLoading && (
            <p className="text-center mt-4 animate-pulse">Loading...</p>
          )}
          {error && (
            <p className="text-center mt-4 text-red-500">
              ⚠️ Failed to load fixtures
            </p>
          )}

          {Object.keys(groupedMatches).length ? (
            Object.entries(groupedMatches).map(([league, matches]: any) => (
              <div key={league} className="bg-gray-900 rounded-lg shadow-md p-4">
                {/* League Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
                  <h3 className="text-lg font-semibold text-white">{league}</h3>
                </div>

                {/* Match List */}
                <div className="space-y-3">
                  {matches.map((match: any) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            !isLoading && (
              <p className="text-center text-gray-400">No matches available</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
