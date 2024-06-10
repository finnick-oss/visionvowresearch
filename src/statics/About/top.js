import React from 'react';
// import './App.css';

function Top() {
    return (
        <>
            <div className="flex flex-col items-center justify-center bg-gray-50 py-12 sm:py-20 md:py-20 px-4 sm:px-8 md:py-40">
                <div className="flex flex-col items-center justify-center w-full text-center sm:w-11/12 md:w-9/12">
                    <div className="mb-3 text-lg text-orange-500 sm:text-xl md:text-2xl">ABOUT US</div>
                    <h1 className="mb-6 font-sans text-3xl font-bold leading-tight text-gray-800 sm:text-4xl md:text-4xl lg:text-5xl">
                    Visionvowresearch Tech Produces High Quality Data
                    </h1>
                    <p className="w-full mb-6 text-sm leading-7 text-gray-600 sm:w-8/12 md:w-7/12 sm:text-base md:text-lg">
                        Strategic Visionaries, Creative Minds: Crafting Digital Success Tailored to Your Brand's Unique Journey.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Top;
