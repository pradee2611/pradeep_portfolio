import { useSyncExternalStore } from 'react';

// Tiny shared store that coordinates the loading screen with the rest of the page.
//  - sceneReady: the hero 3D scene has painted (or was skipped on this device)
//  - ready: the loading screen is lifting, so entrance animations can start
let ready = false;
let sceneReady = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());

export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getSiteReady = () => ready;
export const getSceneReady = () => sceneReady;

export function markSceneReady() {
  if (sceneReady) return;
  sceneReady = true;
  emit();
}

export function markSiteReady() {
  if (ready) return;
  ready = true;
  emit();
}

// Entrance animations wait for this, so they play as the loading screen lifts
// instead of running unseen behind it.
export function useSiteReady() {
  return useSyncExternalStore(subscribe, getSiteReady, () => false);
}

// Safety net: never leave the page hidden if the loading screen fails to mount.
if (typeof window !== 'undefined') {
  window.setTimeout(markSiteReady, 8000);
}
