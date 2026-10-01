'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useIsoLayoutEffect, REDUCED_MOTION } from '@/lib/gsap';

/**
 * Scroll-triggered entrance, mirroring the reference's "appear" animations.
 *
 * - effect: 'fade-up' | 'fade-down' | 'fade' | 'scale'
 * - stagger: when set, animates direct children (or `[data-reveal-item]`) one after another
 *
 * Content is fully visible in the server HTML; the hidden start state is only
 * applied on the client right before paint, plays once, and is skipped when the
 * user prefers reduced motion. Focusing anything inside finishes the animation
 * immediately so keyboard users never land on invisible content.
 */
export default function Reveal({
  as: Tag = 'div',
  effect = 'fade-up',
  delay = 0,
  duration = 1,
  stagger = 0,
  distance = 50,
  start = 'top 88%',
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add(`not all and ${REDUCED_MOTION}`, () => {
      let items = [el];
      if (stagger) {
        const marked = el.querySelectorAll('[data-reveal-item]');
        items = marked.length ? marked : el.children;
      }

      const from = { autoAlpha: 0 };
      if (effect === 'fade-up') from.y = distance;
      if (effect === 'fade-down') from.y = -distance;
      if (effect === 'scale') from.scale = 0.92;

      const tween = gsap.from(items, {
        ...from,
        duration,
        delay,
        stagger: stagger || 0,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: el, start, once: true },
      });

      const finish = () => tween.progress(1);
      el.addEventListener('focusin', finish);
      return () => el.removeEventListener('focusin', finish);
    });

    return () => mm.revert();
  }, [effect, delay, duration, stagger, distance, start]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

// Re-measure trigger positions once images/fonts have settled.
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
