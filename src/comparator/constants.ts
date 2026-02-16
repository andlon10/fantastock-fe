export const PLAYER_METRICS_TABLE_TEXT = {
  metricHeading: "Metric",
  playerOneHeading: "Player 1",
  playerTwoHeading: "Player 2",
  selectPlayer: "Select player",
  emptyValue: "-",
};

export const PLAYER_METRIC_DEFINITIONS = [
  {
    key: "PI",
    label: "PI",
    description: "Performance Indicator: composite score of overall player output.",
  },
  {
    key: "FOI",
    label: "FOI",
    description: "Form Over/Under Index: how current form compares to baseline expectation.",
  },
  {
    key: "ProjectionGap",
    label: "Projection Gap",
    description: "Difference between projected output and current performance.",
  },
  {
    key: "Goals",
    label: "Goals",
    description: "Total goals scored in the selected dataset.",
  },
  {
    key: "Assists",
    label: "Assists",
    description: "Total assists recorded in the selected dataset.",
  },
  {
    key: "xG",
    label: "xG",
    description: "Expected Goals: quality-weighted chance value of shots.",
  },
  {
    key: "xA",
    label: "xA",
    description: "Expected Assists: quality-weighted chance creation value.",
  },
  {
    key: "Minutes",
    label: "Minutes",
    description: "Total minutes played.",
  },
] as const;

export type PlayerMetricKey = (typeof PLAYER_METRIC_DEFINITIONS)[number]["key"];
