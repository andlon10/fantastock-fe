import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuctionSkeleton } from "./AuctionSkeleton";
import AuctionBudgetSection from "./budget-section/AuctionBudgetSection";
import { POSITION_COLORS, POSITIONS } from "./constants";
import { useAuctionPlayersSuspense } from "./hooks/useAuctionPlayersSuspense";
import PlayerSelectionGrid from "./player-selection/PlayerSelectionGrid";
import { createEmptyAuctionSlots, loadPersistedAuctionState, persistAuctionState } from "./storage";
import { AuctionFormValues } from "./types";

// TODO add ability to export auction results as CSV or JSON
// TODO add chart showing teams distribution, like how many Roma players
function AuctionContent() {
  const { t } = useTranslation();
  const players = useAuctionPlayersSuspense();
  const [initialState] = useState(loadPersistedAuctionState);
  const [budget, setBudget] = useState(initialState.budget);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const { control, reset } = useForm<AuctionFormValues>({
    defaultValues: initialState.slots,
    mode: "onBlur",
  });

  const watchedSlots = useWatch({ control });

  useEffect(() => {
    if (!watchedSlots) {
      return;
    }

    persistAuctionState(budget, watchedSlots);
  }, [budget, watchedSlots]);

  const handleClearSelection = () => {
    const emptySlots = createEmptyAuctionSlots();
    reset(emptySlots);
    persistAuctionState(budget, emptySlots);
    setIsClearDialogOpen(false);
  };

  const budgetPerPosition = POSITIONS.map(position => {
    const slots = watchedSlots[position as keyof AuctionFormValues] ?? [];

    return slots.reduce((total, slot) => {
      const amount = Number.parseFloat(slot?.amount ?? "");

      return Number.isFinite(amount) ? total + amount : total;
    }, 0);
  });

  const totalSpent = budgetPerPosition.reduce((a, b) => a + b, 0);
  const remainingBudget = budget - totalSpent;

  return (
    <div className="w-full h-full p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">{t("auction.title")}</h1>
        <Button variant="outlined" color="error" onClick={() => setIsClearDialogOpen(true)}>
          {t("auction.clearSelection")}
        </Button>
      </div>
      <AuctionBudgetSection
        budget={budget}
        remainingBudget={remainingBudget}
        totalSpent={totalSpent}
        budgetPerPosition={budgetPerPosition}
        positions={POSITIONS}
        positionColors={POSITION_COLORS}
        onBudgetChange={setBudget}
      />
      <PlayerSelectionGrid positions={POSITIONS} availablePlayers={players} control={control} />

      <Dialog open={isClearDialogOpen} onClose={() => setIsClearDialogOpen(false)}>
        <DialogTitle>{t("auction.clearDialogTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("auction.clearDialogBody")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsClearDialogOpen(false)}>{t("common.cancel")}</Button>
          <Button color="error" variant="contained" onClick={handleClearSelection}>
            {t("auction.clearSelection")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function Auction() {
  return (
    <Suspense fallback={<AuctionSkeleton />}>
      <AuctionContent />
    </Suspense>
  );
}
