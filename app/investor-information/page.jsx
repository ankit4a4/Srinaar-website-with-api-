import { PolicyHero, PolicyLayout, PolicySection } from "@/components/policies/PolicyHero";

export const metadata = { title: "Investor Information — Srinaar" };

export default function InvestorInformationPage() {
  return (
    <div>
      <PolicyHero
        title="Investor Information"
        subtitle="Srinaar is a privately held company. Here's how to get in touch about investment opportunities."
      />

      <PolicyLayout>
        <PolicySection heading="About Srinaar">
          <p>
            Srinaar is an independent, privately owned ethnic wear brand focused on handcrafted
            kurtis and women&apos;s clothing. We are currently self-funded and not publicly listed.
          </p>
        </PolicySection>

        <PolicySection heading="Investment Enquiries">
          <p>
            If you&apos;re interested in exploring a partnership or investment opportunity with
            Srinaar, we&apos;d love to hear from you. Please reach out via our{" "}
            <a href="/contact" className="text-[#990027] underline">Contact page</a> with a brief
            introduction, and our team will get back to you.
          </p>
        </PolicySection>

        <PolicySection heading="Media & Press">
          <p>
            For press or media enquiries, please use the same Contact page and mention &ldquo;Media
            Enquiry&rdquo; in your message so we can route it to the right person.
          </p>
        </PolicySection>
      </PolicyLayout>
    </div>
  );
}
