export function PlayerInformation({ player }) {
  return (
    <div className="mt-4 p-2 border border-gray-300 rounded">
      <h3 className="text-lg font-semibold">
        {player.name} - {player.team}
      </h3>
      <p>Position: {player.position}</p>
      <p>Goals: {player.goals}</p>
      <p>Assists: {player.assists}</p>
      <p>xG: {player.xG}</p>
      <p>xA: {player.xA}</p>
      <p>Minutes: {player.minutes}</p>
      <p>PI: {player.PI}</p>
    </div>
  );
}
