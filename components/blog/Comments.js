'use client';

import { useState } from 'react';
import { IoHeart, IoReturnDownForward, IoPersonCircle } from 'react-icons/io5';
import Button from '@/components/ui/Button';
import { sampleComments } from '@/data/posts';
import styles from './Comments.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Comment({ c, onLike, onReply, isReply }) {
  return (
    <article className={`${styles.comment} ${isReply ? styles.reply : ''}`}>
      <header className={styles.head}>
        <IoPersonCircle className={styles.avatar} aria-hidden="true" />
        <div className={styles.who}>
          <h3>{c.author}</h3>
          <time>{c.date}</time>
        </div>
      </header>
      <p className={styles.text}>{c.text}</p>
      <footer className={styles.foot}>
        <button type="button" onClick={() => onLike(c.id)} aria-label={`Like comment by ${c.author}, ${c.likes} likes`}>
          <IoHeart aria-hidden="true" /> ({c.likes})
        </button>
        {!isReply && (
          <button type="button" onClick={() => onReply(c)} className={styles.replyBtn}>
            (Reply)
          </button>
        )}
      </footer>
    </article>
  );
}

/** Comment thread + form. New comments only live in this page view (demo). */
export default function Comments() {
  const [comments, setComments] = useState(sampleComments);
  const [replyTo, setReplyTo] = useState(null);
  const [values, setValues] = useState({ name: '', email: '', website: '', comment: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const total = comments.reduce((n, c) => n + 1 + c.replies.length, 0);

  const like = (id) =>
    setComments((list) =>
      list.map((c) =>
        c.id === id
          ? { ...c, likes: c.likes + 1 }
          : { ...c, replies: c.replies.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r)) },
      ),
    );

  const startReply = (c) => {
    setReplyTo(c);
    document.getElementById('comment-text')?.focus();
  };

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!values.name.trim()) err.name = 'Name is required.';
    if (!EMAIL_RE.test(values.email)) err.email = 'A valid email is required.';
    if (!values.comment.trim()) err.comment = 'Please write a comment.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const entry = {
      id: `n${Date.now()}`,
      author: values.name.trim(),
      date: new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' }).replace(',', ' at'),
      text: values.comment.trim(),
      likes: 0,
      replies: [],
    };
    setComments((list) =>
      replyTo ? list.map((c) => (c.id === replyTo.id ? { ...c, replies: [...c.replies, entry] } : c)) : [...list, entry],
    );
    setValues({ name: '', email: '', website: '', comment: '' });
    setReplyTo(null);
    setDone(true);
  };

  return (
    <>
      <section className={styles.thread} aria-labelledby="responses-title">
        <h2 id="responses-title" className={styles.count}>
          {total} Responses
        </h2>
        <ol className={styles.list}>
          {comments.map((c) => (
            <li key={c.id}>
              <Comment c={c} onLike={like} onReply={startReply} />
              {c.replies.length > 0 && (
                <ol className={styles.replies}>
                  {c.replies.map((r) => (
                    <li key={r.id}>
                      <IoReturnDownForward className={styles.arrow} aria-hidden="true" />
                      <Comment c={r} onLike={like} isReply />
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </section>

      <form className={styles.form} onSubmit={submit} noValidate aria-labelledby="comment-form-title">
        <h2 id="comment-form-title">{replyTo ? `Reply to ${replyTo.author}` : 'Add a Comment'}</h2>
        {replyTo && (
          <button type="button" className={styles.cancel} onClick={() => setReplyTo(null)}>
            Cancel reply
          </button>
        )}
        <p className={styles.note}>Your email address will not be published. Required fields are marked *</p>
        <div className={styles.row}>
          <div>
            <label htmlFor="comment-name" className="sr-only">Name (required)</label>
            <input id="comment-name" className="field" placeholder="Name (Required)" value={values.name} onChange={set('name')} aria-invalid={errors.name ? 'true' : undefined} autoComplete="name" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="comment-email" className="sr-only">E-mail (required)</label>
            <input id="comment-email" type="email" className="field" placeholder="E-Mail (Required)" value={values.email} onChange={set('email')} aria-invalid={errors.email ? 'true' : undefined} autoComplete="email" />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
        </div>
        <label htmlFor="comment-website" className="sr-only">Website</label>
        <input id="comment-website" type="url" className="field" placeholder="Website" value={values.website} onChange={set('website')} autoComplete="url" />
        <div>
          <label htmlFor="comment-text" className="sr-only">Comment</label>
          <textarea id="comment-text" className="field" placeholder="Comment" value={values.comment} onChange={set('comment')} aria-invalid={errors.comment ? 'true' : undefined} />
          {errors.comment && <span className="field-error">{errors.comment}</span>}
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
        {done && (
          <p className="form-success" role="status">
            Comment added to this page. (Demo only — comments are not saved.)
          </p>
        )}
      </form>
    </>
  );
}
