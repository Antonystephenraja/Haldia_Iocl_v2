
import React, { useEffect, useRef,useState } from 'react';
import './style.css'
import Select from 'react-select';
import ReactApexChart from 'react-apexcharts';
const Chart = () => {
  const [RN1_device,setRN1]=useState([])
  const [device ,setDropdownDays]=useState([])

  useEffect(()=>{
    fetchData();
    const data =setInterval(fetchData,2000)
    return()=>{
      clearInterval(data);
    }
  },[device])

  const dropdown_datas =[
    { label: 'Reformer-1', value: '01' },
    { label: 'Reformer-2', value: '02' },
    { label: 'Reformer-3', value: '03' },
    { label: 'Reformer-4', value: '04' },
    { label: 'Reformer-5', value: '05' },
    { label: 'Reformer-6', value: '06' },
    { label: 'Reformer-7', value: '07' },
    { label: 'Reformer-8', value: '08' },
    { label: 'Reformer-9', value: '09' },
    { label: 'Reformer-100', value: '010' },
  ]
  const handleDaysDropdown = (selectedOption) => {
    setDropdownDays(selectedOption.value);
};
const without_resverse_s1 = RN1_device.map(data => data.sensor1);
const with_whole_s1 = without_resverse_s1.reverse()

const without_resverse_s2 = RN1_device.map(data => data.sensor2);
const with_whole_s2 = without_resverse_s2.reverse()

const without_resverse_s3 = RN1_device.map(data => data.sensor3);
const with_whole_s3 = without_resverse_s3.reverse()

const without_resverse_s4 = RN1_device.map(data => data.sensor4);
const with_whole_s4 = without_resverse_s4.reverse()

const without_resverse_s5 = RN1_device.map(data => data.sensor5);
const with_whole_s5 = without_resverse_s5.reverse()

const without_resverse_time = RN1_device.map(data => data.time);
const with_whole_time = without_resverse_time.reverse()


  const chartOptions = {
    grid: {
      show: false,
    },
    series: [
      {
        name: 'Sensor-1',
        // style: {
        //   colors: '#ffffff'
        // },
        data: with_whole_s1,
      },
      {
        name: 'Sensor-2',
        data: with_whole_s2, 
      },
      {
        name: 'Sensor-3',
        data: with_whole_s3, 
      },
      {
        name: 'Sensor-4',
        data: with_whole_s4, 
      },
      {
        name: 'Sensor-5',
        data: with_whole_s5, 
      },
    ],
    chart: {
      height: 700,
      type: 'area',
      toolbar: {
        show: false, 
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories:with_whole_time,
      labels: {
        style: {
          colors: '#ffffff', 
        },
      },
    },
    yaxis:{
      labels:{
        style:{
          colors:'#ffffff'
        }
      }
    },
    legend: {
      labels: {
        colors: ['#27B8F3', '#16F05E','#F3D818','#F35718','#B110F3'], // Set colors for series names
      },
    },
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/backend/LastData');
      const info = await response.json();
      if (device === '01'){

        const RN= info['sensor1']
        if(RN.R_N === '-'){
          console.log("Error")
        }
        else{
          setRN1(RN)
        }
       
      }
      else if(device ==='02'){
        const RN = info['sensor2']
        if(RN.R_N === '-' && RN.sensor1 === '-' && RN.sensor2 === '-' && RN.sensor3 === '-'){
          console.log("Error")
        }
        else{
        
          setRN1(RN)
        }
      }
      else if(device ==='03'){
        const RN = info['sensor3']
        if(RN.R_N === '-' && RN.sensor1 === '-' && RN.sensor2 === '-' && RN.sensor3 === '-'){
          console.log("Error")
        }
        else{
          setRN1(RN)
        }
      }
      else if(device ==='04'){
        const RN = info['sensor4']
        if(RN.R_N === '-' && RN.sensor1 === '-' && RN.sensor2 === '-' && RN.sensor3 === '-'){
          console.log("Error")
        }
        else{
          setRN1(RN)
        }
      }
      else if(device ==='05'){
        const RN = info['sensor5']
        if(RN.R_N === '-' && RN.sensor1 === '-' && RN.sensor2 === '-' && RN.sensor3 === '-'){
          console.log("Error")
        }
        else{
          setRN1(RN)
        }
      }
      else if(device ==='06'){
        const RN = info['sensor6']
        if(RN.R_N === '-' && RN.sensor1 === '-' && RN.sensor2 === '-' && RN.sensor3 === '-'){
          console.log("Error")
        }
        else{
          setRN1(RN)
        }
      }
      else if(device ==='07'){
        const RN = info['sensor7']
        if(RN.R_N === '-' && RN.sensor1 === '-' && RN.sensor2 === '-' && RN.sensor3 === '-'){
          console.log("Error")
        }
        else{
          setRN1(RN)
        }
      }
      else if(device ==='08'){
        const RN = info['sensor8']
        if(RN.R_N === '-' && RN.sensor1 === '-' && RN.sensor2 === '-' && RN.sensor3 === '-'){
          console.log("Error")
        }
        else{
          setRN1(RN)
        }
      }
      else if(device ==='09'){
        const RN = info['sensor9']
        if(RN.R_N === '-' && RN.sensor1 === '-' && RN.sensor2 === '-' && RN.sensor3 === '-'){
          console.log("Error")
        }
        else{
          setRN1(RN)
        }
      }
      else if(device ==='10'){
        const RN = info['sensor10']
        if(RN.R_N === '-' && RN.sensor1 === '-' && RN.sensor2 === '-' && RN.sensor3 === '-'){
          console.log("Error")
        }
        else{
          setRN1(RN)
        }
      }      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  
  return (
    <div className="bg-dark_color height">
    <h1 className='text-white font-bold text-2xl text-center'>Analytics a Temperature Datas</h1>
      <div className="flex flex-col md:flex-row justify-end bg-dark_color rounded-lg p-4 md:ml-5 md:mr-5">
        <div>
          <h1 className="text-white mb-4 md:mb-0 font-bold mr-2 mt-1">Select the Reformer Tube:</h1>
        </div>
        <Select options={dropdown_datas} className="text-black w-32" isSearchable={true} onChange={handleDaysDropdown} />
      </div>
      <div>
        <div className="mt-3 bg-[#0d0b3348] mb-2 border ml-14 mr-14 chart_Mobile ">
          <div className=''>
            <ReactApexChart options={chartOptions} series={chartOptions.series}  type='line' />
          </div>
        </div>
      </div>
  </div>
  
  );
};

export default Chart;


