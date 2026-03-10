'use client'

import { useEffect, useRef } from 'react'

interface SynthwaveCanyonShaderProps {
  speed?: number
  flightHeight?: number
  crtEffect?: boolean
  terrainDepth?: number
  opacity?: number
  className?: string
}

const fragmentShaderSource = `
#extension GL_OES_standard_derivatives : enable

#define PI 3.141592654

precision mediump float;

uniform float iTime;
uniform vec2 iResolution;
uniform float u_speed;
uniform float u_flightHeight;
uniform float u_crtEffect;
uniform float u_terrainDepth;

const vec4 hsv2rgb_K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www);
  return c.z * mix(hsv2rgb_K.xxx, clamp(p - hsv2rgb_K.xxx, 0.0, 1.0), c.y);
}

vec4 alphaBlend(vec4 back, vec4 front) {
  float w = front.w + back.w*(1.0-front.w);
  vec3 xyz = (front.xyz*front.w + back.xyz*back.w*(1.0-front.w))/w;
  return w > 0.0 ? vec4(xyz, w) : vec4(0.0);
}

vec3 alphaBlend(vec3 back, vec4 front) {
  return mix(back, front.xyz, front.w);
}

float mod1(float p, float size) {
  float halfsize = size*0.5;
  return mod(p + halfsize, size) - halfsize;
}

float planex(vec2 p, float w) {
  return abs(p.y) - w;
}

float circle(vec2 p, float r) {
  return length(p) - r;
}

float pmin(float a, float b, float k) {
  float h = clamp(0.5+0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}

float pmax(float a, float b, float k) {
  return -pmin(-a, -b, k);
}

float tanh_approx(float x) {
  float x2 = x*x;
  return clamp(x*(27.0 + x2)/(27.0+9.0*x2), -1.0, 1.0);
}

float hash(float co) {
  return fract(sin(co*12.9898) * 13758.5453);
}

float hash2(vec2 p) {
  float a = dot(p, vec2(127.1, 311.7));
  return fract(sin(a)*43758.5453123);
}

vec3 postProcess(vec3 col, vec2 q) {
  if (u_crtEffect > 0.5) {
    col *= 1.5*smoothstep(-2.0, 1.0, sin(0.5*PI*q.y*iResolution.y));
  }
  col = clamp(col, 0.0, 1.0);
  col = pow(col, vec3(1.0/2.2));
  col = col*0.6+0.4*col*col*(3.0-2.0*col);
  col = mix(col, vec3(dot(col, vec3(0.33))), -0.4);
  col *= 0.5+0.5*pow(19.0*q.x*q.y*(1.0-q.x)*(1.0-q.y), 0.7);
  return col;
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float a = hash2(i + vec2(0.0,0.0));
  float b = hash2(i + vec2(1.0,0.0));
  float c = hash2(i + vec2(0.0,1.0));
  float d = hash2(i + vec2(1.0,1.0));
  float m0 = mix(a, b, u.x);
  float m1 = mix(c, d, u.x);
  return mix(m0, m1, u.y);
}

float fbm(vec2 p) {
  const float aa = 0.35;
  const float pp = 1.8;
  float sum = 0.0;
  float a = 1.0;
  for (int i = 0; i < 3; ++i) {
    sum += a*vnoise(p);
    a *= aa;
    p *= pp;
  }
  return sum;
}

float height(vec2 p) {
  return fbm(p)*smoothstep(0.0, 1.25+0.25*sin(0.5*p.y), abs(p.x))-0.35;
}

vec3 offset(float z) {
  float a = z;
  vec2 p = -0.05*(vec2(cos(a), sin(a*sqrt(2.0))) + vec2(cos(a*sqrt(0.75)), sin(a*sqrt(0.5))));
  return vec3(p, z);
}

vec3 doffset(float z) {
  float eps = 0.1;
  return 0.5*(offset(z + eps) - offset(z - eps))/eps;
}

vec3 ddoffset(float z) {
  float eps = 0.1;
  return 0.5*(doffset(z + eps) - doffset(z - eps))/eps;
}

vec4 plane(vec3 ro, vec3 rd, vec3 pp, vec3 off, float aa, float n) {
  vec2 p = (pp - off*2.0*vec3(1.0, 1.0, 0.0)).xy;
  float he = height(vec2(p.x, pp.z));
  float d = p.y - he;
  float t = smoothstep(aa, -aa, d);
  vec3 hsv = vec3(fract(0.7+0.125*sin(0.6*pp.z)), 0.5, smoothstep(aa, -aa, abs(d)-aa));
  float g = exp(-90.*max(abs(d), 0.0));
  hsv.z += g;
  hsv.z += (he*he-pp.y-0.125)*0.5;
  vec3 col = hsv2rgb(hsv);
  return vec4(col, tanh_approx(t+g));
}

float sun(vec2 p) {
  const float ch = 0.0125;
  vec2 cp = p;
  cp.y = mod1(cp.y, ch*6.0);
  float d0 = circle(p, 0.5);
  float d1 = planex(cp, ch);
  float d2 = p.y+ch*3.0;
  float d = d0;
  d = pmax(d, -max(d1, d2), ch*2.0);
  return d;
}

float df(vec2 p) {
  const float sc = 25.0;
  return sun(p/sc)*sc;
}

vec3 skyColor(vec3 ro, vec3 rd) {
  float aa = 2.0/iResolution.y;
  vec2 p = rd.xy*2.0;
  p.y -= 0.25;
  vec3 sunCol = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0), clamp((0.85 - p.y)*0.75, 0.0, 1.0));
  vec3 glareCol = sqrt(sunCol);
  float ss = smoothstep(-1.05, 0.0, p.y);
  vec3 glow = mix(vec3(1.0, 0.7, 0.6).zyx, glareCol, ss);
  float s = 15.0;
  float d = df(p*s)/s;
  float db = abs(d) - 0.0025;
  vec3 col = vec3(1.0, 0.0, 1.0)*0.125;
  vec3 corona = 0.65*glow*exp(-2.5*d)*ss;
  col += corona;
  col = mix(col, sunCol*ss, smoothstep(-aa, aa, -d));
  col = mix(col, glow*1.55, smoothstep(-aa, aa, -db));
  return col;
}

vec3 color(vec3 ww, vec3 uu, vec3 vv, vec3 ro, vec2 p) {
  vec2 np = p + 1.0/iResolution.xy;
  float rdd = 2.0;
  vec3 rd = normalize(p.x*uu + p.y*vv + rdd*ww);
  vec3 nrd = normalize(np.x*uu + np.y*vv + rdd*ww);
  float planeDist = 0.5;
  float furthest = u_terrainDepth;
  float fadeFrom = max(furthest-2.0, 0.0);
  float nz = floor(ro.z / planeDist);
  vec3 skyCol = skyColor(ro, rd);
  vec4 acol = vec4(0.0);
  const float cutOff = 0.95;
  for (int i = 1; i <= 24; ++i) {
    if (float(i) > furthest) break;
    float pz = planeDist*nz + planeDist*float(i);
    float pd = (pz - ro.z)/rd.z;
    vec3 pp = ro + rd*pd;
    if (pp.y < 1.25*u_flightHeight && pd > 0.0 && acol.w < cutOff) {
      vec3 npp = ro + nrd*pd;
      float aa = 3.0*length(pp - npp);
      vec3 off = offset(pp.z);
      vec4 pcol = plane(ro, rd, pp, off, aa, nz+float(i));
      float nz2 = pp.z-ro.z;
      float fadeIn = smoothstep(planeDist*furthest, planeDist*fadeFrom, nz2);
      float fadeOut = smoothstep(0.0, planeDist*0.1, nz2);
      pcol.xyz = mix(skyCol, pcol.xyz, fadeIn);
      pcol.w *= fadeOut;
      pcol = clamp(pcol, 0.0, 1.0);
      acol = alphaBlend(pcol, acol);
    } else {
      acol.w = acol.w > cutOff ? 1.0 : acol.w;
      break;
    }
  }
  return alphaBlend(skyCol, acol);
}

void main() {
  vec2 q = gl_FragCoord.xy / iResolution.xy;
  vec2 p = -1.0 + 2.0*q;
  p.x *= iResolution.x/iResolution.y;

  float tm = iTime*0.25*u_speed;
  vec3 ro = offset(tm);
  vec3 dro = doffset(tm);
  vec3 ddro = ddoffset(tm);

  vec3 ww = normalize(dro);
  vec3 uu = normalize(cross(normalize(vec3(0.0,1.0,0.0)+ddro), ww));
  vec3 vv = normalize(cross(ww, uu));

  vec3 col = color(ww, uu, vv, ro, p);
  col *= smoothstep(0.0, 4.0, iTime);
  col = postProcess(col, q);

  gl_FragColor = vec4(col, 1.0);
}
`

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

