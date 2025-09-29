import React from 'react';
import Image1 from "../../assets/hero1.jpg";
import Image2 from "../../assets/hero2.jpg";
import Image3 from "../../assets/hero3.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ImageList = [
    {
        id: 1,
        img: Image1,
        title: "Upto 50% off on all home decors",
    },
    {
        id: 2,
        img: Image2,
        title: "Upto 20% off on all Furnitures..",
    },
    {
        id: 3,
        img: Image3,
        title: "Upto 60% off on all Lamps",
    },
];

const Hero = () => {
     
    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 600,
        slideToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true, 
    };

  return (
    <div className='relative overflow-hidden  min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center duration-200'>
        {/* Background pattern */}
        <div className='h-[500px] w-[500px] bg-emerald-200 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9'> 

        </div>
        {/* Hero section */}
        <div className='container pb-8 sm:pb-0 z-20'>
            <Slider {...settings}>
                {ImageList.map((data) => (

                    <div>
               <div className='grid grid-cols-1 sm:grid-cols-2'>
                {/* text content section */}
                <div className='flex flex-col justify-center gap-4 pt-10 sm:pt-0 text-center sm:text-left order-2 sm:order-1'>
                    <h1
                    data-aos="zoom-out"
                    data-aos-once="true"
                    data-aos-duration="500"
                    className='text-5xl sm:text-6xl lg:text-5xl font-bold'>{data.title}</h1>
                    <p 
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="500"
                    className='text-sm'>
                        “Transform your space with curated elegance.our home décor pieces bring personality and harmony to every corner."
                    </p>
                    <div data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="300" >
                        <button className='bg-gradient-to-r  from-emerald-300 to-emerald-600 text-white hover:scale-105 duration-200 py-2 px-4 rounded-full'>
                            Order Now
                        </button>
                    </div>
                </div>
                {/* Image section */}
                <div className='order-1 sm:order-2'>
                    <div
                    data-aos="zoom-in"
                    data-aos-once="true"
                    className='relative z-11'>
                        <img src={data.img} alt="" 
                         className='w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto'
                        />
                    </div>
                </div>

               </div>
            </div>

                ))}
                
            </Slider>
            
        </div>
    </div>
  )
}

export default Hero