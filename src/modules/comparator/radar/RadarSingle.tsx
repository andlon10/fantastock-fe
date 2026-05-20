import { Radar as RadarChartJS } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { Player } from "../../../_common/types";

export function RadarSingle({ player }: { player: Player | null }) {
  const { t } = useTranslation();

  if (!player) {
    return null;
  }

  // Calculate per-90 metrics for better comparison across players
  const calculate90Metrics = (p: Player) => {
    const minutes90 = (p.minutes || 1) / 90; // Avoid division by zero
    return {
      goalsPer90: (p.goals / minutes90).toFixed(2),
      assistsPer90: (p.assists / minutes90).toFixed(2),
      xGPer90: ((p.xG || 0) / minutes90).toFixed(2),
      xAPer90: ((p.xA || 0) / minutes90).toFixed(2),
      contributionsPer90: ((p.goals + p.assists) / minutes90).toFixed(2),
      PI: p.PI || 0,
    };
  };

  const metrics = calculate90Metrics(player);

  // Normalize metrics to 0-10 scale for better visualization
  const normalizeMetric = (value: number, maxValue: number) => {
    return Math.min((value / maxValue) * 10, 10);
  };

  // Define reasonable max values for each metric (adjust based on your data)
  const maxValues = {
    goalsPer90: 1.0,
    assistsPer90: 0.8,
    contributionsPer90: 1.5,
    xGPer90: 1.0,
    xAPer90: 0.8,
    PI: 100,
  };

  const data = {
    labels: [
      t("charts.labels.goalsPer90"),
      t("charts.labels.assistsPer90"),
      t("charts.labels.contributionsPer90"),
      t("charts.labels.xGPer90"),
      t("charts.labels.xAPer90"),
      t("charts.labels.piScaled"),
    ],
    datasets: [
      {
        label: player.name,
        data: [
          normalizeMetric(parseFloat(metrics.goalsPer90), maxValues.goalsPer90),
          normalizeMetric(parseFloat(metrics.assistsPer90), maxValues.assistsPer90),
          normalizeMetric(parseFloat(metrics.contributionsPer90), maxValues.contributionsPer90),
          normalizeMetric(parseFloat(metrics.xGPer90), maxValues.xGPer90),
          normalizeMetric(parseFloat(metrics.xAPer90), maxValues.xAPer90),
          normalizeMetric(metrics.PI, maxValues.PI),
        ],
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "rgba(59,130,246,1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.formattedValue}`;
          },
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  return (
    <div className="h-[280px] w-full">
      <RadarChartJS key={`radar-single-${player.id}`} data={data} options={options} />
    </div>
  );
}
