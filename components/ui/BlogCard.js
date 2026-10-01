import Image from 'next/image';
import Link from 'next/link';
import { formatPostDate } from '@/data/posts';
import styles from './BlogCard.module.css';

export default function BlogCard({ post }) {
  return (
    <article className={styles.card}>
      <Link href={`/blog/${post.slug}`} className={styles.link}>
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(max-width: 767px) 92vw, (max-width: 1024px) 46vw, 31vw"
          className={styles.image}
        />
        <div className={styles.info}>
          <time dateTime={post.date} className={styles.date}>
            {formatPostDate(post.date)}
          </time>
          <h3 className={styles.title}>{post.title}</h3>
        </div>
      </Link>
    </article>
  );
}
