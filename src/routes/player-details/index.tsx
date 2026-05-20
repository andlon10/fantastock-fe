import { createFileRoute } from "@tanstack/react-router";
import { PlayerDetails } from "../../modules/player-details/PlayerDetails";

export const Route = createFileRoute("/player-details/")({
  component: PlayerDetails,
});
