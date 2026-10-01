'use client';

import { useState } from 'react';
import { IoHeart, IoHeartOutline, IoShareSocialOutline } from 'react-icons/io5';
import QuantityInput from '@/components/ui/QuantityInput';
import Button from '@/components/ui/Button';
import { useStore } from '@/context/StoreContext';
import styles from './ProductActions.module.css';

export default function ProductActions({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, notify } = useStore();
  const [qty, setQty] = useState(1);
  const wished = isWishlisted(product.slug);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        notify('Product link copied to clipboard.');
      }
    } catch {
      /* user cancelled share sheet */
    }
  };

  return (
    <div className={styles.actions}>
      <div className={styles.buy}>
        <QuantityInput value={qty} onChange={setQty} label={`${product.name} quantity`} />
        <Button size="lg" onClick={() => addToCart(product.slug, qty)}>
          Add To Cart
        </Button>
      </div>
      <div className={styles.secondary}>
        <button type="button" className={styles.wish} onClick={() => toggleWishlist(product.slug)} aria-pressed={wished}>
          {wished ? 'In Wishlist' : 'Add To Wishlist'}
          {wished ? <IoHeart aria-hidden="true" /> : <IoHeartOutline aria-hidden="true" />}
        </button>
        <button type="button" className={styles.share} onClick={share}>
          Share <IoShareSocialOutline aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
