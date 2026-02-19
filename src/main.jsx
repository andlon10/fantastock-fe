import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";

// TODO check later for unused charts
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  LineElement,
  Filler
);

import { MatrixController, MatrixElement } from "chartjs-chart-matrix";

ChartJS.register(LinearScale, Tooltip, Legend, MatrixController, MatrixElement);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
