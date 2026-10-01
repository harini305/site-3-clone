import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/ui/ProductCard';
import Reveal from '@/components/ui/Reveal';
import { getBestSellers } from '@/data/products';
import styles from './BestSellers.module.css';

export default function BestSellers() {
  const products = getBestSellers();
  return (
    <section className={styles.section} aria-labelledby="best-title">
      <div className="container">
        <Reveal>
          <SectionHeading id="best-title" script="Best Seller" title="Best Seller This Week!" />
        </Reveal>
        <Reveal className={styles.grid} stagger={0.08}>
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
