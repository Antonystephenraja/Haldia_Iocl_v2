import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login";
import ProtectedRoute from "../components/ProtectedRoute";
import Mainpage from "../components/Demo";
import App from "../App";
import Setting from "../components/Setting";
import { AlldataProvider, useAlldata} from '../components/AlldataContext';
import Navbar from "../components/Navbar";
import Report from "../components/Report";
const Router = () => {
  return (
    <AlldataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<App />}>
              <Route
                index
                element={
                  <Mainpage/>
                }
              />
            
              <Route path="Reports" element={<Report />} />
              <Route path="Settings" element={<Setting />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AlldataProvider>
  );
};

export default Router;
