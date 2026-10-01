'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getProduct } from '@/data/products';

const StoreContext = createContext(null);
const STORAGE_KEY = 'phlox-candy-store-v1';

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]); // [{ slug, qty }]
  const [wishlist, setWishlist] = useState([]); // [slug]
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const toastId = useRef(0);

  // Load persisted state after mount so server and client markup match.
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
      if (Array.isArray(saved.cart)) setCart(saved.cart.filter((i) => getProduct(i.slug)));
      if (Array.isArray(saved.wishlist)) setWishlist(saved.wishlist.filter((s) => getProduct(s)));
    } catch {
      /* storage unavailable — start empty */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist }));
    } catch {
      /* ignore quota / private mode errors */
    }
  }, [cart, wishlist, hydrated]);

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message, options = {}) => {
      const id = ++toastId.current;
      setToasts((list) => [...list.slice(-2), { id, message, ...options }]);
      window.setTimeout(() => dismissToast(id), options.duration || 3500);
    },
    [dismissToast],
  );

  const addToCart = useCallback(
    (slug, qty = 1) => {
      const product = getProduct(slug);
      if (!product) return;
      setCart((items) => {
        const existing = items.find((i) => i.slug === slug);
        if (existing) return items.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
        return [...items, { slug, qty }];
      });
      notify(`“${product.name}” has been added to your basket.`, { action: { label: 'View basket', href: '/cart' } });
    },
    [notify],
  );

  const updateQty = useCallback((slug, qty) => {
    setCart((items) =>
      qty <= 0 ? items.filter((i) => i.slug !== slug) : items.map((i) => (i.slug === slug ? { ...i, qty } : i)),
    );
  }, []);

  const removeFromCart = useCallback(
    (slug) => {
      const product = getProduct(slug);
      setCart((items) => items.filter((i) => i.slug !== slug));
      if (product) notify(`“${product.name}” removed from your basket.`);
    },
    [notify],
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (slug) => {
      const product = getProduct(slug);
      if (!product) return;
      const has = wishlist.includes(slug);
      setWishlist((list) => (has ? list.filter((s) => s !== slug) : [...list, slug]));
      notify(
        has ? `“${product.name}” removed from your wishlist.` : `“${product.name}” added to your wishlist.`,
        has ? {} : { action: { label: 'View wishlist', href: '/wishlist' } },
      );
    },
    [notify, wishlist],
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((i) => {
          const product = getProduct(i.slug);
          return product ? { ...i, product, lineTotal: product.price * i.qty } : null;
        })
        .filter(Boolean),
    [cart],
  );

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartSubtotal = cartItems.reduce((sum, i) => sum + i.lineTotal, 0);

  const value = useMemo(
    () => ({
      hydrated,
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      wishlist,
      isWishlisted: (slug) => wishlist.includes(slug),
      toggleWishlist,
      toasts,
      notify,
      dismissToast,
    }),
    [hydrated, cartItems, cartCount, cartSubtotal, addToCart, updateQty, removeFromCart, clearCart, wishlist, toggleWishlist, toasts, notify, dismissToast],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
