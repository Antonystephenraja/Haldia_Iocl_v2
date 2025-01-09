import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login";
import ProtectedRoute from "../components/ProtectedRoute";
import Mainpage from "../components/Demo";
import App from "../App";
import Chart from "../components/Demo_chart";
// import Setting from '../components/alldata_download'
import Setting from "../components/Setting";
const Router = () => {
  const [color_Limit, setLimitData] = useState([]);
  const [alldata, setReportData] = useState();
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
      console.log("chart data =", Limit_Data.data);
      // console.log("activity status", Limit_Data.activityStatus);
      setReportData(Limit_Data.data);
      setActivityStatus(Limit_Data.activityStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<App />}>
              <Route
                index
                element={
                  <Mainpage
                    Device_Limit={color_Limit}
                    Alldata={alldata}
                    activityStatus={activityStatus}
                  />
                }
              />
              <Route path="chart" element={<Chart />} />
              <Route path="setting" element={<Setting />} />
              {/* <Route path='upgrade' element={<Upgradeplan/>}/> */}
              {/* <Route path='report' element={<Reports/>}/>
                  <Route path='setting' element={<Setting/>}/> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
