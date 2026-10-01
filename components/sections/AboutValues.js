import Image from 'next/image';
import { IoHeartOutline, IoLeafOutline, IoPeopleOutline, IoSparklesOutline, IoTimeOutline, IoHappyOutline } from 'react-icons/io5';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import styles from './AboutValues.module.css';

const mission = [
  { icon: IoLeafOutline, title: 'Real ingredients', text: 'Butter, free-range eggs and single-origin cocoa — never shortcuts or artificial preservatives.' },
  { icon: IoTimeOutline, title: 'Baked this morning', text: 'Everything on the counter and every order that leaves the kitchen was baked the same day.' },
  { icon: IoHeartOutline, title: 'Made for moments', text: 'Birthdays, weddings or a Tuesday treat — we bake for the occasions people remember.' },
];

const culture = [
  { icon: IoPeopleOutline, title: 'Family kitchen', text: 'Three generations have worked these ovens. New bakers learn side by side with the people who trained us.' },
  { icon: IoSparklesOutline, title: 'Curious by nature', text: 'Each season the team tests new flavours, and the best ones earn a place on the menu.' },
  { icon: IoHappyOutline, title: 'Neighbours first', text: 'Leftover bakes go to local shelters every evening, and our door is always open for a chat.' },
];

const team = [
  { name: 'Clara Bennett', role: 'Head Pastry Chef', image: '/images/testimonials/customer-1.png' },
  { name: 'Lucia Moreno', role: 'Cake Designer', image: '/images/testimonials/customer-2.png' },
  { name: 'Marco Rossi', role: 'Master Baker', image: '/images/testimonials/customer-3.png' },
];

function Cards({ items }) {
  return (
    <Reveal className={styles.cards} stagger={0.12}>
      {items.map(({ icon: Icon, title, text }) => (
        <article key={title} className={styles.card}>
          <span className={styles.icon}>
            <Icon aria-hidden="true" />
          </span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </Reveal>
  );
}

export function AboutMission() {
  return (
    <section id="mission" className={styles.section} aria-labelledby="mission-title">
      <Reveal>
        <SectionHeading id="mission-title" script="Our Mission" title="Make Every Day A Little Sweeter">
          <p>We bake honest, beautiful confectionery so that anyone can turn an ordinary day into a celebration.</p>
        </SectionHeading>
      </Reveal>
      <Cards items={mission} />
    </section>
  );
}

export function AboutCulture() {
  return (
    <section id="culture" className={`${styles.section} ${styles.cream}`} aria-labelledby="culture-title">
      <Reveal>
        <SectionHeading id="culture-title" script="Our Culture" title="Warm Ovens, Warmer People" />
      </Reveal>
      <Cards items={culture} />
    </section>
  );
}

export function AboutTeam() {
  return (
    <section id="team" className={styles.section} aria-labelledby="team-title">
      <Reveal>
        <SectionHeading id="team-title" script="Team" title="Meet Our Bakers" />
      </Reveal>
      <Reveal className={styles.team} stagger={0.12}>
        {team.map((m) => (
          <figure key={m.name} className={styles.member}>
            <Image src={m.image} alt={`Portrait of ${m.name}`} width={147} height={147} className={styles.avatar} />
            <figcaption>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
