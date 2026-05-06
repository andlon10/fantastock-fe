import { Player } from "../../_common/types";
import { DEFAULT_BUDGET, DEFAULT_ROWS_PER_POSITION, POSITIONS } from "./constants";
import { AuctionFormValues, AuctionSlot } from "./types";

const AUCTION_STORAGE_KEY = "auction-page-state-v1";

export type PersistedAuctionState = {
  budget: number;
  slots: AuctionFormValues;
};

const createEmptySlot = (): AuctionSlot => ({ player: null, amount: "" });
const createInitialSlots = () => Array.from({ length: DEFAULT_ROWS_PER_POSITION }, createEmptySlot);

function createDefaultSlots(): AuctionFormValues {
  return {
    GK: createInitialSlots(),
    DEF: createInitialSlots(),
    MID: createInitialSlots(),
    FW: createInitialSlots(),
  };
}

export function createEmptyAuctionSlots(): AuctionFormValues {
  return createDefaultSlots();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizePlayer(value: unknown): Player | null {
  if (!isRecord(value)) {
    return null;
  }

  return value as Player;
}

function normalizeSlots(slots: unknown): AuctionFormValues {
  const normalized = createDefaultSlots();
  const slotsRecord = isRecord(slots) ? slots : null;

  (POSITIONS as Array<keyof AuctionFormValues>).forEach(position => {
    const positionSlots = slotsRecord?.[position];

    if (!Array.isArray(positionSlots)) {
      return;
    }

    normalized[position] = positionSlots.map(slot => ({
      player: normalizePlayer(isRecord(slot) ? slot.player : null),
      amount: isRecord(slot) && typeof slot.amount === "string" ? slot.amount : "",
    }));
  });

  return normalized;
}

export function loadPersistedAuctionState(): PersistedAuctionState {
  if (typeof window === "undefined") {
    return { budget: DEFAULT_BUDGET, slots: createDefaultSlots() };
  }

  try {
    const raw = window.localStorage.getItem(AUCTION_STORAGE_KEY);
    if (!raw) {
      return { budget: DEFAULT_BUDGET, slots: createDefaultSlots() };
    }

    const parsed = JSON.parse(raw) as Partial<PersistedAuctionState>;
    const normalizedBudget =
      typeof parsed?.budget === "number" && Number.isFinite(parsed.budget)
        ? parsed.budget
        : DEFAULT_BUDGET;

    return {
      budget: normalizedBudget,
      slots: normalizeSlots(parsed?.slots),
    };
  } catch {
    return { budget: DEFAULT_BUDGET, slots: createDefaultSlots() };
  }
}

export function persistAuctionState(budget: number, slots: unknown) {
  if (typeof window === "undefined") {
    return;
  }

  const state: PersistedAuctionState = {
    budget,
    slots: normalizeSlots(slots),
  };

  window.localStorage.setItem(AUCTION_STORAGE_KEY, JSON.stringify(state));
}
