import React from 'react';

const BigImageComponent = () => {
    return (
        <div className="flex items-center justify-center px-4 py-10 sm:py-12 md:py-16 bg-gray-50 sm:px-8">
            <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg sm:w-11/12 md:w-10/12">
                <img
                    className="w-full h-auto"
                    src="images/employee.webp" // Replace with your image URL
                    alt="Group"
                />
            </div>
        </div>
    );
};

export default BigImageComponent;
