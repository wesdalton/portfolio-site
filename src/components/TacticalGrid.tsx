'use client';

import { useEffect, useRef } from 'react';

/**
 * Tactical grid — an interactive "command console" backdrop.
 * Faint blueprint grid lines + a dot at every intersection, sparse crosshair
 * nodes, and cursor magnetism that repels and lights up nearby nodes.
 * Pure <canvas>, no dependencies. Honors reduced-motion.
 */
export default function TacticalGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const SPACING = 40; // px between grid lines / dots
    const REPEL_RADIUS = 170; // cursor influence radius
    const A = '110, 168, 254'; // azure — matches theme accent

    let width = 0;
    let height = 0;
    type Dot = { x: number; y: number; cross: boolean };
    let dots: Dot[] = [];
    let cols = 0;
    let rows = 0;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    let raf = 0;

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cross = (r * 5 + c * 9) % 16 === 0; // sparse crosshair nodes
          dots.push({ x: c * SPACING, y: r * SPACING, cross });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      // 1) faint blueprint grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${A}, 0.05)`;
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const x = c * SPACING + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let r = 0; r < rows; r++) {
        const y = r * SPACING + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2) nodes
      for (const dot of dots) {
        let { x, y } = dot;
        let alpha = 0.22;
        let radius = dot.cross ? 0 : 1;

        if (pointer.active) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS) {
            const force = (1 - dist / REPEL_RADIUS) ** 2;
            const inv = dist === 0 ? 0 : 1 / dist;
            x += dx * inv * force * 9;
            y += dy * inv * force * 9;
            alpha += force * 0.9;
            radius += force * 1.6;
          }
        }

        alpha = Math.min(alpha, 0.95);

        if (dot.cross) {
          const s = 3 + radius;
          ctx.strokeStyle = `rgba(${A}, ${Math.min(alpha + 0.18, 1)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - s, y);
          ctx.lineTo(x + s, y);
          ctx.moveTo(x, y - s);
          ctx.lineTo(x, y + s);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${A}, ${alpha})`;
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduceMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (!pointer.active) {
        pointer.active = true;
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      if (reduceMotion) draw();
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.tx = -9999;
      pointer.ty = -9999;
      if (reduceMotion) draw();
    };
    const onResize = () => {
      build();
      if (reduceMotion) draw();
    };

    build();
    draw();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden [mask-image:radial-gradient(ellipse_85%_80%_at_50%_42%,#000_58%,transparent_100%)]"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
