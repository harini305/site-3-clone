import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/ui/BlogCard';
import Reveal from '@/components/ui/Reveal';
import { posts } from '@/data/posts';
import styles from './LatestPosts.module.css';

export default function LatestPosts() {
  return (
    <section className={styles.section} aria-labelledby="posts-title">
      <div className="container">
        <Reveal>
          <SectionHeading id="posts-title" script="Blog" title="Latest Posts" />
        </Reveal>
        <Reveal className={styles.grid} stagger={0.12}>
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
