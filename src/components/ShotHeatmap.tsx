import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import axios from "axios";
import Pitch from "./Pitch";
import { Player, Shot } from "../_common/types";

export default function ShotHeatmap({ player }: { player: Player | null }) {
  const [shots, setShots] = useState<Shot[]>([]);

  useEffect(() => {
    if (!player) return;

    axios
      .get(`http://localhost:8000/api/player/${player.id}/shots?season=2025`)
      .then(res => {
        setShots(res.data);
      })
      .catch(err => console.error(err));
  }, [player]);

  if (!player) return null;

  // Convert shots to scatter points
  // Flip Y coordinate: (1 - Y) to correct vertical orientation
  const shotPoints = shots.map(shot => ({
    x: parseFloat(shot.X) * 12,
    y: (1 - parseFloat(shot.Y)) * 8,
    xG: parseFloat(shot.xG) || 0,
    result: shot.result,
  }));

  // Verify goal data consistency - if player has 0 goals, mark all as non-goals
  const hasGoals = player.goals > 0;
  const verifiedShotPoints = shotPoints.map(shot => ({
    ...shot,
    result: hasGoals ? shot.result : shot.result === "Goal" ? "Counted as Shot" : shot.result,
  }));

  // Find max xG for color scaling
  const maxXG = Math.max(...verifiedShotPoints.map(s => s.xG), 0.1);

  if (!shots.length) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "120 / 80",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Pitch */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Pitch />
      </div>

      {/* Heatmap Overlay */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Chart
          type="scatter"
          data={{
            datasets: [
              {
                label: "Shots",
                data: verifiedShotPoints,
                pointRadius: ctx => {
                  const point = ctx.dataset.data?.[ctx.dataIndex];
                  if (!point) return 3;
                  // Radius based on xG: 3-10 pixels
                  return 3 + (point.xG / maxXG) * 7;
                },
                pointBackgroundColor: ctx => {
                  const point = ctx.dataset.data?.[ctx.dataIndex];
                  if (!point) return "rgba(255, 69, 0, 0.3)";
                  // Color intensity based on xG
                  const intensity = Math.pow(point.xG / maxXG, 0.5);
                  return `rgba(255, 69, 0, ${0.3 + intensity * 0.6})`;
                },
                pointBorderColor: "rgba(0, 0, 0, 0.5)",
                pointBorderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: ctx => {
                    const point = ctx.dataset.data?.[ctx.dataIndex];
                    if (!point) return "";
                    return [`xG: ${point.xG.toFixed(3)}`, `Result: ${point.result || "Unknown"}`];
                  },
                },
              },
            },
            scales: {
              x: {
                type: "linear",
                min: 0,
                max: 12,
                display: false,
              },
              y: {
                type: "linear",
                min: 0,
                max: 8,
                reverse: true,
                display: false,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}
