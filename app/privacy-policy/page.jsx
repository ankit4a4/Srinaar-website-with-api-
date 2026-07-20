import { PolicyHero, PolicyLayout, PolicySection } from "@/components/policies/PolicyHero";

export const metadata = { title: "Privacy Policy — Srinaar" };

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PolicyHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
      />

      <PolicyLayout>
        <PolicySection heading="Information We Collect">
          <p>
            When you create an account or place an order, we collect basic details such as your
            name, email address, phone number, and delivery address. If you sign in with Google,
            we receive your name, email, and profile photo from your Google account.
          </p>
        </PolicySection>

        <PolicySection heading="How We Use Your Information">
          <p>
            We use your information to process orders, provide customer support, send order
            updates, and improve our products and services. We do not sell your personal
            information to third parties.
          </p>
        </PolicySection>

        <PolicySection heading="Cookies">
          <p>
            We use cookies and browser storage to keep you signed in, remember your cart and
            wishlist, and understand how our website is used so we can make it better.
          </p>
        </PolicySection>

        <PolicySection heading="Data Security">
          <p>
            We take reasonable technical and organisational measures to protect your data,
            including encrypted connections and secure storage of payment and account information.
          </p>
        </PolicySection>

        <PolicySection heading="Third-Party Services">
          <p>
            We work with trusted third parties — such as payment gateways, delivery partners, and
            cloud storage providers — to run our business. These partners only receive the
            information they need to perform their service.
          </p>
        </PolicySection>

        <PolicySection heading="Your Rights">
          <p>
            You can request access to, correction of, or deletion of your personal data at any
            time by contacting us through our Contact page.
          </p>
        </PolicySection>

        <PolicySection heading="Changes to This Policy">
          <p>
            We may update this policy from time to time. Any changes will be posted on this page.
          </p>
        </PolicySection>
      </PolicyLayout>
    </div>
  );
}
