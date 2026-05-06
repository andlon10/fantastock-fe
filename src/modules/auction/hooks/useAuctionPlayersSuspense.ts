import { useSuspenseQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../../_common/constants";
import { Player } from "../../../_common/types";

const PLAYERS_URL = `${API_BASE_URL}/api/players?league=Serie_A&season=2025&min_minutes=0`;

const fetchAuctionPlayers = async (): Promise<Player[]> => {
  const response = await fetch(PLAYERS_URL);
  const data = await response.json();

  return Array.isArray(data) ? data : [];
};

export function useAuctionPlayersSuspense(): Player[] {
  const { data } = useSuspenseQuery({
    queryKey: ["auction-players", "serie-a", "2025", 0],
    queryFn: fetchAuctionPlayers,
  });

  return data;
}
