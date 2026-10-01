import { formatPrice } from '@/lib/format';
import styles from './Price.module.css';

export default function Price({ product, size = 'md', className = '' }) {
  const onSale = product.regularPrice && product.regularPrice > product.price;
  return (
    <span className={`${styles.price} ${styles[size]} ${className}`}>
      {onSale ? (
        <>
          <ins className={styles.current}>
            <span className="sr-only">Sale price: </span>
            {formatPrice(product.price)}
          </ins>
          <del className={styles.old}>
            <span className="sr-only">Original price: </span>
            {formatPrice(product.regularPrice)}
          </del>
        </>
      ) : (
        <span className={styles.current}>{formatPrice(product.price)}</span>
      )}
    </span>
  );
}
