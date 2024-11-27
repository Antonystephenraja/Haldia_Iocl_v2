import React from 'react';

const Setting = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl text-center font-bold mb-4">XYMA Analytics Private Ltd</h1>
        <div className="mb-4">
          <h2 className="text-lg text-center font-semibold mb-2">Info</h2>
          <p className=''>Company Name: Your Company</p>
          <p>Location: City, Country</p>
          {/* Add more company details as needed */}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Project Details</h2>
          <p>©2023 XYMA Analytics Private Ltd,IIT Mad</p>
          <p>Description: Brief description of the project.</p>
          {/* Add more project details as needed */}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
          <p>This is a static dashboard settings page created using React and Tailwind CSS.</p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
