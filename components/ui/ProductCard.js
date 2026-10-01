'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IoBagHandleOutline, IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useStore } from '@/context/StoreContext';
import Rating from './Rating';
import Price from './Price';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, sizes = '(max-width: 767px) 90vw, (max-width: 1024px) 45vw, 25vw' }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [primary, secondary] = product.images;
  const onSale = Boolean(product.regularPrice);
  const wished = isWishlisted(product.slug);

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Link href={`/product/${product.slug}`} className={styles.imageLink} aria-label={product.name} tabIndex={-1}>
          <Image src={primary} alt={product.name} fill sizes={sizes} className={styles.primary} />
          {secondary && <Image src={secondary} alt="" fill sizes={sizes} className={styles.secondary} />}
        </Link>
        {onSale && <span className={styles.badge}>Sale!</span>}
        <button
          type="button"
          className={`${styles.wish} ${wished ? styles.wished : ''}`}
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          {wished ? <IoHeart aria-hidden="true" /> : <IoHeartOutline aria-hidden="true" />}
        </button>
        <button type="button" className={styles.add} onClick={() => addToCart(product.slug)}>
          <IoBagHandleOutline aria-hidden="true" />
          <span>Add to Cart</span>
          <span className="sr-only">: {product.name}</span>
        </button>
      </div>
      <div className={styles.body}>
        <Rating value={product.rating} />
        <h3 className={styles.title}>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <Price product={product} />
      </div>
    </article>
  );
}
