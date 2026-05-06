import { useTranslation } from "react-i18next";

export function PlayerInformation({ player }) {
  const { t } = useTranslation();

  return (
    <div className="mt-4 p-2 border border-gray-300 rounded">
      <h3 className="text-lg font-semibold">
        {player.name} - {player.team}
      </h3>
      <p>
        {t("playerInformation.position")}: {player.position}
      </p>
      <p>
        {t("playerInformation.goals")}: {player.goals}
      </p>
      <p>
        {t("playerInformation.assists")}: {player.assists}
      </p>
      <p>
        {t("comparator.metricDefinitions.xG.label")}: {player.xG}
      </p>
      <p>
        {t("comparator.metricDefinitions.xA.label")}: {player.xA}
      </p>
      <p>
        {t("playerInformation.minutes")}: {player.minutes}
      </p>
      <p>
        {t("comparator.metricDefinitions.PI.label")}: {player.PI}
      </p>
    </div>
  );
}
