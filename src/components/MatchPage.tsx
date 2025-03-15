import { useState, useEffect } from "react";
import MatchCard from "../components/MatchCard";
import DateSwitcher from "../components/DateSwitcher";
import { useFetchFixtures } from "../hooks/useFetchFixtures";
import bannerImage from "../assets/images/main_banner.png";

// Fallback Static Data
const staticMatches = [
    {
        league: "World - FIFA Women's World Cup",
        stage: "Quarter Finals",
        matches: [
            { id: 1, time: "Live", home: "Spain", homeFlag: "🇪🇸", score: "2-1", away: "Netherlands", awayFlag: "🇳🇱", isLive: true },
            { id: 2, time: "13:40", home: "Japan", homeFlag: "🇯🇵", score: "-", away: "Sweden", awayFlag: "🇸🇪" },
            { id: 3, time: "18:20", home: "Olympiakos", homeFlag: "🇬🇷", score: "-", away: "Genk", awayFlag: "🇧🇪" }
        ]
    },
    {
        league: "Spain - La Liga",
        stage: "Quarter Finals",
        matches: [
            { id: 4, time: "01:43", home: "Spain", homeFlag: "🇪🇸", score: "-", away: "Netherlands", awayFlag: "🇳🇱" },
            { id: 5, time: "13:40", home: "Japan", homeFlag: "🇯🇵", score: "-", away: "Sweden", awayFlag: "🇸🇪" },
            { id: 6, time: "18:20", home: "Olympiakos", homeFlag: "🇬🇷", score: "-", away: "Genk", awayFlag: "🇧🇪" }
        ]
    }
];

export default function MatchPage() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const { data, isLoading, error } = useFetchFixtures(selectedDate);

    // Group matches by league
    const groupedMatches =
        data?.fixtures?.reduce((acc: any, match: any) => {
            acc[match.league] = acc[match.league] || [];
            acc[match.league].push(match);
            return acc;
        }, {}) || {};

    // If API fails, use static matches
    const finalMatches = Object.keys(groupedMatches).length ? groupedMatches : staticMatches;

    useEffect(() => {
        console.log("Fetched Data:", data);
    }, [data]);

    return (
        <div className="flex-grow bg-gray-950 text-white">
            {/* Header Banner */}
            <div className="relative w-full p-4">
                <img src={bannerImage} alt="Banner" className="w-full h-40 object-cover rounded-md object-top" />
            </div>

            <div className="p-6 container mx-auto">
                {/* Date Switcher */}
                <div className="mt-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                    <DateSwitcher onDateChange={setSelectedDate} />
                </div>

                {/* Match List */}
                <div className="mt-6 space-y-6">
                    {isLoading && <p className="text-center mt-4 animate-pulse">Loading...</p>}
                    {error && <p className="text-center mt-4 text-red-500">⚠️ Failed to load fixtures</p>}

                    {finalMatches.length ? (
                        finalMatches.map((leagueData: any, index: number) => (
                            <div key={index} className="bg-gray-900 rounded-lg shadow-md p-4">
                                {/* League Header */}
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
                                    <h3 className="text-lg font-semibold text-white">{leagueData.league}</h3>
                                    <span className="text-gray-400 text-sm">{leagueData.stage}</span>
                                </div>

                                {/* Match List */}
                                <div className="space-y-3">
                                    {leagueData.matches.map((match: any) => (
                                        <MatchCard key={match.id} match={match} />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        !isLoading && <p className="text-center text-gray-400">No matches available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
