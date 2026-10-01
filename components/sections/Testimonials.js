'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import SectionHeading from '@/components/ui/SectionHeading';
import Rating from '@/components/ui/Rating';
import Reveal from '@/components/ui/Reveal';
import { testimonials } from '@/data/home';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            script="Testimonial"
            title="We Care About Our Customers Experience Too"
            className={styles.heading}
          />
        </Reveal>
        <Reveal effect="fade" duration={1.2}>
          <Swiper
            modules={[A11y, Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            breakpoints={{ 600: { slidesPerView: 2 }, 1025: { slidesPerView: 4, autoplay: false } }}
            a11y={{ prevSlideMessage: 'Previous testimonial', nextSlideMessage: 'Next testimonial' }}
            className={styles.swiper}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <figure className={styles.item}>
                  <Image src={t.image} alt={`Portrait of ${t.name}`} width={147} height={147} className={styles.avatar} />
                  <figcaption>
                    <h3 className={styles.name}>{t.name}</h3>
                    <p className={styles.company}>{t.company}</p>
                  </figcaption>
                  <blockquote className={styles.quote}>
                    <p>{t.text}</p>
                  </blockquote>
                  <Rating value={5} size={17} />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
}
