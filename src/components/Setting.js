import React from 'react';

const Setting = () => {
  return (
    <div className='flex justify-center'>
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
         <h1 className="text-2xl text-center font-bold mb-4">XYMA Analytics Private Ltd</h1>
         <div className="mb-4">
           <h2 className="text-lg text-center font-semibold mb-2">Info</h2>
           <p className=''>Company Name: XYMA ANALYTICS PVT LTD</p>
           <p>Location: Chennai, India</p>
           {/* Add more company details as needed */}
         </div>

         <div className="mb-4">
           <h2 className="text-lg font-semibold mb-2">Project Details</h2>
           <p>©2023 XYMA Analytics Private Ltd,IIT Madras</p>
           <p>Description: µTMapS & µSTMapS are IIoT-enabled temperature measurement and temperature profiling sensors that captures continuous measurements at multiple points</p>
           {/* Add more project details as needed */}
         </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">More Information</h2>
          <p>Email: info@xyma.in</p>
        </div>
      </div>
    </div>
    // <div className="h-screen flex items-center justify-center bg-gray-100">
    
    // </div>
  );
};

export default Setting;
