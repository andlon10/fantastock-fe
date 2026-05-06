import GitHubIcon from "@mui/icons-material/GitHub";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "it", flag: "IT", symbol: "🇮🇹", ariaLabelKey: "app.switchToItalian" },
  { code: "en", flag: "EN", symbol: "🇬🇧", ariaLabelKey: "app.switchToEnglish" },
];

function TopBar() {
  const { t, i18n } = useTranslation();

  const activeLanguage = i18n.resolvedLanguage || i18n.language;

  const handleLanguageChange = language => {
    if (language !== activeLanguage) {
      i18n.changeLanguage(language);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 56, sm: 64 }, justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SportsSoccerIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: "primary.main" }} />
            <Typography
              variant="h5"
              component="a"
              href="/"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                color: "inherit",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {t("app.name")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "warning.main",
                color: "warning.dark",
                fontWeight: 700,
                letterSpacing: "0.04em",
                lineHeight: 1.4,
              }}
            >
              {t("app.version")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 999,
                p: 0.5,
                backgroundColor: "rgba(15, 23, 42, 0.03)",
              }}
            >
              {LANGUAGES.map(language => {
                const isActive = activeLanguage === language.code;

                return (
                  <IconButton
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    size="small"
                    aria-label={t(language.ariaLabelKey)}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      border: "1px solid",
                      borderColor: isActive ? "primary.main" : "transparent",
                      backgroundColor: isActive ? "primary.main" : "transparent",
                      color: isActive ? "primary.contrastText" : "text.primary",
                      fontSize: "1rem",
                      fontWeight: 700,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: isActive ? "primary.dark" : "rgba(15, 23, 42, 0.08)",
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ display: "flex", alignItems: "center", gap: 0.35, lineHeight: 1 }}
                    >
                      <Box component="span" sx={{ fontSize: "1rem" }}>
                        {language.symbol}
                      </Box>
                      <Box component="span" sx={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}>
                        {language.flag}
                      </Box>
                    </Box>
                  </IconButton>
                );
              })}
            </Box>
            <IconButton
              component="a"
              href="https://github.com/andlon10"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "text.secondary",
                transition: "all 0.3s ease-in-out",
                transform: "translateX(0)",
                "&:hover": {
                  color: "#333",
                  transform: "translateX(-4px)",
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
              aria-label={t("app.githubAriaLabel")}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopBar;
