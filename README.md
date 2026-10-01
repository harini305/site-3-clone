# Phlox Candy — Confectionery Shop (clone)

A Next.js (App Router, JavaScript) recreation of the
[Phlox “Shop Confectionery” demo](https://demo.phlox.pro/shop-confectionery/), built for review and
deployment on Vercel.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run start
npm run assets   # re-download reference images (add -- --force to refresh)
```

## Routes

| Route | Notes |
| --- | --- |
| `/` | Hero, shop by category, best sellers, promo banners, testimonials (Swiper), latest posts |
| `/about` | Story timeline with scroll-drawn line |
| `/shop` | Category links, size filter, price range, sort |
| `/product-category/[slug]` | cake, cupcake, dessert, donuts, food, sandwiche |
| `/product/[slug]` | 8 products — gallery + lightbox, quantity, tabs, reviews, related |
| `/blog`, `/blog/[slug]` | 9 posts with comments |
| `/contact` | Validated form, map, contact details |
| `/cart`, `/checkout` | Front-end cart and demo checkout |
| `/my-account` | Login / register (`#register`) |
| `/wishlist` | Saved products (added because the reference has wishlist buttons) |
| `/search?s=` | Product + post results; live results in the header search overlay |

Unknown routes render `app/not-found.js`.

## Demo-only behaviour

There is no backend. Cart and wishlist are kept in `localStorage`. Checkout, login/register,
contact, newsletter, reviews and comments validate in the browser and show a clear “demo only”
message — nothing is sent or stored on a server.

## Structure

```
app/            routes (App Router)
components/
  layout/       TopBar, Header, MiniCart, SearchOverlay, MobileMenu, Footer, SubscribeBanner, PageTitle
  sections/     homepage + about/contact sections
  shop/         ShopView, filters, gallery, tabs, cart, checkout, account, wishlist
  blog/         comments, post actions
  ui/           Button, SectionHeading, ProductCard, BlogCard, Rating, Price, QuantityInput, Toasts, Reveal, Parallax
context/        StoreContext (cart, wishlist, toasts)
data/           products, posts, site + homepage content
lib/            GSAP setup, dialog hook, search, formatting
public/images/  reference assets (see below)
scripts/        download-assets.mjs (asset manifest)
```

## ⚠️ Assets — replace before public production use

All 41 images in `public/images/` are the original files from the Phlox theme demo
(stock photography and theme graphics, including the “Phlox Candy” logo). They are used here for
**development and internal review only**. Their licence for public use has **not** been verified.
`scripts/download-assets.mjs` maps every local file to its source URL so each can be swapped out.

Text content (product descriptions, blog posts, reviews, testimonials) was written for this project
and is not copied from the demo.
