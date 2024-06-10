import React from 'react';
import Carousel from './carousal'; // Correct the import typo

const benefits = [
  {
    id: 1,
    value: "$30",
    description: "More profitable",
    detail: "Achieve more profits using marketing and expand your business.",
    icon: "💼", // Placeholder icon
  },
  {
    id: 2,
    value: "10X",
    description: "More customer",
    detail: "Expand your business by attracting more customers through impactful marketing strategies.",
    icon: "👥", // Placeholder icon
  },
  {
    id: 3,
    value: "20X",
    description: "More effective",
    detail: "With many service options, you are free to choose according to your needs.",
    icon: "🔧", // Placeholder icon
  },
  {
    id: 4,
    value: "18X",
    description: "More practical",
    detail: "Visionvowresearch provide special guidance to guide marketing services for each business unit.",
    icon: "📚", // Placeholder icon
  },
];

const Cards = () => {
  return (
    <div className='bg-gray-100'>

      <div className="flex items-center justify-center px-6 pt-16">
        <div className="w-full sm:w-11/12 lg:w-8/12">
          <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">BENEFITS</h2>
          <p className="mb-12 text-lg text-center text-gray-500">Build lasting relationships with our complete customer.</p>
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="px-8 py-12 bg-white shadow-md rounded-xl">
                <div className="flex items-center mb-4">
                  <span className="mr-3 text-4xl text-gray-700">{benefit.icon}</span>
                  <h3 className="text-2xl font-semibold text-gray-800">{benefit.value}</h3>
                </div>
                <h4 className="mb-2 text-xl font-medium text-gray-600">{benefit.description}</h4>
                <p className="text-gray-500">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center pt-24">
        <Carousel />
      </div>
    </div>
  );
}

export default Cards;
