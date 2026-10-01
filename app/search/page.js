import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/ui/ProductCard';
import BlogCard from '@/components/ui/BlogCard';
import SearchForm from '@/components/ui/SearchForm';
import { searchSite } from '@/lib/search';
import styles from './search.module.css';

export async function generateMetadata({ searchParams }) {
  const { s = '' } = await searchParams;
  return { title: s ? `Search results for “${s}”` : 'Search', robots: { index: false } };
}

export default async function SearchPage({ searchParams }) {
  const { s = '' } = await searchParams;
  const query = String(s).slice(0, 100);
  const results = searchSite(query);
  const products = results.filter((r) => r.type === 'Product');
  const posts = results.filter((r) => r.type === 'Blog');

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 110 }}>
      <SectionHeading as="h1" script="Search" title={query ? `Results for “${query}”` : 'Search the shop'} />
      <div className={styles.form}>
        <SearchForm defaultValue={query} />
      </div>

      {query && results.length === 0 && (
        <p className={styles.none}>Nothing matched your search. Try “cake”, “chocolate” or “donut”.</p>
      )}

      {products.length > 0 && (
        <section aria-labelledby="sr-products" className={styles.section}>
          <h2 id="sr-products" className={styles.h2}>
            Products ({products.length})
          </h2>
          <div className={styles.products}>
            {products.map((r) => (
              <ProductCard key={r.href} product={r.product} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section aria-labelledby="sr-posts" className={styles.section}>
          <h2 id="sr-posts" className={styles.h2}>
            Blog posts ({posts.length})
          </h2>
          <div className={styles.posts}>
            {posts.map((r) => (
              <BlogCard key={r.href} post={r.post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
