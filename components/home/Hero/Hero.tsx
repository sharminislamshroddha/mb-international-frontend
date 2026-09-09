import PageSection from "@/components/common/PageSection";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <PageSection>
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <HeroContent />
        <HeroImage />
      </div>
    </PageSection>
  );
}