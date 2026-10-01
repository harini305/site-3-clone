'use client';

import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Layout effect on the client (runs before paint, avoiding a flash of the
// un-animated state); plain effect on the server to avoid warnings.
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export { gsap, ScrollTrigger };
