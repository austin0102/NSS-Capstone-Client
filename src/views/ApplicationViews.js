import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { ClassList } from "../components/classes/ClassList";



export const ApplicationViews = ({ token, setToken }) => {
 
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />} />


      <Route path="/classes">
        <Route index element={<ClassList setToken={setToken} />} />
        
      </Route>

    </Routes>
  );
};
