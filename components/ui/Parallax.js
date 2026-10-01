'use client';

import { useRef } from 'react';
import { gsap, useIsoLayoutEffect, REDUCED_MOTION } from '@/lib/gsap';
import styles from './Parallax.module.css';

/**
 * Background image that drifts vertically while its container scrolls
 * through the viewport (the reference uses Elementor "motion effects"
 * scrolling backgrounds on its banners and category cards).
 */
export default function Parallax({ src, position = 'center', amount = 12, className = '' }) {
  const wrap = useRef(null);
  const layer = useRef(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`not all and ${REDUCED_MOTION}`, () => {
      gsap.fromTo(
        layer.current,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: 'none',
          scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, [amount]);

  return (
    <div ref={wrap} className={`${styles.wrap} ${className}`} aria-hidden="true">
      <div
        ref={layer}
        className={styles.layer}
        style={{ backgroundImage: `url(${src})`, backgroundPosition: position, inset: `-${amount}% 0` }}
      />
    </div>
  );
}
