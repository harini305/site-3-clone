import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import AboutTimeline from '@/components/sections/AboutTimeline';
import { AboutMission, AboutCulture, AboutTeam } from '@/components/sections/AboutValues';

export const metadata = {
  title: 'About Us',
  description: 'The story, mission, culture and team behind Phlox Candy — a family confectionery baking since 1978.',
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: 50, paddingBottom: 60 }}>
      <section id="story" style={{ scrollMarginTop: 20 }} aria-label="Our story">
        <Reveal>
          <SectionHeading as="h1" script="About Us" title="Our Story" />
        </Reveal>
        <AboutTimeline />
      </section>
      <AboutMission />
      <AboutCulture />
      <AboutTeam />
    </div>
  );
}
