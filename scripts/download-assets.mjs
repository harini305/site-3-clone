// Downloads the reference/demo images used during development.
// These come from the Phlox "Shop Confectionery" theme demo and are for
// local review only — replace them before any public production launch.
// Re-run with `npm run assets` (existing files are skipped; pass --force to refresh).
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://demo.phlox.pro/shop-confectionery/wp-content/uploads/sites/268/';
const OUT = path.join(process.cwd(), 'public', 'images');
const force = process.argv.includes('--force');

export const manifest = {
  'brand/logo.png': '2021/03/Group_10183.png',
  'brand/empty-cart.jpg': '2021/05/Group_10118.jpg',

  'hero/cookie.png': '2021/03/landing-slider-1.png',
  'hero/pastry.png': '2021/03/h-5-slider-img-10.png',
  'hero/wheat-sketch.png': '2021/03/landing-slider-9.png',
  'hero/tart.png': '2021/03/landing-slider-7.png',
  'hero/croissant-sketch.png': '2021/03/landing-slider-4.png',
  'hero/seeds.png': '2021/03/landing-slider-5.png',
  'hero/bake-lettering.png': '2021/03/landing-slider-2.png',
  'categories/croissants.png': '2021/03/peniv4fr.png',

  'categories/donuts-bg.jpg': '2021/05/close-up-glazed-donuts-1.jpg',
  'categories/chocolate-bg.jpg': '2021/05/top-view-tasty-chocolate-bars.jpg',
  'categories/cupcake.png': '2021/03/Chocolate-Flower-Cupcake-1351x1520-1.png',
  'categories/homemade-badge.png': '2021/03/Group-10178.png',
  'categories/macaron.png': '2021/03/home-3-slide-2-image-2.png',
  'categories/croissant-badge.png': '2021/03/Group-10197.png',

  'products/cupcake.jpg': '2021/03/Group-10200.jpg',
  'products/mini-chocolate-cake.jpg': '2021/03/Group-10201.jpg',
  'products/berry-slice.jpg': '2021/03/Group-10209.jpg',
  'products/sponge-cake.jpg': '2021/03/Group-10208.jpg',
  'products/layer-cake.jpg': '2021/03/Group-10203.jpg',
  'products/truffle.jpg': '2021/03/Group-10207.jpg',
  'products/bundt-cake.jpg': '2021/03/Group-10206.jpg',
  'products/tiramisu.jpg': '2021/03/Group-10205.jpg',

  'banners/cupcakes-promo.jpg': '2021/03/chocolate-walnut-muffins-with-coffee-cup-with-walnuts-dark-surface.jpg',
  'banners/macaron-cake-promo.jpg': '2021/03/front-view-delicious-chocolate-cake-stand-with-copy-space.jpg',
  'banners/subscribe.jpg': '2021/03/front-view-delicious-cake-concept.jpg',
  'banners/shop-titlebar.jpg': '2021/06/titlebar_image-scaled.jpg',

  'testimonials/customer-1.png': '2021/03/pexels-tim-douglas-6210701.png',
  'testimonials/customer-2.png': '2021/03/pexels-tim-douglas-6205769.png',
  'testimonials/customer-3.png': '2021/03/pexels-sides-imagery-3351927.png',

  'about/bakery-window.jpg': '2021/03/pexels-lisa-fotios-3341067.jpg',
  'about/pancake.jpg': '2021/03/pexels-pixabay-236804.jpg',

  'blog/pancake.jpg': '2021/03/pexels-pixabay-236804-1.jpg',
  'blog/orange-donuts.jpg': '2021/03/DSC_00026-40356-original-protected.jpg',
  'blog/cocoa.jpg': '2021/03/IMG_7004-14212-original-protected.jpg',
  'blog/sugar-cake.jpg': '2021/03/henry-be-_y5CCcYWTjU-unsplash.jpg',
  'blog/berry-cake.jpg': '2021/03/chocolate-cake-with-whipped-cream-fruits.jpg',
  'blog/orange-cake.jpg': '2021/03/swapnil-dwivedi-Nl8Oa6ZuNcA-unsplash.jpg',
  'blog/citrus-tarts.jpg': '2021/03/kim-daniels-OrkEasJeY74-unsplash.jpg',
  'blog/drip-cake.jpg': '2021/03/phinehas-adams-wp4ZYmUuJBk-unsplash.jpg',
};

async function exists(p) { try { await access(p); return true; } catch { return false; } }

let ok = 0, skipped = 0, failed = 0;
for (const [local, remote] of Object.entries(manifest)) {
  const dest = path.join(OUT, local);
  if (!force && await exists(dest)) { skipped++; continue; }
  try {
    const res = await fetch(BASE + remote, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++; console.log('✓', local);
  } catch (e) { failed++; console.error('✗', local, '←', remote, e.message); }
}
console.log(`done: ${ok} downloaded, ${skipped} skipped, ${failed} failed`);
if (failed) process.exitCode = 1;
