import { IoStar, IoStarOutline } from 'react-icons/io5';
import styles from './Rating.module.css';

export default function Rating({ value = 0, max = 5, size = 16, className = '' }) {
  return (
    <span
      className={`${styles.rating} ${className}`}
      role="img"
      aria-label={`Rated ${value} out of ${max}`}
      style={{ fontSize: size }}
    >
      {Array.from({ length: max }, (_, i) =>
        i < value ? <IoStar key={i} aria-hidden="true" /> : <IoStarOutline key={i} aria-hidden="true" />,
      )}
    </span>
  );
}
