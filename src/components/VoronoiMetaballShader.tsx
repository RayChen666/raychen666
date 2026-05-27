'use client'

import { useEffect, useRef } from 'react'

interface VoronoiMetaballShaderProps {
  opacity?: number
  className?: string
}

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
precision mediump float;

uniform float iTime;
uniform vec2  iResolution;

// https://iquilezles.org/articles/smin
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

void main() {
  vec2 g = gl_FragCoord.xy;
  vec2 v = g / iResolution.y;
  vec2 p = g / (iResolution.y / 5.);
  vec2 kp;

  g /= iResolution.y / 5.;
  g += iTime * 0.5;

  float d = 9.0;
  float kd = d;

  for (int x = -3; x <= 3; x++)
  for (int y = -3; y <= 3; y++) {
    vec2 cell = vec2(float(x), float(y));

    // Unique per-cell identity
    vec2 gFloor = floor(g);
    vec2 arg = (gFloor + cell) * mat2(2.0, 5.0, 5.0, 2.0);
    vec2 id  = fract(sin(arg));

    vec2 an = sin(iTime * vec2(1.0, 0.5) + 9.0 * id);

    vec2 cp = cell + 0.5 + 0.35 * an - fract(g);

    float ca = cos(an.x);
    float sa = sin(an.x);
    float cy = cos(an.y * 1.5);
    cp = mat2(ca, -sa, sa, ca) * cy * cp * 5.0;
    cp *= 5.0;

    float nd = smin(d, dot(cp, cp), 7.5);

    if (nd < kd) {
      kd = nd;
      kp = cp;
    }
    d = nd;
  }

  vec3 colA = vec3(0.357, 0.639, 0.788); // #5ba3c9
  vec3 colB = vec3(0.576, 0.910, 0.988); // #67e8f9
  gl_FragColor = vec4(mix(colA, colB, clamp(kd * 0.15, 0.0, 1.0)), 1.0);
}
`

function VoronoiMetaballShader({
  opacity = 0.3,
  className,
}: VoronoiMetaballShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * 0.5
      canvas.height = canvas.offsetHeight * 0.5
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
      }
      return shader
    }

    const vs = compileShader(gl.VERTEX_SHADER,   vertexShaderSource)
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
    }
    gl.useProgram(program)

    // Fullscreen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,   1, -1,  -1,  1,
      -1,  1,   1, -1,   1,  1,
    ]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const iTimeLoc = gl.getUniformLocation(program, 'iTime')
    const iResLoc  = gl.getUniformLocation(program, 'iResolution')

    const start = performance.now()
    let raf: number

    const render = () => {
      const t = (performance.now() - start) / 1000
      gl.uniform1f(iTimeLoc, t)
      gl.uniform2f(iResLoc,  canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        opacity,
        pointerEvents: 'none',
      }}
    />
  )
}

export default VoronoiMetaballShader