'use client';

import { useState } from 'react';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import Button from '@/components/ui/Button';
import styles from './ReviewForm.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Demo-only review form: validates and appends the review locally (not saved). */
export default function ReviewForm({ productName, onSubmit }) {
  const [values, setValues] = useState({ rating: 0, text: '', name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!values.rating) err.rating = 'Please select a rating.';
    if (!values.text.trim()) err.text = 'Please write your review.';
    if (!values.name.trim()) err.name = 'Please enter your name.';
    if (!EMAIL_RE.test(values.email)) err.email = 'Please enter a valid email.';
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit({
      author: values.name.trim(),
      rating: values.rating,
      text: values.text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    });
    setValues({ rating: 0, text: '', name: '', email: '' });
    setDone(true);
  };

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <h3 className={styles.title}>Add a review</h3>
      <p className={styles.note}>Your email address will not be published. Required fields are marked *</p>

      <fieldset className={styles.rating}>
        <legend>Your rating for {productName} *</legend>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className={styles.star}>
              <input
                type="radio"
                name="rating"
                value={n}
                checked={values.rating === n}
                onChange={() => setValues((v) => ({ ...v, rating: n }))}
                className="sr-only"
              />
              <span className="sr-only">{n} star{n > 1 ? 's' : ''}</span>
              {n <= values.rating ? <IoStar aria-hidden="true" /> : <IoStarOutline aria-hidden="true" />}
            </label>
          ))}
        </div>
        {errors.rating && <span className="field-error">{errors.rating}</span>}
      </fieldset>

      <div>
        <label htmlFor="review-text" className="sr-only">
          Your review *
        </label>
        <textarea id="review-text" className="field" placeholder="Your review *" value={values.text} onChange={set('text')} aria-invalid={errors.text ? 'true' : undefined} />
        {errors.text && <span className="field-error">{errors.text}</span>}
      </div>

      <div className={styles.row}>
        <div>
          <label htmlFor="review-name" className="sr-only">
            Name *
          </label>
          <input id="review-name" className="field" placeholder="Name *" value={values.name} onChange={set('name')} aria-invalid={errors.name ? 'true' : undefined} autoComplete="name" />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="review-email" className="sr-only">
            Email *
          </label>
          <input id="review-email" type="email" className="field" placeholder="Email *" value={values.email} onChange={set('email')} aria-invalid={errors.email ? 'true' : undefined} autoComplete="email" />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      </div>

      <Button type="submit">Submit</Button>
      {done && (
        <p className="form-success" role="status">
          Thanks! Your review was added to this page. (Demo only — reviews are not saved.)
        </p>
      )}
    </form>
  );
}
