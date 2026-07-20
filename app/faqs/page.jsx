import { PolicyHero } from "@/components/policies/PolicyHero";
import FaqAccordion from "@/components/policies/FaqAccordion";

export const metadata = { title: "FAQs — Srinaar" };

export default function FaqsPage() {
  return (
    <div>
      <PolicyHero
        title="Frequently Asked Questions"
        subtitle="Quick answers to the things we get asked most often."
      />
      <div className="bg-white">
        <FaqAccordion />
      </div>
    </div>
  );
}
