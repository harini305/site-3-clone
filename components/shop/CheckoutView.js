'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { useStore } from '@/context/StoreContext';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import { SHIPPING } from './CartView';
import styles from './CheckoutView.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fields = [
  { key: 'firstName', label: 'First name', autoComplete: 'given-name', half: true },
  { key: 'lastName', label: 'Last name', autoComplete: 'family-name', half: true },
  { key: 'address', label: 'Street address', autoComplete: 'street-address' },
  { key: 'city', label: 'Town / City', autoComplete: 'address-level2', half: true },
  { key: 'postcode', label: 'Postcode / ZIP', autoComplete: 'postal-code', half: true },
  { key: 'phone', label: 'Phone', autoComplete: 'tel', type: 'tel', half: true },
  { key: 'email', label: 'Email address', autoComplete: 'email', type: 'email', half: true },
];

export default function CheckoutView() {
  const { hydrated, cartItems, cartSubtotal, clearCart } = useStore();
  const [values, setValues] = useState(Object.fromEntries(fields.map((f) => [f.key, ''])));
  const [notes, setNotes] = useState('');
  const [payment, setPayment] = useState('cod');
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  if (!hydrated) return <div style={{ minHeight: 300 }} aria-busy="true" />;

  if (order) {
    return (
      <div className={styles.done} role="status">
        <IoCheckmarkCircle aria-hidden="true" />
        <h2>Thank you. Your order has been received.</h2>
        <p>
          Order number <strong>#{order.number}</strong> · Total <strong>{formatPrice(order.total)}</strong>
        </p>
        <p className={styles.demo}>This is a demo store — no payment was taken and no order was placed.</p>
        <Button href="/shop">Continue shopping</Button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.done}>
        <p>Your cart is currently empty, so there is nothing to check out.</p>
        <Button href="/shop">Return to shop</Button>
      </div>
    );
  }

  const total = cartSubtotal + SHIPPING;

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    fields.forEach((f) => {
      if (!values[f.key].trim()) err[f.key] = `${f.label} is required.`;
    });
    if (values.email && !EMAIL_RE.test(values.email)) err.email = 'Please enter a valid email address.';
    setErrors(err);
    const first = Object.keys(err)[0];
    if (first) {
      document.getElementById(`co-${first}`)?.focus();
      return;
    }
    setOrder({ number: Math.floor(10000 + Math.random() * 89999), total });
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <form className={styles.layout} onSubmit={submit} noValidate>
      <section aria-labelledby="billing-title">
        <h2 id="billing-title" className={styles.h2}>Billing details</h2>
        <div className={styles.grid}>
          {fields.map((f) => (
            <div key={f.key} className={f.half ? undefined : styles.full}>
              <label htmlFor={`co-${f.key}`} className={styles.label}>
                {f.label} <span aria-hidden="true">*</span>
              </label>
              <input
                id={`co-${f.key}`}
                type={f.type || 'text'}
                className="field"
                value={values[f.key]}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                autoComplete={f.autoComplete}
                aria-invalid={errors[f.key] ? 'true' : undefined}
                aria-describedby={errors[f.key] ? `co-${f.key}-err` : undefined}
                required
              />
              {errors[f.key] && <span id={`co-${f.key}-err`} className="field-error">{errors[f.key]}</span>}
            </div>
          ))}
          <div className={styles.full}>
            <label htmlFor="co-notes" className={styles.label}>Order notes (optional)</label>
            <textarea id="co-notes" className="field" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes about your order, e.g. a message for the cake." />
          </div>
        </div>
      </section>

      <aside className={styles.summary} aria-labelledby="order-title">
        <h2 id="order-title" className={styles.h2}>Your order</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(({ slug, qty, product, lineTotal }) => (
              <tr key={slug}>
                <td>
                  <Link href={`/product/${slug}`}>{product.name}</Link> × {qty}
                </td>
                <td>{formatPrice(lineTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Subtotal</th>
              <td>{formatPrice(cartSubtotal)}</td>
            </tr>
            <tr>
              <th scope="row">Shipping</th>
              <td>{formatPrice(SHIPPING)}</td>
            </tr>
            <tr className={styles.total}>
              <th scope="row">Total</th>
              <td>{formatPrice(total)}</td>
            </tr>
          </tfoot>
        </table>

        <fieldset className={styles.payment}>
          <legend className="sr-only">Payment method</legend>
          {[
            { v: 'bacs', label: 'Direct bank transfer' },
            { v: 'cheque', label: 'Check payments' },
            { v: 'cod', label: 'Cash on delivery' },
          ].map((p) => (
            <label key={p.v} className={styles.method}>
              <input type="radio" name="payment" value={p.v} checked={payment === p.v} onChange={() => setPayment(p.v)} />
              {p.label}
            </label>
          ))}
        </fieldset>
        <p className={styles.demo}>Demo store: placing an order does not take payment or create a real order.</p>
        <Button type="submit" size="lg" className={styles.place}>
          Place order
        </Button>
      </aside>
    </form>
  );
}
