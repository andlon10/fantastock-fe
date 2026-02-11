import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Chart.js registration
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  LineElement,
  Filler
} from "chart.js";

ChartJS.register(
  LinearScale,    // needed for Scatter / linear axes
  PointElement,   // needed for Scatter points
  Tooltip,
  Legend,
  RadialLinearScale, // for Radar charts
  LineElement,       // for Radar chart lines
  Filler              // for Radar chart fill
);

import { MatrixController, MatrixElement } from "chartjs-chart-matrix";

ChartJS.register(
  LinearScale,
  Tooltip,
  Legend,
  MatrixController,
  MatrixElement
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);