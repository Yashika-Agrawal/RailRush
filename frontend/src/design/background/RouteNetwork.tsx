import React, { useEffect, useRef } from 'react';
import { useBackgroundMode } from './useBackgroundMode';

interface StationNode {
  id: number;
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
  name: string;
  isMajor: boolean;
}

interface RouteLine {
  from: number;
  to: number;
  // Waypoint for 45-degree angle rail turns
  midX?: number;
  midY?: number;
}

interface Train {
  lineIndex: number;
  progress: number; // 0 to 1
  speed: number;
  direction: 1 | -1;
  trail: { x: number; y: number; alpha: number }[];
}

export const RouteNetwork: React.FC<{ density?: 'default' | 'dense' }> = ({
  density = 'default',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mode = useBackgroundMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastDrawTime = 0;
    const frameInterval = 1000 / mode.maxFps; // strictly 30fps cap

    let width = (canvas.width = window.innerWidth * mode.dpr);
    let height = (canvas.height = window.innerHeight * mode.dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * mode.dpr;
      height = canvas.height = window.innerHeight * mode.dpr;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates (lens effect)
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      if (mode.isMobile) return; // no cursor lens on mobile
      mouseX = e.clientX * mode.dpr;
      mouseY = e.clientY * mode.dpr;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Parallax tracking
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Generate station nodes (laid out like an Indian Railways schematic trunk line)
    const nodeCount = mode.nodeCount;
    const nodes: StationNode[] = [];
    const stationNames = [
      'NDLS', 'CNB', 'PRYJ', 'DDU', 'PNBE', 'HWH',
      'CSMT', 'BSL', 'NGP', 'BPL', 'AGC', 'MAS',
      'SBC', 'HYB', 'GHY', 'ADI', 'JP', 'LKO'
    ];

    // Build schematic layout with straight runs & 45-degree alignments
    for (let i = 0; i < nodeCount; i++) {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const jitterX = ((i * 37) % 15 - 7) / 100;
      const jitterY = ((i * 53) % 15 - 7) / 100;
      
      nodes.push({
        id: i,
        x: Math.max(0.08, Math.min(0.92, 0.15 + col * 0.24 + jitterX)),
        y: Math.max(0.08, Math.min(0.92, 0.12 + row * 0.22 + jitterY)),
        name: stationNames[i] || `STN-${i + 1}`,
        isMajor: i % 3 === 0,
      });
    }

    // Connect nodes with railway tracks
    const lines: RouteLine[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      lines.push({ from: i, to: i + 1 });
      // Cross-connects for grid/network look
      if (i + 4 < nodes.length) {
        lines.push({ from: i, to: i + 4 });
      }
    }

    // Generate tiny trains
    const trainCount = mode.isReducedMotion ? 0 : mode.isMobile ? 2 : 4;
    const trains: Train[] = [];
    for (let i = 0; i < trainCount; i++) {
      trains.push({
        lineIndex: i % lines.length,
        progress: (i * 0.25) % 1,
        speed: 0.0015 + (i * 0.0005),
        direction: i % 2 === 0 ? 1 : -1,
        trail: [],
      });
    }

    // Render loop
    const render = (time: number) => {
      // Pause when not visible, off-screen, or paused
      if (!mode.isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = time - lastDrawTime;
      if (elapsed < frameInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastDrawTime = time - (elapsed % frameInterval);

      // Read design system CSS variables from DOM
      const styles = getComputedStyle(document.documentElement);
      const lineColor = styles.getPropertyValue('--bg-line').trim() || 'rgba(45, 185, 206, 0.12)';
      const nodeColor = styles.getPropertyValue('--bg-node').trim() || 'rgba(82, 202, 219, 0.35)';
      const trainColor = styles.getPropertyValue('--bg-train').trim() || 'rgba(241, 231, 207, 0.8)';
      const parallaxFactor = parseFloat(styles.getPropertyValue('--bg-parallax').trim() || '0.08');
      
      const opacity = density === 'dense' ? 0.6 : 1.0;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalAlpha = opacity;

      // 8% Scroll parallax shift
      const parallaxOffset = scrollY * parallaxFactor * mode.dpr;
      ctx.translate(0, -parallaxOffset % (height * 0.2));

      // 1. Draw rail route lines (1.5px with 45-degree bends)
      ctx.lineWidth = 1.5 * mode.dpr;

      lines.forEach((line) => {
        const p1 = nodes[line.from];
        const p2 = nodes[line.to];
        if (!p1 || !p2) return;

        const x1 = p1.x * width;
        const y1 = p1.y * height;
        const x2 = p2.x * width;
        const y2 = p2.y * height;

        // Cursor lens calculation (160px radius)
        let lineAlphaBoost = 0;
        if (!mode.isReducedMotion && !mode.isMobile) {
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const distToMouse = Math.hypot(midX - mouseX, midY - mouseY);
          if (distToMouse < 160 * mode.dpr) {
            lineAlphaBoost = (1 - distToMouse / (160 * mode.dpr)) * 0.25;
          }
        }

        ctx.strokeStyle = lineColor;
        if (lineAlphaBoost > 0) {
          ctx.strokeStyle = `rgba(82, 202, 219, ${0.15 + lineAlphaBoost})`;
        }

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        // Railway 45-degree routing bend
        const dx = x2 - x1;
        const dy = y2 - y1;
        if (Math.abs(dx) > Math.abs(dy)) {
          ctx.lineTo(x1 + (dx - dy), y1);
          ctx.lineTo(x2, y2);
        } else {
          ctx.lineTo(x1, y1 + (dy - dx));
          ctx.lineTo(x2, y2);
        }
        ctx.stroke();
      });

      // 2. Draw station nodes
      nodes.forEach((node) => {
        const nx = node.x * width;
        const ny = node.y * height;

        let nodeRadius = (node.isMajor ? 4.5 : 3) * mode.dpr;
        let isBrightened = false;

        if (!mode.isReducedMotion && !mode.isMobile) {
          const dist = Math.hypot(nx - mouseX, ny - mouseY);
          if (dist < 160 * mode.dpr) {
            nodeRadius += (1 - dist / (160 * mode.dpr)) * 2.5 * mode.dpr;
            isBrightened = true;
          }
        }

        ctx.fillStyle = isBrightened ? 'rgba(82, 202, 219, 0.8)' : nodeColor;
        ctx.beginPath();
        ctx.arc(nx, ny, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // White hollow center for key stations
        if (node.isMajor) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.arc(nx, ny, nodeRadius * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Draw tiny trains moving along lines with short fading trails
      if (!mode.isReducedMotion) {
        trains.forEach((train) => {
          const line = lines[train.lineIndex];
          if (!line) return;
          const p1 = nodes[line.from];
          const p2 = nodes[line.to];
          if (!p1 || !p2) return;

          train.progress += train.speed * train.direction;
          if (train.progress >= 1) {
            train.progress = 1;
            train.direction = -1;
          } else if (train.progress <= 0) {
            train.progress = 0;
            train.direction = 1;
          }

          const curX = (p1.x + (p2.x - p1.x) * train.progress) * width;
          const curY = (p1.y + (p2.y - p1.y) * train.progress) * height;

          train.trail.push({ x: curX, y: curY, alpha: 1 });
          if (train.trail.length > 8) train.trail.shift();

          // Render train trail
          train.trail.forEach((point) => {
            point.alpha *= 0.85;
            ctx.fillStyle = trainColor;
            ctx.globalAlpha = point.alpha * 0.45 * opacity;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2 * mode.dpr, 0, Math.PI * 2);
            ctx.fill();
          });

          // Train head (light node)
          ctx.globalAlpha = opacity;
          ctx.fillStyle = trainColor;
          ctx.beginPath();
          ctx.arc(curX, curY, 2.5 * mode.dpr, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.restore();

      // If reduced motion is requested, render just one static frame and stop loop
      if (mode.isReducedMotion) {
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mode, density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-background transition-opacity duration-base"
      style={{
        zIndex: 'var(--z-background, -1)',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};
