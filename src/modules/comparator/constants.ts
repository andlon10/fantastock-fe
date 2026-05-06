import type { TFunction } from "i18next";

export const PLAYER_METRIC_KEYS = [
  "PI",
  "FOI",
  "ProjectionGap",
  "Goals",
  "Assists",
  "xG",
  "xA",
  "Minutes",
] as const;

export type PlayerMetricKey = (typeof PLAYER_METRIC_KEYS)[number];

export function getPlayerMetricsTableText(t: TFunction) {
  return {
    metricHeading: t("comparator.table.metricHeading"),
    playerOneHeading: t("comparator.table.playerOneHeading"),
    playerTwoHeading: t("comparator.table.playerTwoHeading"),
    selectPlayer: t("common.selectPlayer"),
    emptyValue: t("comparator.table.emptyValue"),
  };
}

export function getPlayerMetricDefinitions(t: TFunction) {
  return PLAYER_METRIC_KEYS.map(key => ({
    key,
    label: t(`comparator.metricDefinitions.${key}.label`),
    description: t(`comparator.metricDefinitions.${key}.description`),
  }));
}
