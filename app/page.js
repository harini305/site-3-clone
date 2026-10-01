import Hero from '@/components/sections/Hero';
import ShopByCategory from '@/components/sections/ShopByCategory';
import BestSellers from '@/components/sections/BestSellers';
import PromoBanners from '@/components/sections/PromoBanners';
import Testimonials from '@/components/sections/Testimonials';
import LatestPosts from '@/components/sections/LatestPosts';

export const metadata = {
  title: { absolute: 'Phlox Candy — Make Your Baking Better Tasting' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <BestSellers />
      <PromoBanners />
      <Testimonials />
      <LatestPosts />
    </>
  );
}
