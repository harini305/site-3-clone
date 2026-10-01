'use client';

import { useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { IoFunnelOutline, IoClose } from 'react-icons/io5';
import ProductCard from '@/components/ui/ProductCard';
import Reveal from '@/components/ui/Reveal';
import { categories, productsInCategory, sizes, sortOptions, sortProducts, priceBounds } from '@/data/products';
import SortSelect from './SortSelect';
import PriceRange from './PriceRange';
import styles from './ShopView.module.css';

/**
 * Product listing with the reference's sidebar: category links, size
 * filter, price range and a sort dropdown. Filtering is done in the browser.
 */
export default function ShopView({ category = 'all-product', heading = 'Featured Product' }) {
  const [sort, setSort] = useState('default');
  const [activeSizes, setActiveSizes] = useState([]);
  const [draftPrice, setDraftPrice] = useState([priceBounds.min, priceBounds.max]);
  const [price, setPrice] = useState([priceBounds.min, priceBounds.max]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const sizeGroupId = useId();

  const base = useMemo(() => productsInCategory(category), [category]);

  const visible = useMemo(() => {
    const filtered = base.filter(
      (p) =>
        p.price >= price[0] &&
        p.price <= price[1] &&
        (activeSizes.length === 0 || activeSizes.some((s) => p.sizes.includes(s))),
    );
    return sortProducts(filtered, sort);
  }, [base, price, activeSizes, sort]);

  const toggleSize = (slug) =>
    setActiveSizes((list) => (list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]));

  const filtersActive = activeSizes.length > 0 || price[0] !== priceBounds.min || price[1] !== priceBounds.max;
  const resetFilters = () => {
    setActiveSizes([]);
    setPrice([priceBounds.min, priceBounds.max]);
    setDraftPrice([priceBounds.min, priceBounds.max]);
  };

  return (
    <div className={`container ${styles.layout}`}>
      <div className={styles.toolbar}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.count} aria-live="polite">
          Showing {visible.length} of {base.length} results
        </p>
        <button
          type="button"
          className={styles.filterToggle}
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          aria-controls="shop-filters"
        >
          <IoFunnelOutline aria-hidden="true" /> Filters
        </button>
        <SortSelect value={sort} options={sortOptions} onChange={setSort} />
      </div>

      <aside id="shop-filters" className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`} aria-label="Product filters">
        <button type="button" className={styles.closeFilters} onClick={() => setFiltersOpen(false)} aria-label="Close filters">
          <IoClose aria-hidden="true" />
        </button>

        <section className={styles.widget}>
          <h3 className={styles.widgetTitle}>Category</h3>
          <ul className={styles.options}>
            {categories.map((c) => {
              const count = productsInCategory(c.slug).length;
              const current = c.slug === category;
              return (
                <li key={c.slug}>
                  <Link
                    href={c.slug === 'all-product' ? '/shop' : `/product-category/${c.slug}`}
                    className={`${styles.option} ${current ? styles.checked : ''}`}
                    aria-current={current ? 'page' : undefined}
                  >
                    <span className={styles.box} aria-hidden="true" />
                    <span className={styles.optionLabel}>{c.name}</span>
                    <span className={styles.optionCount}>({count})</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={styles.widget}>
          <h3 className={styles.widgetTitle} id={sizeGroupId}>
            Size
          </h3>
          <ul className={styles.options} role="group" aria-labelledby={sizeGroupId}>
            {sizes.map((s) => {
              const count = base.filter((p) => p.sizes.includes(s.slug)).length;
              const on = activeSizes.includes(s.slug);
              return (
                <li key={s.slug}>
                  <label className={`${styles.option} ${on ? styles.checked : ''}`}>
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleSize(s.slug)} />
                    <span className={styles.box} aria-hidden="true" />
                    <span className={styles.optionLabel}>{s.name}</span>
                    <span className={styles.optionCount}>({count})</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={styles.widget}>
          <h3 className={styles.widgetTitle}>Filter By Price</h3>
          <PriceRange min={priceBounds.min} max={priceBounds.max} value={draftPrice} onChange={setDraftPrice} />
          <button
            type="button"
            className={styles.filterBtn}
            onClick={() => {
              setPrice(draftPrice);
              setFiltersOpen(false);
            }}
          >
            Filter
          </button>
          {filtersActive && (
            <button type="button" className={styles.reset} onClick={resetFilters}>
              Reset filters
            </button>
          )}
        </section>
      </aside>

      <div className={styles.results}>
        {visible.length > 0 ? (
          <Reveal className={styles.grid} stagger={0.08} key={`${sort}-${price.join()}-${activeSizes.join()}`}>
            {visible.map((p) => (
              <ProductCard key={p.slug} product={p} sizes="(max-width: 767px) 90vw, (max-width: 1024px) 45vw, 27vw" />
            ))}
          </Reveal>
        ) : (
          <div className={styles.empty}>
            <p>No products were found matching your selection.</p>
            <button type="button" className={styles.filterBtn} onClick={resetFilters}>
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
