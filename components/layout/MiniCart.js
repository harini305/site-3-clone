'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/format';
import styles from './MiniCart.module.css';

export default function MiniCart({ id, open, onClose }) {
  const { cartItems, cartSubtotal, removeFromCart } = useStore();

  return (
    <div id={id} className={`${styles.panel} ${open ? styles.open : ''}`} aria-label="Basket preview" role="region">
      {cartItems.length === 0 ? (
        <div className={styles.empty}>
          <Image src="/images/brand/empty-cart.jpg" alt="" width={142} height={142} />
          <p>Your basket is empty.</p>
          <Link href="/shop" className={styles.link} onClick={onClose}>
            Browse the shop
          </Link>
        </div>
      ) : (
        <>
          <ul className={styles.list}>
            {cartItems.map(({ slug, qty, product }) => (
              <li key={slug} className={styles.item}>
                <Link href={`/product/${slug}`} className={styles.thumb} onClick={onClose}>
                  <Image src={product.images[0]} alt="" fill sizes="64px" />
                </Link>
                <div className={styles.meta}>
                  <Link href={`/product/${slug}`} className={styles.name} onClick={onClose}>
                    {product.name}
                  </Link>
                  <span className={styles.qty}>
                    {qty} × {formatPrice(product.price)}
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeFromCart(slug)}
                  aria-label={`Remove ${product.name} from basket`}
                >
                  <IoClose aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <span>Subtotal</span>
            <strong>{formatPrice(cartSubtotal)}</strong>
          </div>
          <div className={styles.actions}>
            <Link href="/cart" className={styles.view} onClick={onClose}>
              View Basket
            </Link>
            <Link href="/checkout" className={styles.checkout} onClick={onClose}>
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
