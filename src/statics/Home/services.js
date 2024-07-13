import React from 'react';

const Services = () => {
    return (
        <div className="w-full px-4 py-12 mx-auto sm:w-11/12 sm:px-6 lg:py-20">
            <h2 className="mb-8 text-2xl font-bold text-center text-blue-800 sm:text-3xl lg:text-4xl">Our Services</h2>
            <p className="max-w-6xl mx-auto mb-12 text-base text-center text-gray-700 sm:text-lg lg:text-xl">
                VisionVowResearch service specialists are adept in gathering hard-to-find information from primary as well as secondary sources, such as social media sites, business directories, forums, online portals, websites, etc.
            </p>
            <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 transition-transform transform bg-white rounded-lg shadow-lg sm:p-6 hover:scale-105">
                    <img src="images/research.jpg" alt="Research Design" className="object-cover w-full h-48 mb-4 rounded-t-lg" />
                    <h3 className="mb-2 text-lg font-semibold text-center text-blue-800 sm:text-xl">Research Design</h3>
                    <p className="text-sm text-center text-gray-700 sm:text-base">
                        Most problems in the field of marketing research are complex in nature and require primary data collection. In such cases, a questionnaire becomes a crucial tool for collecting primary data....
                    </p>
                </div>
                <div className="p-4 transition-transform transform bg-white rounded-lg shadow-lg sm:p-6 hover:scale-105">
                    <img src="images/collection.jpg" alt="Data Collection" className="object-cover w-full h-48 mb-4 rounded-t-lg" />
                    <h3 className="mb-2 text-lg font-semibold text-center text-blue-800 sm:text-xl">Data Collection</h3>
                    <p className="text-sm text-center text-gray-700 sm:text-base">
                        Visionvowresearch conduct a range of Quantitative Research, Qualitative, CATI, CAPI, CAWI, F2F, PAPI, and Mystery Shopping services, through which an informed decision can be taken and obtain reliable statistical results....
                    </p>
                </div>
                <div className="p-4 transition-transform transform bg-white rounded-lg shadow-lg sm:p-6 hover:scale-105">
                    <img src="images/coding.jpg" alt="Data Coding & Charting" className="object-cover w-full h-48 mb-4 rounded-t-lg" />
                    <h3 className="mb-2 text-lg font-semibold text-center text-blue-800 sm:text-xl">Data Coding & Charting</h3>
                    <p className="text-sm text-center text-gray-700 sm:text-base">
                        Open Ends Coding or Verbatim Coding is a systematic process of transforming textual or open-ended comments and responses to numeric codes for intelligent data processing & understanding the importance of coding....
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;
