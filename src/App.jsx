import { Box, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Comparator } from "./comparator/Comparator";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";

function App() {
  const [players, setPlayers] = useState([]);

  const [avgStats, setAvgStats] = useState({
    goals: 0,
    assists: 0,
    xG: 0,
    xA: 0,
    minutes: 0,
    PI: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios.get("http://localhost:8000/api/players").then(res => {
    axios
      .get("http://localhost:8000/api/players?league=Serie_A&season=2025&min_minutes=300")
      .then(res => {
        setPlayers(res.data);
        setLoading(false);
        // compute average per position
        const mids = res.data.filter(p => p.position === "MID");
        if (mids.length) {
          setAvgStats({
            goals: mids.reduce((a, b) => a + b.goals, 0) / mids.length,
            assists: mids.reduce((a, b) => a + b.assists, 0) / mids.length,
            xG: mids.reduce((a, b) => a + b.xG, 0) / mids.length,
            xA: mids.reduce((a, b) => a + b.xA, 0) / mids.length,
            minutes: mids.reduce((a, b) => a + b.minutes, 0) / mids.length,
            PI: mids.reduce((a, b) => a + (b.PI || 0), 0) / mids.length,
          });
        }
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopBar />
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 2 }, flex: 1 }}>
        <Comparator players={players} avgStats={avgStats} />
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
