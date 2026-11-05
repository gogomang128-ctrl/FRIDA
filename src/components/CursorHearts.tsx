import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";

interface TrailHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  gold: boolean;
}

export default function CursorHearts() {
  const [hearts, setHearts] = useState<TrailHeart[]>([]);
  const lastRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastRef.current < 90) return;
      lastRef.current = now;
      const id = ++idRef.current;
      const heart: TrailHeart = {
        id,
        x: e.clientX,
        y: e.clientY,
        size: 10 + Math.random() * 10,
        gold: Math.random() < 0.3,
      };
      setHearts((prev) => [...prev.slice(-14), heart]);
      window.setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1150);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block" aria-hidden>
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="cursor-heart absolute"
          style={{ left: h.x, top: h.y, width: h.size, height: h.size }}
          strokeWidth={0}
          fill={h.gold ? "#f7c97f" : "#ff8fa3"}
        />
      ))}
    </div>
  );
}
