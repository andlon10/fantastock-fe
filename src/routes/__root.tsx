import { Box, Container } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <TopBar />
        <Container
          maxWidth="xl"
          sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 2 }, flex: 1 }}
        >
          <Outlet />
        </Container>
        <Footer />
      </Box>
      <TanStackRouterDevtools />
    </>
  ),
});
