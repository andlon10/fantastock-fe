import { useState } from "react";
import PlayerSelector from "../components/PlayerSelector";
import { Paper } from "@mui/material";
import { PlayerInformation } from "./PlayerInformation";
import { Radar } from "./Radar";


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
            <Paper elevation={1}>
                <Radar player1={selectedPlayer1} player2={selectedPlayer2} />
            </Paper>
        </div> 
        </>
        
    );
}