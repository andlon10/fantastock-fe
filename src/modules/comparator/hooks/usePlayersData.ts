import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../_common/constants";
import { Player } from "../../../_common/types";

type UsePlayersDataOptions = {
  league?: string;
  season?: string;
  minMinutes?: number;
};

const DEFAULT_OPTIONS: Required<UsePlayersDataOptions> = {
  league: "Serie_A",
  season: "2025",
  minMinutes: 300,
};

export function usePlayersData(options: UsePlayersDataOptions = DEFAULT_OPTIONS) {
  const { league, season, minMinutes } = { ...DEFAULT_OPTIONS, ...options };

  const [players, setPlayers] = useState<Player[]>([]);
  const [avgStats, setAvgStats] = useState({
    goals: 0,
    assists: 0,
    xG: 0,
    xA: 0,
    minutes: 0,
    PI: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();

    if (league) {
      params.append("league", league);
    }
    if (season) {
      params.append("season", season);
    }
    if (typeof minMinutes === "number") {
      params.append("min_minutes", String(minMinutes));
    }

    fetch(`${API_BASE_URL}/api/players?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setPlayers(Array.isArray(data) ? data : []);
        setLoading(false);

        // calculate average per position
        const mids = data.filter(player => player.position === "MID");
        if (mids.length) {
          setAvgStats({
            goals: mids.reduce((a, b) => a + b.goals, 0) / mids.length,
            assists: mids.reduce((a, b) => a + b.assists, 0) / mids.length,
            xG: mids.reduce((a, b) => a + b.xG, 0) / mids.length,
            xA: mids.reduce((a, b) => a + b.xA, 0) / mids.length,
            minutes: mids.reduce((a, b) => a + b.minutes, 0) / mids.length,
            PI: mids.reduce((a, b) => a + (b.PI || 0), 0) / mids.length,
          });
        }
      })
      .catch(() => {
        setPlayers([]);
        setLoading(false);
      });
  }, [league, minMinutes, season]);

  return { players, avgStats, loading };
}
