// AlldataContext.js
import React, { createContext,useEffect, useContext, useState } from "react";

const AlldataContext = createContext();

export const AlldataProvider = ({ children }) => {
  const [alldata, setReportData] = useState();
  const [color_Limit, setLimitData] = useState([]);
  const [activityStatus, setActivityStatus] = useState("");


   useEffect(() => {
      fetch_device_limit();
      fetch_device_datas();
  
      const device_limit = setInterval(fetch_device_limit, 2000);
      const device_datas = setInterval(fetch_device_datas, 2000);
  
      return () => {
        clearInterval(device_limit);
        clearInterval(device_datas);
      };
    }, []);

    const fetch_device_limit = async () => {
      try {
        const datas = await fetch("https://iocl.xyma.live/backend/Limits_Data");
        // const datas = await fetch("http://localhost:4000/backend/Limits_Data");
  
        const Limit_Data = await datas.json();
        setLimitData(Limit_Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  


  const fetch_device_datas = async () => {
    try {
      const limitvalue = localStorage.getItem("limit") || "1hr";
      const datass = await fetch(
        `https://iocl.xyma.live/backend/FindData?inputValue=${limitvalue}`
      );
      // console.log("limit value", limitvalue);
      // const datass = await fetch(
      //   `http://localhost:4000/backend/FindData?inputValue=${limitvalue}`
      // );
      const Limit_Data = await datass.json();
      // console.log("chart data =", Limit_Data.data);
      // console.log("activity status", Limit_Data.activityStatus);
      setReportData(Limit_Data.data);
      setActivityStatus(Limit_Data.activityStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <AlldataContext.Provider value={{ alldata, setReportData,color_Limit, setLimitData,activityStatus, setActivityStatus }}>
      {children}
    </AlldataContext.Provider>
  );
};

export const useAlldata = () => useContext(AlldataContext);
