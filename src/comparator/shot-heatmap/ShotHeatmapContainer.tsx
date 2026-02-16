import { Typography } from "@mui/material";
import ShotHeatmap from "../../components/ShotHeatmap";
import { Player } from "../../_common/types";

export function ShotHeatmapContainer({
  player1,
  player2,
}: {
  player1: Player | null;
  player2: Player | null;
}) {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Shot Heatmaps
      </Typography>
      <Typography variant="body1" gutterBottom>
        Visualize where each player takes their shots on the pitch.
      </Typography>
      <div className="grid md:grid-cols-2">
        <div className="md:w-1/2 p-4">
          <h2 className="text-xl font-bold mb-4">{player1?.name}</h2>
          {player1 && <ShotHeatmap player={player1} />}
        </div>
        <div className="md:w-1/2 p-4">
          <h2 className="text-xl font-bold mb-4">{player2?.name}</h2>
          {player2 && <ShotHeatmap player={player2} />}
        </div>
      </div>
    </>
  );
}
