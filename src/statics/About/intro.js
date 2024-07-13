import React from 'react';

const Introduction = () => {
    return (
        <div className='px-4 bg-gray-100 sm:px-8'>
            <div className="w-full py-8 mx-auto sm:w-11/12 md:w-10/12 sm:py-12">
                <h2 className="mb-4 text-lg font-semibold text-left text-teal-600 sm:text-xl">INTRODUCTION</h2>
                <div className="grid items-center grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2">
                    <div className=" ">
                        <h1 className="text-left mb-6 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
                            A Super Team that's Passionate to Make Marketing Beyond Everything
                        </h1>
                        
                    </div>
                    <div>
                        <p className="text-base text-left leading-relaxed text-gray-500 sm:text-lg">
                            Visionvowresearch collective expertise, fueled by innovation and a relentless pursuit of perfection, sets us apart as trailblazers in the ever-evolving landscape of digital marketing. Each member of our team brings a unique blend of strategic vision.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Introduction;
