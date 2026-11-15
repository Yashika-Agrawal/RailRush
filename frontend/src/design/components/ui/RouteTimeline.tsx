import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface StationStop {
  code: string;
  name: string;
  time: string;
  passed?: boolean;
  current?: boolean;
  haltMinutes?: number;
}

export interface RouteTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  stops: StationStop[];
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({ stops, className, ...props }) => {
  return (
    <div className={twMerge(clsx('flex flex-col relative py-2', className))} {...props}>
      {stops.map((stop, index) => {
        const isLast = index === stops.length - 1;
        const isMinor = stop.haltMinutes !== undefined && stop.haltMinutes < 5;

        return (
          <div key={stop.code} className="flex items-start gap-4 relative group">
            {/* Time (Mono font, tabular-nums) */}
            <span
              className={clsx(
                'w-14 text-right font-data text-sm shrink-0 pt-0.5',
                stop.passed ? 'text-text-3' : stop.current ? 'text-action font-semibold' : 'text-text'
              )}
            >
              {stop.time}
            </span>

            {/* Track Line & Station Node Column */}
            <div className="flex flex-col items-center shrink-0 relative self-stretch">
              {/* Station Node Indicator */}
              <div
                className={clsx(
                  'z-base transition-all duration-fast flex items-center justify-center',
                  isMinor
                    ? 'w-2 h-0.5 bg-border-strong mt-2.5'
                    : 'w-3 h-3 rounded-full mt-1.5',
                  !isMinor && stop.current && 'w-3.5 h-3.5 bg-action ring-4 ring-action/20 animate-pulse',
                  !isMinor && stop.passed && !stop.current && 'bg-action border border-action',
                  !isMinor && !stop.passed && !stop.current && 'bg-surface-1 border-2 border-border-strong'
                )}
              />

              {/* Connecting 1.5px Route Line segment */}
              {!isLast && (
                <div
                  className={clsx(
                    'w-[1.5px] grow my-1 min-h-[28px]',
                    stop.passed ? 'bg-action' : 'bg-border'
                  )}
                />
              )}
            </div>

            {/* Station Title & Code */}
            <div className="flex flex-col pb-5 grow">
              <span
                className={clsx(
                  'font-display text-base tracking-wide',
                  stop.current ? 'text-action font-bold' : stop.passed ? 'text-text-2' : 'text-text font-semibold'
                )}
              >
                {stop.name}{' '}
                <span className="font-data text-xs text-text-3 font-normal">
                  ({stop.code})
                </span>
              </span>
              {stop.haltMinutes !== undefined && stop.haltMinutes > 0 && (
                <span className="text-xs text-text-3 font-body">
                  Halt: {stop.haltMinutes}m
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
