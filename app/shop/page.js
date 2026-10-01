import PageTitle from '@/components/layout/PageTitle';
import ShopView from '@/components/shop/ShopView';

export const metadata = {
  title: 'Shop',
  description: 'Browse cakes, cupcakes, donuts and desserts baked fresh by Phlox Candy.',
};

export default function ShopPage() {
  return (
    <>
      <PageTitle title="Shop Page" crumbs={[{ label: 'Products' }]} />
      <ShopView />
    </>
  );
}
