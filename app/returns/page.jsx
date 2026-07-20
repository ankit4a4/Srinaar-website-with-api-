import { PolicyHero, PolicyLayout, PolicySection } from "@/components/policies/PolicyHero";

export const metadata = { title: "Returns & Cancellation — Srinaar" };

export default function ReturnsPage() {
  return (
    <div>
      <PolicyHero
        title="Returns & Cancellation"
        subtitle="We want you to love what you order — here's how returns, exchanges and cancellations work."
      />

      <PolicyLayout>
        <PolicySection heading="Return Window">
          <p>
            You can request a return within <strong>7 days</strong> of delivery. To be eligible,
            the item must be unused, unwashed, and in its original condition with all tags and
            packaging intact.
          </p>
        </PolicySection>

        <PolicySection heading="How to Request a Return">
          <p>Go to <strong>My Account → My Orders</strong>, select the order, and choose &ldquo;Request Return.&rdquo; Our team will get in touch to arrange a pickup or provide return instructions.</p>
        </PolicySection>

        <PolicySection heading="Non-Returnable Items">
          <p>
            For hygiene reasons, certain items — including customised or made-to-order pieces —
            cannot be returned unless they arrive damaged or defective.
          </p>
        </PolicySection>

        <PolicySection heading="Refunds">
          <p>
            Once we receive and inspect your return, refunds are processed within 5–7 business
            days to your original payment method. Cash-on-delivery orders are refunded via bank
            transfer or store credit.
          </p>
        </PolicySection>

        <PolicySection heading="Order Cancellation">
          <p>
            Orders can be cancelled free of charge as long as they haven&apos;t been shipped yet. Once
            an order is out for delivery, it can no longer be cancelled, but you&apos;re welcome to
            initiate a return after it arrives.
          </p>
        </PolicySection>

        <PolicySection heading="Damaged or Wrong Item?">
          <p>
            If your order arrives damaged or you&apos;ve received the wrong item, please reach out to
            us within 48 hours of delivery with photos — we&apos;ll arrange a free replacement or full
            refund, no questions asked.
          </p>
        </PolicySection>

        <PolicySection heading="Need Help?">
          <p>
            Reach out to us on our <a href="/contact" className="text-[#990027] underline">Contact page</a> and
            we&apos;ll sort it out for you.
          </p>
        </PolicySection>
      </PolicyLayout>
    </div>
  );
}
