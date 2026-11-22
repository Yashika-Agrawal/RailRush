import React from 'react';
import { useTheme } from './design/theme/ThemeProvider';
import { RouteNetwork } from './design/background/RouteNetwork';
import { Button, Card, StatusPill } from './design/components/ui';

export const App: React.FC = () => {
  const { theme, toggleTheme, calmMode, toggleCalmMode } = useTheme();

  const stages = [
    {
      step: '01',
      title: 'Git Sync',
      tag: 'Source',
      cmd: 'git pull origin main',
      detail: 'Pulls latest commit to self-hosted workspace',
    },
    {
      step: '02',
      title: 'Dependencies',
      tag: 'NPM',
      cmd: 'npm ci',
      detail: 'Installs dependencies strictly from lockfile',
    },
    {
      step: '03',
      title: 'Production Build',
      tag: 'Vite / React',
      cmd: 'npm run build',
      detail: 'Compiles TypeScript & bundles production assets',
    },
    {
      step: '04',
      title: 'Nginx Deploy',
      tag: 'Nginx / Linux',
      cmd: 'sudo systemctl reload nginx',
      detail: 'Copies build to /var/www/railrush/ & triggers Nginx reload',
    },
  ];

  const specs = [
    { label: 'Host System', val: 'Ubuntu Linux', sub: 'Dedicated machine' },
    { label: 'Runner Type', val: 'Self-Hosted', sub: 'GitHub Actions runner' },
    { label: 'Trigger Event', val: 'push [main]', sub: 'Push trigger' },
    { label: 'Web Server', val: 'Nginx', sub: 'Reverse proxy & static host' },
  ];

  return (
    <div className="relative h-screen max-h-screen overflow-hidden text-text selection:bg-action selection:text-on-action flex flex-col font-body">
      {/* Dynamic 2D Canvas Background */}
      <RouteNetwork />

      {/* Compact Header Bar */}
      <header className="shrink-0 z-sticky backdrop-blur-md bg-raised/85 border-b border-border/60 px-4 md:px-8 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="font-display font-bold text-base md:text-lg tracking-wide uppercase">
            DevOps <span className="text-text-3 font-normal text-xs lowercase font-body">CI/CD Pipeline</span>
          </h1>
          <span className="hidden sm:inline-block text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            Self-Hosted Runner
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={toggleCalmMode}
            title="Toggle Canvas Motion"
            className="py-1 px-2.5 text-xs h-7"
          >
            Motion: {calmMode ? 'Calm' : 'Live'}
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={toggleTheme}
            title="Toggle Theme"
            className="py-1 px-2.5 text-xs h-7"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </Button>
        </div>
      </header>

      {/* Main Single-Screen Content (No Scroll) */}
      <main className="flex-1 min-h-0 max-w-6xl w-full mx-auto px-4 md:px-8 py-3 flex flex-col justify-between gap-3 z-base">
        {/* Compact Hero */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight">
            Automated CI/CD Delivery Pipeline
          </h2>
          <p className="text-text-2 text-xs md:text-sm max-w-2xl mx-auto line-clamp-2">
            Continuous deployment workflow orchestrated via GitHub Actions on an Ubuntu Linux runner.
            Pushes to <code className="text-action font-mono px-1 py-0.2 rounded bg-raised border border-border text-[11px]">main</code> trigger automated build and Nginx configuration reload.
          </p>
        </div>

        {/* 4 Infrastructure Spec Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {specs.map((item) => (
            <Card key={item.label} className="p-3 bg-raised/80 backdrop-blur-md border-border/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-3 font-semibold block">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-text mt-0.5 block truncate">
                  {item.val}
                </span>
              </div>
              <span className="text-[10px] text-text-3 border-t border-border/40 pt-1.5 mt-1.5 font-mono block truncate">
                {item.sub}
              </span>
            </Card>
          ))}
        </div>

        {/* Central Pipeline Workflow Container */}
        <Card className="p-4 md:p-5 bg-raised/85 backdrop-blur-md border-border/80 flex-1 min-h-0 flex flex-col justify-between shadow-float">
          {/* Workflow Header */}
          <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm md:text-base">
                Workflow Execution Stages
              </span>
              <StatusPill status="live" label="Runner Active" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-text-3 hidden sm:inline">
                .github/workflows/deploy.yml
              </span>
              <span className="text-[10px] font-mono bg-action/10 text-action border border-action/20 px-2 py-0.5 rounded">
                runs-on: self-hosted
              </span>
            </div>
          </div>

          {/* 4 Pipeline Step Cards in 1 Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 py-1">
            {stages.map((stage) => (
              <div
                key={stage.step}
                className="p-3 rounded-lg border border-border bg-base/55 flex flex-col justify-between space-y-2 hover:border-action/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-action bg-action/10 px-1.5 py-0.5 rounded border border-action/20">
                      STEP {stage.step}
                    </span>
                    <span className="text-[10px] font-mono text-text-3">
                      {stage.tag}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs text-text">{stage.title}</h4>
                  <p className="text-[11px] text-text-2 leading-tight">
                    {stage.detail}
                  </p>
                </div>

                <div className="p-1.5 rounded bg-black/45 border border-border/60 font-mono text-[10px] text-emerald-400 overflow-hidden whitespace-nowrap text-ellipsis flex items-center gap-1.5">
                  <span className="text-text-3 select-none">$</span>
                  <code className="truncate">{stage.cmd}</code>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow Summary Strip */}
          <div className="p-2.5 rounded-lg bg-base/60 border border-border/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-text-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px]">Push to main triggers end-to-end automated deployment</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-3">
              <span>Target:</span>
              <span className="text-text font-semibold">/var/www/railrush/</span>
            </div>
          </div>
        </Card>
      </main>

      {/* Minimal Footer */}
      <footer className="shrink-0 z-base border-t border-border/40 py-2 px-4 text-center text-[10px] text-text-3 font-mono">
        Self-Hosted Runner Deployment Showcase · Ubuntu Linux · Nginx
      </footer>
    </div>
  );
};
