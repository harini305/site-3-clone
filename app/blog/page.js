import BlogCard from '@/components/ui/BlogCard';
import Reveal from '@/components/ui/Reveal';
import { posts } from '@/data/posts';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog',
  description: 'Recipes, baking tips and stories from the Phlox Candy kitchen.',
};

export default function BlogPage() {
  return (
    <div className="container">
      <h1 className="sr-only">Blog</h1>
      <Reveal className={styles.grid} stagger={0.08}>
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </Reveal>
    </div>
  );
}
