"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * A hook that returns whether the current screen size is mobile or not.
 * @example
 * const isMobile = useIsMobile();
 */
export function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  // Use useSyncExternalStore for SSR-safe media query subscription
  const getSnapshot = () => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.innerWidth < breakpoint;
  };

  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") {
      return () => {};
    }

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mql.addEventListener("change", callback);

    return () => {
      mql.removeEventListener("change", callback);
    };
  };

  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
