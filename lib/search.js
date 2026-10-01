import { products } from '@/data/products';
import { posts } from '@/data/posts';

const normalise = (s) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

/** Simple client/server search across products and blog posts. */
export function searchSite(query, limit = Infinity) {
  const q = normalise(query || '').trim();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);
  const matches = (text) => terms.every((t) => normalise(text).includes(t));

  const productHits = products
    .filter((p) => matches(`${p.name} ${p.short} ${p.categories.join(' ')}`))
    .map((p) => ({ type: 'Product', title: p.name, href: `/product/${p.slug}`, image: p.images[0], price: p.price, product: p }));

  const postHits = posts
    .filter((p) => matches(`${p.title} ${p.excerpt} ${p.category}`))
    .map((p) => ({ type: 'Blog', title: p.title, href: `/blog/${p.slug}`, image: p.image, post: p }));

  return [...productHits, ...postHits].slice(0, limit);
}
