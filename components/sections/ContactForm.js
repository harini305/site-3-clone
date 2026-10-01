'use client';

import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import Button from '@/components/ui/Button';
import { contactTopics } from '@/data/site';
import styles from './ContactForm.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ initialTopic = 'general' }) {
  const topic = contactTopics.some((t) => t.value === initialTopic) ? initialTopic : 'general';
  const empty = { name: '', email: '', topic, question: '' };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!values.name.trim()) err.name = 'Please enter your name.';
    if (!EMAIL_RE.test(values.email.trim())) err.email = 'Please enter a valid email address.';
    if (values.question.trim().length < 5) err.question = 'Please write your question.';
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`contact-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    setValues(empty);
    setSent(true);
  };

  const field = (key, props) => (
    <div className={props.wide ? styles.wide : undefined}>
      <label htmlFor={`contact-${key}`} className="sr-only">
        {props.label}
      </label>
      {props.textarea ? (
        <textarea
          id={`contact-${key}`}
          className="field"
          placeholder={props.placeholder}
          value={values[key]}
          onChange={set(key)}
          aria-invalid={errors[key] ? 'true' : undefined}
          aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
          required
        />
      ) : (
        <input
          id={`contact-${key}`}
          type={props.type || 'text'}
          className="field"
          placeholder={props.placeholder}
          value={values[key]}
          onChange={set(key)}
          autoComplete={props.autoComplete}
          aria-invalid={errors[key] ? 'true' : undefined}
          aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
          required
        />
      )}
      {errors[key] && (
        <span id={`contact-${key}-error`} className="field-error">
          {errors[key]}
        </span>
      )}
    </div>
  );

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <p className={styles.note}>Your email address will not be published. Required fields are marked*</p>
      <div className={styles.grid}>
        {field('name', { label: 'Your name', placeholder: 'Your Name *', autoComplete: 'name' })}
        {field('email', { label: 'Your email', placeholder: 'Your Email *', type: 'email', autoComplete: 'email' })}
        <div className={`${styles.wide} ${styles.selectWrap}`}>
          <label htmlFor="contact-topic" className="sr-only">
            Topic
          </label>
          <select id="contact-topic" className="field" value={values.topic} onChange={set('topic')}>
            {contactTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <IoChevronDown aria-hidden="true" className={styles.chevron} />
        </div>
        {field('question', { label: 'Your question', placeholder: 'Question *', textarea: true, wide: true })}
      </div>
      <div className={styles.submit}>
        <Button type="submit" size="lg">
          Send A Message
        </Button>
      </div>
      {sent && (
        <p className="form-success" role="status">
          Thanks for your message! (Demo only — no message was actually sent.)
        </p>
      )}
    </form>
  );
}
