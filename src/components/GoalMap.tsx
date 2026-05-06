import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { Shot } from "../_common/types";
import Pitch from "./Pitch";

export default function GoalMap({ player }) {
  const { t } = useTranslation();
  const [shots, setShots] = useState<Shot[]>([]);

  useEffect(() => {
    if (!player) return;

    fetch(`http://localhost:8000/api/player/${player.id}/shots`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => setShots(data))
      .catch(err => console.error(err));
  }, [player]);

  if (!player || !shots.length) return null;

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
  type GoalPoint = (typeof goalPoints)[number];

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
                label: t("charts.labels.goals"),
                data: goalPoints,
                pointRadius: ctx => {
                  const point = ctx.raw as GoalPoint | undefined;
                  const xg = point?.xG ?? 0;
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
                  label: ctx => {
                    const point = ctx.raw as GoalPoint | undefined;
                    return `${t("charts.tooltips.minute")}: ${point?.minute ?? t("common.na")}, xG: ${point?.xG?.toFixed(2) ?? t("common.na")}`;
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
