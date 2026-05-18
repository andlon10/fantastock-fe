import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import InsightsIcon from "@mui/icons-material/Insights";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SavingsIcon from "@mui/icons-material/Savings";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            "radial-gradient(circle at 15% 20%, rgba(37, 99, 235, 0.14), transparent 40%), radial-gradient(circle at 85% 10%, rgba(16, 185, 129, 0.18), transparent 36%), linear-gradient(120deg, #f8fbff 0%, #f3fff9 100%)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -30,
            top: -30,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.12)",
            filter: "blur(2px)",
          }}
        />
        <Stack spacing={2} sx={{ maxWidth: 760, position: "relative", zIndex: 1 }}>
          <Chip
            icon={<SportsSoccerIcon />}
            label={t("home.badge")}
            sx={{
              alignSelf: "flex-start",
              fontWeight: 600,
              backgroundColor: "rgba(255,255,255,0.72)",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            {t("home.title")}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, fontWeight: 400 }}>
            {t("home.subtitle")}
          </Typography>

          {/* Removed hero action buttons for a cleaner hero section */}
        </Stack>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gap: { xs: 2.5, md: 4 },
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)",
          },
          mt: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "#fff",
            position: "relative",
            minHeight: 270,
          }}
        >
          <Stack spacing={1.5} sx={{ pb: 5 }}>
            <Chip
              icon={<CompareArrowsIcon />}
              label={t("home.comparatorChip")}
              sx={{ alignSelf: "flex-start" }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {t("home.comparatorTitle")}
            </Typography>
            <Typography color="text.secondary">{t("home.comparatorDescription")}</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip size="small" icon={<QueryStatsIcon />} label={t("home.radarChart")} />
              <Chip size="small" icon={<InsightsIcon />} label={t("home.shotHeatmap")} />
              <Chip size="small" icon={<AnalyticsIcon />} label={t("home.similarPlayers")} />
            </Stack>
          </Stack>
          <Button
            component={Link}
            to="/comparator"
            variant="text"
            endIcon={<ArrowForwardIcon />}
            sx={{ position: "absolute", bottom: 16, right: 16 }}
          >
            {t("home.startComparing")}
          </Button>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "#fff",
            position: "relative",
            minHeight: 270,
          }}
        >
          <Stack spacing={1.5} sx={{ pb: 5 }}>
            <Chip
              icon={<SavingsIcon />}
              label={t("home.auctionChip")}
              sx={{ alignSelf: "flex-start" }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {t("home.auctionTitle")}
            </Typography>
            <Typography color="text.secondary">{t("home.auctionDescription")}</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip size="small" label={t("home.budgetPie")} />
              <Chip size="small" label={t("home.positionBreakdown")} />
              <Chip size="small" label={t("home.savedSelection")} />
            </Stack>
          </Stack>
          <Button
            component={Link}
            to="/auction"
            variant="text"
            endIcon={<ArrowForwardIcon />}
            sx={{ position: "absolute", bottom: 16, right: 16 }}
          >
            {t("home.planAuction")}
          </Button>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "#fff",
            position: "relative",
            minHeight: 270,
          }}
        >
          <Stack spacing={1.5} sx={{ pb: 5 }}>
            <Chip
              icon={<SwapHorizIcon />}
              label={t("home.offerComparatorChip")}
              sx={{ alignSelf: "flex-start" }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {t("home.offerComparatorTitle")}
            </Typography>
            <Typography color="text.secondary">{t("home.offerComparatorDescription")}</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip size="small" label={t("home.upToFiveVsFive")} />
              <Chip size="small" label={t("home.performanceScore")} />
              <Chip size="small" label={t("home.tradeVerdict")} />
            </Stack>
          </Stack>
          <Button
            component={Link}
            to="/offer-comparator"
            variant="text"
            endIcon={<ArrowForwardIcon />}
            sx={{ position: "absolute", bottom: 16, right: 16 }}
          >
            {t("home.compareOffers")}
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
