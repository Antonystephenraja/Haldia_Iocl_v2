import React, { useEffect, useRef,useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaTemperatureLow } from "react-icons/fa6";
import { CSSTransition } from 'react-transition-group';
import './style.css'
import Select from 'react-select';
import report from '../images/report-bg.png'
import close from '../images/close.png'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios, { all } from 'axios';
import * as XLSX from 'xlsx';


const PopupComponent = ({ onClose,alldata }) => {
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const[dropdowndata,setDropdown]=useState([]);

  
  const sensors = [
    { label: 'Reformer-1', value: 'sensor1' },
    { label: 'Reformer-2', value: 'sensor2' },
    { label: 'Reformer-3', value: 'sensor3' },
    { label: 'Reformer-4', value: 'sensor1' },
    { label: 'Reformer-5', value: 'sensor5' },
    { label: 'Reformer-6', value: 'sensor6' },
    { label: 'Reformer-7', value: 'sensor7' },
    { label: 'Reformer-8', value: 'sensor8' },
  ];

  // const handleDateChange = (event, dateType) => {
  //   const selectedDate = event.target.value;
  //   if (dateType === 'from') {
  //     setSelectedFromDate(selectedDate);
  //   } else if (dateType === 'to') {
  //     setSelectedToDate(selectedDate);
  //   }
  // };
  const handleDateChange = (event, dateType) => {
    const selectedDate = event.target.value;
  
    // Get the current date and time
    const currentDate = new Date();
    const currentDateTimeString = currentDate.toISOString().slice(0, 19).replace("T", " ");
  
    // Combine the selected date with the current time
    const combinedDateTime = `${selectedDate} ${currentDateTimeString.split(' ')[1]}`;
  
    if (dateType === 'from') {
      setSelectedFromDate(combinedDateTime);
    } else if (dateType === 'to') {
      setSelectedToDate(combinedDateTime);
    }
  };
  
  

  const handleSensorChange = (selectedOption) => {
    setDropdown(selectedOption);
  };
  const handleDownload = async () => {
    console.log("fromdate",selectedFromDate)
    console.log("to date",selectedToDate)
 
    const fromDates = new Date(selectedFromDate);
    const toDates = new Date(selectedToDate);

    const filteredData = alldata
      .filter(item => {
        const itemDate = new Date(item.time); 
        return itemDate >= fromDates && itemDate <= toDates;
      })
      .sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateA - dateB;
      });
    
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    XLSX.writeFile(workbook, 'Reports.xlsx');
  };

//   const handleDownload = async () => {
//     console.log(alldata)
//     const sensorvalue = alldata.map(item=>item.sensor1)
//     console.log(sensorvalue)
//     const sample = alldata[dropdowndata.value].map(item => {
//       const originalTimestamp = new Date(item.timestamp);
//       const formattedDate = `${originalTimestamp.getFullYear()}-${(originalTimestamp.getMonth() + 1).toString().padStart(2, '0')}-${originalTimestamp.getDate().toString().padStart(2, '0')}`;
//       return { ...item, timestamp: formattedDate };
//     });
// console.log(sample)
//     try{
//       if (!Array.isArray(sample)) {
//         console.error('Invalid data format:', sample);
//         return;
//       }
//       const doc = new jsPDF();
//       const tableHeaders= [
//         ['Reformer Tube',"Sensor1","Sensor2","Sensor3","Sensor4","Sensor5","Time"],
//       ];
//       const tableData = sample.map(item=>[
//         item.R_N,
//         item.sensor1,
//         item.sensor2,
//         item.sensor3,
//         item.sensor4,
//         item.sensor5,
//         item.time,
//       ]);
//       doc.autoTable({
//         head: tableHeaders,
//         body: tableData,
//       });
//       const blob = doc.output('blob');
//       const pdfUrl = URL.createObjectURL(blob);
//       window.open(pdfUrl,'_blank');
//     }catch(error){
//       console.error("Error generating PDF:",error)
//     }
//   }
  
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="popup-fade"
      unmountOnExit
    >
      <div className="popup-container">
      <div className="popup grid grid-cols-1 md:grid-cols-2">

        <img src={report} alt="Popup Image" />
        <div className='grid grid-rows-3 md:flex md:flex-col md:justify-between'>

          <div className='md:text-center'>
            <h1 className='font-bold text-2xl'>Conventionally Download Your Reports</h1>
          </div>

          <div>
          <div className="grid grid-rows-4 mt-10 items-center md:items-start justify-center">
            <div className='text-white grid grid-cols-2'>
              <h1 className='text-white mb-2 md:mb-0'>Select a Device :</h1>
              <Select options={sensors} className="text-black" isSearchable={true} onChange={handleSensorChange} />
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='text-white'>From Date :</h1>
              <input type="date" className="border rounded p-2 ml-2 "onChange={(e) => handleDateChange(e, 'from')} />
            </div>
            <div className=' grid grid-cols-2 mt-2'>
              <h1 className='text-white'>To Date :</h1>
              <input type="date" className="border rounded p-2 ml-2"onChange={(e) => handleDateChange(e, 'to')}   />
            </div>
            <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={handleDownload}>Download</button> 
          </div>
          </div>
          <div className='md:text-right'>
          <button onClick={onClose} className=' bg-[#B22F27] font-bold text-white rounded w-14'>close</button>
          </div>
        </div>
        </div>
      </div>
    </CSSTransition>
  );
};

