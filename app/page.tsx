import React from 'react'

import Hero from "../components/home/Hero"
import SignatureCollections from "../components/home/SignatureCollections"
import RoyalHeritage from "../components/home/RoyalHeritage"
import NewArrivals from "../components/home/NewArrivals"
import PremiumFeatures from "../components/home/PremiumFeatures"
import TestimonialSlider from "../components/home/TestimonialSlider"
import JoinSection from "../components/home/JoinSection"
import TopMarquee from "../components/layout/TopMarquee"
import RecommendedProducts from "../components/home/RecommendedProducts"
import RecentlyViewed from "../components/home/RecentlyViewed"

const page = () => {
  return (
    <div>
      <Hero />
      <TopMarquee />
      
      <SignatureCollections />  
      <RoyalHeritage />
      <NewArrivals />
      <RecommendedProducts />
      <PremiumFeatures />
      <TestimonialSlider />
      <RecentlyViewed />
      <JoinSection />
      <TopMarquee />

    </div>
  )
}

export default page
