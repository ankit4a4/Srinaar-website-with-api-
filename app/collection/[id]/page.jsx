import React, { Suspense } from 'react'
import ShopProducts from '../../../components/shop/ShopProducts'
import ShopHero from '../../../components/shop/ShopHero'
import TopMarquee from '../../../components/layout/TopMarquee'

const Page = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <ShopHero heading="Explore The
      Luxury" heading2="Outfits" />
      <TopMarquee />
      <Suspense fallback={<div className="py-20 text-center text-[#8a776f]">Loading…</div>}>
        <ShopProducts initialCategory={id} />
      </Suspense>
    </div>
  )
}

export default Page
