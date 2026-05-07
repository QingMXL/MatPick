// Procedural "interior scene" backdrop — used in place of stock photography
// so the demo runs offline. Renders a stylized hotel space with adjustable
// wall material so the AI material-replacement workflow can be demonstrated.

import { cn } from "@/lib/utils";

interface SceneProps {
  wallColor?: string;
  wallTexture?: string;
  floorColor?: string;
  ceilingColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Scene({
  wallColor = "#9DAE9D",
  wallTexture,
  floorColor = "#9F9486",
  ceilingColor = "#E8E4DA",
  className,
  children,
}: SceneProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Ceiling band */}
      <div
        className="absolute inset-x-0 top-0 h-[14%]"
        style={{
          background: `linear-gradient(180deg, ${ceilingColor} 0%, ${shade(ceilingColor, -8)} 100%)`,
        }}
      />
      {/* Back wall — feature wall (this is what AI replaces) */}
      <div
        className="absolute inset-0 top-[14%] bottom-[40%]"
        style={{
          background: wallTexture
            ? wallTexture
            : `linear-gradient(180deg, ${wallColor} 0%, ${shade(wallColor, -10)} 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-25 mix-blend-multiply"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 80% 30%, rgba(255,255,255,0.35), transparent 60%)",
          }}
        />
      </div>
      {/* Floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background: `linear-gradient(180deg, ${floorColor} 0%, ${shade(floorColor, -18)} 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 30px)",
          }}
        />
      </div>
      {/* Furniture silhouettes */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {/* Rounded sofa */}
        <g opacity="0.92">
          <rect x="120" y="380" width="320" height="80" rx="36" fill="#C8BFAF" />
          <rect x="140" y="340" width="280" height="60" rx="28" fill="#D4CCBC" />
          <rect x="150" y="360" width="120" height="44" rx="14" fill="#E1D8C7" />
          <rect x="280" y="360" width="120" height="44" rx="14" fill="#E1D8C7" />
        </g>
        {/* Coffee table */}
        <g opacity="0.85">
          <ellipse cx="540" cy="450" rx="80" ry="14" fill="rgba(0,0,0,0.18)" />
          <rect x="470" y="420" width="140" height="14" rx="4" fill="#3A3327" />
          <rect x="500" y="434" width="80" height="20" fill="#22201B" />
        </g>
        {/* Side chair */}
        <g opacity="0.9">
          <rect x="660" y="380" width="100" height="80" rx="20" fill="#C2B7A4" />
          <rect x="680" y="340" width="60" height="60" rx="14" fill="#D0C5B0" />
        </g>
        {/* Floor lamp */}
        <g opacity="0.7">
          <line x1="800" y1="200" x2="800" y2="430" stroke="#3A3327" strokeWidth="3" />
          <ellipse cx="800" cy="200" rx="24" ry="10" fill="#E5DCC6" />
          <rect x="780" y="430" width="40" height="6" fill="#3A3327" />
        </g>
        {/* Vertical window mullions on the left */}
        <g opacity="0.18">
          <rect x="40" y="100" width="2" height="280" fill="#0F1A14" />
          <rect x="80" y="100" width="2" height="280" fill="#0F1A14" />
          <rect x="20" y="100" width="2" height="280" fill="#0F1A14" />
        </g>
      </svg>
      {children}
    </div>
  );
}

function shade(hex: string, amt: number) {
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amt));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
