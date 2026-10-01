export const site = {
  name: 'Phlox Candy',
  tagline: 'Confectionery shop',
  description:
    'Phlox Candy is a neighbourhood confectionery shop baking cakes, cupcakes, donuts and desserts fresh every morning.',
  phone: '+1 86.36.166',
  phoneHref: 'tel:+18636166',
  email: 'contact@yourdomain.com',
  office: ['Patricia C. 4401 Waldeck Street', 'Grapevine Nashville, Tx'],
  officeEmails: ['info@yourdomain.com', 'info@dataanalytics.com'],
  officePhones: ['+99 (0) 101 0000 888', '+99 (0) 555 6759 126'],
  mapQuery: '4401 Waldeck Street, Grapevine, TX',
};

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// The reference footer links all point to "#". They are mapped to the closest
// real page here instead of inventing extra pages.
export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Universal Cake', href: '/product-category/cake' },
      { label: 'Candy', href: '/product-category/dessert' },
      { label: 'Confectionery', href: '/shop' },
      { label: 'Gifts', href: '/product/cupcake-basket' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Condition', href: '/about' },
      { label: 'Open A Shop', href: '/contact' },
      { label: 'Licensing & Terms', href: '/about' },
      { label: 'Technology', href: '/blog' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Mission', href: '/about' },
      { label: 'Our Story', href: '/about' },
      { label: 'Our Culture', href: '/about' },
      { label: 'Team', href: '/about' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Getting Started', href: '/shop' },
      { label: 'Help Center', href: '/contact' },
      { label: 'Suggest A Feature', href: '/contact' },
      { label: 'Report A Bug', href: '/contact' },
    ],
  },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'Twitter', href: 'https://twitter.com/', icon: 'twitter' },
];
