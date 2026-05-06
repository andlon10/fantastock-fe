import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RawFixtureFantasyStatsByRound } from "./types";
import { toBonusOverTimeRows } from "./utils";

type BonusOverTimeChartProps = {
  playerId: number | string;
  statsByRound: RawFixtureFantasyStatsByRound;
  height?: number;
};

export function BonusOverTimeChart({
  playerId,
  statsByRound,
  height = 360,
}: BonusOverTimeChartProps) {
  const { t } = useTranslation();
  const rows = useMemo(() => toBonusOverTimeRows(statsByRound), [statsByRound]);

  if (!rows.length) {
    return <Typography color="text.secondary">{t("comparator.bonusOverTime.noData")}</Typography>;
  }

  const formatFantasyPoints = (value: number) =>
    Number.isInteger(value) ? String(value) : value.toFixed(1);

  const dataset = rows.map(row => ({
    fantasyPoints: row.fantasyPoints,
    goalsPoints: row.goals * 3,
    assistsPoints: row.assists * 1,
    penaltySavesPoints: row.penaltySaves * 3,
    missedPenaltiesPoints: row.missedPenalties * -3,
    yellowCardsPoints: row.yellowCards * -0.5,
    redCardsPoints: row.redCards * -1,
    labelWithFantasyPoints:
      row.fantasyPoints === null
        ? `${t("comparator.bonusOverTime.gw")} ${row.round}`
        : `${t("comparator.bonusOverTime.gw")} ${row.round}\n(${formatFantasyPoints(row.fantasyPoints)})`,
  }));

  const chartWidth = Math.max(dataset.length * 52, 960);

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <Box sx={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}>
        <Box sx={{ minWidth: chartWidth }}>
          <BarChart
            dataset={dataset}
            width={chartWidth}
            height={height}
            margin={{ top: 24, right: 20, bottom: 70, left: 56 }}
            barLabel={item => {
              if (item.dataKey !== "goalsPoints") return null;
              const row = dataset[item.dataIndex];
              if (!row || row.fantasyPoints === null) return null;
              return formatFantasyPoints(row.fantasyPoints);
            }}
            slotProps={{
              barLabel: {
                fontSize: 10,
                fill: "#111827",
              },
            }}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "labelWithFantasyPoints",
                tickLabelStyle: {
                  fontSize: 10,
                },
              },
            ]}
            yAxis={[
              {
                label: t("comparator.bonusOverTime.fantasyPoints"),
                min: -2,
                max: 10,
              },
            ]}
            series={[
              {
                id: "goalsSeries",
                dataKey: "goalsPoints",
                label: t("comparator.bonusOverTime.series.goals"),
                stack: "bonus",
                color: "#16a34a",
              },
              {
                id: "assistsSeries",
                dataKey: "assistsPoints",
                label: t("comparator.bonusOverTime.series.assists"),
                stack: "bonus",
                color: "#0ea5e9",
              },
              {
                id: "penaltySavesSeries",
                dataKey: "penaltySavesPoints",
                label: t("comparator.bonusOverTime.series.penaltySaves"),
                stack: "bonus",
                color: "#f59e0b",
              },
              {
                id: "missedPenaltiesSeries",
                dataKey: "missedPenaltiesPoints",
                label: t("comparator.bonusOverTime.series.missedPenalties"),
                stack: "bonus",
                color: "#8b5cf6",
              },
              {
                id: "yellowCardsSeries",
                dataKey: "yellowCardsPoints",
                label: t("comparator.bonusOverTime.series.yellowCards"),
                stack: "bonus",
                color: "#facc15",
              },
              {
                id: "redCardsSeries",
                dataKey: "redCardsPoints",
                label: t("comparator.bonusOverTime.series.redCards"),
                stack: "bonus",
                color: "#dc2626",
              },
            ]}
          >
            <ChartsReferenceLine
              y={0}
              lineStyle={{ stroke: "#6b7280", strokeDasharray: "4 3", strokeWidth: 1.5 }}
            />
          </BarChart>
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {t("comparator.bonusOverTime.playerId", { playerId })}
      </Typography>
    </Box>
  );
}
