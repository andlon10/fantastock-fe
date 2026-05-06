import { useTranslation } from "react-i18next";
import { Player } from "../../../_common/types";
import { SimilarPlayers } from "../../../components/SimilarPlayers";

export function SimilarPlayersContainer({
  player1,
  player2,
  similarPlayers1,
  similarPlayers2,
}: {
  player1: Player | null;
  player2: Player | null;
  similarPlayers1: Player[] | null;
  similarPlayers2: Player[] | null;
}) {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{t("comparator.similarPlayersTitle")}</h2>
      <p className="text-sm text-gray-600 mb-4">{t("comparator.similarPlayersDescription")}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-2 md:p-4">
          <h2 className="text-xl font-bold mb-4">{player1?.name}</h2>
          {player1 && <SimilarPlayers player={player1} similarPlayers={similarPlayers1} />}
        </div>
        <div className="p-2 md:p-4">
          <h2 className="text-xl font-bold mb-4">{player2?.name}</h2>
          {player2 && <SimilarPlayers player={player2} similarPlayers={similarPlayers2} />}
        </div>
      </div>
    </>
  );
}
