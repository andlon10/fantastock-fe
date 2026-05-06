import { createFileRoute } from "@tanstack/react-router";
import { Comparator } from "../../modules/comparator/Comparator";

export const Route = createFileRoute("/comparator/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Comparator />;
}
