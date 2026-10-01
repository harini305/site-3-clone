import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts, getPost, formatPostDate } from '@/data/posts';
import Reveal from '@/components/ui/Reveal';
import PostActions from '@/components/blog/PostActions';
import Comments from '@/components/blog/Comments';
import styles from './post.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: 'article', images: [post.image] },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const index = posts.indexOf(post);
  const prev = posts[index - 1];
  const next = posts[index + 1];

  return (
    <article className="container">
      <Reveal effect="scale" className={styles.cover}>
        <Image src={post.image} alt="" fill priority sizes="(max-width: 1440px) 95vw, 1370px" className={styles.coverImg} />
      </Reveal>

      <div className={styles.body}>
        <Reveal as="header" className={styles.header} stagger={0.1}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.meta}>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span>By {post.author}</span>
            <span>{post.category}</span>
          </p>
        </Reveal>

        <Reveal className={styles.content}>
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>

        <div className={styles.tags}>
          <p>
            Tags: <Link href="/blog">Blog</Link>
          </p>
          <PostActions title={post.title} />
        </div>

        <nav className={styles.pager} aria-label="More posts">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} rel="prev">
              <span>← Previous post</span>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} rel="next" className={styles.next}>
              <span>Next post →</span>
              {next.title}
            </Link>
          )}
        </nav>

        <Comments />
      </div>
    </article>
  );
}
