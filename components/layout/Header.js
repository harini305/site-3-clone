'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoSearchOutline, IoBagHandleOutline, IoMenu } from 'react-icons/io5';
import { mainNav } from '@/data/site';
import { useStore } from '@/context/StoreContext';
import Logo from './Logo';
import MiniCart from './MiniCart';
import SearchOverlay from './SearchOverlay';
import MobileMenu from './MobileMenu';
import styles from './Header.module.css';

export function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  if (href === '/shop') return ['/shop', '/product', '/product-category'].some((p) => pathname.startsWith(p));
  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Close every overlay when navigating.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI on route change
    setSearchOpen(false);
    setMenuOpen(false);
    setCartOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo priority className={styles.logo} />
          <span className={styles.divider} aria-hidden="true" />
        </div>

        <nav className={styles.nav} aria-label="Main">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(pathname, item.href) ? styles.active : undefined}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.tools}>
          <button type="button" className={styles.search} onClick={() => setSearchOpen(true)} aria-haspopup="dialog">
            <span>Search</span>
            <IoSearchOutline aria-hidden="true" />
          </button>

          <div
            className={styles.cartWrap}
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setCartOpen(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setCartOpen(false);
            }}
          >
            <button
              type="button"
              className={styles.basket}
              onClick={() => setCartOpen((o) => !o)}
              aria-expanded={cartOpen}
              aria-controls="mini-cart"
            >
              <span className={styles.basketLabel}>
                Basket <span>({cartCount})</span>
              </span>
              <IoBagHandleOutline aria-hidden="true" className={styles.basketIcon} />
              <span className="sr-only">, {cartCount} items</span>
              {cartCount > 0 && <span className={styles.badge} aria-hidden="true">{cartCount}</span>}
            </button>
            <MiniCart id="mini-cart" open={cartOpen} onClose={() => setCartOpen(false)} />
          </div>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
          >
            <IoMenu aria-hidden="true" />
          </button>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }}
      />
    </header>
  );
}
