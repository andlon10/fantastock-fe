import { Paper } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Player } from "../../_common/types";
import PlayerSelector from "../../components/PlayerSelector";
import { BonusOverTimeContainer } from "./bonus-over-time";
import { useBonusOverTimeData } from "./hooks/useBonusOverTimeData";
import { usePlayersData } from "./hooks/usePlayersData";
import { useSimilarPlayer } from "./hooks/useSimilarPlayer";
import { PlayerMetricsComparisonTable } from "./player-metrics/PlayerMetricsComparisonTable";
import { Radar } from "./radar/Radar";
import { ShotHeatmapContainer } from "./shot-heatmap/ShotHeatmapContainer";
import { SimilarPlayersContainer } from "./similar-players/SimilarPlayerContainer";

export function Comparator() {
  const { t } = useTranslation();
  const { players, loading } = usePlayersData();
  const [selectedPlayer1, setSelectedPlayer1] = useState<Player | null>(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState<Player | null>(null);
  const [similarPlayers1, setSimilarPlayers1] = useState<Player[] | null>(null);
  const [similarPlayers2, setSimilarPlayers2] = useState<Player[] | null>(null);
  const { fetchSimilarPlayer } = useSimilarPlayer();
  const { data: bonusDataPlayer1 } = useBonusOverTimeData({
    playerId: selectedPlayer1?.id ?? null,
  });
  const { data: bonusDataPlayer2 } = useBonusOverTimeData({
    playerId: selectedPlayer2?.id ?? null,
  });
  const hasSelectedPlayer = Boolean(selectedPlayer1 || selectedPlayer2);

  const handlePlayer1Change = async (player: Player | null) => {
    setSelectedPlayer1(player);
    if (player) {
      const similarPlayer1 = await fetchSimilarPlayer(player.id);
      setSimilarPlayers1(similarPlayer1);
    } else {
      setSimilarPlayers1(null);
    }
  };
  const handlePlayer2Change = async (player: Player | null) => {
    setSelectedPlayer2(player);
    if (player) {
      const similarPlayer2 = await fetchSimilarPlayer(player.id);
      setSimilarPlayers2(similarPlayer2);
    } else {
      setSimilarPlayers2(null);
    }
  };

  if (loading) {
    return <div className="w-full h-full p-4 md:p-6">{t("common.loading")}</div>;
  }

  return (
    <div className="w-full h-full p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t("comparator.title")}</h1>
      </div>

      <div className="mb-6">
        <Paper elevation={1}>
          <div className="grid gap-4 p-4 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold mb-4">{t("comparator.playerOne")}</h2>
              <PlayerSelector
                players={players}
                selectedPlayer={selectedPlayer1}
                setSelectedPlayer={handlePlayer1Change}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">{t("comparator.playerTwo")}</h2>
              <PlayerSelector
                players={players}
                selectedPlayer={selectedPlayer2}
                setSelectedPlayer={handlePlayer2Change}
              />
            </div>
          </div>
        </Paper>
      </div>

      {hasSelectedPlayer ? (
        <>
          <div className="w-full mb-6">
            <Paper elevation={1} className="p-4">
              <PlayerMetricsComparisonTable player1={selectedPlayer1} player2={selectedPlayer2} />
            </Paper>
          </div>

          <div className="w-full mb-6">
            <Paper elevation={1} className="p-4">
              <Radar player1={selectedPlayer1} player2={selectedPlayer2} />
            </Paper>
          </div>

          <div className="w-full mb-6">
            <Paper elevation={1} className="p-4">
              <ShotHeatmapContainer player1={selectedPlayer1} player2={selectedPlayer2} />
            </Paper>
          </div>

          <div className="w-full mb-6">
            <Paper elevation={1} className="p-4">
              <BonusOverTimeContainer
                player1Id={selectedPlayer1?.id ?? null}
                player2Id={selectedPlayer2?.id ?? null}
                player1Name={selectedPlayer1?.name}
                player2Name={selectedPlayer2?.name}
                statsByRoundPlayer1={bonusDataPlayer1}
                statsByRoundPlayer2={bonusDataPlayer2}
              />
            </Paper>
          </div>

          <div className="w-full">
            <Paper elevation={1} className="p-4">
              <SimilarPlayersContainer
                player1={selectedPlayer1}
                player2={selectedPlayer2}
                similarPlayers1={similarPlayers1}
                similarPlayers2={similarPlayers2}
              />
            </Paper>
          </div>
        </>
      ) : (
        <Paper elevation={1} className="p-4">
          <p className="text-sm text-gray-600">{t("comparator.bonusOverTime.selectPlayer")}</p>
        </Paper>
      )}
    </div>
  );
}
