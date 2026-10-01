'use client';

import { useState } from 'react';
import Parallax from '@/components/ui/Parallax';
import Reveal from '@/components/ui/Reveal';
import { useStore } from '@/context/StoreContext';
import styles from './SubscribeBanner.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SubscribeBanner() {
  const { notify } = useStore();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setEmail('');
    // Demo only — no newsletter service is connected.
    notify('Thanks for subscribing! (Demo only — no email was sent.)');
  };

  return (
    <section className="container" aria-labelledby="subscribe-title">
      <div className={styles.banner}>
        <Parallax src="/images/banners/subscribe.jpg" amount={14} />
        <div className={styles.shade} aria-hidden="true" />
        <Reveal className={styles.content} stagger={0.12}>
          <p className="script">Get Started</p>
          <h2 id="subscribe-title">Great Customers Are Using The Confectionery Shop</h2>
          <form className={styles.form} onSubmit={submit} noValidate>
            <label htmlFor="subscribe-email" className="sr-only">
              Email address
            </label>
            <input
              id="subscribe-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Address"
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'subscribe-error' : undefined}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {error && (
            <p id="subscribe-error" className={styles.error} role="alert">
              {error}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
