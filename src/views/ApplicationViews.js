import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { ClassList } from "../components/classes/ClassList";
import { ClassForm } from "../components/classes/ClassForm";
import { MainPage } from "../components/MainPage/MainPage";
import { UserClasses } from "../components/classes/UserClasses";
import { EditClassDetails } from "../components/classes/EditClass";
import { MyAthleteClasses } from "../components/classes/AthletesClasses";
import { ViewOtherUserClasses } from "../components/classes/OtherUserClasses";


export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path=""element={<MainPage token={token} />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />} />

      <Route path="/classes">
        <Route index element={<ClassList token={token} setToken={setToken} />} />
        <Route path="create" element={<ClassForm token={token} setToken={setToken} />} />
        <Route path="edit/:classId" element={<EditClassDetails token={token} setToken={setToken} />} />
      </Route>
        <Route path="users/:id" element={<ViewOtherUserClasses token={token} />} />


      <Route path="myClasses" element={<UserClasses token={token} setToken={setToken} />} />
      <Route path="/my-athlete-classes" element={<MyAthleteClasses token={token} />} />


    </Routes>
  );
};
