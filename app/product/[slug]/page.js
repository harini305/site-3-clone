import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProduct, getCategory, getRelatedProducts } from '@/data/products';
import ProductGallery from '@/components/shop/ProductGallery';
import ProductActions from '@/components/shop/ProductActions';
import ProductTabs from '@/components/shop/ProductTabs';
import ProductCard from '@/components/ui/ProductCard';
import Rating from '@/components/ui/Rating';
import Price from '@/components/ui/Price';
import Reveal from '@/components/ui/Reveal';
import styles from './product.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.short,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);
  const cats = product.categories.map(getCategory).filter(Boolean);

  return (
    <>
      <div className="container">
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Products</Link>
            </li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className={styles.top}>
          <Reveal effect="fade">
            <ProductGallery images={product.images} name={product.name} onSale={Boolean(product.regularPrice)} />
          </Reveal>
          <Reveal className={styles.summary} stagger={0.08}>
            <h1 className={styles.title}>{product.name}</h1>
            <Price product={product} size="lg" />
            <p className={styles.rating}>
              <Rating value={product.rating} />
              <a href="#reviews">
                ({product.reviews.length} customer review{product.reviews.length === 1 ? '' : 's'})
              </a>
            </p>
            <p className={styles.short}>{product.short}</p>
            <ProductActions product={product} />
            <p className={styles.cats}>
              <strong>Categories</strong>{' '}
              {cats.map((c, i) => (
                <span key={c.slug}>
                  <Link href={c.slug === 'all-product' ? '/shop' : `/product-category/${c.slug}`}>{c.name}</Link>
                  {i < cats.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </Reveal>
        </div>

        <ProductTabs product={product} />

        <section className={styles.related} aria-labelledby="related-title">
          <Reveal>
            <h2 id="related-title" className={styles.relatedTitle}>
              Related Products
            </h2>
            <p className={styles.relatedSub}>Sitewide discounts — savings of up to 25%</p>
          </Reveal>
          <Reveal className={styles.relatedGrid} stagger={0.08}>
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </Reveal>
        </section>
      </div>
    </>
  );
}
