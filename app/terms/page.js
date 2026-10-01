import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/data/site';
import styles from './terms.module.css';

export const metadata = {
  title: 'Conditions & Licensing',
  description: 'Terms of sale, ordering conditions and content licensing for Phlox Candy.',
};

const sections = [
  {
    id: 'conditions',
    title: 'Conditions of Sale',
    items: [
      ['Orders', 'Orders are confirmed once you receive an email from us. Celebration cakes need at least three days’ notice.'],
      ['Prices', 'All prices are shown in US dollars and include tax. Delivery is charged at checkout where it applies.'],
      ['Collection & delivery', 'Collection is available during opening hours. We deliver within 15 miles of the shop, Tuesday to Saturday.'],
      ['Cancellations', 'Because everything is baked to order, cancellations must reach us 48 hours before the collection or delivery date.'],
      ['Allergens', 'Allergen details are listed on every product. Our kitchen handles nuts, gluten, eggs and milk.'],
    ],
  },
  {
    id: 'licensing',
    title: 'Licensing & Terms of Use',
    items: [
      ['Website content', 'Text on this site is provided for information about our shop and may not be republished without permission.'],
      ['Images', 'Product and lifestyle photographs are used under licence and remain the property of their owners.'],
      ['Trademarks', `“${site.name}” and the swirl logo identify our shop and may not be used to suggest endorsement.`],
      ['Changes', 'We may update these terms from time to time. The version on this page always applies to new orders.'],
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="container narrow" style={{ paddingTop: 50, paddingBottom: 110 }}>
      <Reveal>
        <SectionHeading as="h1" script="Company" title="Conditions & Licensing" />
      </Reveal>
      <p className="demo-note" style={{ display: 'flex', margin: '-30px auto 60px', width: 'fit-content' }}>
        Sample wording for this demo — have it reviewed before real use.
      </p>
      {sections.map((s) => (
        <Reveal as="section" key={s.id} id={s.id} className={styles.section} aria-labelledby={`${s.id}-title`}>
          <h2 id={`${s.id}-title`}>{s.title}</h2>
          <dl>
            {s.items.map(([term, text]) => (
              <div key={term} className={styles.row}>
                <dt>{term}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ))}
    </div>
  );
}
