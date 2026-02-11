import { Radar as RadarChartJS } from "react-chartjs-2";

export function Radar({ player1, player2 }) {
    if (!player1 || !player2) return null;

    // Calculate per-90 metrics for better comparison across players
    const calculate90Metrics = (p) => {
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

    const player1Metrics = calculate90Metrics(player1);
    const player2Metrics = calculate90Metrics(player2);

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
                label: player1.name,
                data: [
                    parseFloat(player1Metrics.goalsPer90),
                    parseFloat(player1Metrics.assistsPer90),
                    parseFloat(player1Metrics.contributionsPer90),
                    parseFloat(player1Metrics.xGPer90),
                    parseFloat(player1Metrics.xAPer90),
                    player1Metrics.PI / 10, // Scale down PI for visibility
                ],
                backgroundColor: "rgba(59,130,246,0.2)",
                borderColor: "rgba(59,130,246,1)",
                borderWidth: 2,
            },
            {
                label: player2.name,
                data: [
                    parseFloat(player2Metrics.goalsPer90),
                    parseFloat(player2Metrics.assistsPer90),
                    parseFloat(player2Metrics.contributionsPer90),
                    parseFloat(player2Metrics.xGPer90),
                    parseFloat(player2Metrics.xAPer90),
                    player2Metrics.PI / 10, // Scale down PI for visibility
                ],
                backgroundColor: "rgba(236,72,153,0.2)",
                borderColor: "rgba(236,72,153,1)",
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                    label: function (context) {
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

    return (
        <div style={{ height: '400px' }}>
            <RadarChartJS data={data} options={options} />
        </div>
    );
}