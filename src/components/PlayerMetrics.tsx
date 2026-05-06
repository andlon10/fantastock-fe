import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function PlayerMetrics({ player }) {
  const { t } = useTranslation();

  if (!player) return null; // <-- add this check

  return (
    <Card style={{ marginTop: 20 }}>
      <CardContent>
        <Typography variant="h6">
          {player.name} ({player.team})
        </Typography>
        <Typography>
          {t("comparator.metricDefinitions.PI.label")}: {player.PI}
        </Typography>
        <Typography>
          {t("comparator.metricDefinitions.FOI.label")}: {player.FOI}
        </Typography>
        <Typography>
          {t("playerMetricsCard.projectionGap")}: {player.ProjectionGap}
        </Typography>
        <Typography>
          {t("playerMetricsCard.goals")}: {player.goals}, {t("playerMetricsCard.assists")}:{" "}
          {player.assists}
        </Typography>
        <Typography>
          {t("comparator.metricDefinitions.xG.label")}: {player.xG.toFixed(2)},{" "}
          {t("comparator.metricDefinitions.xA.label")}: {player.xA.toFixed(2)}
        </Typography>
        <Typography>
          {t("playerMetricsCard.minutes")}: {player.minutes}
        </Typography>
      </CardContent>
    </Card>
  );
}
