import { CSSProperties } from "react"

interface LineShadowTextProps {
  children: string
  shadowColor?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  className?: string
  style?: CSSProperties
}

export function LineShadowText({
  children,
  shadowColor = "white",
  as: Component = "span",
  className,
  style,
}: LineShadowTextProps) {
  return (
    <Component
      className={className}
      style={{ 
        display: "inline-block", 
        position: "relative",
        lineHeight: 1,
        ...style 
      }}
    >
      {/* Shadow layer */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "6px",
          left: "6px",
          font: "inherit",        // ← key fix: copies ALL font properties
          whiteSpace: "pre",
          backgroundImage: `repeating-linear-gradient(
            315deg,
            ${shadowColor} 0px,
            ${shadowColor} 1px,
            transparent 1px,
            transparent 50%
          )`,
          backgroundSize: "4px 4px",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          animation: "line-shadow 15s linear infinite",
          userSelect: "none",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {children}
      </span>

      {/* Foreground solid text */}
      <span
        style={{
          position: "relative",
          font: "inherit",        // ← same fix
          whiteSpace: "pre",
          zIndex: 1,
          color: "inherit",
        }}
      >
        {children}
      </span>

      <style>{`
        @keyframes line-shadow {
          0%   { background-position: 0 0; }
          100% { background-position: 100% -100%; }
        }
      `}</style>
    </Component>
  )
}