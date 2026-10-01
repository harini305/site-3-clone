import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Parallax from '@/components/ui/Parallax';
import Reveal from '@/components/ui/Reveal';
import styles from './ShopByCategory.module.css';

export default function ShopByCategory() {
  return (
    <section className="section" aria-labelledby="categories-title">
      <div className="container">
        <Reveal>
          <SectionHeading id="categories-title" script="Which One" title="Shop By Category" />
        </Reveal>

        <Reveal className={styles.grid} stagger={0.12}>
          <article className={`${styles.card} ${styles.donuts} ${styles.dark}`}>
            <Parallax src="/images/categories/donuts-bg.jpg" position="left center" />
            <div className={styles.text}>
              <p className="script">Coffee</p>
              <h3>Local Donuts</h3>
              <p>Glazed, sugared and filled — fried in small batches all morning long.</p>
              <Button href="/product-category/donuts" size="sm">
                Browse Shop
              </Button>
            </div>
          </article>

          <Link href="/product-category/cupcake" className={`${styles.card} ${styles.badgeCard} ${styles.cupcake}`}>
            <span className="sr-only">Homemade cupcakes — browse cupcakes</span>
            <Image src="/images/categories/homemade-badge.png" alt="" width={305} height={184} className={styles.badge} />
            <Image src="/images/categories/cupcake.png" alt="" width={103} height={115} className={styles.cupcakeImg} />
          </Link>

          <article className={`${styles.card} ${styles.chocolate} ${styles.dark}`}>
            <Parallax src="/images/categories/chocolate-bg.jpg" position="center bottom" />
            <div className={styles.text}>
              <p className="script">Breakfast</p>
              <h3>Chocolate Cake</h3>
              <p>Dark, glossy and indulgent. Our cocoa cakes start your day the sweet way.</p>
              <Button href="/product-category/cake" size="sm">
                Browse Shop
              </Button>
            </div>
          </article>

          <Link href="/product-category/food" className={`${styles.card} ${styles.badgeCard} ${styles.croissant}`}>
            <span className="sr-only">Croissants — browse baked goods</span>
            <Image src="/images/categories/macaron.png" alt="" width={181} height={177} className={styles.macaron} />
            <Image src="/images/categories/croissant-badge.png" alt="" width={240} height={98} className={styles.croissantBadge} />
          </Link>

          <article className={`${styles.card} ${styles.cherry}`}>
            <div className={styles.text}>
              <p className="script">Which One</p>
              <h3>Choco Cherry</h3>
              <p>Buttery croissants and berry slices, finished with a drizzle of chocolate.</p>
              <Button href="/product/choco-cherry" size="sm">
                Browse Shop
              </Button>
            </div>
            <Image
              src="/images/categories/croissants.png"
              alt="Two croissants, one dusted with sugar and one drizzled with chocolate"
              width={376}
              height={376}
              className={styles.cherryImg}
            />
          </article>
        </Reveal>
      </div>
    </section>
  );
}
