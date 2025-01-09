import React, { useEffect, useRef, useMemo, useState } from "react";
import Select from "react-select";
import axios, { all } from "axios";
import ReactApexChart from "react-apexcharts";
import { FaTemperatureLow } from "react-icons/fa6";
import { CSSTransition } from "react-transition-group";
import * as XLSX from "xlsx";
import report from "../images/report-bg.png";
import { Line } from "react-chartjs-2";

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

const PopupComponent = ({ onClose }) => {
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [dropdowndata, setDropdown] = useState([]);

  const sensors = [
    { label: "Reformer-1", value: "sensor1" },
    { label: "Reformer-2", value: "sensor2" },
    { label: "Reformer-3", value: "sensor3" },
    { label: "Reformer-4", value: "sensor1" },
    { label: "Reformer-5", value: "sensor5" },
    { label: "Reformer-6", value: "sensor6" },
    { label: "Reformer-7", value: "sensor7" },
    { label: "Reformer-8", value: "sensor8" },
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
    const currentDateTimeString = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Combine the selected date with the current time
    const combinedDateTime = `${selectedDate} ${
      currentDateTimeString.split(" ")[1]
    }`;

    if (dateType === "from") {
      setSelectedFromDate(combinedDateTime);
    } else if (dateType === "to") {
      setSelectedToDate(combinedDateTime);
    }
  };

  const handleSensorChange = (selectedOption) => {
    setDropdown(selectedOption);
  };
  const handleDownload = async () => {
    const fromDates = new Date(selectedFromDate);
    const toDates = new Date(selectedToDate);
    try {
      const response = await fetch(
        "https://iocl.xyma.live/backend/Report_data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fromDates, toDates }),
        }
      );
      const data = await response.json();

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
      XLSX.writeFile(workbook, "Reports.xlsx");
    } catch (error) {
      console.error(error);
    }
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
          <div className="grid grid-rows-3 md:flex md:flex-col md:justify-between">
            <div className="md:text-center">
              <h1 className="font-bold text-2xl">
                Conventionally Download Your Reports
              </h1>
            </div>

            <div>
              <div className="grid grid-rows-4 mt-10 items-center md:items-start justify-center">
                <div className="text-white grid grid-cols-2">
                  <h1 className="text-white mb-2 md:mb-0">Select a Device :</h1>
                  <Select
                    options={sensors}
                    className="text-black"
                    isSearchable={true}
                    onChange={handleSensorChange}
                  />
                </div>
                <div className="grid grid-cols-2">
                  <h1 className="text-white">From Date :</h1>
                  <input
                    type="date"
                    className="border rounded p-2 ml-2 "
                    onChange={(e) => handleDateChange(e, "from")}
                  />
                </div>
                <div className=" grid grid-cols-2 mt-2">
                  <h1 className="text-white">To Date :</h1>
                  <input
                    type="date"
                    className="border rounded p-2 ml-2"
                    onChange={(e) => handleDateChange(e, "to")}
                  />
                </div>
                <button
                  className="bg-blue-500 text-white p-2 rounded mt-2"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
            </div>
            <div className="md:text-right">
              <button
                onClick={onClose}
                className=" bg-[#B22F27] font-bold text-white rounded w-14"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

const Demo = ({ Device_Limit, Alldata }) => {
  const inputRef = useRef(null);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [color_Limit, setLimitData] = useState([]);
  const onedata = Alldata ? Alldata[0] : [];

  useEffect(() => {
    fetchData();
    const fulldata = setInterval(fetchData, 2000);
    return () => {
      clearInterval(fulldata);
    };
  }, []);

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

  const fetchData = async () => {
    try {
      const datas = await fetch("https://iocl.xyma.live/backend/Limits_Data");
      const Limit_Data = await datas.json();
      setLimitData(Limit_Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReportButtonClick = () => {
    setPopupVisibility(true);
  };

  const handleClosePopup = () => {
    setPopupVisibility(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    try {
      await axios.post("https://iocl.xyma.live/backend/saveData", {
        inputValue,
      });
      console.log("Data saved successfully");
      inputRef.current.value = "";
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

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
            color: "white",
          },
          ticks: {
            color: "white",
            callback: function (value) {
              return value + "℃";
            },
          },
        },
        x: {
          title: {
            display: true,
            text: "Timestamp",
            color: "white",
          },
          ticks: {
            color: "white",
          },
        },
      },
    }),
    []
  );

  const s1 =
    Array.isArray(Alldata) && Alldata.length > 0
      ? Alldata.map((item) => item.sensor1)
      : [];
  const s2 =
    Array.isArray(Alldata) && Alldata.length > 0
      ? Alldata.map((item) => item.sensor2)
      : [];
  const s3 =
    Array.isArray(Alldata) && Alldata.length > 0
      ? Alldata.map((item) => item.sensor3)
      : [];
  const s4 =
    Array.isArray(Alldata) && Alldata.length > 0
      ? Alldata.map((item) => item.sensor4)
      : [];

  const timeValues =
    Array.isArray(Alldata) && Alldata.length > 0
      ? Alldata.map((item) => item.time.split(",")[0].trim())
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

  return (
    <div className="text-center">
      <div className="mb-4 md:mb-0 bg-dark_color p-4 md:h-screen">
        <h1 className="text-2xl font-sans font-bold tracking-normal bg-white">
          IOCL HALDIA - REFORMER TUBE TEMPERATURE MEASUREMENT
        </h1>
        <div className="h-[10%] flex flex-col md:flex-row md:items-center justify-between bg-dark_color rounded-lg p-4 md:ml-5 md:mr-5">
          <h1 className="text-[10px] md:text-[15px] text-white mb-4 md:mb-0 md:mr-4 md:justify-self-start">
            REFORMER TUBE: 43
          </h1>
          <div className="flex items-center">
            {" "}
            {/* Container for buttons and input */}
            <button
              className="bg-[#27B299] w-20 h-10 rounded text-white mr-2 font-bold"
              onClick={handleReportButtonClick}
            >
              Report
            </button>
            <input
              type="text"
              ref={inputRef}
              placeholder={`Limit-${color_Limit.inputValue}`}
              className="text-black mr-2 h-10 w-[20%] md:w-[50%] rounded-md border  px-2 py-1"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#0EB3FA] w-20 h-10 rounded text-white font-bold"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="h-[15%] grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 ml-5 mr-5">
          <div className="bg-gray-200 grid grid-rows-2 md:grid-rows-2 rounded p-4">
            <div className="flex flex-cols-2">
              <FaTemperatureLow className="text-2xl" />
              <h1 className="ml-5 font-bold">{onedata.sensor1}℃</h1>
            </div>
            <h1 className="font-bold mt-1">Sensor1</h1>
          </div>
          <div className="bg-gray-200 grid grid-rows-2 md:grid-rows-2 rounded p-4">
            <div className="flex flex-cols-2">
              <FaTemperatureLow className="text-2xl" />
              <h1 className="ml-5 font-bold">{onedata.sensor2}℃</h1>
            </div>
            <h1 className="font-bold mt-1">Sensor2</h1>
          </div>
          <div className="bg-gray-200 grid grid-rows-2 md:grid-rows-2 rounded p-4">
            <div className="flex flex-cols-2">
              <FaTemperatureLow className="text-2xl" />
              <h1 className="ml-5 font-bold">{onedata.sensor3}℃</h1>
            </div>
            <h1 className="font-bold mt-1">Sensor3</h1>
          </div>
          <div className="bg-gray-200 grid grid-rows-2 md:grid-rows-2 rounded p-4">
            <div className="flex flex-cols-2">
              <FaTemperatureLow className="text-2xl" />
              <h1 className="ml-5 font-bold">{onedata.sensor4}℃</h1>
            </div>
            <h1 className="font-bold mt-1">Sensor4</h1>
          </div>
          <div className="bg-gray-200 grid grid-rows-2 md:grid-rows-2 rounded p-4">
            <div className="flex flex-cols-2">
              <FaTemperatureLow className="text-2xl" />
              <h1 className="ml-5 font-bold">{onedata.sensor5}℃</h1>
            </div>
            <h1 className="font-bold mt-1">Sensor5</h1>
          </div>
        </div>
        <div className="h-[10%] flex  flex-col md:flex-row md:items-center justify-between bg-dark_color rounded-lg p-4 md:ml-5 md:mr-5">
          <h1 className="text-white mb-4 md:mb-0 md:mr-4 md:justify-self-start">
            Graph
          </h1>
          <Select
            options={dropdown_datas}
            className="text-black text-left w-52"
            isSearchable={true}
            onChange={handleDaysDropdown}
          />
        </div>
        <div className="h-[60%] p-2 border border-white rounded-md">
          <Line data={datas} height={"100%"} options={options} />
        </div>
      </div>

      <CSSTransition
        in={isPopupVisible}
        timeout={100}
        classNames="popup-overlay"
        unmountOnExit
      >
        <div className="overlay">
          <PopupComponent onClose={handleClosePopup} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Demo;
