import { AppBar, Toolbar, Typography, Container, Box, IconButton } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function TopBar() {
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
              Fantastock
            </Typography>
          </Box>

          {/* Social Links with Slide Animation */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/andrealonghitano/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "text.secondary",
                transition: "all 0.3s ease-in-out",
                transform: "translateX(0)",
                "&:hover": {
                  color: "#0077b5",
                  transform: "translateX(-4px)",
                  backgroundColor: "rgba(0, 119, 181, 0.08)",
                },
              }}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>

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
              aria-label="GitHub"
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
