import { IoSearchOutline } from 'react-icons/io5';
import styles from './SearchForm.module.css';

/** Plain GET form to /search — works without JavaScript. */
export default function SearchForm({ defaultValue = '' }) {
  return (
    <form action="/search" method="get" role="search" className={styles.form}>
      <label htmlFor="page-search" className="sr-only">
        Search products and posts
      </label>
      <input id="page-search" name="s" type="search" defaultValue={defaultValue} placeholder="Search…" className={styles.input} />
      <button type="submit" className={styles.btn} aria-label="Search">
        <IoSearchOutline aria-hidden="true" />
      </button>
    </form>
  );
}
