import { useCallback, useState } from "react";
import { API_BASE_URL } from "../../../_common/constants";
import { Player } from "../../../_common/types";

export async function fetchSimilarPlayerById(playerId: number): Promise<Player[]> {
  const response = await fetch(`${API_BASE_URL}/api/player/${playerId}/similar`);

  if (!response.ok) {
    throw new Error(`Failed to fetch similar players for id ${playerId}`);
  }

  return response.json();
}

export function useSimilarPlayer() {
  const [isLoading, setIsLoading] = useState(false);
  const [similarPlayers, setSimilarPlayers] = useState<Player[] | null>(null);

  const fetchSimilarPlayer = useCallback(async (playerId: number): Promise<Player[]> => {
    setIsLoading(true);

    try {
      const data = await fetchSimilarPlayerById(playerId);
      setSimilarPlayers(data);
      return data;
    } catch (err) {
      console.error("Error fetching similar players:", err);
      setSimilarPlayers([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, similarPlayers, fetchSimilarPlayer };
}
