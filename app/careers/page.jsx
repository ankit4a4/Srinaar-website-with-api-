import { PolicyHero } from "@/components/policies/PolicyHero";
import { FiHeart, FiUsers, FiTrendingUp } from "react-icons/fi";

export const metadata = { title: "Careers — Srinaar" };

const values = [
  {
    icon: FiHeart,
    title: "Craft with Care",
    text: "We treat every piece — and every teammate — with the same attention to detail.",
  },
  {
    icon: FiUsers,
    title: "Small, Close-Knit Team",
    text: "You'll work directly with the people who design, source, and ship every order.",
  },
  {
    icon: FiTrendingUp,
    title: "Room to Grow",
    text: "As Srinaar grows, so do the opportunities to take on more and learn new things.",
  },
];

export default function CareersPage() {
  return (
    <div>
      <PolicyHero
        title="Careers at Srinaar"
        subtitle="We're a small team building something we're proud of — and we're always happy to hear from people who love what we do."
      />

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-[#eee3dc] p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f6e9ec] text-[#990027] mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-serif text-lg text-[#2e1f1f] mb-2">{v.title}</h3>
                  <p className="text-sm text-[#7d7272] leading-relaxed">{v.text}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl bg-[#faf6f1] p-8 sm:p-10 text-center">
            <h2 className="font-serif text-2xl text-[#2e1f1f] mb-3">
              No open positions right now
            </h2>
            <p className="text-[15px] text-[#7d7272] max-w-xl mx-auto leading-relaxed">
              We don&apos;t have any open roles at the moment, but we&apos;re always happy to hear from
              people who&apos;d love to be part of the Srinaar journey. Send us your resume and a
              short note through our Contact page, and we&apos;ll reach out when something opens up.
            </p>
            <a
              href="/contact"
              className="inline-block mt-6 bg-[#990027] hover:bg-[#7a0020] text-white text-sm tracking-[1px] uppercase px-8 py-3.5 rounded-lg transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
