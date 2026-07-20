import { PolicyHero, PolicyLayout, PolicySection } from "@/components/policies/PolicyHero";

export const metadata = { title: "Terms of Use — Srinaar" };

export default function TermsPage() {
  return (
    <div>
      <PolicyHero title="Terms of Use" subtitle="Please read these terms carefully before using our website." />

      <PolicyLayout>
        <PolicySection heading="Using Our Website">
          <p>
            By accessing and using this website, you agree to these Terms of Use. If you do not
            agree with any part of these terms, please do not use our website or services.
          </p>
        </PolicySection>

        <PolicySection heading="Account Responsibility">
          <p>
            You are responsible for maintaining the confidentiality of your account and for all
            activities that occur under it. Please let us know immediately if you suspect
            unauthorised use of your account.
          </p>
        </PolicySection>

        <PolicySection heading="Product Information">
          <p>
            We make every effort to display our products, colours, and details as accurately as
            possible. Slight variations may occur due to handcrafted processes, fabric batches, or
            screen display settings.
          </p>
        </PolicySection>

        <PolicySection heading="Pricing & Availability">
          <p>
            Prices and stock availability are subject to change without notice. In the rare case
            an ordered item is no longer available, we will inform you and offer a refund or
            alternative.
          </p>
        </PolicySection>

        <PolicySection heading="Intellectual Property">
          <p>
            All content on this website — including images, logos, and text — is the property of
            Srinaar and may not be reproduced or used without written permission.
          </p>
        </PolicySection>

        <PolicySection heading="Limitation of Liability">
          <p>
            Srinaar is not liable for any indirect or incidental damages arising from the use of
            this website, to the fullest extent permitted by law.
          </p>
        </PolicySection>

        <PolicySection heading="Governing Law">
          <p>These terms are governed by the laws of India.</p>
        </PolicySection>
      </PolicyLayout>
    </div>
  );
}
