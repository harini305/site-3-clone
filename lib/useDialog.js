'use client';

import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal behaviour: Escape closes, Tab is trapped inside,
 * background scroll is locked and focus returns to the opener on close.
 */
export default function useDialog(open, onClose, { lockScroll = true, initialFocus } = {}) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const node = ref.current;
    const previous = document.activeElement;
    if (lockScroll) document.body.classList.add('no-scroll');

    const focusTarget = (initialFocus && node?.querySelector(initialFocus)) || node?.querySelector(FOCUSABLE);
    const raf = requestAnimationFrame(() => focusTarget?.focus());

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeRef.current?.();
        return;
      }
      if (e.key !== 'Tab' || !node) return;
      const items = [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      if (lockScroll) document.body.classList.remove('no-scroll');
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, [open, lockScroll, initialFocus]);

  return ref;
}
