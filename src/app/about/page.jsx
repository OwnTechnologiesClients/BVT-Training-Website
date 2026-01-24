"use client";

import { 
  AboutHero, 
  MissionVision, 
  OurStory, 
  LeadershipTeam, 
  OurValues, 
  Achievements, 
  WhyChooseUs 
} from "@/components/about";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <MissionVision />
      <OurStory />
      <LeadershipTeam />
      <OurValues />
      {/* <Achievements /> */}
      <WhyChooseUs />
    </div>
  );
}