const Mainpage = () => {
  const [device,setR_N]=useState([])
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const inputRef = useRef(null);
  const [sensor_Data,setLastDatas]=useState([])
  const [chartfiltered_Data,setFilterData]=useState([])
  // const[filterdata,setDropdownDays]=useState(null);
  const [color_Limit,setLimitData]=useState([])
  const [device4,DeviceData4]=useState([])

  useEffect(()=>{
    fetchData();
    limit_data();
    const data = setInterval(fetchData,2000)
    const limitdata = setInterval(limit_data,2000)
    return()=>{
      clearInterval(data);
      clearInterval(limitdata);
    }
  },[device])


  const limit_data = async()=>{
    try{
      const datas = await fetch('http://iocl.xyma.live/backend/Limits_Data');
      const Limit_Data = await datas.json()
      setLimitData(Limit_Data)
    }catch(error){
      console.error('Error fetching data:', error);
    }
  }
  

  
  const fetchData = async () => {
    try {
      const response = await fetch('http://iocl.xyma.live/backend/last_500_Data');
      const info = await response.json();
    
      const datas = info[0]
      setFetchedData(info);
      setLastDatas(datas);
      if (device == "07"){
          const lastSevenData = fetchedData.slice(0,7);
          setFilterData(lastSevenData)
        }
        else if (device == "15"){
          const lastSevenData = fetchedData.slice(0,15);
          setFilterData(lastSevenData)
        }
        else if (device == "2000"){
          const lastSevenData = fetchedData.slice(0,2000);
          setFilterData(lastSevenData)
        }
   
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // if (device == "07"){
  //   const lastSevenData = fetchedData.slice(0,7);
  //   console.log("filterdaata",lastSevenData)
  //   setFilterData(lastSevenData)
  // }
  // const datas = async(lastSevenData)=>{
  //   console.log("dropdown data after...",filterdata)
  //   if (device == "07"){
  //     const lastSevenData = fetchedData.slice(0,7);
  //     console.log("filterdaata",lastSevenData)
  //     setFilterData(lastSevenData)
  //   }
  // }
  // const lastSevenData = fetchedData.slice(0,7);



 
  const without_resverse_s1 = chartfiltered_Data.map(data => data.sensor1);
  const with_whole_s1 = without_resverse_s1.reverse()


  const without_resverse_s2 = chartfiltered_Data.map(data => data.sensor2);
  const with_whole_s2 = without_resverse_s2.reverse()

  // const without_resverse_s3 = chartfiltered_Data.map(data => data.sensor3);
  // const with_whole_s3 = without_resverse_s3.reverse()

  // const without_resverse_s4 = chartfiltered_Data.map(data => data.sensor4);
  // const with_whole_s4 = without_resverse_s4.reverse()

  // const without_resverse_s5 = chartfiltered_Data.map(data => data.sensor5);
  // const with_whole_s5 = without_resverse_s5.reverse()

  const without_resverse_time = chartfiltered_Data.map(data => data.time);
  const with_whole_time = without_resverse_time.reverse()

  const chartOptions = {
      grid: {
        show: true,
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
        // {
        //   name: 'Sensor-3',
        //   data: with_whole_s3, 
        // },
        // {
        //   name: 'Sensor-4',
        //   data: with_whole_s4, 
        // },
        // {
        //   name: 'Sensor-5',
        //   data: with_whole_s5, 
        // },
      ],
      chart: {
        height: 700,
        type: 'area',
        toolbar: {
          show: false, 
        },
      },
      dataLabels: {
        enabled: false,
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

    const getBackgroundColor = (value) => {
      const a =parseInt(color_Limit.inputValue)
      if (value > a) {
        // If the value is greater than 200, return a class for red color
        return 'red-bg';
      } else {
        // Otherwise, return an empty string or another default class
        return '';
      }
    };
    
    const handleReportButtonClick = () => {
      setPopupVisibility(true);
    };
  
    const handleClosePopup = () => {
      setPopupVisibility(false);
    };
    ///////dropdown in the days////////////
    const dropdown_datas =[
      {label:'7 Datas',value:'07'},
      {label:'15 Datas',value:'15'},
      {label: '2000 Datas',value: '2000'}
    ]

    const handleDaysDropdown = (selectedOption) => {  
        try{
          setR_N(selectedOption.value)
          
        }catch(error){}
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    console.log("yess")
      // try {
      //   // Make a POST request to your API endpoint
      //   await axios.post('http://localhost:4000/backend/saveData', { inputValue });
      //   console.log('Data saved successfully');
      //   inputRef.current.value = '';
      // } catch (error) {
      //   console.error('Error saving data:', error.message);
      // }
    };
  return (
    <div className="text-center">
        <h1 className="text-2xl font-sans font-bold tracking-normal">
        IOCL HALDIA - REFORMER TUBE TEMPERATURE MEASUREMENT
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-4">
          <div className="mb-4 md:mb-0 bg-dark_color rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-dark_color rounded-lg p-4 md:ml-5 md:mr-5">
            <h1 className="text-white mb-4 md:mb-0 md:mr-4 md:justify-self-start">REFORMER TUBE: 04</h1>
            
            <div className="flex items-center"> {/* Container for buttons and input */}
              <button className='bg-[#27B299] w-20 h-10 rounded text-white mr-2 font-bold' onClick={handleReportButtonClick}>
                Report
              </button>
             <input type="text" placeholder={`Limit-${color_Limit.inputValue}`}ref={inputRef} className="text-black mr-2 h-10 w-32 rounded-md border  px-2 py-1" />
              <button onClick={handleSubmit} className='bg-[#0EB3FA] w-20 h-10 rounded text-white font-bold' >
                Submit
              </button> 
            </div>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 ml-5 mr-5">
          <div className="bg-gray-200 grid grid-rows-2 md:grid-rows-2 rounded p-4">
            <div className="flex flex-cols-2">
              <FaTemperatureLow className='text-2xl'/>
              <h1 className='ml-5 font-bold'>{sensor_Data.sensor1}℃</h1>
            </div>
            <h1 className='font-bold mt-1'>Sensor1</h1>
          </div>
          <div className="bg-gray-200 grid grid-rows-2 md:grid-rows-2 rounded p-4">
            <div className="flex flex-cols-2">
              <FaTemperatureLow className='text-2xl'/>
              <h1 className='ml-5 font-bold'>{sensor_Data.sensor2}℃</h1>
            </div>
            <h1 className='font-bold mt-1'>Sensor2</h1>
          </div>
          <div className="bg-gray-200 grid grid-rows-2 md:grid-rows-2 rounded p-4">
            <div className="flex flex-cols-2">
              <FaTemperatureLow className='text-2xl'/>
              <h1 className='ml-5 font-bold'>N/A</h1>
            </div>
            <h1 className='font-bold mt-1'>Sensor3</h1>
          </div>
          <div className="bg-gray-200 grid grid-rows-2 md:grid-rows-2 rounded p-4">
            <div className="flex flex-cols-2">
              <FaTemperatureLow className='text-2xl'/>
              <h1 className='ml-5 font-bold'>N/A</h1>
            </div>
            <h1 className='font-bold mt-1'>Sensor4</h1>
          </div>
          <div className="bg-gray-200 grid grid-rows-2 md:grid-rows-2 rounded p-4">
            <div className="flex flex-cols-2">
              <FaTemperatureLow className='text-2xl'/>
              <h1 className='ml-5 font-bold'>N/A</h1>
            </div>
            <h1 className='font-bold mt-1'>Sensor5</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-dark_color rounded-lg p-4 md:ml-5 md:mr-5">
            <h1 className="text-white mb-4 md:mb-0 md:mr-4 md:justify-self-start">Graph</h1>
            <Select options={dropdown_datas} className="text-black" isSearchable={true} onChange={handleDaysDropdown} />
        </div>
        <div className="mb-4 mt-3">
          <div className=''>
            <ReactApexChart options={chartOptions} series={chartOptions.series} type='area' />
          </div>
        </div>
      </div>
            {/* Second Column */}
            <div className="grid grid-cols-2 gap-4 ">
              {/* First Column */}
              <div className="col-span-1 overflow-x-auto bg-dark_color w-full  max-h-screen overflow-y-auto rounded-lg">
                {/* Your 31x6 table content for the first column */}
                <table className="border-collapse table_border  table-auto w-full">
                  <tbody>
                  <tr>
                      <th className='w-3'>R.N</th>
                      <th>Sensor1</th>
                      <th>Sensor2</th>
                      <th>Sensor3</th>
                      <th>Sensor4</th>
                      <th>Sensor5</th>
                    </tr>
                  <tr>
                    <td >1</td>
                    <td>-</td>
                    <td >-</td>
                    <td>-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr>
                    <td >2</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>3</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr>
                    <td>4</td>
                    <td className={getBackgroundColor(sensor_Data.sensor1)}>{sensor_Data.sensor1}</td>
                    <td className={getBackgroundColor(sensor_Data.sensor2)}>{sensor_Data.sensor2}</td>
                    <td >{sensor_Data.sensor3}</td>
                    <td>{sensor_Data.sensor4}</td>
                    <td>{sensor_Data.sensor5}</td> 
                  </tr>
                  {/* <tr>
                    <td>4</td>
                    <td className={getBackgroundColor(40)}>0</td>
                    <td className={getBackgroundColor(24)}>4</td>
                    <td className={getBackgroundColor(43)}>4</td>
                    <td className={getBackgroundColor(43)}>4</td>
                    <td className={getBackgroundColor(43)}>4</td> 
                  </tr> */}
                  <tr >
                    <td>5</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>6</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>7</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>8</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>9</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>10</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>11</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>12</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>13</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>14</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>15</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>16</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>17</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>18</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>19</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>20</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>21</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>22</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>23</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>24</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>25</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>26</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>27</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>28</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>29</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>30</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  </tbody>
                </table>
              </div>



              {/* Second Column */}
              <div className="col-span-1 overflow-x-auto bg-dark_color w-full  max-h-screen overflow-y-auto rounded-lg">
                {/* Your 31x6 table content for the second column */}
                <table className="border-collapse table2_border  table-auto w-full">
                <tbody>
                    <tr>
                      <th className='w-3'>R.N</th>
                      <th>Sensor1</th>
                      <th>Sensor2</th>
                      <th>Sensor3</th>
                      <th>Sensor4</th>
                      <th>Sensor5</th>
                    </tr>
                    <tr>
                    <td >31</td>
                    <td>-</td>
                    <td >-</td>
                    <td>-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr>
                    <td >32</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>33</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>34</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>35</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>36</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>37</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>38</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>39</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>40</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>41</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>42</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>43</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>44</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>45</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>46</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>47</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>48</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>49</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>50</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>51</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>52</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>53</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>54</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>55</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>56</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>57</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>58</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>59</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                  <tr >
                    <td>60</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td>
                    <td >-</td> 
                  </tr>
                 
                  
                  </tbody>
                </table>
              </div>
            </div>

        </div>
        <CSSTransition
        in={isPopupVisible}
        timeout={100}
        classNames="popup-overlay"
        unmountOnExit
      >
        <div className="overlay">
          <PopupComponent onClose={handleClosePopup} alldata={fetchedData}/>
        </div>
      </CSSTransition>

    </div>
);
};

export default Mainpage
