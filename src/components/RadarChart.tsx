import { Radar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

export default function RadarChart({ player, avg }) {
  const { t } = useTranslation();

  if (!player) return null;

  const calculate90Metrics = p => {
    const minutes90 = (p.minutes || 1) / 90; // Avoid division by zero
    return {
      goalsPer90: (p.goals / minutes90).toFixed(2),
      assistsPer90: (p.assists / minutes90).toFixed(2),
      xGPer90: ((p.xG || 0) / minutes90).toFixed(2),
      xAPer90: ((p.xA || 0) / minutes90).toFixed(2),
      contributionsPer90: ((p.goals + p.assists) / minutes90).toFixed(2),
      goalsVsXG: (p.goals - (p.xG || 0)).toFixed(2),
      assistsVsXA: (p.assists - (p.xA || 0)).toFixed(2),
      PI: p.PI || 0,
      FOI: p.FOI || 0,
    };
  };

  const playerMetrics = calculate90Metrics(player);
  const avgMetrics = calculate90Metrics(avg);

  const data = {
    labels: [
      t("charts.labels.goalsPer90"),
      t("charts.labels.assistsPer90"),
      t("charts.labels.contributionsPer90"),
      t("charts.labels.xGPer90"),
      t("charts.labels.xAPer90"),
      t("charts.labels.pi"),
    ],
    datasets: [
      {
        label: player.name,
        data: [
          parseFloat(playerMetrics.goalsPer90),
          parseFloat(playerMetrics.assistsPer90),
          parseFloat(playerMetrics.contributionsPer90),
          parseFloat(playerMetrics.xGPer90),
          parseFloat(playerMetrics.xAPer90),
          playerMetrics.PI / 10, // Scaled down for chart readability
        ],
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
      },
      {
        label: t("charts.labels.positionAverage"),
        data: [
          parseFloat(avgMetrics.goalsPer90),
          parseFloat(avgMetrics.assistsPer90),
          parseFloat(avgMetrics.contributionsPer90),
          parseFloat(avgMetrics.xGPer90),
          parseFloat(avgMetrics.xAPer90),
          avgMetrics.PI / 10, // Scaled down for chart readability
        ],
        backgroundColor: "rgba(54,162,235,0.2)",
        borderColor: "rgba(54,162,235,1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.2,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            // Scale PI back up for display
            if (context.label === t("charts.labels.pi")) {
              label += (context.parsed.r * 10).toFixed(1);
            } else {
              label += context.parsed.r.toFixed(2);
            }
            return label;
          },
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
}
