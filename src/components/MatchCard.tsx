export default function MatchCard({ match }: { match: any }) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg flex justify-between">
        <span>{match.localTeam.name}</span>
        <span className="font-bold">{match.scores.local} - {match.scores.visitor}</span>
        <span>{match.visitorTeam.name}</span>
      </div>
    );
  }
  