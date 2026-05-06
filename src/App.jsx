import { Box, Container } from "@mui/material";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import { Comparator } from "./modules/comparator/Comparator";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopBar />
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 2 }, flex: 1 }}>
        <Comparator />
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
