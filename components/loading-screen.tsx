"use client";

import { useEffect, useRef, useState } from 'react';
import { getSceneReady, markSiteReady, subscribe } from '@/lib/site-ready';

const MIN_VISIBLE_MS = 1100; // avoid a flash on fast connections
const MIN_VISIBLE_RETURNING_MS = 450; // shorter for repeat loads in the same session
const MAX_WAIT_MS = 4000; // never block the page for longer than this
const EXIT_MS = 900;
const SEEN_KEY = 'pk-portfolio-seen';

// Rendered on the server, so it paints on the very first frame, before any
// JavaScript has downloaded. Progress reflects real milestones: hydration,
// web fonts, page load, and the hero 3D scene being ready.
export function LoadingScreen() {
  const [phase, setPhase] = useState<'loading' | 'leaving' | 'gone'>('loading');
  const [reduceMotion, setReduceMotion] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('loader-lock');
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    let returning = false;
    try {
      returning = sessionStorage.getItem(SEEN_KEY) === '1';
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // storage unavailable (private mode); fall back to the full-length loader
    }
    const minMs = returning ? MIN_VISIBLE_RETURNING_MS : MIN_VISIBLE_MS;

    const done = { hydrated: true, fonts: false, load: false, scene: getSceneReady() };
    const markFonts = () => {
      done.fonts = true;
    };
    const markLoad = () => {
      done.load = true;
    };

    (document.fonts?.ready ?? Promise.resolve()).then(markFonts, markFonts);
    if (document.readyState === 'complete') markLoad();
    else window.addEventListener('load', markLoad, { once: true });
    const unsubscribe = subscribe(() => {
      if (getSceneReady()) done.scene = true;
    });
    const failSafe = window.setTimeout(() => {
      done.fonts = done.load = done.scene = true;
    }, MAX_WAIT_MS);

    const started = performance.now();
    let last = started;
    let shown = 0;
    let raf = 0;
    let exitTimer = 0;
    let finished = false;

    const finish = () => {
      finished = true;
      root.classList.remove('loader-lock');
      markSiteReady();
      setPhase('leaving');
      exitTimer = window.setTimeout(() => setPhase('gone'), EXIT_MS + 60);
    };

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const milestones = Object.values(done).filter(Boolean).length;
      // Real progress, but never faster than the minimum display time allows.
      const target = Math.min(milestones * 25, ((now - started) / minMs) * 100);
      shown += (target - shown) * Math.min(1, dt / 140);
      if (shown > 99.4) shown = 100;

      if (barRef.current) barRef.current.style.transform = `scaleX(${shown / 100})`;
      if (countRef.current) countRef.current.textContent = String(Math.round(shown));

      if (shown >= 100) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failSafe);
      window.clearTimeout(exitTimer);
      window.removeEventListener('load', markLoad);
      unsubscribe();
      if (!finished) root.classList.remove('loader-lock');
    };
  }, []);

  if (phase === 'gone') return null;

  const leaving = phase === 'leaving';
  const exitStyle = reduceMotion
    ? { opacity: leaving ? 0 : 1, transition: 'opacity 300ms linear' }
    : {
        transform: leaving ? 'translate3d(0,-100%,0)' : 'translate3d(0,0,0)',
        transition: `transform ${EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        willChange: 'transform',
      };

  return (
    <div
      data-app-loader
      role="status"
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-white px-6 py-8 text-gray-900 dark:bg-[#08080a] dark:text-white md:px-12 md:py-12 ${
        leaving ? 'pointer-events-none' : ''
      }`}
      style={exitStyle}
    >
      <span className="sr-only">Loading portfolio</span>

      <div aria-hidden="true" className="flex items-center justify-between font-sans text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
        <span className="loader-rise">Digital Portfolio</span>
        <span className="loader-rise" style={{ animationDelay: '120ms' }}>
          Coimbatore, India
        </span>
      </div>

      <div aria-hidden="true" className="loader-rise" style={{ animationDelay: '200ms' }}>
        <p className="whitespace-nowrap font-serif text-[11vw] italic leading-[0.95] tracking-tighter md:text-[9vw]">
          Pradeep Kumar S
        </p>
        <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-sans text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 md:text-sm">
          <span className="whitespace-nowrap">Full-Stack (MERN)</span>
          <span className="whitespace-nowrap">Agentic AI</span>
          <span className="whitespace-nowrap">Gen AI</span>
        </p>
      </div>

      <div aria-hidden="true">
        <div className="mb-4 flex items-end justify-end">
          <span className="font-serif text-[16vw] italic leading-none tabular-nums md:text-[8vw]">
            <span ref={countRef}>0</span>
            <span className="text-[0.4em] text-gray-400 dark:text-gray-500">%</span>
          </span>
        </div>
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-gray-900 dark:bg-white"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
}
