import { Box, CircularProgress, Typography } from "@mui/material";
import { TooltipItem } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [fixtureData, setFixtureData] = useState<Record<number, number>>({});
  const [resolvedRequestKey, setResolvedRequestKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const requestKey = `${player?.id ?? "none"}-${season}`;
  const loading = Boolean(player) && resolvedRequestKey !== requestKey && error === null;

  useEffect(() => {
    if (!player) return;

    const url = new URL(`http://localhost:8000/api/player/${player.id}/fixtures`);
    url.searchParams.set("season", season);

    fetch(url.toString())
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        setFixtureData(data);
        setError(null);
        setResolvedRequestKey(requestKey);
      })
      .catch(err => {
        console.error("Error fetching fixture performance:", err);
        setFixtureData({});
        setError(t("charts.fixturePerformance.error"));
        setResolvedRequestKey(requestKey);
      });
  }, [player, requestKey, season, t]);

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
      labels: sortedFixtures.map(
        fixture => `${t("charts.fixturePerformance.matchday")} ${fixture}`
      ),
      datasets: [
        {
          label: t("charts.labels.bonus"),
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
  }, [fixtureData, sortedFixtures, t]);

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
          text: t("charts.fixturePerformance.title", {
            player: player?.name || t("charts.fixturePerformance.defaultPlayer"),
            season,
          }),
          font: {
            size: 16,
            weight: "bold" as const,
          },
        },
        tooltip: {
          callbacks: {
            label: (context: TooltipItem<"bar">) => {
              const points = context.parsed.y;

              if (points === null) return t("charts.fixturePerformance.notPlayed");
              if (points === 0) return t("charts.fixturePerformance.noBonus");

              const goals = Math.floor(points / 3);
              const assists = points % 3;
              const breakdown: string[] = [];

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
            text: t("charts.fixturePerformance.matchday"),
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
            text: t("charts.fixturePerformance.points"),
          },
          ticks: {
            stepSize: 1,
            callback: function (value: string | number) {
              if (value === null) return t("charts.fixturePerformance.unavailable");
              return value;
            },
          },
        },
      },
    };
  }, [player?.name, season, t]);

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
        <Typography color="text.secondary">{t("common.noDataAvailable")}</Typography>
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
