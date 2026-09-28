import { useSyncExternalStore } from 'react';

export type DeviceTier = 'lite' | 'full';

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

interface NavigatorHints {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
}

function getNavigatorHints(): NavigatorHints {
  return typeof navigator === 'undefined' ? {} : (navigator as Navigator & NavigatorHints);
}

export function matches(query: string): boolean {
  return typeof window !== 'undefined' && window.matchMedia(query).matches;
}

export function hasFinePointer(): boolean {
  return matches(FINE_POINTER_QUERY);
}

export function prefersReducedMotion(): boolean {
  return matches(REDUCED_MOTION_QUERY);
}

function isDataConstrained(): boolean {
  const { deviceMemory, connection } = getNavigatorHints();
  if (connection?.saveData) return true;
  if (connection?.effectiveType && /^(slow-2g|2g|3g)$/.test(connection.effectiveType)) return true;
  return typeof deviceMemory === 'number' && deviceMemory <= 2;
}

/**
 * "lite" devices get a stripped-down rendering: no infinite background
 * animations, no custom cursor, fewer marquee clones, no blur-heavy glows.
 * Detected before first paint by the inline bootstrap in index.html and
 * mirrored onto <html class="lite"> so CSS can act on it as well.
 */
export function detectTier(): DeviceTier {
  if (typeof window === 'undefined') return 'full';
  if (isDataConstrained()) return 'lite';
  if (prefersReducedMotion()) return 'lite';
  return hasFinePointer() ? 'full' : 'lite';
}

export function isLite(): boolean {
  return detectTier() === 'lite';
}

let cached: DeviceTier | null = null;
let mediaQueryList: MediaQueryList[] = [];
const listeners = new Set<() => void>();

export function applyDocumentTier(tier: DeviceTier): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('lite', tier === 'lite');
}

function emit() {
  const next = detectTier();
  if (next === cached) return;
  cached = next;
  applyDocumentTier(next);
  listeners.forEach((fn) => fn());
}

function subscribe(callback: () => void): () => void {
  if (mediaQueryList.length === 0 && typeof window !== 'undefined') {
    mediaQueryList = [FINE_POINTER_QUERY, REDUCED_MOTION_QUERY].map((q) => window.matchMedia(q));
  }
  mediaQueryList.forEach((mql) => mql.addEventListener('change', emit));
  listeners.add(callback);

  return () => {
    mediaQueryList.forEach((mql) => mql.removeEventListener('change', emit));
    listeners.delete(callback);
  };
}

function getSnapshot(): DeviceTier {
  if (cached === null) {
    cached = detectTier();
    applyDocumentTier(cached);
  }
  return cached;
}

/**
 * Device tier as a React value. Safe to call during render — returns a stable
 * value synchronously instead of waiting for an effect, so we never build a
 * heavy tree only to throw it away.
 */
export function useDeviceTier(): DeviceTier {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'full' as DeviceTier);
}

export function useIsLite(): boolean {
  return useDeviceTier() === 'lite';
}
