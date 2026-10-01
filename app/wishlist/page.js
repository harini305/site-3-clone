import SectionHeading from '@/components/ui/SectionHeading';
import WishlistView from '@/components/shop/WishlistView';

export const metadata = {
  title: 'Wishlist',
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 110 }}>
      <SectionHeading as="h1" script="Saved For Later" title="Wishlist" />
      <WishlistView />
    </div>
  );
}
