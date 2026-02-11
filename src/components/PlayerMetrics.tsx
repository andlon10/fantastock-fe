import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function PlayerMetrics({ player }) {
  if (!player) return null;  // <-- add this check

  return (
    <Card style={{ marginTop: 20 }}>
      <CardContent>
        <Typography variant="h6">{player.name} ({player.team})</Typography>
        <Typography>PI: {player.PI}</Typography>
        <Typography>FOI: {player.FOI}</Typography>
        <Typography>Projection Gap: {player.ProjectionGap}</Typography>
        <Typography>Goals: {player.goals}, Assists: {player.assists}</Typography>
        <Typography>xG: {player.xG.toFixed(2)}, xA: {player.xA.toFixed(2)}</Typography>
        <Typography>Minutes: {player.minutes}</Typography>
      </CardContent>
    </Card>
  );
}