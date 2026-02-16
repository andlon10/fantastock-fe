import { Box, Container, Typography, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Footer() {
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
          Made with{" "}
          <FavoriteIcon sx={{ fontSize: "1rem", color: "#e91e63", verticalAlign: "middle" }} /> by{" "}
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
