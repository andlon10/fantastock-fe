import React from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function PlayerSelector({ players, selectedPlayer, setSelectedPlayer }) {
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
          label="Search Player"
          placeholder="Type to search..."
        />
      )}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  );
}
