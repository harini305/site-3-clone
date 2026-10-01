'use client';

import { getProduct } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import styles from './WishlistView.module.css';

export default function WishlistView() {
  const { hydrated, wishlist } = useStore();
  if (!hydrated) return <div style={{ minHeight: 300 }} aria-busy="true" />;

  const items = wishlist.map(getProduct).filter(Boolean);
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Your wishlist is empty. Tap the heart on any product to save it here.</p>
        <Button href="/shop">Browse the shop</Button>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
