export default function Pitch() {
  return (
    <svg
      viewBox="0 0 120 80"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Background */}
      <rect width="120" height="80" fill="#1a7f37" />

      {/* Outer lines */}
      <rect x="1" y="1" width="118" height="78" fill="none" stroke="white" strokeWidth="1" />

      {/* Halfway line */}
      <line x1="60" y1="0" x2="60" y2="80" stroke="white" strokeWidth="1" />

      {/* Center circle */}
      <circle cx="60" cy="40" r="10" fill="none" stroke="white" strokeWidth="1" />

      {/* Left penalty area */}
      <rect x="1" y="18" width="18" height="44" fill="none" stroke="white" strokeWidth="1" />

      {/* Right penalty area */}
      <rect x="101" y="18" width="18" height="44" fill="none" stroke="white" strokeWidth="1" />
    </svg>
  );
}
