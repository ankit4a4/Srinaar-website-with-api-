import React from 'react'

const CartHero = () => {
    return (
        <section className="w-full bg-[#d9d9d9] my-10 py-12 md:py-16 flex items-center justify-center border-b border-[#990027]/10">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800">
                    Shoping {" "}
                    <span className="text-[#990027] font-medium relative">
                        Cart
                        <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#990027] rounded-full"></span>
                    </span>
                </h1>

                <p className="text-gray-500 text-sm md:text-base mt-4">
                    Home / Cart
                </p>
            </div>
        </section>
    )
}

export default CartHero
