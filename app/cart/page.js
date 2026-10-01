import SectionHeading from '@/components/ui/SectionHeading';
import CartView from '@/components/shop/CartView';

export const metadata = {
  title: 'Cart',
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 110 }}>
      <SectionHeading as="h1" script="Your Basket" title="Cart" />
      <CartView />
    </div>
  );
}
