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

    // Normalize metrics to 0-10 scale for better visualization
    // Adjust these max values based on your data ranges
    const normalizeMetric = (value, maxValue) => {
        return Math.min((value / maxValue) * 10, 10);
    };

    // Define reasonable max values for each metric (adjust based on your data)
    const maxValues = {
        goalsPer90: 1.0,      // ~1 goal per 90 is excellent
        assistsPer90: 0.8,    // ~0.8 assists per 90 is excellent
        contributionsPer90: 1.5, // ~1.5 G+A per 90 is excellent
        xGPer90: 1.0,         // ~1 xG per 90 is excellent
        xAPer90: 0.8,         // ~0.8 xA per 90 is excellent
        PI: 100,              // Adjust this based on your PI scale (50, 100, 150, etc.)
    };

    const data = {
        labels: [
            "Goals/90",
            "Assists/90",
            "G+A/90",
            "xG/90",
            "xA/90",
            "PI (scaled)"
        ],
        datasets: [
            {
                label: player1.name,
                data: [
                    normalizeMetric(parseFloat(player1Metrics.goalsPer90), maxValues.goalsPer90),
                    normalizeMetric(parseFloat(player1Metrics.assistsPer90), maxValues.assistsPer90),
                    normalizeMetric(parseFloat(player1Metrics.contributionsPer90), maxValues.contributionsPer90),
                    normalizeMetric(parseFloat(player1Metrics.xGPer90), maxValues.xGPer90),
                    normalizeMetric(parseFloat(player1Metrics.xAPer90), maxValues.xAPer90),
                    normalizeMetric(player1Metrics.PI, maxValues.PI),
                ],
                backgroundColor: "rgba(59,130,246,0.2)",
                borderColor: "rgba(59,130,246,1)",
                borderWidth: 2,
                rawData: player1Metrics, // Store original values for tooltip
            },
            {
                label: player2.name,
                data: [
                    normalizeMetric(parseFloat(player2Metrics.goalsPer90), maxValues.goalsPer90),
                    normalizeMetric(parseFloat(player2Metrics.assistsPer90), maxValues.assistsPer90),
                    normalizeMetric(parseFloat(player2Metrics.contributionsPer90), maxValues.contributionsPer90),
                    normalizeMetric(parseFloat(player2Metrics.xGPer90), maxValues.xGPer90),
                    normalizeMetric(parseFloat(player2Metrics.xAPer90), maxValues.xAPer90),
                    normalizeMetric(player2Metrics.PI, maxValues.PI),
                ],
                backgroundColor: "rgba(236,72,153,0.2)",
                borderColor: "rgba(236,72,153,1)",
                borderWidth: 2,
                rawData: player2Metrics, // Store original values for tooltip
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value.toFixed(0);
                    }
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
                        const rawData = context.dataset.rawData;
                        const dataIndex = context.dataIndex;
                        
                        if (label) {
                            label += ': ';
                        }
                        
                        // Show original values in tooltip
                        const metricNames = ['goalsPer90', 'assistsPer90', 'contributionsPer90', 'xGPer90', 'xAPer90', 'PI'];
                        const metricName = metricNames[dataIndex];
                        const originalValue = rawData?.[metricName] ?? 0;
                        
                        if (metricName === 'PI') {
                            label += `${originalValue} (scaled: ${(context.parsed?.r ?? 0).toFixed(1)}/10)`;
                        } else {
                            label += `${originalValue} (scaled: ${(context.parsed?.r ?? 0).toFixed(1)}/10)`;
                        }
                        
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div style={{ height: '400px' }}>
            <RadarChartJS 
                key={`radar-${player1?.id || 'none'}-${player2?.id || 'none'}`}
                data={data} 
                options={{...options, maintainAspectRatio: false}}
                redraw={true}
            />
        </div>
    );
}