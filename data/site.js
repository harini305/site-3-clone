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

// The reference footer links all point to "#". Each one is given its own real
// destination here (a page or a section of a page).
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
      { label: 'Condition', href: '/terms#conditions' },
      { label: 'Open A Shop', href: '/contact?topic=shop#contact-form' },
      { label: 'Licensing & Terms', href: '/terms#licensing' },
      { label: 'Technology', href: '/blog' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Mission', href: '/about#mission' },
      { label: 'Our Story', href: '/about#story' },
      { label: 'Our Culture', href: '/about#culture' },
      { label: 'Team', href: '/about#team' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Getting Started', href: '/contact#faq-order' },
      { label: 'Help Center', href: '/contact#help' },
      { label: 'Suggest A Feature', href: '/contact?topic=feature#contact-form' },
      { label: 'Report A Bug', href: '/contact?topic=bug#contact-form' },
    ],
  },
];

export const contactTopics = [
  { value: 'general', label: 'General question' },
  { value: 'order', label: 'Custom order' },
  { value: 'shop', label: 'Open a shop / wholesale' },
  { value: 'feature', label: 'Suggest a feature' },
  { value: 'bug', label: 'Report a bug' },
];

export const faqs = [
  {
    id: 'faq-order',
    q: 'How do I place an order?',
    a: 'Browse the shop, add cakes to your basket and go to checkout. Choose a pickup or delivery date and we will bake your order fresh that morning.',
  },
  {
    id: 'faq-custom',
    q: 'Can you make a custom cake?',
    a: 'Yes. Send us a message with the occasion, size and design you have in mind. We ask for at least three days’ notice for celebration cakes.',
  },
  {
    id: 'faq-delivery',
    q: 'Do you deliver?',
    a: 'We deliver within 15 miles of the shop, Tuesday to Saturday. Orders placed before 10am can also be collected the same day.',
  },
  {
    id: 'faq-allergens',
    q: 'Do you cater for allergies?',
    a: 'Every product page lists its allergens. Our kitchen handles nuts, gluten, eggs and milk, so we cannot guarantee any product is completely free of them.',
  },
  {
    id: 'faq-storage',
    q: 'How should I store my cake?',
    a: 'Keep cream and mousse cakes refrigerated and enjoy them within three days. Take them out 20 minutes before serving for the best flavour.',
  },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'Twitter', href: 'https://twitter.com/', icon: 'twitter' },
];
