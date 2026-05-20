import { Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

type PlayerDetailsSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function PlayerDetailsSection({ title, description, children }: PlayerDetailsSectionProps) {
  return (
    <Paper elevation={1} className="p-4">
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      {description ? (
        <Typography className="text-sm text-gray-600 mb-4">{description}</Typography>
      ) : null}
      {children}
    </Paper>
  );
}
