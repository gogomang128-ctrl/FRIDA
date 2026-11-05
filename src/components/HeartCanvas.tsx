import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
}

interface HeartP {
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  phase: number;
  alpha: number;
  hue: number;
  rot: number;
  rotSpeed: number;
}

interface Burst {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
  isHeart: boolean;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

function drawHeartShape(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rot: number,
  color: string,
  alpha: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.scale(size, size);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0.35);
  ctx.bezierCurveTo(-0.55, -0.15, -0.4, -0.75, 0, -0.42);
  ctx.bezierCurveTo(0.4, -0.75, 0.55, -0.15, 0, 0.35);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function HeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let stars: Star[] = [];
    let hearts: HeartP[] = [];
    let bursts: Burst[] = [];
    let comets: Comet[] = [];
    let time = 0;
    let nextComet = 200;

    // two lovers — glowing souls chasing each other
    const soulA = { x: 0, y: 0, angle: 0 };
    const soulB = { x: 0, y: 0 };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: Math.min(170, Math.floor(w / 8)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.04,
      }));

      const heartCount = Math.min(26, Math.floor(w / 60));
      hearts = Array.from({ length: heartCount }, () => spawnHeart(true));

      soulA.x = w * 0.5;
      soulA.y = h * 0.5;
      soulB.x = w * 0.5 + 60;
      soulB.y = h * 0.5;
    };

    const spawnHeart = (anywhere = false): HeartP => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 40,
      size: 6 + Math.random() * 13,
      speed: 0.25 + Math.random() * 0.65,
      sway: 20 + Math.random() * 45,
      swaySpeed: 0.004 + Math.random() * 0.008,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.08 + Math.random() * 0.3,
      hue: Math.random() < 0.75 ? 345 + Math.random() * 12 : 36,
      rot: (Math.random() - 0.5) * 0.6,
      rotSpeed: (Math.random() - 0.5) * 0.004,
    });

    const clickBurst = (cx: number, cy: number) => {
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2 + Math.random() * 0.5;
        const sp = 1.4 + Math.random() * 3.2;
        bursts.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 0.8,
          size: 4 + Math.random() * 9,
          life: 0,
          maxLife: 50 + Math.random() * 40,
          hue: Math.random() < 0.7 ? 345 + Math.random() * 15 : 42,
          isHeart: Math.random() < 0.65,
        });
      }
    };

    const onPointer = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-no-burst]")) return;
      clickBurst(e.clientX, e.clientY);
    };

    const onShower = () => {
      for (let i = 0; i < 14; i++) {
        window.setTimeout(() => {
          clickBurst(w * (0.12 + Math.random() * 0.76), h * (0.08 + Math.random() * 0.5));
        }, i * 110);
      }
      for (let i = 0; i < 12; i++) {
        hearts.push(spawnHeart());
      }
      if (hearts.length > 60) hearts.splice(0, hearts.length - 60);
    };

    const loop = () => {
      time++;
      // deep romantic sky
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#0a0312");
      grad.addColorStop(0.45, "#160826");
      grad.addColorStop(0.8, "#1d0716");
      grad.addColorStop(1, "#0a0310");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // nebula glows
      const glow1 = ctx.createRadialGradient(w * 0.82, h * 0.16, 0, w * 0.82, h * 0.16, w * 0.5);
      glow1.addColorStop(0, "rgba(120, 40, 90, 0.16)");
      glow1.addColorStop(1, "transparent");
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, w, h);

      const glow2 = ctx.createRadialGradient(w * 0.12, h * 0.85, 0, w * 0.12, h * 0.85, w * 0.45);
      glow2.addColorStop(0, "rgba(255, 77, 109, 0.1)");
      glow2.addColorStop(1, "transparent");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        s.phase += s.speed;
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.phase));
        ctx.globalAlpha = tw * 0.9;
        ctx.fillStyle = "#ffe9ec";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // shooting stars
      if (time > nextComet) {
        const fromLeft = Math.random() < 0.5;
        comets.push({
          x: fromLeft ? -40 : w + 40,
          y: Math.random() * h * 0.4,
          vx: (fromLeft ? 1 : -1) * (5 + Math.random() * 4),
          vy: 2 + Math.random() * 2,
          life: 0,
        });
        nextComet = time + 380 + Math.random() * 500;
      }
      comets = comets.filter((c) => c.life < 90);
      for (const c of comets) {
        c.life++;
        c.x += c.vx;
        c.y += c.vy;
        const fade = 1 - c.life / 90;
        const tail = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * 9, c.y - c.vy * 9);
        tail.addColorStop(0, `rgba(255, 227, 179, ${0.85 * fade})`);
        tail.addColorStop(1, "transparent");
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.vx * 9, c.y - c.vy * 9);
        ctx.stroke();
      }

      // floating hearts
      for (let i = 0; i < hearts.length; i++) {
        const ht = hearts[i];
        ht.phase += ht.swaySpeed * 60 * 0.016;
        ht.y -= ht.speed;
        ht.rot += ht.rotSpeed;
        const sx = ht.x + Math.sin(ht.phase) * ht.sway * 0.35;
        const a = ht.alpha * (ht.y < 120 ? Math.max(ht.y / 120, 0) : 1);
        drawHeartShape(ctx, sx, ht.y, ht.size, ht.rot, `hsl(${ht.hue} 90% 68%)`, a);
        if (ht.y < -50) hearts[i] = spawnHeart();
      }

      // two souls in love — A wanders, B chases A tenderly
      soulA.angle += 0.006;
      const tx = w * 0.5 + Math.cos(soulA.angle) * w * 0.33 + Math.sin(soulA.angle * 2.3) * 50;
      const ty = h * 0.42 + Math.sin(soulA.angle * 1.4) * h * 0.28;
      soulA.x += (tx - soulA.x) * 0.01;
      soulA.y += (ty - soulA.y) * 0.01;
      soulB.x += (soulA.x - soulB.x) * 0.016;
      soulB.y += (soulA.y - soulB.y) * 0.016;

      const drawSoul = (x: number, y: number, color: string, core: string) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, 46);
        g.addColorStop(0, color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 46, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      };
      // connection thread between the two souls
      const thread = ctx.createLinearGradient(soulA.x, soulA.y, soulB.x, soulB.y);
      thread.addColorStop(0, "rgba(255,143,163,0.28)");
      thread.addColorStop(1, "rgba(247,201,127,0.28)");
      ctx.strokeStyle = thread;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 7]);
      ctx.beginPath();
      ctx.moveTo(soulA.x, soulA.y);
      ctx.lineTo(soulB.x, soulB.y);
      ctx.stroke();
      ctx.setLineDash([]);

      drawSoul(soulA.x, soulA.y, "rgba(255, 77, 109, 0.22)", "rgba(255,143,163,0.9)");
      drawSoul(soulB.x, soulB.y, "rgba(247, 201, 127, 0.2)", "rgba(255,227,179,0.9)");
      drawHeartShape(
        ctx,
        (soulA.x + soulB.x) / 2,
        (soulA.y + soulB.y) / 2 - 4,
        6,
        0,
        "#ff8fa3",
        0.5 + 0.3 * Math.sin(time * 0.05)
      );

      // click bursts
      bursts = bursts.filter((b) => b.life < b.maxLife);
      for (const b of bursts) {
        b.life++;
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.045;
        b.vx *= 0.985;
        const p = 1 - b.life / b.maxLife;
        if (b.isHeart) {
          drawHeartShape(ctx, b.x, b.y, b.size * p + 2, b.vx * 0.06, `hsl(${b.hue} 92% 70%)`, p);
        } else {
          ctx.globalAlpha = p;
          ctx.fillStyle = `hsl(${b.hue} 95% 78%)`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, 2.2 * p + 0.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      raf = requestAnimationFrame(loop);
    };

    resize();
    loop();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("farida:shower", onShower);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("farida:shower", onShower);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 -z-20" aria-hidden="true" />
      <div className="vignette fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />
    </>
  );
}
