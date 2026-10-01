'use client';

import { useState } from 'react';
import { IoHeart, IoHeartOutline, IoShareSocialOutline } from 'react-icons/io5';
import { useStore } from '@/context/StoreContext';
import styles from './PostActions.module.css';

export default function PostActions({ title }) {
  const { notify } = useStore();
  const [liked, setLiked] = useState(false);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        notify('Post link copied to clipboard.');
      }
    } catch {
      /* cancelled */
    }
  };

  return (
    <div className={styles.actions}>
      <button type="button" onClick={() => setLiked((l) => !l)} aria-pressed={liked} aria-label={liked ? 'Unlike this post' : 'Like this post'} className={liked ? styles.liked : undefined}>
        {liked ? <IoHeart aria-hidden="true" /> : <IoHeartOutline aria-hidden="true" />}
      </button>
      <button type="button" onClick={share} aria-label="Share this post">
        <IoShareSocialOutline aria-hidden="true" />
      </button>
    </div>
  );
}
