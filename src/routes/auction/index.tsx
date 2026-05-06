import { createFileRoute } from "@tanstack/react-router";
import { Auction } from "../../modules/auction/Auction";

export const Route = createFileRoute("/auction/")({
  component: Auction,
});
