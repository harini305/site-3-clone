import SectionHeading from '@/components/ui/SectionHeading';
import CheckoutView from '@/components/shop/CheckoutView';

export const metadata = {
  title: 'Checkout',
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 110 }}>
      <SectionHeading as="h1" script="Almost There" title="Checkout" />
      <CheckoutView />
    </div>
  );
}
