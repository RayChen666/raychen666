import { CSSProperties } from "react"

interface RippleProps {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
  color?: string
}

export function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  color = "#5ba3c9",
}: RippleProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: "0%", 
        left: "0",
        right: "23.5%",
        bottom: "42.5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70
        const opacity = mainCircleOpacity - i * 0.02
        const animationDelay = `${i * 0.4}s`
        const borderWidth = i === 0 ? 2 : 1

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              border: `${borderWidth}px solid ${color}`,
              opacity,
              animation: `ripple-expand 3s ease-out infinite`,
              animationDelay,
            }}
          />
        )
      })}
      <style>{`
        @keyframes ripple-expand {
          0%   { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}