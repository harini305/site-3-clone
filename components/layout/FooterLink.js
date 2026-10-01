'use client';

import Link from 'next/link';

/**
 * Footer link that still gives visible feedback when it points at the page
 * you're already on: it smooth-scrolls to the #section (or to the top)
 * instead of silently doing nothing.
 */
export default function FooterLink({ href, children }) {
  const onClick = (e) => {
    const url = new URL(href, window.location.origin);
    const here = window.location;
    // Different page (or different query, e.g. a new contact topic): let Next navigate.
    if (url.pathname !== here.pathname || url.search !== here.search) return;

    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
    if (el) {
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  return (
    <Link href={href} onClick={onClick}>
      {children}
    </Link>
  );
}
