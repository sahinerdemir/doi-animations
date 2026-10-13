import React from "react";

interface StatusBarProps {
  time?: string;
  className?: string;
}

/**
 * Top Status Bar Placeholder (30px safe area for mobile clock / battery)
 * Kept intentionally blank per design specification.
 */
export function StatusBar({ className = "" }: StatusBarProps) {
  return (
    <div
      className={`w-full h-[30px] min-h-[30px] shrink-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
