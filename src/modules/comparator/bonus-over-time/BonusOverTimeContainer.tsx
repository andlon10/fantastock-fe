import { useTranslation } from "react-i18next";
import { BonusOverTimeChart } from "./BonusOverTimeChart";
import { RawFixtureFantasyStatsByRound } from "./types";

type BonusOverTimeContainerProps = {
  player1Id: number | null;
  player2Id: number | null;
  player1Name?: string;
  player2Name?: string;
  statsByRoundPlayer1: RawFixtureFantasyStatsByRound;
  statsByRoundPlayer2: RawFixtureFantasyStatsByRound;
};

export function BonusOverTimeContainer({
  player1Id,
  player2Id,
  player1Name,
  player2Name,
  statsByRoundPlayer1,
  statsByRoundPlayer2,
}: BonusOverTimeContainerProps) {
  const { t } = useTranslation();

  const getPlayerTitle = (playerName: string | undefined, fallback: string) =>
    playerName
      ? t("comparator.bonusOverTime.titleWithPlayer", { playerName })
      : t("comparator.bonusOverTime.titleWithSlot", { slot: fallback });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{t("comparator.bonusOverTime.title")}</h2>
      <p className="text-sm text-gray-600 mb-4">{t("comparator.bonusOverTime.description")}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div
          style={{ minWidth: 0, overflow: "hidden" }}
          className="md:border-r md:border-gray-300 md:pr-3"
        >
          <h2 className="text-xl font-bold mb-4">
            {getPlayerTitle(player1Name, t("comparator.playerOne"))}
          </h2>
          {player1Id && (
            <BonusOverTimeChart playerId={player1Id} statsByRound={statsByRoundPlayer1} />
          )}
        </div>

        <div style={{ minWidth: 0, overflow: "hidden" }} className="md:pl-3">
          <h2 className="text-xl font-bold mb-4">
            {getPlayerTitle(player2Name, t("comparator.playerTwo"))}
          </h2>
          {player2Id && (
            <BonusOverTimeChart playerId={player2Id} statsByRound={statsByRoundPlayer2} />
          )}
        </div>
      </div>
    </div>
  );
}
