export const categories = [
  { slug: 'all-product', name: 'All Product' },
  { slug: 'cake', name: 'Cake' },
  { slug: 'cupcake', name: 'Cupcake' },
  { slug: 'dessert', name: 'Dessert' },
  { slug: 'donuts', name: 'Donuts' },
  { slug: 'food', name: 'Food' },
  { slug: 'sandwiche', name: 'Sandwiche' },
];

export const sizes = [
  { slug: 'all-size', name: 'All Size' },
  { slug: 'large', name: 'Large' },
  { slug: 'medium', name: 'Medium' },
  { slug: 'small', name: 'Small' },
];

const img = (name) => `/images/products/${name}.jpg`;

const sharedDetails = {
  ingredients: 'Wheat flour, butter, free-range eggs, cane sugar, Belgian cocoa, fresh cream',
  allergens: 'Contains gluten, eggs and milk. Made in a kitchen that handles nuts.',
  shelfLife: 'Best enjoyed within 3 days. Keep refrigerated.',
};

export const products = [
  {
    slug: 'chocolate-cake',
    name: 'Chocolate Cake',
    price: 21,
    rating: 4,
    images: [img('cupcake'), img('mini-chocolate-cake'), img('truffle')],
    categories: ['all-product', 'cake', 'cupcake', 'dessert'],
    sizes: ['all-size', 'large', 'medium', 'small'],
    short:
      'A rich cocoa sponge crowned with ruffled ganache petals and a glossy cherry on top — our most-loved single-serve treat.',
  },
  {
    slug: 'cupcake-basket',
    name: 'Cupcake Basket',
    price: 32,
    rating: 5,
    images: [img('truffle'), img('mini-chocolate-cake')],
    categories: ['all-product', 'cake', 'donuts'],
    sizes: ['all-size', 'medium', 'small'],
    short:
      'A gift basket of hand-dipped chocolate bombes with a soft truffle centre, packed to share with the people you love.',
  },
  {
    slug: 'choco-cherry',
    name: 'Choco Cherry',
    price: 28,
    rating: 5,
    images: [img('berry-slice'), img('cupcake')],
    categories: ['all-product', 'dessert', 'food'],
    sizes: ['all-size', 'medium', 'small'],
    short:
      'Layers of chocolate sponge and vanilla mousse finished with a bright forest-berry glaze that sets like stained glass.',
  },
  {
    slug: 'party-cake',
    name: 'Party Cake',
    price: 42,
    rating: 3,
    images: [img('sponge-cake'), img('layer-cake')],
    categories: ['all-product', 'food'],
    sizes: ['all-size', 'large'],
    short:
      'A golden butter sponge topped with pistachio cream and chocolate sprinkles. Big enough for the whole table.',
  },
  {
    slug: 'cream-cookies',
    name: 'Cream Cookies',
    price: 34,
    rating: 3,
    images: [img('layer-cake'), img('berry-slice')],
    categories: ['all-product', 'cake', 'food'],
    sizes: ['all-size', 'large'],
    short:
      'A celebration torte of cookie crumb, whipped cream and raspberry, studded with chocolate pearls and golden crunch.',
  },
  {
    slug: 'fruit-cherry',
    name: 'Fruit Cherry',
    price: 23,
    rating: 5,
    images: [img('mini-chocolate-cake'), img('layer-cake')],
    categories: ['all-product', 'dessert', 'donuts'],
    sizes: ['all-size', 'medium', 'small'],
    short:
      'A petite chocolate cake hiding a sour-cherry compote centre, wrapped in curls of dark chocolate.',
  },
  {
    slug: 'cereal-donut',
    name: 'Cereal Donut',
    price: 16,
    salePrice: 16,
    regularPrice: 28,
    rating: 5,
    images: [img('bundt-cake'), img('sponge-cake')],
    categories: ['all-product', 'cake', 'donuts', 'sandwiche'],
    sizes: ['all-size', 'large', 'small'],
    short:
      'A tender bundt ring drizzled with white icing and scattered with toasted nuts and cranberries. On sale this week.',
  },
  {
    slug: 'tiramisu-cake',
    name: 'Tiramisu Cake',
    price: 37,
    rating: 3,
    images: [img('tiramisu'), img('cupcake')],
    categories: ['all-product', 'cake', 'dessert', 'donuts'],
    sizes: ['all-size', 'large'],
    short:
      'Espresso-soaked sponge, mascarpone cream and a dusting of cocoa, finished with our hand-piped chocolate plaque.',
  },
].map((p) => ({
  ...p,
  details: sharedDetails,
  reviews: buildReviews(p.slug, p.rating),
}));

function buildReviews(slug, rating) {
  const pool = [
    {
      author: 'Amelia R.',
      date: 'April 2, 2021',
      text: 'Ordered this for my mother’s birthday and it arrived looking exactly like the photo. Moist, not too sweet, and gone within the hour.',
    },
    {
      author: 'Daniel K.',
      date: 'April 6, 2021',
      text: 'Lovely texture and you can really taste the quality of the chocolate. Will be ordering again for the office.',
    },
    {
      author: 'Priya S.',
      date: 'April 9, 2021',
      text: 'Beautifully packed and the delivery was on time. My kids have already asked when we can have it again.',
    },
  ];
  const count = slug === 'chocolate-cake' ? 3 : (slug.length % 3) + 1;
  return pool.slice(0, count).map((r, i) => ({ ...r, rating: Math.max(3, rating - (i % 2)) }));
}

export const bestSellerOrder = [
  'chocolate-cake',
  'cupcake-basket',
  'choco-cherry',
  'party-cake',
  'cream-cookies',
  'fruit-cherry',
  'cereal-donut',
  'tiramisu-cake',
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function productsInCategory(slug) {
  return products.filter((p) => p.categories.includes(slug));
}

export function getBestSellers() {
  return bestSellerOrder.map(getProduct);
}

export function getRelatedProducts(product, limit = 4) {
  return products
    .filter((p) => p.slug !== product.slug)
    .sort(
      (a, b) =>
        b.categories.filter((c) => product.categories.includes(c)).length -
        a.categories.filter((c) => product.categories.includes(c)).length,
    )
    .slice(0, limit);
}

export function sortProducts(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case 'popularity':
      return sorted.sort((a, b) => b.reviews.length - a.reviews.length);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newness':
      return sorted.reverse();
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'newness', label: 'Newness' },
  { value: 'price-asc', label: 'Low Price' },
  { value: 'price-desc', label: 'High Price' },
];

export const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};
