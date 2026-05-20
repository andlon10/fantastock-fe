import { Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Player } from "../../_common/types";
import PlayerSelector from "../../components/PlayerSelector";
import ShotHeatmap from "../../components/ShotHeatmap";
import { SimilarPlayers } from "../../components/SimilarPlayers";
import { BonusOverTimeChart } from "../comparator/bonus-over-time/BonusOverTimeChart";
import { useBonusOverTimeData } from "../comparator/hooks/useBonusOverTimeData";
import { usePlayersData } from "../comparator/hooks/usePlayersData";
import { useSimilarPlayers } from "../comparator/hooks/useSimilarPlayer";
import { RadarSingle } from "../comparator/radar/RadarSingle";
import { PlayerDetailsPlayerSummary } from "./components/PlayerDetailsPlayerSummary";
import { PlayerDetailsSection } from "./components/PlayerDetailsSection";

type PlayerDetailsProps = {
  initialPlayerId?: number;
};

export function PlayerDetails({ initialPlayerId }: PlayerDetailsProps) {
  const { t } = useTranslation();
  const { players, loading } = usePlayersData();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null | undefined>(undefined);

  const effectiveInitialPlayerId = initialPlayerId;
  const resolvedPlayerId =
    selectedPlayerId === undefined ? effectiveInitialPlayerId : selectedPlayerId;
  const selectedPlayer =
    typeof resolvedPlayerId === "number"
      ? (players.find(player => player.id === resolvedPlayerId) ?? null)
      : null;

  const { data: bonusByRound } = useBonusOverTimeData({
    playerId: selectedPlayer?.id ?? null,
  });

  const { similarPlayers } = useSimilarPlayers(selectedPlayer?.id);

  const handlePlayerChange = (player: Player | null) => {
    setSelectedPlayerId(player?.id ?? null);
  };

  const playerRank = useMemo(() => {
    if (!selectedPlayer || !players.length) {
      return null;
    }

    const ranked = [...players].sort((a, b) => (b.PI || 0) - (a.PI || 0));
    const rank = ranked.findIndex(player => player.id === selectedPlayer.id);

    if (rank < 0) {
      return null;
    }

    const totalPlayers = ranked.length;
    const percentile = Math.max(1, Math.round(((totalPlayers - rank) / totalPlayers) * 100));

    return {
      rank: rank + 1,
      totalPlayers,
      percentile,
    };
  }, [players, selectedPlayer]);

  if (loading) {
    return <div className="w-full h-full p-4 md:p-6">{t("common.loading")}</div>;
  }

  if (
    !selectedPlayer &&
    selectedPlayerId === undefined &&
    typeof effectiveInitialPlayerId === "number" &&
    players.length > 0
  ) {
    return (
      <div className="w-full h-full p-4 md:p-6">
        <h1 className="text-3xl font-bold">{t("playerDetails.title")}</h1>
        <p className="text-sm text-gray-600 mt-2">{t("playerDetails.subtitle")}</p>
        <Typography color="warning.main" sx={{ mt: 1, fontSize: "0.875rem" }}>
          {t("playerDetails.playerNotFound", { playerId: effectiveInitialPlayerId })}
        </Typography>
      </div>
    );
  }

  if (!selectedPlayer) {
    return (
      <div className="w-full h-full p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{t("playerDetails.title")}</h1>
          <p className="text-sm text-gray-600 mt-2">{t("playerDetails.subtitle")}</p>
        </div>

        <PlayerDetailsSection
          title={t("playerDetails.searchTitle")}
          description={t("playerDetails.selectPrompt")}
        >
          <PlayerSelector
            players={players}
            selectedPlayer={null}
            setSelectedPlayer={handlePlayerChange}
          />
        </PlayerDetailsSection>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t("playerDetails.title")}</h1>
        <p className="text-sm text-gray-600 mt-2">{t("playerDetails.subtitle")}</p>
      </div>

      <div className="w-full mb-6">
        <PlayerDetailsSection
          title={t("playerDetails.searchTitle")}
          description={t("playerDetails.selectPrompt")}
        >
          <PlayerSelector
            players={players}
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={handlePlayerChange}
          />
        </PlayerDetailsSection>
      </div>

      <div className="mb-6">
        <PlayerDetailsPlayerSummary player={selectedPlayer} playerRank={playerRank} />
      </div>

      <div className="w-full mb-6">
        <PlayerDetailsSection
          title={t("comparator.radarTitle")}
          description={t("comparator.radarDescription")}
        >
          <RadarSingle player={selectedPlayer} />
        </PlayerDetailsSection>
      </div>

      <div className="w-full mb-6">
        <PlayerDetailsSection
          title={t("playerDetails.bonusTrendTitle")}
          description={t("playerDetails.bonusTrendDescription")}
        >
          <BonusOverTimeChart playerId={selectedPlayer.id} statsByRound={bonusByRound} />
        </PlayerDetailsSection>
      </div>

      <div className="w-full mb-6">
        <PlayerDetailsSection
          title={t("playerDetails.shotMapTitle")}
          description={t("playerDetails.shotMapDescription")}
        >
          <ShotHeatmap player={selectedPlayer} />
        </PlayerDetailsSection>
      </div>

      <div className="w-full">
        <PlayerDetailsSection
          title={t("playerDetails.similarPlayersTitle")}
          description={t("playerDetails.similarPlayersDescription")}
        >
          <SimilarPlayers player={selectedPlayer} similarPlayers={similarPlayers ?? []} />
        </PlayerDetailsSection>
      </div>
    </div>
  );
}
