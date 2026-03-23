'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ZONES, Zone } from '../data/zoneData';

/* ─── Tooltip Panel ─────────────────────────────────────────────────────── */

interface TooltipProps {
  zone: Zone;
  visible: boolean;
  anchorX: number; // 0–100% of chip container
  anchorY: number;
  containerWidth: number;
}

function Tooltip({ zone, visible, anchorX, anchorY, containerWidth }: TooltipProps) {
  // Smart placement: flip left if zone is in right 40% of viewport
  const flipLeft = anchorX > 60;
  const leftPx = flipLeft
    ? `calc(${anchorX}% - 320px)`
    : `calc(${anchorX}% + 16px)`;
  const topPx = `calc(${anchorY}% - 80px)`;

  return (
    <div
      role="tooltip"
      className={`chip-tooltip ${visible ? 'chip-tooltip--visible' : ''}`}
      style={{
        left: leftPx,
        top: topPx,
        '--zone-color': zone.color,
        '--zone-glow': zone.glowColor,
      } as React.CSSProperties}
    >
      {/* Animated border top+left draw */}
      <span className="chip-tooltip__border-h" />
      <span className="chip-tooltip__border-v" />

      <div className="chip-tooltip__inner">
        <p className="chip-tooltip__tag" style={{ color: '#00E5FF' }}>{zone.tag}</p>
        <h3 className="chip-tooltip__name">{zone.name}</h3>
        <div className="chip-tooltip__divider" style={{ borderColor: `${zone.color}4D` }} />
        <p className="chip-tooltip__desc">{zone.description}</p>
        <div className="chip-tooltip__specs">
          {zone.specs.map((s) => (
            <div key={s.key} className="chip-tooltip__spec-row">
              <span className="chip-tooltip__spec-key">{s.key}</span>
              <span className="chip-tooltip__spec-val">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Chip SVG ───────────────────────────────────────────────────────────── */

function ChipSVG({ activeZone }: { activeZone: string | null }) {
  const traceLines = [
    // Horizontal
    { x1: 5, y1: 17, x2: 95, y2: 17 },
    { x1: 5, y1: 52, x2: 95, y2: 52 },
    { x1: 5, y1: 80, x2: 95, y2: 80 },
    // Vertical
    { x1: 40, y1: 5, x2: 40, y2: 95 },
    { x1: 68, y1: 5, x2: 68, y2: 95 },
    // Diagonal hints
    { x1: 20, y1: 5, x2: 5, y2: 20 },
    { x1: 80, y1: 5, x2: 95, y2: 20 },
    { x1: 5, y1: 80, x2: 20, y2: 95 },
    { x1: 80, y1: 95, x2: 95, y2: 80 },
  ];

  // Bond wire dots around the edge
  const bondWires = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const rx = 48, ry = 47;
    return {
      cx: 50 + Math.cos(angle) * rx,
      cy: 50 + Math.sin(angle) * ry,
    };
  });

  // Capacitor dots grid (small squares at intersections)
  const caps = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 5; c++) {
      caps.push({ cx: 14 + c * 4, cy: 26 + r * 5 });
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className="chip-svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow-blue">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-cyan">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="die-grad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1C2438" />
          <stop offset="100%" stopColor="#0D0F14" />
        </radialGradient>
        <radialGradient id="ihs-grad" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#A0AEC0" />
          <stop offset="100%" stopColor="#4A5568" />
        </radialGradient>
        <linearGradient id="trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0A84FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#0A84FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
        </linearGradient>
        <clipPath id="chip-clip">
          <rect x="3" y="3" width="94" height="94" rx="3" />
        </clipPath>
      </defs>

      {/* IHS (outer metallic surround) */}
      <rect x="1" y="1" width="98" height="98" rx="4" fill="url(#ihs-grad)" stroke="#6B7A99" strokeWidth="0.5" />

      {/* PCB / Die substrate */}
      <rect x="4" y="4" width="92" height="92" rx="2" fill="#111827" />

      {/* Main die surface */}
      <rect x="8" y="8" width="84" height="84" rx="1.5" fill="url(#die-grad)" />

      {/* Trace grid */}
      {traceLines.map((l, i) => (
        <line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#0A84FF"
          strokeWidth="0.15"
          strokeOpacity="0.25"
          clipPath="url(#chip-clip)"
        />
      ))}

      {/* Animated trace overlay on memory bus */}
      <line
        x1="72" y1="20" x2="72" y2="80"
        stroke="url(#trace-grad)"
        strokeWidth="0.4"
        opacity={activeZone === 'memory_bus' ? 1 : 0}
        style={{ transition: 'opacity 0.3s' }}
        clipPath="url(#chip-clip)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 -20; 0 20"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </line>

      {/* Capacitor dots */}
      {caps.map((c, i) => (
        <rect
          key={i}
          x={c.cx - 0.6}
          y={c.cy - 0.6}
          width="1.2"
          height="1.2"
          fill="#2D3748"
          stroke="#4A5568"
          strokeWidth="0.15"
        />
      ))}

      {/* Bond wire dots */}
      {bondWires.map((w, i) => (
        <circle
          key={i}
          cx={w.cx}
          cy={w.cy}
          r="0.8"
          fill="#8A9AB5"
          strokeWidth="0"
        />
      ))}

      {/* Zone blocks */}
      {ZONES.filter(z => z.id !== 'thermal_zone').map((zone) => {
        const isActive = activeZone === zone.id;
        return (
          <g key={zone.id}>
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.w}
              height={zone.h}
              rx="1"
              fill={zone.color}
              fillOpacity={isActive ? 0.18 : 0.07}
              stroke={zone.color}
              strokeWidth={isActive ? 0.6 : 0.3}
              strokeOpacity={isActive ? 1 : 0.4}
              style={{ transition: 'all 0.25s ease' }}
              filter={isActive ? 'url(#glow-blue)' : undefined}
            />
            {/* Zone label in SVG */}
            <text
              x={zone.x + zone.w / 2}
              y={zone.y + zone.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="2.8"
              fill={zone.color}
              fillOpacity={isActive ? 1 : 0.5}
              fontFamily="monospace"
              style={{ transition: 'fill-opacity 0.25s', userSelect: 'none' }}
            >
              {zone.tag.split(' ').map((word, wi) => (
                <tspan key={wi} x={zone.x + zone.w / 2} dy={wi === 0 ? '-0.5em' : '1.1em'}>
                  {word}
                </tspan>
              ))}
            </text>
            {/* Pulse ring on CPU */}
            {isActive && zone.animationType === 'pulse' && (
              <circle
                cx={zone.x + zone.w / 2}
                cy={zone.y + zone.h / 2}
                r="10"
                fill="none"
                stroke={zone.color}
                strokeWidth="0.5"
                className="chip-pulse-ring"
              />
            )}
            {/* Concentric rings on Cache */}
            {isActive && zone.animationType === 'rings' && [8, 14, 20].map((r, ri) => (
              <circle
                key={ri}
                cx={zone.x + zone.w / 2}
                cy={zone.y + zone.h / 2}
                r={r / 2}
                fill="none"
                stroke={zone.color}
                strokeWidth="0.4"
                strokeOpacity="0.7"
                className="chip-ring"
                style={{ animationDelay: `${ri * 0.12}s` }}
              />
            ))}
            {/* Rays on I/O */}
            {isActive && zone.animationType === 'rays' && [0, 60, 120, 180, 240, 300].map((deg, ri) => {
              const cx2 = zone.x + zone.w / 2;
              const cy2 = zone.y + zone.h / 2;
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={ri}
                  x1={cx2} y1={cy2}
                  x2={cx2 + Math.cos(rad) * 8}
                  y2={cy2 + Math.sin(rad) * 4}
                  stroke={zone.color}
                  strokeWidth="0.4"
                  strokeOpacity="0.8"
                  className="chip-ray"
                  style={{ animationDelay: `${ri * 0.05}s` }}
                />
              );
            })}
            {/* Particle network on Neural */}
            {isActive && zone.animationType === 'particles' && Array.from({ length: 6 }).map((_, pi) => {
              const nx = zone.x + 3 + Math.random() * (zone.w - 6);
              const ny = zone.y + 3 + Math.random() * (zone.h - 6);
              return (
                <circle
                  key={pi}
                  cx={zone.x + 4 + (pi % 3) * 7}
                  cy={zone.y + 5 + Math.floor(pi / 3) * 8}
                  r="0.8"
                  fill={zone.color}
                  className="chip-particle"
                  style={{ animationDelay: `${pi * 0.15}s` }}
                />
              );
            })}
          </g>
        );
      })}

      {/* Scan line overlay for GPU */}
      {activeZone === 'gpu_block' && (
        <rect
          x={ZONES[1].x}
          y={ZONES[1].y}
          width={ZONES[1].w}
          height="1.5"
          fill="#00E5FF"
          fillOpacity="0.6"
          className="chip-scanline"
        />
      )}

      {/* Arc flicker for Power */}
      {activeZone === 'power_delivery' && (
        <rect
          x={ZONES[4].x}
          y={ZONES[4].y}
          width={ZONES[4].w}
          height={ZONES[4].h}
          rx="1"
          fill="#FFB800"
          fillOpacity="0.12"
          className="chip-arc"
        />
      )}

      {/* Heatmap radial for Thermal Zone (outer ring highlight) */}
      {activeZone === 'thermal_zone' && (
        <rect
          x="2" y="2" width="96" height="96" rx="3.5"
          fill="none"
          stroke="#FF6B35"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          className="chip-heatmap-border"
        />
      )}

      {/* Corner notch marks */}
      {[[5,5],[95,5],[5,95],[95,95]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.5" fill="#2D3748" stroke="#4A5568" strokeWidth="0.3" />
      ))}

      {/* Center cross hair (die registration mark) */}
      <line x1="49" y1="48" x2="51" y2="48" stroke="#00E5FF" strokeWidth="0.2" strokeOpacity="0.4" />
      <line x1="50" y1="47" x2="50" y2="49" stroke="#00E5FF" strokeWidth="0.2" strokeOpacity="0.4" />
      <circle cx="50" cy="48" r="0.5" fill="none" stroke="#00E5FF" strokeWidth="0.2" strokeOpacity="0.4" />
    </svg>
  );
}

