import { Player } from "../../_common/types";

export type OfferSummary = {
  players: Player[];
  playerCount: number;
  totalPI: number;
  avgPI: number;
  totalPoints: number;
  avgPoints: number;
  totalGoals: number;
  totalAssists: number;
  totalMinutes: number;
  totalxG: number;
  totalxA: number;
  avgFOI: number;
  contributionsPer90: number;
  xContributionsPer90: number;
  performanceScore: number;
};

export type OfferComparisonResult = {
  offerA: OfferSummary;
  offerB: OfferSummary;
  scoreDiff: number;
  favoredOffer: "A" | "B" | "TIE";
  confidence: number;
};

function safeRound(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function sanitizePlayers(players: Array<Player | null>): Player[] {
  return players.filter((player): player is Player => Boolean(player));
}

export function summarizeOffer(playersInput: Array<Player | null>): OfferSummary {
  const players = sanitizePlayers(playersInput);
  const playerCount = players.length;

  if (playerCount === 0) {
    return {
      players,
      playerCount,
      totalPI: 0,
      avgPI: 0,
      totalPoints: 0,
      avgPoints: 0,
      totalGoals: 0,
      totalAssists: 0,
      totalMinutes: 0,
      totalxG: 0,
      totalxA: 0,
      avgFOI: 0,
      contributionsPer90: 0,
      xContributionsPer90: 0,
      performanceScore: 0,
    };
  }

  const totals = players.reduce(
    (acc, player) => {
      acc.totalPI += player.PI || 0;
      acc.totalPoints += player.totalPoints || 0;
      acc.totalGoals += player.goals || 0;
      acc.totalAssists += player.assists || 0;
      acc.totalMinutes += player.minutes || 0;
      acc.totalxG += player.xG || 0;
      acc.totalxA += player.xA || 0;
      acc.totalFOI += player.FOI || 0;
      return acc;
    },
    {
      totalPI: 0,
      totalPoints: 0,
      totalGoals: 0,
      totalAssists: 0,
      totalMinutes: 0,
      totalxG: 0,
      totalxA: 0,
      totalFOI: 0,
    }
  );

  const avgPI = totals.totalPI / playerCount;
  const avgPoints = totals.totalPoints / playerCount;
  const avgFOI = totals.totalFOI / playerCount;
  const totalContributions = totals.totalGoals + totals.totalAssists;
  const totalXContributions = totals.totalxG + totals.totalxA;

  const contributionsPer90 =
    totals.totalMinutes > 0 ? (totalContributions / totals.totalMinutes) * 90 : 0;
  const xContributionsPer90 =
    totals.totalMinutes > 0 ? (totalXContributions / totals.totalMinutes) * 90 : 0;

  // Heuristic score to compare bundles of players for trade offers.
  const performanceScore =
    avgPI * 0.45 +
    avgPoints * 0.2 +
    contributionsPer90 * 18 +
    xContributionsPer90 * 16 +
    avgFOI * 0.25;

  return {
    players,
    playerCount,
    totalPI: safeRound(totals.totalPI),
    avgPI: safeRound(avgPI),
    totalPoints: safeRound(totals.totalPoints),
    avgPoints: safeRound(avgPoints),
    totalGoals: safeRound(totals.totalGoals),
    totalAssists: safeRound(totals.totalAssists),
    totalMinutes: safeRound(totals.totalMinutes),
    totalxG: safeRound(totals.totalxG),
    totalxA: safeRound(totals.totalxA),
    avgFOI: safeRound(avgFOI),
    contributionsPer90: safeRound(contributionsPer90),
    xContributionsPer90: safeRound(xContributionsPer90),
    performanceScore: safeRound(performanceScore),
  };
}

export function compareOffers(
  offerAInput: Array<Player | null>,
  offerBInput: Array<Player | null>
): OfferComparisonResult {
  const offerA = summarizeOffer(offerAInput);
  const offerB = summarizeOffer(offerBInput);

  const scoreDiff = safeRound(offerA.performanceScore - offerB.performanceScore);
  const baseline = Math.max(offerA.performanceScore, offerB.performanceScore, 1);
  const confidence = safeRound((Math.abs(scoreDiff) / baseline) * 100, 1);

  let favoredOffer: "A" | "B" | "TIE" = "TIE";
  if (scoreDiff > 0) favoredOffer = "A";
  if (scoreDiff < 0) favoredOffer = "B";

  return {
    offerA,
    offerB,
    scoreDiff,
    favoredOffer,
    confidence,
  };
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}
