import { Radar } from "react-chartjs-2";

export default function RadarChart({ player, avg }) {
  if (!player) return null;

  // Calculate per-90 metrics for better comparison across players
  const calculate90Metrics = (p) => {
    const minutes90 = (p.minutes || 1) / 90; // Avoid division by zero
    return {
      goalsPer90: (p.goals / minutes90).toFixed(2),
      assistsPer90: (p.assists / minutes90).toFixed(2),
      xGPer90: ((p.xG || 0) / minutes90).toFixed(2),
      xAPer90: ((p.xA || 0) / minutes90).toFixed(2),
      contributionsPer90: ((p.goals + p.assists) / minutes90).toFixed(2),
      goalsVsXG: (p.goals - (p.xG || 0)).toFixed(2), // Overperformance
      assistsVsXA: (p.assists - (p.xA || 0)).toFixed(2), // Overperformance
      PI: p.PI || 0,
      FOI: p.FOI || 0,
    };
  };

  const playerMetrics = calculate90Metrics(player);
  const avgMetrics = calculate90Metrics(avg);

  const data = {
    labels: [
      "Goals/90", 
      "Assists/90", 
      "G+A/90",
      "xG/90", 
      "xA/90",
      "PI"
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
          playerMetrics.PI / 10, // Scale down PI for visibility
        ],
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
      },
      {
        label: "Position Avg",
        data: [
          parseFloat(avgMetrics.goalsPer90),
          parseFloat(avgMetrics.assistsPer90),
          parseFloat(avgMetrics.contributionsPer90),
          parseFloat(avgMetrics.xGPer90),
          parseFloat(avgMetrics.xAPer90),
          avgMetrics.PI / 10, // Scale down PI for visibility
        ],
        backgroundColor: "rgba(54,162,235,0.2)",
        borderColor: "rgba(54,162,235,1)",
        borderWidth: 2,
      }
    ]
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.2
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            // Scale PI back up for display
            if (context.label === 'PI') {
              label += (context.parsed.r * 10).toFixed(1);
            } else {
              label += context.parsed.r.toFixed(2);
            }
            return label;
          }
        }
      }
    }
  };

  return <Radar data={data} options={options} />;
}