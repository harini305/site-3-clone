'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import styles from './AccountForms.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Login / register forms. There is no backend, so submissions only show a demo notice. */
export default function AccountForms() {
  const [tab, setTab] = useState('login');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const sync = () => setTab(window.location.hash === '#register' ? 'register' : 'login');
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const select = (t) => {
    setTab(t);
    setErrors({});
    setMessage('');
    history.replaceState(null, '', t === 'register' ? '#register' : '#login');
  };

  const submit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const err = {};
    if (tab === 'login') {
      if (!data.username?.trim()) err.username = 'Please enter your username or email.';
      if (!data.password) err.password = 'Please enter your password.';
    } else {
      if (!EMAIL_RE.test(data.email || '')) err.email = 'Please enter a valid email address.';
      if ((data.password || '').length < 8) err.password = 'Password must be at least 8 characters.';
    }
    setErrors(err);
    if (Object.keys(err).length) return;
    setMessage(
      tab === 'login'
        ? 'Demo only — accounts are not available, so you cannot sign in.'
        : 'Demo only — no account was created and no email was sent.',
    );
  };

  const err = (k) => errors[k] && <span id={`acc-${k}-err`} className="field-error">{errors[k]}</span>;
  const aria = (k) => ({ 'aria-invalid': errors[k] ? 'true' : undefined, 'aria-describedby': errors[k] ? `acc-${k}-err` : undefined });

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="Account">
        {['login', 'register'].map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`tab-${t}`}
            aria-selected={tab === t}
            aria-controls="account-panel"
            className={`script ${styles.tab} ${tab === t ? styles.active : ''}`}
            onClick={() => select(t)}
          >
            {t === 'login' ? 'Login' : 'Register'}
          </button>
        ))}
      </div>

      <form id="account-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className={styles.form} onSubmit={submit} noValidate key={tab}>
        {tab === 'login' ? (
          <>
            <div>
              <label htmlFor="acc-username" className={styles.label}>Username or email address <span>*</span></label>
              <input id="acc-username" name="username" className="field" autoComplete="username" {...aria('username')} />
              {err('username')}
            </div>
            <div>
              <label htmlFor="acc-password" className={styles.label}>Password <span>*</span></label>
              <input id="acc-password" name="password" type="password" className="field" autoComplete="current-password" {...aria('password')} />
              {err('password')}
            </div>
            <label className={styles.check}>
              <input type="checkbox" name="remember" /> Remember me
            </label>
            <div className={styles.row}>
              <Button type="submit">Log in</Button>
              <button type="button" className={styles.link} onClick={() => setMessage('Demo only — password reset is not available.')}>
                Lost your password?
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="acc-email" className={styles.label}>Email address <span>*</span></label>
              <input id="acc-email" name="email" type="email" className="field" autoComplete="email" {...aria('email')} />
              {err('email')}
            </div>
            <div>
              <label htmlFor="acc-newpass" className={styles.label}>Password <span>*</span></label>
              <input id="acc-newpass" name="password" type="password" className="field" autoComplete="new-password" {...aria('password')} />
              {err('password')}
            </div>
            <p className={styles.small}>Your personal data will be used to support your experience throughout this website.</p>
            <div>
              <Button type="submit">Register</Button>
            </div>
          </>
        )}
        {message && <p className={styles.notice} role="status">{message}</p>}
      </form>
    </div>
  );
}