/* ─── Hotspot Overlay ────────────────────────────────────────────────────── */

interface HotspotOverlayProps {
  activeZone: string | null;
  onEnter: (id: string, ax: number, ay: number) => void;
  onLeave: () => void;
}

function HotspotOverlay({ activeZone, onEnter, onLeave }: HotspotOverlayProps) {
  const handleEnter = useCallback(
    (zone: Zone, e: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) => {
      const rect = (e.currentTarget.closest('.chip-wrapper') as HTMLElement)?.getBoundingClientRect();
      const target = e.currentTarget.getBoundingClientRect();
      const ax = zone.x + zone.w / 2;
      const ay = zone.y + zone.h / 2;
      onEnter(zone.id, ax, ay);
    },
    [onEnter],
  );

  return (
    <div className="chip-hotspot-layer" aria-label="Interactive chip zones">
      {ZONES.map((zone) => (
        <div
          key={zone.id}
          tabIndex={0}
          role="button"
          aria-label={`${zone.name} — hover to learn more`}
          aria-pressed={activeZone === zone.id}
          className={`chip-hotspot ${activeZone === zone.id ? 'chip-hotspot--active' : ''}`}
          style={{
            left: `${zone.x}%`,
            top: `${zone.y}%`,
            width: `${zone.w}%`,
            height: `${zone.h}%`,
            '--zone-color': zone.color,
          } as React.CSSProperties}
          onMouseEnter={(e) => handleEnter(zone, e)}
          onMouseLeave={onLeave}
          onFocus={(e) => handleEnter(zone, e)}
          onBlur={onLeave}
        />
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function ChipHero() {
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);
  const [tooltipAnchor, setTooltipAnchor] = useState({ x: 50, y: 50 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  const activeZone = ZONES.find((z) => z.id === activeZoneId) ?? null;

  const handleEnter = useCallback((id: string, ax: number, ay: number) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setActiveZoneId(id);
    setTooltipAnchor({ x: ax, y: ay });
    setTooltipVisible(true);
  }, []);

  const handleLeave = useCallback(() => {
    setTooltipVisible(false);
    hideTimer.current = setTimeout(() => setActiveZoneId(null), 180);
  }, []);

  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  return (
    <section
      className="chip-hero"
      aria-label="Interactive computer chip diagram. Use Tab to navigate zones."
    >
      {/* Background particles */}
      <div className="chip-hero__bg" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="chip-hero__particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Scan line overlay */}
      <div className="chip-hero__scanlines" aria-hidden="true" />

      <div className="chip-hero__inner">
        {/* Left: Headline */}
        <div className="chip-hero__text">
          <p className="chip-hero__eyebrow">SILICON ARCHITECTURE</p>
          <h1 className="chip-hero__title">
            Inside the<br />
            <span className="chip-hero__title-accent">Machine</span>
          </h1>
          <p className="chip-hero__subtitle">
            Hover over each zone of this processor to explore its components — from the CPU core to the neural engine.
          </p>
          <div className="chip-hero__legend">
            {ZONES.slice(0, 4).map((z) => (
              <div
                key={z.id}
                className={`chip-hero__legend-item ${activeZoneId === z.id ? 'chip-hero__legend-item--active' : ''}`}
                style={{ '--zone-color': z.color } as React.CSSProperties}
              >
                <span className="chip-hero__legend-dot" />
                <span>{z.tag}</span>
              </div>
            ))}
          </div>
          <div className="chip-hero__ctas">
            <Link href="/shop" className="chip-hero__cta chip-hero__cta--primary">
              Explore Products
            </Link>
            <Link href="/subscriptions" className="chip-hero__cta chip-hero__cta--secondary">
              View Plans
            </Link>
          </div>
        </div>

        {/* Right: Chip */}
        <div className="chip-hero__chip-wrap" ref={chipRef}>
          <div className="chip-wrapper" style={{ position: 'relative' }}>
            <ChipSVG activeZone={activeZoneId} />
            <HotspotOverlay
              activeZone={activeZoneId}
              onEnter={handleEnter}
              onLeave={handleLeave}
            />
            {activeZone && (
              <Tooltip
                zone={activeZone}
                visible={tooltipVisible}
                anchorX={tooltipAnchor.x}
                anchorY={tooltipAnchor.y}
                containerWidth={chipRef.current?.offsetWidth ?? 400}
              />
            )}
          </div>

          {/* Zone hint bar */}
          <div className="chip-hero__zone-bar">
            {activeZone ? (
              <p className="chip-hero__zone-active-hint">
                <span style={{ color: activeZone.color }}>■</span>{' '}
                {activeZone.name}
              </p>
            ) : (
              <p className="chip-hero__zone-idle-hint">Hover over a chip zone to explore</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
