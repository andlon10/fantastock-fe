import { Player } from "src/_common/types";

export type AuctionSlot = {
  player: Player | null;
  amount: string;
};

export type AuctionFormValues = {
  GK: AuctionSlot[];
  DEF: AuctionSlot[];
  MID: AuctionSlot[];
  FW: AuctionSlot[];
};
