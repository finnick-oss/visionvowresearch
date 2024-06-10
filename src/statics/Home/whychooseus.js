import React from 'react';

const stats = [
    { id: 1, value: '100+', label: 'Clients' },
    { id: 2, value: '35+', label: 'Countries' },
    { id: 3, value: '8K+', label: 'Projects' },
    { id: 4, value: '3K', label: 'B2B Projects' },
    { id: 5, value: '600K', label: 'Surveys Completed' },
    { id: 6, value: '8M', label: 'Global Respondents' },
];

const WhyChooseUs = () => {
    return (
        <div className="py-14 bg-white sm:py-12 lg:py-16">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h2 className="text-2xl font-extrabold text-center text-blue-800 sm:text-3xl lg:text-4xl">Why Choose Us</h2>
                <p className="mt-4 text-base text-center text-gray-600 sm:text-lg lg:text-xl">
                    Whether your business is just a startup or has already hit the expansion phase, Visionvowresearch proprietary panel of more than half a million respondents can prove vital in understanding your target markets, make better business decisions, and maintain your company's competitive edge.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8 text-center sm:mt-10 sm:grid-cols-3 lg:grid-cols-3">
                    {stats.map(stat => (
                        <div key={stat.id} className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-blue-800 sm:text-4xl lg:text-5xl">{stat.value}</span>
                            <span className="mt-2 text-sm font-medium text-gray-600 sm:text-base lg:text-lg">{stat.label.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
