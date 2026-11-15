import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type StatusType = 'live' | 'on-time' | 'delayed' | 'cancelled' | 'boarding' | 'info';

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusType;
  label: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  label,
  className,
  ...props
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'live':
        return {
          bg: 'bg-action/15',
          text: 'text-action',
          dot: 'bg-action animate-pulse',
        };
      case 'on-time':
        return {
          bg: 'bg-success/15',
          text: 'text-success',
          dot: 'bg-success',
        };
      case 'delayed':
        return {
          bg: 'bg-warning/15',
          text: 'text-warning',
          dot: 'bg-warning',
        };
      case 'cancelled':
        return {
          bg: 'bg-error/15',
          text: 'text-error',
          dot: 'bg-error',
        };
      case 'boarding':
        return {
          bg: 'bg-accent/15',
          text: 'text-accent',
          dot: 'bg-accent animate-pulse',
        };
      case 'info':
      default:
        return {
          bg: 'bg-info/15',
          text: 'text-info',
          dot: 'bg-info',
        };
    }
  };

  const current = getStatusStyles();

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold select-none',
          current.bg,
          current.text,
          className
        )
      )}
      {...props}
    >
      <span className={clsx('w-1.5 h-1.5 rounded-full', current.dot)} />
      {label}
    </span>
  );
};
