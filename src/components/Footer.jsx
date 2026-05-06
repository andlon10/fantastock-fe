import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Container, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: "#ffffff",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}
        >
          {t("app.footerMadeWith")}
          <FavoriteIcon sx={{ fontSize: "1rem", color: "#e91e63", verticalAlign: "middle" }} />
          {t("app.footerBy")}
          <Link
            href="https://www.linkedin.com/in/andrealonghitano/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Andrea Longhitano
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
