import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        rtl: false,
        arrows: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="relative w-full py-6 mx-auto overflow-hidden bg-gray-100 sm:w-10/12">
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-0 bottom-0 left-0 w-1/6 bg-gradient-to-r from-gray-100 to-transparent"></div>
                <div className="absolute top-0 bottom-0 right-0 w-1/6 bg-gradient-to-l from-gray-100 to-transparent"></div>
            </div>
            <Slider {...settings}>
                <div className="flex items-center justify-center">
                    <div className="flex items-center h-32 p-6">
                        <img src="images/lab.png" alt="Pureprofile" className="object-contain h-full" />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center h-32 p-6">
                        <img src="images/goweb.png" alt="GoWeb" className="object-contain h-full" />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center h-32 p-6">
                        <img src="images/ps.webp" alt="PS" className="object-contain h-full" />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center h-32 p-6">
                        <img src="images/quest.png" alt="Prodege" className="object-contain h-full" />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center h-32 p-6">
                        <img src="images/philomath.png" alt="Philomath" className="object-contain h-full" />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center h-32 p-6">
                        <img src="images/gms.png" alt="GMS" className="object-contain h-full" />
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;
