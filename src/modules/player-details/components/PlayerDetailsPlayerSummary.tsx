import { Box, Chip, Divider, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Player } from "../../../_common/types";
import { mapEnglishRoleToItalian } from "../../comparator/utils";

type PlayerDetailsPlayerSummaryProps = {
  player: Player;
  playerRank: {
    rank: number;
    totalPlayers: number;
    percentile: number;
  } | null;
};

export function PlayerDetailsPlayerSummary({
  player,
  playerRank,
}: PlayerDetailsPlayerSummaryProps) {
  const { t } = useTranslation();

  return (
    <Paper elevation={1} className="p-4">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <div>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {player.name}
            </Typography>
            <Typography color="text.secondary">
              {player.team} - {mapEnglishRoleToItalian(player.position)}
            </Typography>
          </div>

          {playerRank && (
            <Chip
              color="primary"
              label={t("playerDetails.piRank", {
                rank: playerRank.rank,
                total: playerRank.totalPlayers,
                percentile: playerRank.percentile,
              })}
            />
          )}
        </Box>

        <Divider />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <MetricTile label={t("comparator.metricDefinitions.PI.label")} value={player.PI} />
          <MetricTile
            label={t("comparator.metricDefinitions.FOI.label")}
            value={player.FOI ?? t("common.na")}
          />
          <MetricTile label={t("tradeComparator.totalPoints")} value={player.totalPoints} />
          <MetricTile
            label={t("tradeComparator.goalContributions")}
            value={player.goals + player.assists}
          />
          <MetricTile label={t("playerInformation.goals")} value={player.goals} />
          <MetricTile label={t("playerInformation.assists")} value={player.assists} />
          <MetricTile
            label={t("comparator.metricDefinitions.xG.label")}
            value={player.xG.toFixed(2)}
          />
          <MetricTile
            label={t("comparator.metricDefinitions.xA.label")}
            value={player.xA.toFixed(2)}
          />
        </div>
      </Box>
    </Paper>
  );
}

function MetricTile({ label, value }: { label: string; value: string | number }) {
  return (
    <Paper elevation={0} sx={{ p: 1.5, border: "1px solid", borderColor: "divider" }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Paper>
  );
}
