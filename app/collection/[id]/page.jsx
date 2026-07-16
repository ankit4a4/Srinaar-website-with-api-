import React from 'react'
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
      <ShopProducts initialCategory={id} />
    </div>
  )
}

export default Page
