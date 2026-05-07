// Procedural project cover — uses Scene styling but compressed for cards.
import { Scene } from "./scene";

export function ProjectCover({
  tone = "warm",
  className,
}: {
  tone?: "warm" | "cool" | "neutral" | "dark";
  className?: string;
}) {
  const palette = {
    warm: { wall: "#9DAE9D", floor: "#9F9486", ceiling: "#E8E4DA" },
    cool: { wall: "#9AAEB1", floor: "#8C8E8E", ceiling: "#E2E4E2" },
    neutral: { wall: "#B5AD9C", floor: "#A09684", ceiling: "#EAE5DA" },
    dark: { wall: "#7B7468", floor: "#574F45", ceiling: "#C5BCAF" },
  }[tone];
  return (
    <div className={className}>
      <Scene
        wallColor={palette.wall}
        floorColor={palette.floor}
        ceilingColor={palette.ceiling}
        className="w-full h-full"
      />
    </div>
  );
}
