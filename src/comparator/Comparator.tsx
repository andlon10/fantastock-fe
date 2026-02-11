import { useState } from "react";
import PlayerSelector from "../components/PlayerSelector";
import { Paper, Typography } from "@mui/material";
import { PlayerInformation } from "./PlayerInformation";
import { Radar } from "./Radar";
import ShotHeatmap from "../components/ShotHeatmap";
import GoalMap from "../components/GoalMap";


export function Comparator({players}) {
      const [selectedPlayer1, setSelectedPlayer1] = useState(null);
      const [selectedPlayer2, setSelectedPlayer2] = useState(null);
      console.log(selectedPlayer1);
    return (
        <>
        <div className="p-4">
            <Paper elevation={1}>
                <div className="grid md:grid-cols-2">

                    <div className="md:w-1/2 p-4">
                        <h2 className="text-xl font-bold mb-4">Player 1</h2>
                        <PlayerSelector players={players} selectedPlayer={selectedPlayer1} setSelectedPlayer={setSelectedPlayer1} />
                        {
                            selectedPlayer1 && <PlayerInformation player={selectedPlayer1} />
                        }
                    </div>
                    <div className="md:w-1/2 p-4">
                        <h2 className="text-xl font-bold mb-4">Player 2</h2>
                        <PlayerSelector players={players} selectedPlayer={selectedPlayer2} setSelectedPlayer={setSelectedPlayer2} />
                        {
                            selectedPlayer2 && <PlayerInformation player={selectedPlayer2} />
                        }
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
                    Shot Heatmaps
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Visualize where each player takes their shots on the pitch.
                </Typography>
                <div className="grid md:grid-cols-2">

                    <div className="md:w-1/2 p-4">
                        <h2 className="text-xl font-bold mb-4">{selectedPlayer1?.name}</h2>
                        {
                            selectedPlayer1 && <ShotHeatmap player={selectedPlayer1} />
                        }
                    </div>
                    <div className="md:w-1/2 p-4">
                        <h2 className="text-xl font-bold mb-4">{selectedPlayer2?.name}</h2>
                        {
                            selectedPlayer2 && <ShotHeatmap player={selectedPlayer2} />
                        }
                    </div>

                </div>
            </Paper>
        </div>
        <div className="w-full p-4">
            <Paper elevation={1} className="p-4">
                <Typography variant="h4" component="h1" gutterBottom>
                    Goal Maps
                </Typography>
                <Typography variant="body1" gutterBottom>
                    See where each player's goals were scored from, with point size indicating xG value.
                </Typography>
                <div className="grid md:grid-cols-2">

                    <div className="md:w-1/2 p-4">
                        <h2 className="text-xl font-bold mb-4">{selectedPlayer1?.name}</h2>
                        {
                            selectedPlayer1 && <GoalMap player={selectedPlayer1} />
                        }
                    </div>
                    <div className="md:w-1/2 p-4">
                        <h2 className="text-xl font-bold mb-4">{selectedPlayer2?.name}</h2>
                        {
                            selectedPlayer2 && <GoalMap player={selectedPlayer2} />
                        }
                    </div>

                </div>
            </Paper>
        </div>
        </>
        
    );
}