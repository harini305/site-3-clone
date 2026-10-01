import Link from 'next/link';
import { IoArrowBack, IoSadOutline } from 'react-icons/io5';
import SearchForm from '@/components/ui/SearchForm';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className={`container ${styles.wrap}`}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <div className={styles.head}>
        <IoSadOutline className={styles.icon} aria-hidden="true" />
        <div>
          <h1 className={styles.title}>Oops! Page Not Found</h1>
          <p>It seems we can’t find what you’re looking for. Perhaps searching can help.</p>
        </div>
      </div>
      <div className={styles.search}>
        <SearchForm />
      </div>
      <Link href="/" className={styles.back}>
        <IoArrowBack aria-hidden="true" /> Bring me back home
      </Link>
    </div>
  );
}
