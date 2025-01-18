import React, { useEffect, useRef, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import { FaTemperatureLow } from "react-icons/fa6";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { useAlldata } from "./AlldataContext";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);
const Demo = () => {
  const { color_Limit, alldata, activityStatus } = useAlldata();
  
  const onedata = alldata ? alldata[0] : [];



  const options = useMemo(
    () => ({
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.parsed.y} ℃`;
            },
          },
        },
        zoom: {
          pan: {
            enabled: true, // Enable panning
            mode: "x", // Allow panning only in the x-direction
          },
          zoom: {
            enabled: true, // Enable zooming
            mode: "x", // Allow zooming only in the x-direction
            wheel: {
              enabled: true, // Enable zooming with the mouse wheel
            },
            pinch: {
              enabled: true, // Enable zooming with pinch gestures on touch devices
            },
          },
        },
      },
      scales: {
        y: {
          position: "right",
          title: {
            display: true,
            text: "Temperature (℃)",
            color: "white", // Axis title color
          },
          ticks: {
            color: "white", // Tick labels color
            callback: function (value) {
              return value + "℃";
            },
          },
          grid: {
            color: "rgba(255, 255, 255, 0.2)", // Gridline color (optional)
          },
        },
        x: {
          title: {
            display: true,
            text: "Timestamp",
            color: "white", // Axis title color
          },
          ticks: {
            color: "white", // Tick labels color
          },
          grid: {
            color: "rgba(255, 255, 255, 0.2)", // Gridline color (optional)
          },
        },
      },
    }),
    []
  );
  

  const s1 =
    Array.isArray(alldata) && alldata.length > 0
      ? alldata.map((item) => item.sensor1)
      : [];
  const s2 =
    Array.isArray(alldata) && alldata.length > 0
      ? alldata.map((item) => item.sensor2)
      : [];
  const s3 =
    Array.isArray(alldata) && alldata.length > 0
      ? alldata.map((item) => item.sensor3)
      : [];
  const s4 =
    Array.isArray(alldata) && alldata.length > 0
      ? alldata.map((item) => item.sensor4)
      : [];

  const timeValues =
    Array.isArray(alldata) && alldata.length > 0
      ? alldata.map((item) => item.time.split(",")[0].trim())
      : [];

  const datas = {
    labels: timeValues.reverse(),
    datasets: [
      {
        label: "Sensor1",
        data: s1.reverse(),
        borderColor: "#fefefe",
        // backgroundColor: (context) => {
        //   const chart = context.chart;
        //   const { ctx, chartArea } = chart;
        //   if (!chartArea) return null;
        //   const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        //   gradient.addColorStop(0, 'rgba(255, 255, 255)');
        //   gradient.addColorStop(0.5, 'rgba(255, 255, 255)');
        //   gradient.addColorStop(1, 'rgba(255, 255, 255)');
        //   return gradient;
        // },
        tension: 0.2,
        fill: true,
        borderWidth: 2,
      },
      {
        label: "Sensor2",
        data: s2.reverse(),
        fill: false,
        borderColor: "#00a705",
        tension: 0.1,
      },
      {
        label: "Sensor3",
        data: s3.reverse(),
        fill: false,
        borderColor: "#d5ea03",
        tension: 0.1,
      },
      {
        label: "Sensor4",
        data: s4.reverse(),
        fill: false,
        borderColor: "#12f4ff",
        tension: 0.1,
      },
    ],
  };

    const dropdown_datas = [
    { label: "Last 1hr Data", value: "1hr" },
    { label: "Last 12hr Data", value: "12hr" },
    { label: "Last 24hr Data", value: "24hr" },
    { label: "Last 7 Days Data", value: "7d" },
    { label: "Last 30 Days Data", value: "30d" },
  ];

  const handleDaysDropdown = async (selectedOption) => {
    localStorage.setItem("limit", selectedOption.value);

    // Send a POST request to your backend with the selected value
    // await axios.post('https://iocl.xyma.live/backend/saveData', { inputValue: selectedOption.value });
    // console.log('Data saved successfully on the backend');
  };


  return (
    <div className='space-y-2 w-full h-full'>
      <div className='flex text-white xl:text-2xl justify-between h-[15%] '>
        <div className='border text-black w-[18%] rounded-md bg-gray-300 grid grid-rows-2 md:grid-rows-2'>
          <div className="font-bold  flex justify-center items-center">
            Sensor 1
          </div>
          <div className="flex justify-center items-center">
            <FaTemperatureLow className="text-2xl" />
            <h1 className="ml-3 font-bold md:text-3xl">{onedata.sensor1}℃</h1>
          </div>
        </div>
        <div className='border text-black w-[18%] rounded-md bg-gray-300 grid grid-rows-2 md:grid-rows-2'>
          <div className="font-bold  flex justify-center items-center">
            Sensor 2
          </div>
          <div className="flex justify-center items-center">
            <FaTemperatureLow className="text-2xl" />
            <h1 className="ml-3 font-bold md:text-3xl">{onedata.sensor2}℃</h1>
          </div>
        </div>
        <div className='border text-black w-[18%] rounded-md bg-gray-300 grid grid-rows-2 md:grid-rows-2'>
          <div className="font-bold  flex justify-center items-center">
            Sensor 3
          </div>
          <div className="flex justify-center items-center">
            <FaTemperatureLow className="text-2xl" />
            <h1 className="ml-3 font-bold md:text-2xl">N/A</h1>
          </div>
        </div>
        <div className='border text-black w-[18%] rounded-md bg-gray-300 grid grid-rows-2 md:grid-rows-2'>
          <div className="font-bold  flex justify-center items-center">
            Sensor 4
          </div>
          <div className="flex justify-center items-center">
            <FaTemperatureLow className="text-2xl" />
            <h1 className="ml-3 font-bold md:text-2xl">N/A</h1>
          </div>
        </div>
        <div className='border text-black w-[18%] rounded-md bg-gray-300 grid grid-rows-2 md:grid-rows-2'>
          <div className="font-bold  flex justify-center items-center">
            Sensor 5
          </div>
          <div className="flex justify-center items-center">
            <FaTemperatureLow className="text-2xl" />
            <h1 className="ml-3 font-bold md:text-2xl">N/A</h1>
          </div>
        </div>
      </div>
      <div className='h-[83%] border'>
        <div className='text-white h-[10%] flex justify-end items-center mr-2'>
           <div className='text-sm'>
              <span className='text-gray-200 font-bold'>Last Updated By:</span><span className='mr-2 font-sans font-bold text-yellow-400'>{onedata.time}</span>
            </div>
          <Select
              options={dropdown_datas}
              className="text-black text-left w-52"
              isSearchable={true}
              onChange={handleDaysDropdown}
            />
            
            
        </div>
        <div className="h-[83%] rounded-md border-gray-400 m-2">
          <Line data={datas} height={"100%"} options={options} />
        </div>
      </div>
      
    </div>
  )
}

export default Demo

