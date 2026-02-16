import { Typography } from "@mui/material";
import { Player } from "../../_common/types";
import { SimilarPlayers } from "../../components/SimilarPlayers";

export function SimilarPlayersContainer({
  player1,
  player2,
  similarPlayers1,
  similarPlayers2,
}: {
  player1: Player | null;
  player2: Player | null;
  similarPlayers1: Player[] | null;
  similarPlayers2: Player[] | null;
}) {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Similar players
      </Typography>
      <Typography variant="body1" gutterBottom>
        A list of players with similar performance indicators. Percentages are relevant to the
        selected player and indicate how much better/worse the similar player is compared to the
        selected one.
      </Typography>
      <div className="grid md:grid-cols-2">
        <div className="md:w-1/2 p-4">
          <h2 className="text-xl font-bold mb-4">{player1?.name}</h2>
          {player1 && <SimilarPlayers player={player1} similarPlayers={similarPlayers1} />}
        </div>
        <div className="md:w-1/2 p-4">
          <h2 className="text-xl font-bold mb-4">{player2?.name}</h2>
          {player2 && <SimilarPlayers player={player2} similarPlayers={similarPlayers2} />}
        </div>
      </div>
    </>
  );
}
