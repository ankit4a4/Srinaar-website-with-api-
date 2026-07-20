import { PolicyHero, PolicyLayout, PolicySection } from "@/components/policies/PolicyHero";

export const metadata = { title: "Shipping Policy — Srinaar" };

export default function ShippingPolicyPage() {
  return (
    <div>
      <PolicyHero
        title="Shipping Policy"
        subtitle="Everything you need to know about how we get your order to your door."
      />

      <PolicyLayout>
        <PolicySection heading="Delivery Timelines">
          <p>
            Orders are typically processed within 1–2 business days and delivered within{" "}
            <strong>4–7 business days</strong>, depending on your location. Metro cities usually
            see faster delivery, while remote areas may take a little longer.
          </p>
        </PolicySection>

        <PolicySection heading="Shipping Charges">
          <p>
            We offer free shipping across India on all prepaid orders. Cash-on-delivery orders may
            carry a small additional handling fee, shown at checkout before you confirm.
          </p>
        </PolicySection>

        <PolicySection heading="Order Tracking">
          <p>
            Once your order ships, you&apos;ll receive a tracking link, and you can also check the
            latest status anytime from <strong>My Account → Track Order</strong>.
          </p>
        </PolicySection>

        <PolicySection heading="Serviceable Areas">
          <p>
            We currently ship across all major pin codes in India. If your pin code isn&apos;t
            serviceable at checkout, please reach out to us and we&apos;ll try to find a way to get
            your order to you.
          </p>
        </PolicySection>

        <PolicySection heading="Delays">
          <p>
            While we do our best to meet our estimated delivery windows, factors like weather,
            regional restrictions, or courier delays can occasionally push things back. We&apos;ll keep
            you informed if that happens.
          </p>
        </PolicySection>
      </PolicyLayout>
    </div>
  );
}
