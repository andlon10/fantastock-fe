import React from "react";
import { Box, Typography } from "@mui/material";

export default function Heatmap({ players }) {
  if (!players || players.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Player Projection Gap
      </Typography>
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" },
        gap: 2
      }}>
        {players.map(p => {
          const color = p.ProjectionGap > 0 ? "#ff9999" : "#99ff99"; // red = underperforming, green = overperforming
          return (
            <Box 
              key={p.id} 
              sx={{ 
                backgroundColor: color, 
                padding: 2, 
                borderRadius: 1,
                textAlign: "center",
                fontSize: "0.875rem"
              }}
            >
              <strong>{p.name}</strong><br/>
              Gap: {p.ProjectionGap?.toFixed(2) || 0}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}