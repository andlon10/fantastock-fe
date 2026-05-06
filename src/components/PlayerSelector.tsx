import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function PlayerSelector({ players, selectedPlayer, setSelectedPlayer }) {
  const { t } = useTranslation();

  return (
    <Autocomplete
      options={players}
      getOptionLabel={player => `${player.name} (${player.team})`}
      value={selectedPlayer}
      onChange={(event, newValue) => {
        setSelectedPlayer(newValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          label={t("common.searchPlayerLabel")}
          placeholder={t("common.typeToSearch")}
        />
      )}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  );
}
