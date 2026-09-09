import PageSection from "@/components/common/PageSection";
import SectionHeading from "@/components/common/SectionHeading";

import CategoryGrid from "./CategoryGrid";

export default function Categories() {
  return (
    <PageSection>
      <SectionHeading
        subtitle="Explore"
        title="Shop by Category"
      />

      <CategoryGrid />
    </PageSection>
  );
}