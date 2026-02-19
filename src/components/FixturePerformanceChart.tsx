import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";

interface FixturePerformanceChartProps {
  player: {
    id: number;
    name: string;
  };
  season?: string;
}

export default function FixturePerformanceChart({
  player,
  season = "2025",
}: FixturePerformanceChartProps) {
  const [fixtureData, setFixtureData] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!player) return;
    // fix this warning below
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:8000/api/player/${player.id}/fixtures`, {
        params: { season },
      })
      .then(res => {
        setFixtureData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching fixture performance:", err);
        setError("Failed to load fixture performance data");
        setLoading(false);
      });
  }, [player, season]);

  const sortedFixtures = useMemo(() => {
    if (!fixtureData || Object.keys(fixtureData).length === 0) return [];
    return Object.keys(fixtureData)
      .map(Number)
      .sort((a, b) => a - b);
  }, [fixtureData]);

  const chartData = useMemo(() => {
    if (sortedFixtures.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: sortedFixtures.map(fixture => `G ${fixture}`),
      datasets: [
        {
          label: "Bonus",
          data: sortedFixtures.map(fixture => fixtureData[fixture]),
          backgroundColor: sortedFixtures.map(fixture => {
            const points = fixtureData[fixture];
            if (points === null) return "rgba(239, 68, 68, 0.6)";
            if (points > 0) return "rgba(75, 192, 192, 0.6)";
            return "rgba(201, 203, 207, 0.3)";
          }),
          borderColor: sortedFixtures.map(fixture => {
            const points = fixtureData[fixture];
            if (points === null) return "rgba(239, 68, 68, 1)";
            if (points > 0) return "rgba(75, 192, 192, 1)";
            return "rgba(201, 203, 207, 1)";
          }),
          borderWidth: 1,
        },
      ],
    };
  }, [sortedFixtures, fixtureData]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `${player?.name || "Giocatore"} - Performance stagionale (Stagione ${season})`,
          font: {
            size: 16,
            weight: "bold" as const,
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const points = context.parsed.y;

              if (points === null) return "Non ha giocato";
              if (points === 0) return "Nessun bonus";

              const goals = Math.floor(points / 3);
              const assists = points % 3;
              const breakdown = [];

              if (goals > 0) breakdown.push(`${goals}G`);
              if (assists > 0) breakdown.push(`${assists}A`);

              return `${points} pt (${breakdown.join(", ")})`;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Giornata",
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 12,
          title: {
            display: true,
            text: "Punti",
          },
          ticks: {
            stepSize: 1,
            callback: function (value: any) {
              if (value === null) return "N/D";
              return value;
            },
          },
        },
      },
    };
  }, [player?.name, season]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!fixtureData || Object.keys(fixtureData).length === 0) {
    return (
      <Box p={2}>
        <Typography color="text.secondary">Nessun dato disponibile</Typography>
      </Box>
    );
  }

  const chartWidth = Math.max(sortedFixtures.length * 50, 600);

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
        py: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          height: { xs: 300, sm: 400 },
          overflowX: "auto",
          overflowY: "hidden",
          width: "100%",
          minWidth: 0,
        }}
      >
        <Box sx={{ height: "100%", width: chartWidth, px: 1 }}>
          <Bar key={`chart-${player.id}`} data={chartData} options={options} />
        </Box>
      </Box>
    </Box>
  );
}
