import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Player } from "../../_common/types";

type OfferGroupSelectorProps = {
  title: string;
  players: Player[];
  slots: Array<Player | null>;
  selectedIds: Set<number>;
  maxSlots: number;
  onSlotChange: (index: number, player: Player | null) => void;
  onAddSlot: () => void;
  onRemoveSlot: (index: number) => void;
};

export function OfferGroupSelector({
  title,
  players,
  slots,
  selectedIds,
  maxSlots,
  onSlotChange,
  onAddSlot,
  onRemoveSlot,
}: OfferGroupSelectorProps) {
  const { t } = useTranslation();

  return (
    <Paper elevation={1} className="p-4">
      <Box className="mb-4 flex items-center justify-between gap-3 border-b pb-3">
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAddSlot}
          disabled={slots.length >= maxSlots}
        >
          {t("tradeComparator.addSlot")}
        </Button>
      </Box>

      <Stack spacing={2}>
        {slots.map((slot, index) => (
          <Box key={`slot-${index}`}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
              {t("tradeComparator.playerSlot", { index: index + 1 })}
            </Typography>
            <Box className="flex items-start gap-2">
              <Autocomplete
                options={players}
                value={slot}
                onChange={(_, newValue) => onSlotChange(index, newValue)}
                getOptionLabel={player => `${player.name} (${player.team})`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionDisabled={option => selectedIds.has(option.id) && slot?.id !== option.id}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    label={t("common.searchPlayerLabel")}
                    placeholder={t("common.typeToSearch")}
                  />
                )}
                className="min-w-0 flex-1"
              />

              {slots.length > 1 && (
                <IconButton
                  onClick={() => onRemoveSlot(index)}
                  size="small"
                  sx={{ color: "#ef4444", "&:hover": { backgroundColor: "#fee2e2" } }}
                  title={t("common.removePlayerSlot")}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
