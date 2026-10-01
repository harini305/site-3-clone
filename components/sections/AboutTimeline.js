'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { gsap, useIsoLayoutEffect, REDUCED_MOTION } from '@/lib/gsap';
import styles from './AboutTimeline.module.css';

const rows = [
  {
    year: '1978',
    title: 'Bakers Delight. Your Local Baker.',
    text: 'It started with one oven and a family recipe for chocolate cake. Neighbours queued around the corner every Saturday, and the little shop on the corner quickly became the place to celebrate.',
    image: '/images/about/bakery-window.jpg',
    alt: 'Pastries on display in the bakery window',
  },
  {
    year: '1996',
    title: 'Pastry Is Different from Cooking.',
    text: 'A second generation brought French pastry training home. Precise temperatures, patient lamination and fresh fruit turned our counter into a confectionery, while the welcome stayed exactly the same.',
    image: '/images/about/pancake.jpg',
    alt: 'Stack of pancakes topped with cream and blueberries',
  },
];

export default function AboutTimeline() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`not all and ${REDUCED_MOTION}`, () => {
      gsap.fromTo(
        root.current.querySelector('[data-line]'),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 70%', scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className={styles.timeline}>
      <span className={styles.line} data-line aria-hidden="true" />
      {rows.map((row, i) => (
        <article key={row.year} className={`${styles.row} ${i % 2 ? styles.reverse : ''}`}>
          <Reveal className={styles.media} effect={i % 2 ? 'fade-up' : 'fade-down'}>
            <Image src={row.image} alt={row.alt} width={654} height={384} sizes="(max-width: 1024px) 92vw, 45vw" className={styles.img} />
          </Reveal>
          <div className={styles.year}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.dash} aria-hidden="true" />
            <p>{row.year}</p>
          </div>
          <Reveal className={styles.text} stagger={0.12}>
            <h2>{row.title}</h2>
            <p>{row.text}</p>
          </Reveal>
        </article>
      ))}
    </div>
  );
}
