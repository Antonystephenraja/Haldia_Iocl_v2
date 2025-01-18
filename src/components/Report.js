import React ,{useState}from 'react'
import { CSSTransition } from "react-transition-group";
import * as XLSX from "xlsx";
import report from "../images/report-bg.png";
import Select from "react-select";

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
            <div>
                <img src={report} className='mt-[20%] md:mt-0' alt="Popup Image" />

            </div>
            <div className="grid grid-rows-1 md:flex md:flex-col md:justify-between">
                <div className="md:text-center">
                <h1 className="font-bold text-[19px] md:text-2xl">
                    Conventionally Download Your Reports
                </h1>
                </div>

                <div>
                <div className="grid grid-rows-4 md:mt-10 items-center md:items-start justify-center">
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

const Report = () => {
    const [isPopupVisible, setPopupVisibility] = useState(true);
      const handleClosePopup = () => {
        setPopupVisibility(false);
        window.location.href = "/";
        localStorage.setItem("NavActivity",1)
  };

  return (
    <div>
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
  )
}

export default Report
