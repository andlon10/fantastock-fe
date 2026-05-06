import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../_common/constants";
import { RawFixtureFantasyStatsByRound } from "../bonus-over-time/types";

type UseBonusOverTimeDataParams = {
  playerId: number | null;
  season?: string;
  league?: string;
};

const DEFAULT_SEASON = "2025";
const DEFAULT_LEAGUE = "Serie_A";

const EMPTY_DATA: RawFixtureFantasyStatsByRound = {};

export function useBonusOverTimeData({
  playerId,
  season = DEFAULT_SEASON,
  league = DEFAULT_LEAGUE,
}: UseBonusOverTimeDataParams) {
  const [data, setData] = useState<RawFixtureFantasyStatsByRound>(EMPTY_DATA);
  const hasPlayer = Boolean(playerId);

  useEffect(() => {
    if (!hasPlayer) {
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({ season, league });

    fetch(`${API_BASE_URL}/api/player/${playerId}/fixture-events?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch fixture events for player id ${playerId}`);
        }
        return response.json();
      })
      .then((payload: unknown) => {
        setData(
          payload && typeof payload === "object"
            ? (payload as RawFixtureFantasyStatsByRound)
            : EMPTY_DATA
        );
      })
      .catch(err => {
        if (err?.name === "AbortError") {
          return;
        }
        console.error("Error fetching bonus over time data:", err);
        setData(EMPTY_DATA);
      });

    return () => {
      controller.abort();
    };
  }, [hasPlayer, league, playerId, season]);

  if (!hasPlayer) {
    return { data: EMPTY_DATA, loading: false, error: null };
  }

  return { data, loading: false, error: null };
}
