import React from "react";
import { Route, Routes } from "react-router-dom";
import { ClassList } from "../components/classes/ClassList";
import { ClassForm } from "../components/classes/ClassForm";
import { EditClassDetails } from "../components/classes/EditClass";
import { UserClasses } from "../components/classes/UserClasses";
import { Register } from "../components/auth/Register";
import { Login } from "../components/auth/Login";
import { Authorized } from "./Authorized";
import { ViewOtherUserClasses } from "../components/classes/OtherUserClasses";

export const TrainerViews = (token, setToken) => {
  return (
    <Routes>
       <Route element={<Authorized token={token} />} />
      <Route path="/classes">
        <Route index element={<ClassList />} />
        <Route path="create" element={<ClassForm />} />
        <Route path="edit/:classId" element={<EditClassDetails />} />
        <Route path="trainer/:trainerId" element={<ViewOtherUserClasses />} />
      </Route>

      <Route path="/myClasses" element={<UserClasses />} />
    </Routes>
  );
};

