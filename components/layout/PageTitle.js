import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';
import Parallax from '@/components/ui/Parallax';
import styles from './PageTitle.module.css';

/** Rounded image banner with breadcrumbs + page title (shop & category pages). */
export default function PageTitle({ title, crumbs = [], image = '/images/banners/shop-titlebar.jpg' }) {
  return (
    <section className="container" aria-labelledby="page-title">
      <div className={styles.banner}>
        <Parallax src={image} amount={20} />
        <div className={styles.shade} aria-hidden="true" />
        <div className={styles.content}>
          <nav aria-label="Breadcrumb">
            <ol className={styles.crumbs}>
              <li>
                <Link href="/">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>
                  <IoChevronForward aria-hidden="true" />
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <h1 id="page-title" className={styles.title}>
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
