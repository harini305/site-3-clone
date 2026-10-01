import { notFound } from 'next/navigation';
import PageTitle from '@/components/layout/PageTitle';
import ShopView from '@/components/shop/ShopView';
import { categories, getCategory } from '@/data/products';

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.filter((c) => c.slug !== 'all-product').map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} — Shop`,
    description: `Freshly baked ${category.name.toLowerCase()} from Phlox Candy.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <PageTitle title={category.name} crumbs={[{ label: 'Products', href: '/shop' }, { label: category.name }]} />
      <ShopView category={slug} heading={category.name} />
    </>
  );
}
