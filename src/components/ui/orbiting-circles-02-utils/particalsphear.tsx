"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

const PARTICLE_COUNT = 120;
const RADIUS = 75;

export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    updateCanvasSize();

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = RADIUS;
      particles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.01,
        vy: (Math.random() - 0.5) * 0.01,
        vz: (Math.random() - 0.5) * 0.01,
      });
    }

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;

    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, RADIUS + 20);
      gradient.addColorStop(0, "rgba(147, 51, 234, 0.4)");
      gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.1)");
      gradient.addColorStop(1, "rgba(147, 51, 234, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, RADIUS + 20, 0, Math.PI * 2);
      ctx.fill();

      // Draw connecting lines
      ctx.strokeStyle = "rgba(147, 51, 234, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 50) {
            const opacity = 1 - dist / 50;
            ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(centerX + particles[i].x, centerY + particles[i].y);
            ctx.lineTo(centerX + particles[j].x, centerY + particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Rotate around Y axis
        const cosY = Math.cos(time * 0.3);
        const sinY = Math.sin(time * 0.3);
        const rotatedX = p.x * cosY - p.z * sinY;
        const rotatedZ = p.x * sinY + p.z * cosY;

        // Rotate around X axis
        const cosX = Math.cos(time * 0.2);
        const sinX = Math.sin(time * 0.2);
        const finalY = p.y * cosX - rotatedZ * sinX;
        const finalZ = p.y * sinX + rotatedZ * cosX;

        const scale = 1 + finalZ / RADIUS;
        const screenX = centerX + rotatedX;
        const screenY = centerY + finalY;
        const size = Math.max(0.5, scale * 2.5);

        // Particle glow
        const particleGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 3);
        particleGradient.addColorStop(0, "rgba(147, 51, 234, 0.8)");
        particleGradient.addColorStop(1, "rgba(147, 51, 234, 0)");
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#9333ea";
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