export function SynthwaveCanyonShader({
  speed = 1.0,
  flightHeight = 1.0,
  crtEffect = false,
  terrainDepth = 24.0,
  opacity = 0.3,
  className,
}: SynthwaveCanyonShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // Compile shaders
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader))
      }
      return shader
    }

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Fullscreen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,-1,  1,-1, -1, 1,
      -1, 1,  1,-1,  1, 1,
    ]), gl.STATIC_DRAW)

    const pos = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const iTimeLoc       = gl.getUniformLocation(program, 'iTime')
    const iResLoc        = gl.getUniformLocation(program, 'iResolution')
    const speedLoc       = gl.getUniformLocation(program, 'u_speed')
    const heightLoc      = gl.getUniformLocation(program, 'u_flightHeight')
    const crtLoc         = gl.getUniformLocation(program, 'u_crtEffect')
    const depthLoc       = gl.getUniformLocation(program, 'u_terrainDepth')

    const start = performance.now()
    let raf: number

    const render = () => {
      const t = (performance.now() - start) / 1000
      gl.uniform1f(iTimeLoc, t)
      gl.uniform2f(iResLoc, canvas.width, canvas.height)
      gl.uniform1f(speedLoc, speed)
      gl.uniform1f(heightLoc, flightHeight)
      gl.uniform1f(crtLoc, crtEffect ? 1.0 : 0.0)
      gl.uniform1f(depthLoc, terrainDepth)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [speed, flightHeight, crtEffect, terrainDepth])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity,
        pointerEvents: 'none',
      }}
    />
  )
}

export default SynthwaveCanyonShader