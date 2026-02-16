import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Player } from "../_common/types";
import PlayerSelector from "../components/PlayerSelector";
import { PlayerMetricsComparisonTable } from "./PlayerMetricsComparisonTable";
import { Radar } from "./Radar";
import { ShotHeatmapContainer } from "./shot-heatmap/ShotHeatmapContainer";
import { SimilarPlayersContainer } from "./similar-players/SimilarPlayerContainer";

export function Comparator({ players }: { players: Player[] }) {
  const [selectedPlayer1, setSelectedPlayer1] = useState<Player | null>(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState<Player | null>(null);
  const [similarPlayers1, setSimilarPlayers1] = useState<Player[] | null>(null);
  const [similarPlayers2, setSimilarPlayers2] = useState<Player[] | null>(null);
  const fetchSimilarPlayers = (
    playerId: number,
    setSimilarPlayers: React.Dispatch<React.SetStateAction<Player[] | null>>
  ) => {
    fetch(`http://localhost:8000/api/player/${playerId}/similar`)
      .then(res => res.json())
      .then(data => setSimilarPlayers(data))
      .catch(err => {
        console.error("Error fetching similar players:", err);
        setSimilarPlayers([]);
      });
  };

  const handlePlayer1Change = (player: Player | null) => {
    setSelectedPlayer1(player);
    if (player) {
      fetchSimilarPlayers(player.id, setSimilarPlayers1);
    } else {
      setSimilarPlayers1(null);
    }
  };

  const handlePlayer2Change = (player: Player | null) => {
    setSelectedPlayer2(player);
    if (player) {
      fetchSimilarPlayers(player.id, setSimilarPlayers2);
    } else {
      setSimilarPlayers2(null);
    }
  };

  return (
    <>
      <div className="p-4">
        <Paper elevation={1}>
          <div className="grid md:grid-cols-2">
            <div className="md:w-1/2 p-4">
              <h2 className="text-xl font-bold mb-4">Player 1</h2>
              <PlayerSelector
                players={players}
                selectedPlayer={selectedPlayer1}
                setSelectedPlayer={handlePlayer1Change}
              />
              {/* {selectedPlayer1 && <PlayerInformation player={selectedPlayer1} />} */}
            </div>
            <div className="md:w-1/2 p-4">
              <h2 className="text-xl font-bold mb-4">Player 2</h2>
              <PlayerSelector
                players={players}
                selectedPlayer={selectedPlayer2}
                setSelectedPlayer={handlePlayer2Change}
              />
              {/* {selectedPlayer2 && <PlayerInformation player={selectedPlayer2} />} */}
            </div>
          </div>
        </Paper>
      </div>
      <div className="w-full p-4">
        <Paper elevation={1} className="p-4">
          <Typography variant="h4" component="h1" gutterBottom>
            Player Comparator
          </Typography>
          <Typography variant="body1" gutterBottom>
            Select two players to compare their stats, shot heatmaps, and goal maps side by side.
          </Typography>
          <Radar player1={selectedPlayer1} player2={selectedPlayer2} />
        </Paper>
      </div>
      <div className="w-full p-4">
        <Paper elevation={1} className="p-4">
          <Typography variant="h4" component="h1" gutterBottom>
            Player metrics comparison
          </Typography>
          <Typography variant="body1" gutterBottom>
            Side-by-side comparison of the same metrics shown in the Player Metrics card.
          </Typography>
          <PlayerMetricsComparisonTable player1={selectedPlayer1} player2={selectedPlayer2} />
        </Paper>
      </div>
      <div className="w-full p-4">
        <Paper elevation={1} className="p-4">
          <ShotHeatmapContainer player1={selectedPlayer1} player2={selectedPlayer2} />
        </Paper>
      </div>
      {
        // Bonus chart is currently disabled due to data inconsistencies, but the component is ready for future use once the data is fixed.
      }
      {/* <div className="w-full p-4">
        <Paper elevation={1} className="p-4">
          <BonusChartContainer player1={selectedPlayer1} player2={selectedPlayer2} />
        </Paper>
      </div> */}
      <div className="w-full p-4">
        <Paper elevation={1} className="p-4">
          <SimilarPlayersContainer
            player1={selectedPlayer1}
            player2={selectedPlayer2}
            similarPlayers1={similarPlayers1}
            similarPlayers2={similarPlayers2}
          />
        </Paper>
      </div>
    </>
  );
}
