export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[350px] md:h-[340px] bg-[#f0ebe3] sm:h-[350px] lg:h-[400px]" />
      <div className="px-1 pt-4">
        <div className="h-3 w-1/3 rounded bg-[#f0ebe3]" />
        <div className="mt-3 h-4 w-4/5 rounded bg-[#f0ebe3]" />
        <div className="mt-2 h-4 w-2/5 rounded bg-[#f0ebe3]" />
        <div className="mt-3 h-6 w-1/3 rounded bg-[#f0ebe3]" />
      </div>
    </div>
  );
}
