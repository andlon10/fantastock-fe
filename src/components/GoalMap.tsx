import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import axios from "axios";
import Pitch from "./Pitch";

export default function GoalMap({ player }) {
  const [shots, setShots] = useState([]);

  useEffect(() => {
    if (!player) return;

    axios
      .get(`http://localhost:8000/api/player/${player.id}/shots`)
      .then(res => {
        setShots(res.data);
      })
      .catch(err => console.error(err));
  }, [player]);

  if (!player || !shots.length) return null;

  // Only show goals if player actually has goals in their stats
  if (player.goals === 0) return null;

  const goals = shots.filter(s => s.result === "Goal");

  if (!goals.length) return null;

  // Flip Y coordinate: (1 - Y) to correct vertical orientation
  const goalPoints = goals.map(shot => ({
    x: parseFloat(shot.X) * 12,
    y: (1 - parseFloat(shot.Y)) * 8,
    xG: parseFloat(shot.xG) || 0,
    minute: shot.minute || 0,
  }));

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "120 / 80",
        maxWidth: "900px",
        margin: "40px auto",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Pitch />
      </div>

      <div style={{ position: "absolute", inset: 0 }}>
        <Chart
          type="scatter"
          data={{
            datasets: [
              {
                label: "Goals",
                data: goalPoints,
                pointRadius: ctx => {
                  const xg = ctx.raw?.xG ?? 0;
                  return 4 + xg * 12;
                },
                pointBackgroundColor: "gold",
                pointBorderColor: "black",
                pointBorderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: ctx =>
                    `Minute: ${ctx.raw?.minute ?? "N/A"}, xG: ${ctx.raw?.xG?.toFixed(2) ?? "N/A"}`,
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
