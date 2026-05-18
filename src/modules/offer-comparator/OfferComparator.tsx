import { Chip, Paper, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Player } from "../../_common/types";
import { usePlayersData } from "../comparator/hooks/usePlayersData";
import { OfferGroupSelector } from "./OfferGroupSelector";
import { OfferMetricsTable } from "./OfferMetricsTable";
import { compareOffers, formatNumber } from "./utils";

const MAX_SLOTS = 5;

export function OfferComparator() {
  const { t } = useTranslation();
  const { players, loading } = usePlayersData();
  const [offerA, setOfferA] = useState<Array<Player | null>>([null]);
  const [offerB, setOfferB] = useState<Array<Player | null>>([null]);

  const selectedIds = useMemo(() => {
    const ids = new Set<number>();
    [...offerA, ...offerB].forEach(player => {
      if (player) ids.add(player.id);
    });
    return ids;
  }, [offerA, offerB]);

  const comparison = useMemo(() => compareOffers(offerA, offerB), [offerA, offerB]);

  const hasSelectedPlayers = comparison.offerA.playerCount > 0 || comparison.offerB.playerCount > 0;

  const updateSlot = (side: "A" | "B", index: number, player: Player | null) => {
    if (side === "A") {
      setOfferA(prev => prev.map((slot, i) => (i === index ? player : slot)));
      return;
    }
    setOfferB(prev => prev.map((slot, i) => (i === index ? player : slot)));
  };

  const addSlot = (side: "A" | "B") => {
    if (side === "A") {
      setOfferA(prev => (prev.length >= MAX_SLOTS ? prev : [...prev, null]));
      return;
    }
    setOfferB(prev => (prev.length >= MAX_SLOTS ? prev : [...prev, null]));
  };

  const removeSlot = (side: "A" | "B", index: number) => {
    if (side === "A") {
      setOfferA(prev => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
      return;
    }
    setOfferB(prev => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  if (loading) {
    return <div className="w-full h-full p-4 md:p-6">{t("common.loading")}</div>;
  }

  return (
    <div className="w-full h-full p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t("tradeComparator.title")}</h1>
        <p className="text-gray-600 mt-2">{t("tradeComparator.description")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <OfferGroupSelector
          title={t("tradeComparator.offerA")}
          players={players}
          slots={offerA}
          selectedIds={selectedIds}
          maxSlots={MAX_SLOTS}
          onSlotChange={(index, player) => updateSlot("A", index, player)}
          onAddSlot={() => addSlot("A")}
          onRemoveSlot={index => removeSlot("A", index)}
        />
        <OfferGroupSelector
          title={t("tradeComparator.offerB")}
          players={players}
          slots={offerB}
          selectedIds={selectedIds}
          maxSlots={MAX_SLOTS}
          onSlotChange={(index, player) => updateSlot("B", index, player)}
          onAddSlot={() => addSlot("B")}
          onRemoveSlot={index => removeSlot("B", index)}
        />
      </div>

      {!hasSelectedPlayers ? (
        <Paper elevation={1} className="p-4">
          <p className="text-sm text-gray-600">{t("tradeComparator.selectPlayersHint")}</p>
        </Paper>
      ) : (
        <div className="space-y-6">
          <Paper elevation={1} className="p-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-2xl font-bold mb-1">{t("tradeComparator.verdictTitle")}</h2>
                <p className="text-sm text-gray-600">{t("tradeComparator.verdictDescription")}</p>
              </div>
              <Chip
                color={
                  comparison.favoredOffer === "TIE"
                    ? "default"
                    : comparison.favoredOffer === "A"
                      ? "primary"
                      : "secondary"
                }
                label={
                  comparison.favoredOffer === "TIE"
                    ? t("tradeComparator.tie")
                    : comparison.favoredOffer === "A"
                      ? t("tradeComparator.favorsA")
                      : t("tradeComparator.favorsB")
                }
              />
            </div>

            <div className="grid gap-3 md:grid-cols-3 mt-4">
              <Tooltip title={t("tradeComparator.tooltips.scoreOfferA")} arrow placement="top">
                <div className="rounded-lg border p-3 bg-slate-50">
                  <div className="text-xs text-slate-500">{t("tradeComparator.scoreOfferA")}</div>
                  <div className="text-2xl font-bold">
                    {formatNumber(comparison.offerA.performanceScore)}
                  </div>
                </div>
              </Tooltip>
              <Tooltip title={t("tradeComparator.tooltips.scoreOfferB")} arrow placement="top">
                <div className="rounded-lg border p-3 bg-slate-50">
                  <div className="text-xs text-slate-500">{t("tradeComparator.scoreOfferB")}</div>
                  <div className="text-2xl font-bold">
                    {formatNumber(comparison.offerB.performanceScore)}
                  </div>
                </div>
              </Tooltip>
              <Tooltip title={t("tradeComparator.tooltips.confidence")} arrow placement="top">
                <div className="rounded-lg border p-3 bg-slate-50">
                  <div className="text-xs text-slate-500">{t("tradeComparator.confidence")}</div>
                  <div className="text-2xl font-bold">
                    {formatNumber(comparison.confidence, 1)}%
                  </div>
                </div>
              </Tooltip>
            </div>
          </Paper>

          <OfferMetricsTable comparison={comparison} />
        </div>
      )}
    </div>
  );
}
