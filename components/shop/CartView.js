'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { useStore } from '@/context/StoreContext';
import QuantityInput from '@/components/ui/QuantityInput';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import styles from './CartView.module.css';

export const SHIPPING = 5;

export default function CartView() {
  const { hydrated, cartItems, cartSubtotal, updateQty, removeFromCart } = useStore();
  const [coupon, setCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  if (!hydrated) return <div className={styles.loading} aria-busy="true" />;

  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <Image src="/images/brand/empty-cart.jpg" alt="" width={142} height={142} />
        <p>Your cart is currently empty.</p>
        <Button href="/shop">Return to shop</Button>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <caption className="sr-only">Items in your basket</caption>
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">Remove</span></th>
              <th scope="col" colSpan={2}>Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(({ slug, qty, product, lineTotal }) => (
              <tr key={slug}>
                <td data-label="">
                  <button type="button" className={styles.remove} onClick={() => removeFromCart(slug)} aria-label={`Remove ${product.name}`}>
                    <IoClose aria-hidden="true" />
                  </button>
                </td>
                <td className={styles.thumbCell}>
                  <Link href={`/product/${slug}`} className={styles.thumb} tabIndex={-1} aria-hidden="true">
                    <Image src={product.images[0]} alt="" fill sizes="90px" />
                  </Link>
                </td>
                <td data-label="Product">
                  <Link href={`/product/${slug}`} className={styles.name}>
                    {product.name}
                  </Link>
                </td>
                <td data-label="Price">{formatPrice(product.price)}</td>
                <td data-label="Quantity">
                  <QuantityInput size="sm" value={qty} onChange={(v) => updateQty(slug, v)} label={`${product.name} quantity`} />
                </td>
                <td data-label="Subtotal" className={styles.subtotal}>
                  {formatPrice(lineTotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form
          className={styles.coupon}
          onSubmit={(e) => {
            e.preventDefault();
            setCouponMsg(coupon.trim() ? `Coupon “${coupon.trim()}” is not valid. (Demo store — coupons are not available.)` : 'Please enter a coupon code.');
          }}
        >
          <label htmlFor="coupon" className="sr-only">Coupon code</label>
          <input id="coupon" className="field" placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
          <Button type="submit" variant="dark">Apply coupon</Button>
          {couponMsg && <p className={styles.couponMsg} role="status">{couponMsg}</p>}
        </form>
      </div>

      <aside className={styles.totals} aria-labelledby="totals-title">
        <h2 id="totals-title">Cart totals</h2>
        <dl>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatPrice(cartSubtotal)}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>Flat rate: {formatPrice(SHIPPING)}</dd>
          </div>
          <div className={styles.grand}>
            <dt>Total</dt>
            <dd>{formatPrice(cartSubtotal + SHIPPING)}</dd>
          </div>
        </dl>
        <Button href="/checkout" size="lg" className={styles.checkoutBtn}>
          Proceed to checkout
        </Button>
      </aside>
    </div>
  );
}
