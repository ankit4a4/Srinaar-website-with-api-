import React from 'react'
import ShopProducts from '../../components/shop/ShopProducts'
import ShopHero from '../../components/shop/ShopHero'
import TopMarquee from '../../components/layout/TopMarquee'

const page = () => {
  return (
    <div>
      <ShopHero heading="Explore The
Luxury" heading2="Outfits" />
<TopMarquee />
      <ShopProducts />
    </div>
  )
}

export default page
