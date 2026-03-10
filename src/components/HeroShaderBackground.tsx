'use client'
import { SynthwaveCanyonShader } from "@/components/SynthwaveCanyonShader"

export function HeroShaderBackground() {
  return (
    <div style={{
      position: 'fixed',   // ← fixed instead of absolute
      inset: 0,            // ← covers full viewport
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <SynthwaveCanyonShader 
        speed={0.5} 
        opacity={0.35}
        flightHeight={1.0}
        terrainDepth={24.0}
      />
    </div>
  )
}