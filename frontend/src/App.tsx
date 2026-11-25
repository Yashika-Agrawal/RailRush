import React, { useState } from 'react';
import { useTheme } from './design/theme/ThemeProvider';
import { RouteNetwork } from './design/background/RouteNetwork';
import {
  Button,
  Card,
  Input,
  StatusPill,
  RouteTimeline,
} from './design/components/ui';

export const App: React.FC = () => {
  const { theme, toggleTheme, calmMode, toggleCalmMode } = useTheme();
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <div className="relative min-h-screen text-text selection:bg-action selection:text-on-action flex flex-col">
      {/* 2D Canvas Route Network Background mounted once at root */}
      <RouteNetwork />

      {/* Header Bar */}
      <header className="sticky top-0 z-sticky backdrop-blur-md bg-raised/80 border-b border-border/60 px-space-4 md:px-space-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-action animate-pulse" />
          <h1 className="font-display font-bold text-xl md:text-2xl tracking-wide uppercase">
            RailRush <span className="text-text-3 font-normal text-sm lowercase font-body">v1.1</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={toggleCalmMode}
            title="Toggle Reduced Motion & Ambient Animation"
          >
            Calm Mode: {calmMode ? 'ON' : 'OFF'}
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={toggleTheme}
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? 'Day Service (Light)' : 'Night Service (Dark)'}
          </Button>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 py-8 space-y-12">
        {/* Intro Banner */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-text-3 font-semibold">
              Live System Status
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-action animate-pulse" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Night-Service Timetable & Reservation System
          </h2>
          <p className="text-text-2 text-base max-w-2xl font-body">
            Strict token-driven architecture. Canvas 2D ambient network running at 30 FPS behind all screens, pausing during Calm Mode and hidden tabs.
          </p>
        </section>

        {/* Sleeper pattern tick divider */}
        <div className="tick-divider" />

        {/* Foundations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Component Primitives */}
          <Card className="space-y-6">
            <div className="border-b border-border/40 pb-3">
              <h3 className="font-display text-xl font-bold">Button & Action Hierarchy</h3>
              <p className="text-xs text-text-3">Signal is action, Lantern is reserved confirm</p>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Signal Primary</Button>
              <Button
                variant="primary"
                loading={btnLoading}
                onClick={() => {
                  setBtnLoading(true);
                  setTimeout(() => setBtnLoading(false), 2000);
                }}
              >
                Route Loader Test
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="lantern">Confirm (Lantern)</Button>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/40">
              <h4 className="text-sm font-semibold text-text-2">Status Indicators</h4>
              <div className="flex flex-wrap gap-2">
                <StatusPill status="live" label="Live Signal" />
                <StatusPill status="on-time" label="On Time" />
                <StatusPill status="delayed" label="Delayed 15m" />
                <StatusPill status="boarding" label="Boarding Plat. 4" />
                <StatusPill status="cancelled" label="Cancelled" />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/40">
              <h4 className="text-sm font-semibold text-text-2">Form Controls</h4>
              <Input
                label="Train Number or PNR"
                placeholder="e.g. 12951 or 2419823410"
                helperText="Plex Mono tabular font used for operational numbers"
                isDataMono
              />
            </div>
          </Card>

          {/* Timetable / Route Timeline Preview */}
          <Card className="space-y-6">
            <div className="border-b border-border/40 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold">
                  12951 · Rajdhani Express
                </h3>
                <p className="text-xs text-text-3 font-data">NDLS ➔ MMCT · TATKAL QUOTA</p>
              </div>
              <StatusPill status="live" label="TRACKING" />
            </div>

            <RouteTimeline
              stops={[
                { code: 'NDLS', name: 'New Delhi', time: '16:50', passed: true },
                { code: 'KOTA', name: 'Kota Junction', time: '21:30', passed: true, haltMinutes: 10 },
                { code: 'RTM', name: 'Ratlam Junction', time: '01:30', current: true, haltMinutes: 5 },
                { code: 'BRC', name: 'Vadodara Junction', time: '04:55', haltMinutes: 8 },
                { code: 'MMCT', name: 'Mumbai Central', time: '08:35' },
              ]}
            />
          </Card>
        </div>

        {/* Ticket Object Surface Motif */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold">Ticket Ivory Motif</h3>
            <span className="text-xs text-text-3 font-data">Surface Reserved for Boarding Objects</span>
          </div>

          <div className="bg-ticket text-ticket-ink rounded-md p-6 max-w-md shadow-float border border-black/10 relative overflow-hidden">
            <div className="flex justify-between items-start border-b border-black/15 pb-4">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase opacity-75">Boarding Pass</span>
                <div className="font-display font-bold text-2xl tracking-wide">NDLS ➔ MMCT</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold tracking-widest uppercase opacity-75">Train No.</span>
                <div className="font-data font-bold text-lg">12951</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 text-xs">
              <div>
                <span className="block opacity-60 uppercase text-[10px] font-semibold">Coach / Seat</span>
                <span className="font-data font-bold text-base">B2 · 34 (LB)</span>
              </div>
              <div>
                <span className="block opacity-60 uppercase text-[10px] font-semibold">Class</span>
                <span className="font-bold text-base">3A</span>
              </div>
              <div>
                <span className="block opacity-60 uppercase text-[10px] font-semibold">Fare</span>
                <span className="font-data font-bold text-base">₹2,485</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-4 px-6 text-center text-xs text-text-3 font-data">
        RailRush System Design Foundation · Night-Service Architecture Active
      </footer>
    </div>
  );
};
