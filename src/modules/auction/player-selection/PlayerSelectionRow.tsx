import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { Control, Controller, FieldPath } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Player } from "../../../_common/types";
import { AuctionFormValues } from "../types";

type PlayerSelectionRowProps = {
  position: keyof AuctionFormValues;
  rowIndex: number;
  positionPlayers: Player[];
  selectedIds: Set<number>;
  canRemoveRow: boolean;
  control: Control<AuctionFormValues>;
  onRemoveRow: () => void;
};

export function PlayerSelectionRow({
  position,
  rowIndex,
  positionPlayers,
  selectedIds,
  canRemoveRow,
  control,
  onRemoveRow,
}: PlayerSelectionRowProps) {
  const { t } = useTranslation();
  const playerFieldName = `${position}.${rowIndex}.player` as FieldPath<AuctionFormValues>;
  const amountFieldName = `${position}.${rowIndex}.amount` as FieldPath<AuctionFormValues>;
  const translatedPosition = t(`common.positions.${position}`);

  return (
    <div className="relative">
      <label className="text-xs text-gray-600 block mb-1">
        {t("auction.playerSlotLabel", { index: rowIndex + 1 })}
      </label>
      <div className="flex items-start gap-2">
        <Controller
          name={playerFieldName}
          control={control}
          rules={{ validate: v => v !== null || t("auction.playerRequired") }}
          render={({ field, fieldState }) => (
            <Autocomplete
              options={positionPlayers}
              value={(field.value as Player | null) ?? null}
              onChange={(_, newPlayer) => field.onChange(newPlayer)}
              onBlur={field.onBlur}
              getOptionLabel={player => `${player.name} (${player.team})`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionDisabled={option =>
                selectedIds.has(option.id) && (field.value as Player | null)?.id !== option.id
              }
              renderInput={params => (
                <TextField
                  {...params}
                  size="small"
                  placeholder={t("auction.searchPlayerPlaceholder")}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
              className="min-w-0 flex-1"
            />
          )}
        />
        <Controller
          name={amountFieldName}
          control={control}
          rules={{
            required: t("auction.amountRequired"),
            validate: v => {
              const n = Number.parseFloat(String(v));
              return (Number.isFinite(n) && n > 0) || t("auction.amountMustBePositive");
            },
          }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col shrink-0 w-24">
              <input
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={String(field.value ?? "")}
                onChange={e => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                className={`w-full border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldState.error ? "border-red-500 focus:ring-red-400" : "border-gray-300"}`}
                placeholder="$"
                aria-label={t("auction.bidAmountAriaLabel", {
                  position: translatedPosition,
                  index: rowIndex + 1,
                })}
              />
              {fieldState.error && (
                <span className="text-xs text-red-500 mt-1">{fieldState.error.message}</span>
              )}
            </div>
          )}
        />
        {canRemoveRow && (
          <IconButton
            onClick={onRemoveRow}
            size="small"
            sx={{ color: "#ef4444", "&:hover": { backgroundColor: "#fee2e2" } }}
            title={t("common.removePlayerSlot")}
          >
            <CloseIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}
