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


export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />} />

      <Route path="/classes">
        <Route index element={<ClassList token={token} setToken={setToken} />} />
        <Route path="create" element={<ClassForm token={token} setToken={setToken} />} />
        <Route path="edit/:classId" element={<EditClassDetails token={token} setToken={setToken} />} />
        <Route path="trainer/:trainerId" element={<ViewOtherUserClasses />} />

      </Route>

      <Route path="myClasses" element={<UserClasses token={token} setToken={setToken} />} />
      <Route path="/my-athlete-classes" element={<MyAthleteClasses token={token} />} />


    </Routes>
  );
};


// import React, { useState, useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import { Login } from "../components/auth/Login";
// import { Register } from "../components/auth/Register";
// import { Authorized } from "./Authorized";
// import { getUserByToken } from "../managers/TokenManager";
// import { AthleteViews } from "./AthleteViews";
// import { TrainerViews } from "./TrainerViews";

// export const ApplicationViews = ({ token, setToken }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     // Fetch user information by token when the component mounts
//     if (token) {
//       getUserByToken(token)
//         .then((userData) => {
//           console.log("Fetched user data:", userData);
//           setCurrentUser(userData);
//         })
//         .catch((error) => {
//           // Handle errors here
//           console.error("Error fetching user data:", error);
//         });
//     }
//   }, [token]);

//   // Determine isStaff based on currentUser
//   const isStaff = currentUser ? currentUser.user.is_staff : false;

//   console.log("Token:", token);
//   console.log("Current User:", currentUser);
//   console.log("isStaff:", isStaff);

//   return (
//     <>
//       {token ? (
//         isStaff ? (
//           <TrainerViews token={token} setToken={setToken} />
//         ) : (
//           <AthleteViews token={token} setToken={setToken} />
//         )
//       ) : (
//         <Routes>
//           <Route path="/login" element={<Login setToken={setToken} />} />
//           <Route path="/register" element={<Register setToken={setToken} />} />
//           <Route element={<Authorized token={token} />} />
//         </Routes>
//       )}
//     </>
//   );
// };
