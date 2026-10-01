import { IoLocationSharp, IoMail, IoCall } from 'react-icons/io5';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/sections/ContactForm';
import { site } from '@/data/site';
import styles from './contact.module.css';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Phlox Candy for custom orders, catering and questions.',
};

export default function ContactPage() {
  return (
    <div className="container">
      <div className={styles.top}>
        <Reveal className={styles.formCol}>
          <SectionHeading as="h1" align="left" size="lg" script="Contact With Us" title="Don’t Google Design Questions" className={styles.heading} />
          <ContactForm />
        </Reveal>
        <Reveal className={styles.map} effect="fade" delay={0.2}>
          <iframe
            title={`Map showing ${site.office.join(', ')}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=13&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>

      <Reveal as="ul" className={styles.info} stagger={0.12}>
        <li>
          <span className={styles.icon}>
            <IoLocationSharp aria-hidden="true" />
          </span>
          <div>
            <h2>Meet Us In Office :</h2>
            <address>
              {site.office.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
          </div>
        </li>
        <li>
          <span className={styles.icon}>
            <IoMail aria-hidden="true" />
          </span>
          <div>
            <h2>Our Email Address :</h2>
            {site.officeEmails.map((e) => (
              <a key={e} href={`mailto:${e}`}>
                {e}
              </a>
            ))}
          </div>
        </li>
        <li>
          <span className={styles.icon}>
            <IoCall aria-hidden="true" />
          </span>
          <div>
            <h2>Contact Numbers :</h2>
            {site.officePhones.map((p) => (
              <a key={p} href={`tel:${p.replace(/[^+\d]/g, '')}`}>
                {p}
              </a>
            ))}
          </div>
        </li>
      </Reveal>
    </div>
  );
}
