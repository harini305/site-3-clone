import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import AboutTimeline from '@/components/sections/AboutTimeline';

export const metadata = {
  title: 'About Us',
  description: 'The story of Phlox Candy — a family confectionery baking since 1978.',
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: 50, paddingBottom: 60 }}>
      <Reveal>
        <SectionHeading as="h1" script="About Us" title="Our Story" />
      </Reveal>
      <AboutTimeline />
    </div>
  );
}
