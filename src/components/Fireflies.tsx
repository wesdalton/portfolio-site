'use client';

import { useEffect, useRef } from 'react';

// Pulse-coupled oscillators (Mirollo–Strogatz): each firefly's clock runs on its own,
// and a neighbor's flash, arriving after a distance-proportional delay, pushes it forward.
// Without that delay the whole field locks in one frame; with it, ripples form and spread.
// Constants were tuned offline so coherence builds over ~6 s at desktop and phone sizes.
const PERIOD = 2.4;
const COUPLING = 0.15;
const REFRACTORY = 0.15;
const SIGNAL_SPEED = 450;
const SCRAMBLE_EVERY = 14;

type Fly = { x: number; y: number; phase: number; rate: number; glow: number; neighbors: [number, number][] };
type Pulse = { to: number; at: number };

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sprite(color: string, size: number) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, color);
  grad.addColorStop(0.12, color);
  grad.addColorStop(0.35, color + '55');
  grad.addColorStop(1, color + '00');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export default function Fireflies() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dark = window.matchMedia('(prefers-color-scheme: dark)');

    let flies: Fly[] = [];
    let pulses: Pulse[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let clock = 0;
    let nextScramble = SCRAMBLE_EVERY;
    let visible = true;
    let dot = '';
    let glowSprite: HTMLCanvasElement | null = null;
    const random = rng(7);

    const palette = () => {
      const css = getComputedStyle(document.documentElement);
      dot = css.getPropertyValue('--muted').trim() || '#6b706b';
      const glow = css.getPropertyValue('--glow').trim() || '#2f8f62';
      glowSprite = sprite(glow.length === 7 ? glow : '#2f8f62', 64);
    };

    const layout = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const seeded = rng(42);
      const target = Math.round(Math.min(96, Math.max(44, (width * height) / 1100)));
      const cols = Math.max(4, Math.round(Math.sqrt((target * width) / height)));
      const rows = Math.max(2, Math.round(target / cols));
      // Keep glows clear of the canvas edge so they are never clipped.
      const inset = 14;
      const cw = (width - 2 * inset) / cols;
      const ch = (height - 2 * inset) / rows;
      flies = [];
      pulses = [];
      clock = 0;
      nextScramble = SCRAMBLE_EVERY;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          flies.push({
            x: inset + (c + 0.15 + seeded() * 0.7) * cw,
            y: inset + (r + 0.15 + seeded() * 0.7) * ch,
            phase: seeded(),
            rate: 1 / (PERIOD * (0.94 + seeded() * 0.12)),
            glow: 0,
            neighbors: [],
          });
        }
      }
      const reach = Math.max(cw, ch) * 1.9;
      flies.forEach((a, i) => {
        flies.forEach((b, j) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (i !== j && d < reach) a.neighbors.push([j, d / SIGNAL_SPEED]);
        });
      });
    };

    const scramble = () => {
      const cx = random() * width;
      const cy = random() * height;
      const radius = Math.max(width, height) * (0.18 + random() * 0.14);
      for (const f of flies) if (Math.hypot(f.x - cx, f.y - cy) < radius) f.phase = random();
    };

    const step = (dt: number) => {
      clock += dt;
      for (const f of flies) {
        f.phase += f.rate * dt;
        f.glow *= Math.exp(-dt / 0.35);
      }
      if (pulses.length) {
        const waiting: Pulse[] = [];
        for (const p of pulses) {
          if (p.at > clock) {
            waiting.push(p);
            continue;
          }
          const n = flies[p.to];
          if (n.phase >= REFRACTORY) n.phase = Math.min(1, n.phase + COUPLING * n.phase);
        }
        pulses = waiting;
      }
      for (const f of flies) {
        if (f.phase < 1) continue;
        f.phase = 0;
        f.glow = 1;
        for (const [j, delay] of f.neighbors) pulses.push({ to: j, at: clock + delay });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dot;
      ctx.globalAlpha = dark.matches ? 0.5 : 0.38;
      ctx.beginPath();
      for (const f of flies) {
        ctx.moveTo(f.x + 1.3, f.y);
        ctx.arc(f.x, f.y, 1.3, 0, Math.PI * 2);
      }
      ctx.fill();
      if (!glowSprite) return;
      for (const f of flies) {
        if (f.glow < 0.02) continue;
        ctx.globalAlpha = Math.min(1, f.glow * 1.15);
        const s = 12 + 26 * f.glow;
        ctx.drawImage(glowSprite, f.x - s / 2, f.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      if (clock > nextScramble) {
        scramble();
        nextScramble = clock + SCRAMBLE_EVERY * (0.8 + random() * 0.4);
      }
      step(dt);
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (still.matches) {
        // A single representative frame: let ripples form, then freeze mid-flash.
        for (let t = 0; t < 8; t += 1 / 60) step(1 / 60);
        while (!flies.some((f) => f.glow > 0.6)) step(1 / 60);
        draw();
        return;
      }
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };

    palette();
    layout();
    start();

    const resize = new ResizeObserver(() => {
      layout();
      if (still.matches) start();
    });
    resize.observe(canvas);
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    seen.observe(canvas);
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(frame) : start());
    const onScheme = () => {
      palette();
      if (still.matches) draw();
    };
    document.addEventListener('visibilitychange', onVisibility);
    dark.addEventListener('change', onScheme);
    still.addEventListener('change', start);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      dark.removeEventListener('change', onScheme);
      still.removeEventListener('change', start);
    };
  }, []);

  return <canvas ref={ref} className="fireflies" aria-hidden="true" />;
}
