import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  surface?: 1 | 2 | 3;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, interactive = false, surface = 1, className, ...props }, ref) => {
    const surfaceClass = {
      1: 'bg-surface-1',
      2: 'bg-surface-2',
      3: 'bg-surface-3',
    }[surface];

    return (
      <div
        ref={ref}
        tabIndex={interactive ? 0 : undefined}
        className={twMerge(
          clsx(
            surfaceClass,
            'border border-border/70 rounded-md p-space-4 md:p-space-6 transition-all duration-base',
            interactive &&
              'cursor-pointer hover:bg-surface-2 hover:border-action/40 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
            className
          )
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
