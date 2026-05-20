import { createFileRoute } from "@tanstack/react-router";
import { PlayerDetails } from "../../modules/player-details/PlayerDetails";

export const Route = createFileRoute("/player-details/$playerId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { playerId } = Route.useParams();
  const parsedPlayerId = Number(playerId);

  return (
    <PlayerDetails initialPlayerId={Number.isNaN(parsedPlayerId) ? undefined : parsedPlayerId} />
  );
}
