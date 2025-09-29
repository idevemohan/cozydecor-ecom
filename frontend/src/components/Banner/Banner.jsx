import React from 'react'
import BannerImg from "../../assets/bannerimg.jpg";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";

const Banner = () => {
  return (
    <div className='min-h-[550px] flex justify-center items-center py-12 sm:py-0'>
        <div className='container'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
                {/* Image section */}
                <div>
                    <img src={BannerImg} alt=""
                     className='max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgbe(0,0,0,1)] object-cover'
                    />
                </div>
                {/* Text details section */}
                <div className='flex flex-col justify-center gap-6 sm:pt-0'>
                    <h1 className='text-3xl sm:text-4xl font-bold'>
                        MonSoon Sale!! Upto 50% off on all Products....
                    </h1>
                    <p className='text-gray-500  tracking-wide leading-5'>
                        Ties into the current season with a focus on style and savings.
                        Highlights the season and the discount, perfect for furniture and lamps.
                    </p>
                     <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-4'>
                            <GrSecure className='text-4xl h-12  w-12 shadow-sm p-4 rounded-full bg-violet-100' />
                            <p>Quality Products</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <IoFastFood className='text-4xl h-12  w-12 shadow-sm p-4 rounded-full bg-orange-100' />
                            <p>Fast Delivery</p>
                        </div>
                        <div className='flex items-center gap-4'>
                             <GiFoodTruck className='text-4xl h-12  w-12 shadow-sm p-4 rounded-full bg-green-100' />
                             <p>Get Offers!!</p>
                        </div>
                     </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Banner