import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { ClassList } from "../components/classes/ClassList";
import { ClassForm } from "../components/classes/ClassForm";
import { UserClasses } from "../components/classes/UserClasses";
import { EditClassDetails } from "../components/classes/EditClass";
import { MyAthleteClasses } from "../components/classes/AthletesClasses";
import { ViewOtherUserClasses } from "../components/classes/OtherUserClasses";


export const TrainerViews = ({ token, setToken }) => {
  return (
    <Routes>
      

      <Route path="/classes">
        <Route index element={<ClassList token={token} setToken={setToken} />} />
        <Route path="create" element={<ClassForm token={token} setToken={setToken} />} />
        <Route path="edit/:classId" element={<EditClassDetails token={token} setToken={setToken} />} />
        <Route path="trainer/:trainerId" element={<ViewOtherUserClasses />} />

      </Route>

      <Route path="myClasses" element={<UserClasses token={token} setToken={setToken} />} />
      


    </Routes>
  );
};