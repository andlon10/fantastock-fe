import { Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { OfferComparisonResult } from "./utils";

type OfferMetricsTableProps = {
  comparison: OfferComparisonResult;
};

function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}

export function OfferMetricsTable({ comparison }: OfferMetricsTableProps) {
  const { t } = useTranslation();

  return (
    <Paper elevation={1} className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-2">{t("tradeComparator.breakdownTitle")}</h2>
      <p className="text-sm text-gray-600 mb-4">{t("tradeComparator.breakdownDescription")}</p>

      <table className="table w-full text-base-content bg-base-100">
        <thead>
          <tr className="bg-base-200 text-base-content">
            <th>{t("tradeComparator.metric")}</th>
            <th>{t("tradeComparator.offerA")}</th>
            <th>{t("tradeComparator.offerB")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t("tradeComparator.playersSelected")}</td>
            <td>{comparison.offerA.playerCount}</td>
            <td>{comparison.offerB.playerCount}</td>
          </tr>
          <tr>
            <td>{t("tradeComparator.totalPI")}</td>
            <td>{formatNumber(comparison.offerA.totalPI)}</td>
            <td>{formatNumber(comparison.offerB.totalPI)}</td>
          </tr>
          <tr>
            <td>{t("tradeComparator.avgPI")}</td>
            <td>{formatNumber(comparison.offerA.avgPI)}</td>
            <td>{formatNumber(comparison.offerB.avgPI)}</td>
          </tr>
          <tr>
            <td>{t("tradeComparator.totalPoints")}</td>
            <td>{formatNumber(comparison.offerA.totalPoints)}</td>
            <td>{formatNumber(comparison.offerB.totalPoints)}</td>
          </tr>
          <tr>
            <td>{t("tradeComparator.goalContributions")}</td>
            <td>{formatNumber(comparison.offerA.totalGoals + comparison.offerA.totalAssists)}</td>
            <td>{formatNumber(comparison.offerB.totalGoals + comparison.offerB.totalAssists)}</td>
          </tr>
          <tr>
            <td>{t("tradeComparator.contributionsPer90")}</td>
            <td>{formatNumber(comparison.offerA.contributionsPer90)}</td>
            <td>{formatNumber(comparison.offerB.contributionsPer90)}</td>
          </tr>
          <tr>
            <td>{t("tradeComparator.xContributionsPer90")}</td>
            <td>{formatNumber(comparison.offerA.xContributionsPer90)}</td>
            <td>{formatNumber(comparison.offerB.xContributionsPer90)}</td>
          </tr>
          <tr>
            <td>{t("tradeComparator.avgFOI")}</td>
            <td>{formatNumber(comparison.offerA.avgFOI)}</td>
            <td>{formatNumber(comparison.offerB.avgFOI)}</td>
          </tr>
        </tbody>
      </table>
    </Paper>
  );
}
