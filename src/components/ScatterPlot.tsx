import { Scatter } from "react-chartjs-2";

export default function ScatterPlot({ players, selected }) {
  // Only display the selected player in the scatter plot
const data = {
  datasets: players.map((p) => ({
    label: p.name,
    data: [{ x: p.FOI, y: p.PI }],
    backgroundColor:
      selected && p.id === selected.id
        ? "gold" // highlight selected
        : "lightgray",
    radius: selected && p.id === selected.id ? 8 : 4,
  })),
};

  return <Scatter data={data} />;
}