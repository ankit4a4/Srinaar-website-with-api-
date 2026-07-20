import { PolicyHero } from "@/components/policies/PolicyHero";

export const metadata = { title: "Achievements — Srinaar" };

const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    text: "Srinaar started as a small, home-grown label with a handful of hand-picked designs.",
  },
  {
    year: "2022",
    title: "Going Online",
    text: "We launched our very first online collection, bringing our kurtis beyond our local community.",
  },
  {
    year: "2023",
    title: "Growing Family",
    text: "Crossed our first big milestone of happy customers across India, all through word of mouth.",
  },
  {
    year: "2024",
    title: "Wider Reach",
    text: "Expanded our collections and started shipping pan-India with faster delivery timelines.",
  },
  {
    year: "Today",
    title: "Building Ahead",
    text: "We're continuing to grow — new designs, better service, and a platform built just for you.",
  },
];

export default function AchievementsPage() {
  return (
    <div>
      <PolicyHero
        title="Our Journey So Far"
        subtitle="A few milestones along the way — with many more ahead."
      />

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative border-l-2 border-[#f0dfe2] pl-8 space-y-12">
            {milestones.map((m) => (
              <div key={m.year} className="relative">
                <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#990027] ring-4 ring-[#f6e9ec]" />
                <p className="text-sm font-semibold tracking-[0.1em] text-[#c9a227] uppercase mb-1">
                  {m.year}
                </p>
                <h3 className="font-serif text-xl text-[#2e1f1f] mb-2">{m.title}</h3>
                <p className="text-[15px] text-[#7d7272] leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
