export default function MatchCard({ match }: { match: any }) {
  return (
      <div className="bg-gray-900 p-3 rounded-lg flex items-center justify-between">
          {/* Match Time or Live Indicator */}
          <span className={`text-sm font-semibold ${match.isLive ? "text-green-500" : "text-white"}`}>
              {match.isLive ? "● Live" : match.time}
          </span>

          {/* Teams & Flags */}
          <div className="flex items-center gap-4">
              {/* Home Team */}
              <div className="flex items-center gap-2">
                  <span className="text-lg">{match.homeFlag}</span>
                  <span className="text-white font-medium">{match.home}</span>
              </div>

              {/* Score or Placeholder */}
              <span className="text-gray-400 font-bold">{match.score}</span>

              {/* Away Team */}
              <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{match.away}</span>
                  <span className="text-lg">{match.awayFlag}</span>
              </div>
          </div>
      </div>
  );
}
