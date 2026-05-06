import { useTranslation } from "react-i18next";
import { Player } from "../../../_common/types";
import ShotHeatmap from "../../../components/ShotHeatmap";

export function ShotHeatmapContainer({
  player1,
  player2,
}: {
  player1: Player | null;
  player2: Player | null;
}) {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{t("comparator.shotHeatmapsTitle")}</h2>
      <p className="text-sm text-gray-600 mb-4">{t("comparator.shotHeatmapsDescription")}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-2 md:p-4">
          <h2 className="text-xl font-bold mb-4">{player1?.name}</h2>
          {player1 && <ShotHeatmap player={player1} />}
        </div>
        <div className="p-2 md:p-4">
          <h2 className="text-xl font-bold mb-4">{player2?.name}</h2>
          {player2 && <ShotHeatmap player={player2} />}
        </div>
      </div>
    </>
  );
}
