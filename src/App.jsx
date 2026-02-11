import { useEffect, useState } from "react";
import axios from "axios";
import { Stack, Container, Box, Paper, Typography, Grid } from "@mui/material";
import PlayerSelector from "./components/PlayerSelector";
import PlayerMetrics from "./components/PlayerMetrics";
import ScatterPlot from "./components/ScatterPlot";
import RadarChart from "./components/RadarChart";
import Heatmap from "./components/Heatmap";
import { Comparator } from "./comparator/Comparator";

function App() {
  const [players, setPlayers] = useState([]);

  const [avgStats, setAvgStats] = useState({goals:0, assists:0, xG:0, xA:0, minutes:0, PI:0});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get("http://localhost:8000/api/players")
      .then(res => {
        setPlayers(res.data);
        setLoading(false);
        // compute average per position
        const mids = res.data.filter(p => p.position === "MID");
        if (mids.length) {
          setAvgStats({
            goals: mids.reduce((a,b)=>a+b.goals,0)/mids.length,
            assists: mids.reduce((a,b)=>a+b.assists,0)/mids.length,
            xG: mids.reduce((a,b)=>a+b.xG,0)/mids.length,
            xA: mids.reduce((a,b)=>a+b.xA,0)/mids.length,
            minutes: mids.reduce((a,b)=>a+b.minutes,0)/mids.length,
            PI: mids.reduce((a,b)=>a+(b.PI||0),0)/mids.length
          });
        }
      });
  }, []);
  loading && <div>Loading...</div>;
  
  const renderPlayerSection = (selectedPlayer, setSelectedPlayer, title) => (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      
      {/* Player Selector */}
      <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 } }}>
        <PlayerSelector players={players} selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
      </Paper>

      {/* Player Metrics */}
      {selectedPlayer && (
        <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 } }}>
          <PlayerMetrics player={selectedPlayer} />
        </Paper>
      )}

      {/* Scatter Plot */}
      {selectedPlayer && (
        <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 } }}>
          <Box sx={{ height: { xs: 250, sm: 350, md: 400 } }}>
            <ScatterPlot players={players} selected={selectedPlayer} />
          </Box>
        </Paper>
      )}

      {/* Radar Chart */}
      {selectedPlayer && (
        <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 } }}>
          <Box sx={{ height: { xs: 250, sm: 350, md: 400 } }}>
            <RadarChart player={selectedPlayer} avg={avgStats} />
          </Box>
        </Paper>
      )}

      {/* Heatmap */}
      {selectedPlayer && (
        <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 } }}>
          <Heatmap players={players} />
        </Paper>
      )}
    </Stack>
  );
  
  return (
    // <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 2 } }}>
    //   <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, mb: { xs: 2, sm: 3, md: 4 } }}>
    //     Serie A 2026 Fantasy Dashboard - Player Comparison
    //   </Typography>
      
      
    //   <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
    //     {/* Left Section - Player 1 */}
    //     <Grid item xs={12} lg={6}>
    //       {renderPlayerSection(selectedPlayer1, setSelectedPlayer1, "Player 1")}
    //     </Grid>
        
    //     {/* Right Section - Player 2 */}
    //     <Grid item xs={12} lg={6}>
    //       {renderPlayerSection(selectedPlayer2, setSelectedPlayer2, "Player 2")}
    //     </Grid>
    //   </Grid>
    // </Container>
    <>
    <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, mb: { xs: 2, sm: 3, md: 4 } }}>
    Serie A 2026 Fantasy Dashboard - Player Comparison
    </Typography>
    <Comparator players={players} avgStats={avgStats} />
    </>
  );
}

export default App;