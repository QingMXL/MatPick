import { cn } from "@/lib/utils";

// Procedural material thumbnails — colored gradients with subtle texture overlays.
// Avoids depending on external image hosts for the demo.
export function MaterialThumb({
  seed,
  category,
  className,
}: {
  seed: string;
  category?: string;
  className?: string;
}) {
  const palette = paletteFor(category);
  const hue = hash(seed) % palette.length;
  const c = palette[hue];
  const angle = (hash(seed + "a") % 360);
  const grain = (hash(seed + "g") % 6) + 2;
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-subtle",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${angle}deg, ${c.from}, ${c.to})`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage: `repeating-linear-gradient(${angle + 90}deg, rgba(0,0,0,0.5) 0 1px, transparent 1px ${grain}px)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6), transparent 50%)",
        }}
      />
    </div>
  );
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function paletteFor(category?: string) {
  switch (category) {
    case "石材":
      return [
        { from: "#E9E6DE", to: "#C7BFB0" },
        { from: "#EFEEEC", to: "#BDB7AE" },
        { from: "#D4CCBC", to: "#8E8576" },
        { from: "#E2DED4", to: "#A6A091" },
      ];
    case "木作":
      return [
        { from: "#E5D2B5", to: "#A6824F" },
        { from: "#D7B98F", to: "#8C6238" },
        { from: "#C99868", to: "#7A4E29" },
      ];
    case "瓷砖":
      return [
        { from: "#EFEFEC", to: "#C9C9C2" },
        { from: "#E2E5E1", to: "#A6ABA3" },
      ];
    case "布艺":
      return [
        { from: "#D7D4C9", to: "#A8A292" },
        { from: "#C9CCB6", to: "#8C9275" },
        { from: "#D9CFB7", to: "#988B68" },
      ];
    case "皮革":
      return [
        { from: "#A87C53", to: "#5D3F25" },
        { from: "#8E674A", to: "#4B3322" },
      ];
    case "五金":
      return [
        { from: "#7E7568", to: "#3F3A33" },
        { from: "#A29E94", to: "#5C5751" },
        { from: "#5B5448", to: "#2A2620" },
      ];
    case "软装":
      return [
        { from: "#D9D2C2", to: "#A19785" },
        { from: "#C7BAA0", to: "#7B6E55" },
      ];
    default:
      return [
        { from: "#DCD7CC", to: "#A29A89" },
        { from: "#D8D2C4", to: "#8E8676" },
      ];
  }
}
