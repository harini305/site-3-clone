'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Navigation, Thumbs } from 'swiper/modules';
import { IoSearchOutline, IoClose } from 'react-icons/io5';
import useDialog from '@/lib/useDialog';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './ProductGallery.module.css';

export default function ProductGallery({ images, name, onSale }) {
  const [thumbs, setThumbs] = useState(null);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const dialogRef = useDialog(zoom, () => setZoom(false));

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        {onSale && <span className={styles.badge}>Sale!</span>}
        <button type="button" className={styles.zoom} onClick={() => setZoom(true)} aria-label="Enlarge image">
          <IoSearchOutline aria-hidden="true" />
        </button>
        <Swiper
          modules={[A11y, Keyboard, Navigation, Thumbs]}
          navigation={images.length > 1}
          keyboard={{ enabled: true, onlyInViewport: true }}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
          onSlideChange={(s) => setActive(s.activeIndex)}
          className={styles.swiper}
        >
          {images.map((src, i) => (
            <SwiperSlide key={src}>
              <div className={styles.frame}>
                <Image
                  src={src}
                  alt={i === 0 ? name : `${name} — view ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className={styles.img}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {images.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbs}
          slidesPerView={4}
          spaceBetween={14}
          watchSlidesProgress
          className={styles.thumbs}
        >
          {images.map((src, i) => (
            <SwiperSlide key={src} className={styles.thumbSlide}>
              <div className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}>
                <Image src={src} alt={`Show image ${i + 1}`} fill sizes="120px" className={styles.img} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {zoom && (
        <div ref={dialogRef} className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${name} image`} onClick={() => setZoom(false)}>
          <button type="button" className={styles.close} onClick={() => setZoom(false)} aria-label="Close enlarged image">
            <IoClose aria-hidden="true" />
          </button>
          <div className={styles.lightboxImg} onClick={(e) => e.stopPropagation()}>
            <Image src={images[active]} alt={name} fill sizes="90vw" className={styles.contain} />
          </div>
        </div>
      )}
    </div>
  );
}
