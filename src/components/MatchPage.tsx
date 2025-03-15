import { useState } from "react";
import MatchCard from "../components/MatchCard";
import DateSwitcher from "../components/DateSwitcher";
import { useFetchFixtures } from "../hooks/useFetchFixtures";
import { ChevronDown, Calendar } from "lucide-react";
import bannerImage from "../assets/images/main_banner.png";

export default function MatchPage() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const { data, isLoading, error } = useFetchFixtures(selectedDate);

    return (
        <div className="flex-grow bg-gray-950 text-white">
            {/* Header Banner */}
            <div className="relative w-full p-4">
                <img src={bannerImage} alt="Banner" className="w-full h-40 object-cover rounded-md object-top" />
            </div>

            <div className="p-6 container mx-auto">
                {/* Live Matches & Search Bar */}
                <div className="flex items-center justify-between gap-2">
                    {/* Live Indicator */}
                    <div className="flex items-center space-x-2 text-green-500">
                        <span className="font-bold">● Live</span>
                        <span className="bg-green-700 px-2 py-1 text-xs rounded-md">1</span>
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search For Matches"
                        className="px-3 py-2 bg-gray-800 rounded-lg text-sm w-60 flex-1 text-center"
                    />

                    {/* Dropdown Button */}
                    <button className="flex items-center text-gray-400 text-sm hover:text-white transition">
                        All Matches <ChevronDown size={16} className="ml-1" />
                    </button>
                </div>

                {/* Date Switcher */}
                <div className="mt-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap w-full">
                    <DateSwitcher onDateChange={setSelectedDate} />
                </div>

                {/* Match List Container */}
                <div className="mt-6 p-4 bg-gray-900 rounded-2xl shadow-lg shadow-gray-800">
                    {isLoading && <p className="text-center mt-4 animate-pulse">Loading...</p>}
                    {error && <p className="text-center mt-4 text-red-500">⚠️ Failed to load fixtures</p>}

                    {/* Matches List */}
                    <div className="space-y-4">
                        {data?.fixtures?.length ? (
                            data.fixtures.map((match: any) => (
                                <MatchCard key={match.id} match={match} />
                            ))
                        ) : (
                            !isLoading && <p className="text-center text-gray-400">No matches available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
