import React from "react";
import { Route, Routes } from "react-router-dom";
import { Register } from "../components/auth/Register";
import { Login } from "../components/auth/Login";
import { Authorized } from "./Authorized";
import { ClassList } from "../components/classes/ClassList";
import { ViewOtherUserClasses } from "../components/classes/OtherUserClasses";
import { MyAthleteClasses } from "../components/classes/AthletesClasses";

export const AthleteViews = (token, setToken) => {
  return (
    <Routes>
        <Route element={<Authorized token={token} />} />
      <Route path="/classes">
        <Route index element={<ClassList />} />
        <Route path="trainer/:trainerId" element={<ViewOtherUserClasses />} />
      </Route>

      <Route path="/my-athlete-classes" element={<MyAthleteClasses />} />
    </Routes>
  );
};


