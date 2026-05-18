import { createFileRoute } from "@tanstack/react-router";
import { OfferComparator } from "../../modules/offer-comparator/OfferComparator";

export const Route = createFileRoute("/offer-comparator/")({
  component: OfferComparator,
});
