import { useState, useEffect } from 'react';
import { useTheme } from '../theme/ThemeProvider';

export interface BackgroundMode {
  isReducedMotion: boolean;
  isCalmMode: boolean;
  isSaveData: boolean;
  isVisible: boolean;
  isMobile: boolean;
  nodeCount: number;
  maxFps: number;
  dpr: number;
}

export function useBackgroundMode(): BackgroundMode {
  const { calmMode } = useTheme();
  const [isVisible, setIsVisible] = useState(!document.hidden);
  const [isReducedMotion, setIsReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Check save-data
  // @ts-expect-error - navigator.connection is supported on Chromium
  const isSaveData = typeof navigator !== 'undefined' && navigator.connection?.saveData === true;

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dpr = typeof window !== 'undefined' 
    ? Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2) 
    : 1;

  return {
    isReducedMotion: isReducedMotion || calmMode,
    isCalmMode: calmMode,
    isSaveData,
    isVisible,
    isMobile,
    nodeCount: isMobile ? 9 : 18,
    maxFps: 30,
    dpr,
  };
}
