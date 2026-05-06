import AddIcon from "@mui/icons-material/Add";
import { IconButton, Paper } from "@mui/material";
import { useMemo } from "react";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Player } from "../../../_common/types";
import { AuctionFormValues } from "../types";
import { PlayerSelectionRow } from "./PlayerSelectionRow";

type PlayerSelectionGridProps = {
  positions: string[];
  availablePlayers: Player[];
  control: Control<AuctionFormValues>;
};

const ROLE_MAP: Record<string, string> = {
  GK: "GK",
  GOALKEEPER: "GK",
  P: "GK",
  DEF: "DEF",
  D: "DEF",
  DEFENDER: "DEF",
  CB: "DEF",
  RB: "DEF",
  LB: "DEF",
  RWB: "DEF",
  LWB: "DEF",
  MID: "MID",
  M: "MID",
  C: "MID",
  MIDFIELDER: "MID",
  CM: "MID",
  CDM: "MID",
  CAM: "MID",
  FW: "FW",
  FWD: "FW",
  F: "FW",
  A: "FW",
  ATT: "FW",
  ATTACKER: "FW",
  FORWARD: "FW",
  ST: "FW",
  STRIKER: "FW",
  CF: "FW",
  LW: "FW",
  RW: "FW",
  SS: "FW",
};

function normalizeRoleToken(token: string): string {
  return ROLE_MAP[token] || token;
}

function playerMatchesPosition(playerPosition: string, targetPosition: string): boolean {
  const normalized = playerPosition?.trim().toUpperCase();
  if (!normalized) return false;
  return normalized
    .split(/[\s/,-]+/)
    .filter(Boolean)
    .map(normalizeRoleToken)
    .includes(targetPosition);
}

type PositionColumnProps = {
  position: keyof AuctionFormValues;
  availablePlayers: Player[];
  control: Control<AuctionFormValues>;
  selectedIds: Set<number>;
};

function PositionColumn({ position, availablePlayers, control, selectedIds }: PositionColumnProps) {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({ control, name: position });

  const positionPlayers = useMemo(
    () =>
      availablePlayers
        .filter(p => playerMatchesPosition(p.position, position))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [availablePlayers, position]
  );

  return (
    <Paper elevation={1} className="p-4">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <h3 className="text-lg font-bold">{t(`common.positions.${position}`)}</h3>
        <IconButton
          onClick={() => append({ player: null, amount: "" })}
          size="small"
          sx={{ color: "#3b82f6", "&:hover": { backgroundColor: "#eff6ff" } }}
          title={t("common.addPlayerSlot")}
        >
          <AddIcon />
        </IconButton>
      </div>
      <div className="space-y-3">
        {fields.map((field, rowIndex) => (
          <PlayerSelectionRow
            key={field.id}
            position={position}
            rowIndex={rowIndex}
            positionPlayers={positionPlayers}
            selectedIds={selectedIds}
            canRemoveRow={fields.length > 1}
            control={control}
            onRemoveRow={() => remove(rowIndex)}
          />
        ))}
      </div>
    </Paper>
  );
}

export default function PlayerSelectionGrid({
  positions,
  availablePlayers,
  control,
}: PlayerSelectionGridProps) {
  const allSlots = useWatch({ control });

  const selectedIds = useMemo(() => {
    const ids = new Set<number>();
    Object.values(allSlots).forEach(slots => {
      slots?.forEach(slot => {
        if (slot?.player) ids.add(slot.player.id);
      });
    });
    return ids;
  }, [allSlots]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {positions.map(position => (
        <PositionColumn
          key={position}
          position={position as keyof AuctionFormValues}
          availablePlayers={availablePlayers}
          control={control}
          selectedIds={selectedIds}
        />
      ))}
    </div>
  );
}
