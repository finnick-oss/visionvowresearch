import React from 'react';

const PortfolioItem = ({ image, alt, title, date, client }) => (
    <div className="p-4 transition-transform transform bg-white rounded-lg shadow-lg sm:p-6 hover:scale-105">
        <img src={image} alt={alt} className="object-cover w-full h-48 mb-4 rounded-t-lg" />
        <h3 className="mb-4 mt-4 text-lg font-semibold text-center text-gray-800 sm:text-xl">{title}</h3>
        <div className="flex justify-between">
            <div className="flex flex-col">
                <p className="mb-1 text-center text-gray-500">Date Published</p>
                <p className=" text-center text-gray-700">{date}</p>
            </div>
            <div className="flex flex-col">
                <p className="mb-1 text-center text-gray-500">Client</p>
                <p className="text-center text-gray-700">{client}</p>
            </div>
        </div>
    </div>
);

const OurWorks = () => {
    const portfolioItems = [
        {
            image: "images/cloudtech.avif",
            alt: "Cloudtech Social Media Ads",
            title: "Cloudtech Social Media Ads",
            date: "February 2024",
            client: "Cloudtech",
        },
        {
            image: "images/elivates.avif",
            alt: "Elivates Social Media Ads",
            title: "Elivates Social Media Ads",
            date: "January 2024",
            client: "Elivates",
        },
        {
            image: "images/virtupay.avif",
            alt: "Virtupay Outdoor Ads",
            title: "Virtupay Outdoor Ads",
            date: "November 2023",
            client: "Virtupay",
        },
    ];

    return (
        <div className="w-full px-4 py-12 mx-auto sm:w-11/12 sm:px-6 lg:py-20">
            <h2 className="mb-3 text-lg text-center text-teal-600 sm:text-xl md:text-2xl">PORTFOLIO</h2>
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-900 sm:text-3xl md:text-4xl">Our Works</h2>
            <p className="max-w-4xl mx-auto mb-12 text-base text-center text-gray-700 sm:text-lg">
                Dedicated to delivering exceptional service and tailored solutions, we focus on ensuring the success and satisfaction of our valued clients.
            </p>
            <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item, index) => (
                    <PortfolioItem
                        key={index}
                        image={item.image}
                        alt={item.alt}
                        title={item.title}
                        date={item.date}
                        client={item.client}
                    />
                ))}
            </div>
        </div>
    );
};

export default OurWorks;
