'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { hero } from '@/data/home';
import Button from '@/components/ui/Button';
import { gsap, useIsoLayoutEffect, REDUCED_MOTION } from '@/lib/gsap';
import styles from './Hero.module.css';

const layers = [
  { src: '/images/hero/croissant-sketch.png', w: 387, h: 167, cls: 'sketch', depth: 0.4 },
  { src: '/images/hero/wheat-sketch.png', w: 299, h: 373, cls: 'wheat', depth: 0.3 },
  { src: '/images/hero/bake-lettering.png', w: 327, h: 300, cls: 'lettering', depth: 0.6 },
  { src: '/images/hero/seeds.png', w: 653, h: 595, cls: 'seeds', depth: 1.2 },
  { src: '/images/hero/pastry.png', w: 617, h: 446, cls: 'pastry', depth: 1, priority: true },
  { src: '/images/hero/tart.png', w: 222, h: 233, cls: 'tart', depth: 1.6 },
];

export default function Hero() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`not all and ${REDUCED_MOTION}`, () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(q('[data-hero-box]'), { scale: 0.96, autoAlpha: 0, duration: 1 })
        .from(q('[data-hero-text]'), { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.12 }, '-=0.6')
        .from(q('[data-layer]'), { y: 60, autoAlpha: 0, duration: 1.2, stagger: 0.1 }, '-=1');

      // Scroll parallax — each layer drifts at its own depth.
      q('[data-layer]').forEach((el) => {
        gsap.to(el, {
          yPercent: -18 * Number(el.dataset.depth),
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });

      // Gentle pointer parallax on desktop.
      const box = q('[data-hero-box]')[0];
      const movers = q('[data-layer] img');
      const onMove = (e) => {
        const r = box.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        movers.forEach((img) => {
          const d = Number(img.parentElement.dataset.depth);
          gsap.to(img, { x: x * 30 * d, y: y * 20 * d, duration: 1.2, ease: 'power2.out', overwrite: 'auto' });
        });
      };
      const fine = window.matchMedia('(pointer: fine)').matches;
      if (fine) box.addEventListener('pointermove', onMove);
      return () => box.removeEventListener('pointermove', onMove);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={styles.section} aria-labelledby="hero-title">
      <div className="container">
        <div className={styles.box} data-hero-box>
          <div className={styles.content}>
            <p className={`script ${styles.script}`} data-hero-text>
              {hero.script}
            </p>
            <h1 id="hero-title" className={styles.title} data-hero-text>
              {hero.title}
            </h1>
            <div className={styles.featured} data-hero-text>
              <Image src={hero.featured.image} alt="" width={128} height={129} className={styles.cookie} priority />
              <div>
                <h2 className={styles.featuredTitle}>{hero.featured.title}</h2>
                <p>{hero.featured.text}</p>
              </div>
            </div>
            <div className={styles.actions} data-hero-text>
              <Button href="/shop">Shop Now</Button>
              <Button href="/contact" variant="dark">
                Custom Order
              </Button>
            </div>
          </div>

          <div className={styles.art} aria-hidden="true">
            {layers.map((l) => (
              <div key={l.cls} className={`${styles.layer} ${styles[l.cls]}`} data-layer data-depth={l.depth}>
                <Image src={l.src} alt="" width={l.w} height={l.h} priority={l.priority} sizes="(max-width: 767px) 80vw, 40vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
