import { Paper } from "@mui/material";
import { ChartData, ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { BudgetStats } from "./BudgetStats";
import { PositionBreakdown } from "./PositionBreakdown";

type AuctionBudgetSectionProps = {
  budget: number;
  remainingBudget: number;
  totalSpent: number;
  budgetPerPosition: number[];
  positions: string[];
  positionColors: { [key: string]: string };
  onBudgetChange: (budget: number) => void;
};

export default function AuctionBudgetSection({
  budget,
  remainingBudget,
  totalSpent,
  budgetPerPosition,
  positions,
  positionColors,
  onBudgetChange,
}: AuctionBudgetSectionProps) {
  const pieEntries = useMemo(() => {
    const positionEntries = positions
      .map((position, index) => ({
        label: position,
        amount: budgetPerPosition[index] ?? 0,
        color: positionColors[position] ?? "#9ca3af",
      }))
      .filter(entry => entry.amount > 0);

    const unspentAmount = Math.max(0, budget - totalSpent);

    if (unspentAmount > 0) {
      positionEntries.push({
        label: "Unspent",
        amount: unspentAmount,
        color: "#e5e7eb",
      });
    }

    return positionEntries;
  }, [positions, budgetPerPosition, positionColors, budget, totalSpent]);

  const chartData = useMemo<ChartData<"pie">>(
    () => ({
      labels: pieEntries.map(entry => entry.label),
      datasets: [
        {
          label: "Budget Used",
          data: pieEntries.map(entry => entry.amount),
          backgroundColor: pieEntries.map(entry => entry.color),
          borderWidth: 1,
          borderColor: "#ffffff",
        },
      ],
    }),
    [pieEntries]
  );

  const chartOptions = useMemo<ChartOptions<"pie">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            generateLabels: chart => {
              const labels = chart.data.labels ?? [];
              const dataset = chart.data.datasets[0];
              const values = (dataset?.data ?? []) as number[];
              const backgroundColors = Array.isArray(dataset?.backgroundColor)
                ? dataset.backgroundColor
                : [];
              const borderColors = Array.isArray(dataset?.borderColor) ? dataset.borderColor : [];

              return labels.map((label, index) => {
                const amount = Number(values[index] ?? 0);
                const percentage = budget > 0 ? (amount / budget) * 100 : 0;

                return {
                  text: `${String(label)} (${percentage.toFixed(1)}%)`,
                  fillStyle: backgroundColors[index] ?? "#9ca3af",
                  strokeStyle: borderColors[index] ?? "#ffffff",
                  lineWidth: 1,
                  hidden: !chart.getDataVisibility(index),
                  index,
                };
              });
            },
          },
        },
        tooltip: {
          callbacks: {
            label: context => {
              const amount = Number(context.raw ?? 0);
              const percentage = budget > 0 ? (amount / budget) * 100 : 0;

              return `${context.label}: $${amount.toFixed(2)} (${percentage.toFixed(1)}%)`;
            },
          },
        },
      },
    }),
    [budget]
  );

  return (
    <Paper className="p-6 mb-6" elevation={1}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BudgetStats
          budget={budget}
          remainingBudget={remainingBudget}
          totalSpent={totalSpent}
          onBudgetChange={onBudgetChange}
        />

        <div className="flex items-center justify-center">
          <div className="w-full h-80">
            {pieEntries.length > 0 ? (
              <Pie data={chartData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                Add player prices to see budget distribution by position
              </div>
            )}
          </div>
        </div>
      </div>

      <PositionBreakdown
        positions={positions}
        budgetPerPosition={budgetPerPosition}
        positionColors={positionColors}
      />
    </Paper>
  );
}
