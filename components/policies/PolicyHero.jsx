export function PolicyHero({ title, subtitle }) {
  return (
    <section className="w-full bg-gradient-to-b from-[#990027] to-[#590c19] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[50px] text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-white/75 text-sm sm:text-base max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="flex justify-center mt-6">
          <span className="w-12 h-[2px] bg-[#c9a227]" />
        </div>
      </div>
    </section>
  );
}

export function PolicySection({ heading, children }) {
  return (
    <div className="mb-10 last:mb-0">
      {heading && (
        <h2 className="font-serif text-xl sm:text-2xl text-[#2e1f1f] mb-3">{heading}</h2>
      )}
      <div className="text-[15px] leading-[1.9] text-[#5f514b] space-y-4">{children}</div>
    </div>
  );
}

export function PolicyLayout({ children }) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="max-w-3xl mx-auto px-6">{children}</div>
    </section>
  );
}
