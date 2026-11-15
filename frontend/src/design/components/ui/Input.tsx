import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  isDataMono?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, isDataMono = false, id, className, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-semibold text-text-2 tracking-[0.04em] uppercase select-none"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={twMerge(
              clsx(
                'h-[44px] w-full px-space-3 bg-surface-1 text-text border border-border-strong rounded-sm text-sm transition-all duration-fast placeholder:text-text-disabled',
                'focus:outline-none focus:border-action focus:ring-1 focus:ring-action',
                isDataMono && 'font-data tabular-nums tracking-wider',
                error && 'border-error focus:border-error focus:ring-error',
                className
              )
            )}
            {...props}
          />
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
            <span>•</span> {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-text-3 mt-0.5">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
