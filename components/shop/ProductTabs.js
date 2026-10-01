'use client';

import { useId, useRef, useState } from 'react';
import Rating from '@/components/ui/Rating';
import ReviewForm from './ReviewForm';
import styles from './ProductTabs.module.css';

export default function ProductTabs({ product }) {
  const [reviews, setReviews] = useState(product.reviews);
  const tabs = [
    { key: 'description', label: 'Description' },
    { key: 'info', label: 'Additional information' },
    { key: 'reviews', label: 'Reviews', count: reviews.length },
  ];
  const [active, setActive] = useState('description');
  const base = useId();
  const refs = useRef([]);

  const onKeyDown = (e, i) => {
    let next = null;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(tabs[next].key);
    refs.current[next]?.focus();
  };

  return (
    <section className={styles.wrap} id="reviews">
      <div className={styles.tablist} role="tablist" aria-label="Product details">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`${base}-tab-${t.key}`}
            aria-controls={`${base}-panel-${t.key}`}
            aria-selected={active === t.key}
            tabIndex={active === t.key ? 0 : -1}
            className={`${styles.tab} ${active === t.key ? styles.active : ''}`}
            onClick={() => setActive(t.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {t.label}
            {t.count != null && <span className={styles.count}>{t.count}</span>}
          </button>
        ))}
      </div>

      <div className={styles.panelWrap}>
        <div role="tabpanel" id={`${base}-panel-description`} aria-labelledby={`${base}-tab-description`} hidden={active !== 'description'} className={styles.panel}>
          <h2>About the {product.name}</h2>
          <p>{product.short}</p>
          <p>
            Every order is baked to order in our kitchen the morning it ships, using free-range eggs, cultured butter and
            single-origin cocoa. We never use artificial preservatives, so the flavour you taste is exactly what went into
            the oven.
          </p>
          <ul>
            <li>Hand-finished by our pastry team</li>
            <li>Packed in a recyclable, insulated gift box</li>
            <li>Personalised message card available on request</li>
            <li>Same-day pickup for orders placed before 10am</li>
          </ul>
          <hr />
          <p>Allergen information: {product.details.allergens}</p>
          <p>{product.details.shelfLife}</p>
        </div>

        <div role="tabpanel" id={`${base}-panel-info`} aria-labelledby={`${base}-tab-info`} hidden={active !== 'info'} className={styles.panel}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th scope="row">Ingredients</th>
                <td>{product.details.ingredients}</td>
              </tr>
              <tr>
                <th scope="row">Allergens</th>
                <td>{product.details.allergens}</td>
              </tr>
              <tr>
                <th scope="row">Storage</th>
                <td>{product.details.shelfLife}</td>
              </tr>
              <tr>
                <th scope="row">Size</th>
                <td>
                  {product.sizes
                    .map((s) => s.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
                    .join(', ')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div role="tabpanel" id={`${base}-panel-reviews`} aria-labelledby={`${base}-tab-reviews`} hidden={active !== 'reviews'} className={styles.panel}>
          <h2>
            {reviews.length} review{reviews.length === 1 ? '' : 's'} for {product.name}
          </h2>
          <ol className={styles.reviews}>
            {reviews.map((r, i) => (
              <li key={i} className={styles.review}>
                <span className={styles.avatar} aria-hidden="true">
                  {r.author[0]}
                </span>
                <div>
                  <Rating value={r.rating} size={14} />
                  <p className={styles.meta}>
                    <strong>{r.author}</strong> – <time>{r.date}</time>
                  </p>
                  <p>{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <ReviewForm productName={product.name} onSubmit={(r) => setReviews((list) => [...list, r])} />
        </div>
      </div>
    </section>
  );
}
