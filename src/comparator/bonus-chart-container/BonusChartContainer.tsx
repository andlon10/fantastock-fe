import { Typography } from "@mui/material";
import FixturePerformanceChart from "../../components/FixturePerformanceChart";
import { Player } from "../../_common/types";

export function BonusChartContainer({
  player1,
  player2,
}: {
  player1: Player | null;
  player2: Player | null;
}) {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Bonus Point Performance
      </Typography>
      <Typography variant="body1" gutterBottom>
        Compare the bonus point performance of each player across the season.
      </Typography>
      <div className="grid md:grid-cols-2 gap-3">
        <div
          style={{ minWidth: 0, overflow: "hidden" }}
          className="md:border-r md:border-gray-300 md:pr-3"
        >
          <h2 className="text-xl font-bold mb-4">{player1?.name}</h2>
          {player1 && <FixturePerformanceChart player={player1} />}
        </div>
        <div style={{ minWidth: 0, overflow: "hidden" }} className="md:pl-3">
          <h2 className="text-xl font-bold mb-4">{player2?.name}</h2>
          {player2 && <FixturePerformanceChart player={player2} />}
        </div>
      </div>
    </>
  );
}
