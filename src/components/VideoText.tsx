export function VideoText({
  src,
  children,
  fontSize = 120,
  fontWeight = "bold",
  fontFamily = "sans-serif",
}: {
  src: string
  children: React.ReactNode
  fontSize?: number | string
  fontWeight?: string | number
  fontFamily?: string
}) {
  return (
    <svg width="100%" height="100%">
      <defs>
        <mask id="text-mask">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            fill="white"
          >
            {children}
          </text>
        </mask>
      </defs>
      <foreignObject width="100%" height="100%" mask="url(#text-mask)">
        <video
          autoPlay
          muted
          loop
          playsInline
          src={src}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </foreignObject>
    </svg>
  )
}