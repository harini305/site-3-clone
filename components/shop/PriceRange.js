'use client';

import styles from './PriceRange.module.css';

/** Two overlapping range inputs forming a min/max price slider. */
export default function PriceRange({ min, max, value, onChange, step = 1 }) {
  const [lo, hi] = value;
  const pct = (v) => ((v - min) / (max - min)) * 100;

  return (
    <div className={styles.wrap}>
      <div className={styles.labels} aria-hidden="true">
        <span>${lo}</span>
        <span>${hi}</span>
      </div>
      <div className={styles.slider} style={{ '--lo': `${pct(lo)}%`, '--hi': `${pct(hi)}%` }}>
        <div className={styles.track} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi), hi])}
          aria-label="Minimum price"
          aria-valuetext={`$${lo}`}
          className={styles.range}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo)])}
          aria-label="Maximum price"
          aria-valuetext={`$${hi}`}
          className={styles.range}
        />
      </div>
    </div>
  );
}
