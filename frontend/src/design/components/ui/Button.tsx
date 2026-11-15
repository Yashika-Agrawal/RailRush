import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'lantern';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-body font-semibold rounded-sm transition-all duration-fast select-none outline-none disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-[1px] focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

    const sizeStyles = {
      sm: 'h-[36px] px-space-3 text-xs',
      md: 'h-[40px] px-space-4 text-sm',
      lg: 'h-[48px] px-space-6 text-base',
    };

    const variantStyles = {
      primary:
        'bg-action text-on-action hover:bg-action-hover active:bg-action',
      secondary:
        'bg-surface-2 text-text border border-border-strong hover:bg-surface-3',
      ghost:
        'bg-transparent text-text hover:bg-surface-2 hover:text-text active:bg-surface-3',
      lantern:
        'bg-accent text-white hover:brightness-110 active:brightness-95',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={twMerge(
          clsx(
            baseStyles,
            sizeStyles[size],
            variantStyles[variant],
            className
          )
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-1.5" aria-label="Loading">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
              style={{ animationDelay: '300ms' }}
            />
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
