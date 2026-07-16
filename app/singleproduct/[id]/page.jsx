import React from 'react'
import CraftSection from '../../../components/singleproduct/CraftSection'
import SingleProduct from '../../../components/singleproduct/SingleProduct'
import AlsoLike from '../../../components/singleproduct/AlsoLike'

const Page = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <SingleProduct productId={id} />
      <CraftSection />
      <AlsoLike currentProductId={id} />
    </div>
  )
}

export default Page
