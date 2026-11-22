import React, { useState, useEffect } from 'react';
import { useTheme } from './design/theme/ThemeProvider';
import { RouteNetwork } from './design/background/RouteNetwork';
import { Button, Card, StatusPill } from './design/components/ui';

export const App: React.FC = () => {
  const { theme, toggleTheme, calmMode, toggleCalmMode } = useTheme();
  const uptime = '99.98%';
  const [lastDeployed, setLastDeployed] = useState('Just now');

  useEffect(() => {
    setLastDeployed(new Date().toLocaleTimeString());
  }, []);

  return (
    <div className="relative min-h-screen text-text selection:bg-action selection:text-on-action flex flex-col font-body">
      {/* Background Graphic */}
      <RouteNetwork />

      {/* Header Bar */}
      <header className="sticky top-0 z-sticky backdrop-blur-md bg-raised/80 border-b border-border/60 px-space-4 md:px-space-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="font-display font-bold text-xl md:text-2xl tracking-wide uppercase">
            DevOps <span className="text-text-3 font-normal text-sm lowercase font-body">CI/CD Showcase</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={toggleCalmMode}
            title="Toggle Reduced Motion & Ambient Animation"
          >
            Motion: {calmMode ? 'Calm' : 'Active'}
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={toggleTheme}
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-space-4 md:px-space-8 py-10 space-y-8 z-base">
        <div className="text-center space-y-3 py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-border bg-raised/60 backdrop-blur-sm text-text-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Self-Hosted Runner · Ubuntu Linux · Nginx
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight">
            Automated CI/CD Deployment Pipeline
          </h2>
          <p className="text-text-2 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Continuous Integration &amp; Continuous Delivery workflow running on a self-hosted Linux runner. Code changes pushed to GitHub are automatically pulled, built, and served live via Nginx.
          </p>
        </div>

        {/* System Architecture & Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 border-border/80 bg-raised/70 backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-mono text-text-3 font-semibold">Runner Status</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Ubuntu Linux</span>
                <StatusPill status="on-time" label="Active" />
              </div>
              <p className="text-xs text-text-3">Dedicated self-hosted runner handling automated builds and service reloads.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50 text-xs font-mono text-text-2 flex justify-between">
              <span>Environment</span>
              <span className="font-semibold text-text">On-Premises / VM</span>
            </div>
          </Card>

          <Card className="p-5 border-border/80 bg-raised/70 backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-mono text-text-3 font-semibold">Web Server</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Nginx Server</span>
                <StatusPill status="live" label="Serving" />
              </div>
              <p className="text-xs text-text-3">Static assets served with high performance reverse-proxy architecture.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50 text-xs font-mono text-text-2 flex justify-between">
              <span>Uptime</span>
              <span className="font-semibold text-emerald-400">{uptime}</span>
            </div>
          </Card>

          <Card className="p-5 border-border/80 bg-raised/70 backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-mono text-text-3 font-semibold">GitHub Actions</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Workflow State</span>
                <StatusPill status="on-time" label="Passing" />
              </div>
              <p className="text-xs text-text-3">Triggered automatically on push to branch <code className="text-action">main</code>.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50 text-xs font-mono text-text-2 flex justify-between">
              <span>Last Run</span>
              <span className="font-semibold text-text">{lastDeployed}</span>
            </div>
          </Card>
        </div>

        {/* Deployment Pipeline Step Visualization */}
        <Card className="p-6 border-border/80 bg-raised/70 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div>
              <h3 className="text-base font-semibold">Workflow Execution Pipeline</h3>
              <p className="text-xs text-text-3 font-mono">.github/workflows/frontend.yml</p>
            </div>
            <span className="text-xs font-mono bg-action/10 text-action px-2.5 py-1 rounded border border-action/20">
              Trigger: push [main]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
            <div className="p-3 rounded-lg border border-border bg-base/50 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-text-3">Step 1</span>
              </div>
              <p className="font-semibold text-xs">Pull Latest Code</p>
              <p className="font-mono text-[11px] text-text-3">git pull origin main</p>
            </div>

            <div className="p-3 rounded-lg border border-border bg-base/50 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-text-3">Step 2</span>
              </div>
              <p className="font-semibold text-xs">Dependencies</p>
              <p className="font-mono text-[11px] text-text-3">npm ci --silent</p>
            </div>

            <div className="p-3 rounded-lg border border-border bg-base/50 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-text-3">Step 3</span>
              </div>
              <p className="font-semibold text-xs">Production Build</p>
              <p className="font-mono text-[11px] text-text-3">npm run build</p>
            </div>

            <div className="p-3 rounded-lg border border-border bg-base/50 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-text-3">Step 4</span>
              </div>
              <p className="font-semibold text-xs">Nginx Sync &amp; Reload</p>
              <p className="font-mono text-[11px] text-text-3">systemctl reload nginx</p>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="z-base border-t border-border/40 py-4 px-space-4 md:px-space-8 text-center text-xs text-text-3">
        DevOps Deployment Demonstration · Powered by GitHub Actions &amp; Self-Hosted Ubuntu Runner
      </footer>
    </div>
  );
};
