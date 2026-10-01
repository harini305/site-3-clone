import Button from '@/components/ui/Button';
import Parallax from '@/components/ui/Parallax';
import Reveal from '@/components/ui/Reveal';
import styles from './PromoBanners.module.css';

export default function PromoBanners() {
  return (
    <section className={styles.section} aria-label="Featured offers">
      <Reveal className={`container ${styles.grid}`} stagger={0.15}>
        <article className={`${styles.banner} ${styles.small}`}>
          <Parallax src="/images/banners/cupcakes-promo.jpg" position="center bottom" />
          <div className={styles.text}>
            <p className="script">Cup Cake</p>
            <h2>
              Unique <span className={styles.thin}>Sweets</span> For Lovers
            </h2>
            <Button href="/product-category/cupcake" size="sm">
              Shop Now
            </Button>
          </div>
        </article>

        <article className={`${styles.banner} ${styles.large}`}>
          <Parallax src="/images/banners/macaron-cake-promo.jpg" position="center" />
          <div className={styles.text}>
            <p className="script">Shop Confectionery</p>
            <h2>
              Raspberry <span className={styles.thin}>French</span> Macaron Cake
            </h2>
            <p className={styles.copy}>Chocolate sponge, hazelnut praline and torched meringue in every slice.</p>
            <Button href="/shop" size="sm">
              Shop Now
            </Button>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
