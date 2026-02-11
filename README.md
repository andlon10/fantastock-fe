# Fantastock

A fantasy sports player comparison and analysis tool built with React, TypeScript, and modern visualization libraries.

## Features

- **Player Comparator**: Side-by-side comparison of player statistics
- **Radar Charts**: Visual representation of player attributes
- **Heatmaps**: Performance visualization across different metrics
- **Scatter Plots**: Statistical analysis and correlation views
- **Interactive Dashboard**: Real-time player metrics and insights

## Tech Stack

- **Frontend**: React 19.2 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 4 + DaisyUI + Material-UI
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fantastock
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Heatmap.tsx
│   ├── PlayerMetrics.tsx
│   ├── PlayerSelector.tsx
│   ├── RadarChart.tsx
│   └── ScatterPlot.tsx
├── comparator/       # Player comparison features
│   ├── Comparator.tsx
│   ├── PlayerInformation.tsx
│   └── Radar.tsx
├── assets/           # Static assets
├── App.jsx           # Main application component
└── main.jsx          # Application entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not licensed for public use.
