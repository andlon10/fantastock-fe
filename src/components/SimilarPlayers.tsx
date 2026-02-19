import { Player } from "../_common/types";
import { mapEnglishRoleToItalian } from "../comparator/utils";
import PlayerAvatar from "./PlayerAvatar";

export function SimilarPlayers({
  player,
  similarPlayers,
}: {
  player: Player;
  similarPlayers: Player[] | null;
}) {
  const calculatePerformanceDifference = (
    selectedPlayer: Player,
    listedPlayer: Player
  ): number | null => {
    const baseline = (selectedPlayer.PI + listedPlayer.PI) / 2;
    if (baseline === 0) return null;
    return ((listedPlayer.PI - selectedPlayer.PI) / baseline) * 100;
  };

  const formatPerformanceDifference = (difference: number | null): string => {
    if (difference === null) return "N/A";
    const sign = difference > 0 ? "+" : "";
    return `${sign}${difference.toFixed(1)}%`;
  };

  const getPerformanceDifferenceBadgeClass = (difference: number | null): string => {
    if (difference === null || difference === 0) return "badge-ghost";
    return difference > 0 ? "badge-success" : "badge-error";
  };
  return (
    <ul className="list rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Players with similar performance indicators
      </li>
      {similarPlayers && similarPlayers.length > 0 ? (
        similarPlayers.map(similarPlayer => {
          const difference = calculatePerformanceDifference(player, similarPlayer);

          return (
            <li key={similarPlayer.id} className="list-row">
              <div>
                <PlayerAvatar />
              </div>
              <div>
                <div>{similarPlayer.name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {mapEnglishRoleToItalian(similarPlayer.position)}
                </div>
              </div>
              <div className="ml-auto font-mono text-sm">
                <span
                  className={`badge px-2 py-2 ${getPerformanceDifferenceBadgeClass(difference)}`}
                >
                  {formatPerformanceDifference(difference)}
                </span>
              </div>
            </li>
          );
        })
      ) : (
        <li className="p-4 text-sm opacity-60">No similar players found.</li>
      )}
    </ul>
  );
}
