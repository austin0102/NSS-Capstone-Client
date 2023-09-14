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
// import { ClassList } from "../components/classes/ClassList";
// import { ClassForm } from "../components/classes/ClassForm";
// import { UserClasses } from "../components/classes/UserClasses";
// import { EditClassDetails } from "../components/classes/EditClass";
// import { MyAthleteClasses } from "../components/classes/AthletesClasses";
// import { ViewOtherUserClasses } from "../components/classes/OtherUserClasses";
// import { AthleteViews } from "./AthleteViews";
// import { TrainerViews } from "./TrainerViews"; // Import the TrainerViews component

// export const ApplicationViews = ({ token, setToken, isStaff }) => {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login setToken={setToken} />} />
//       <Route path="/register" element={<Register setToken={setToken} />} />
//       <Route element={<Authorized token={token} />} />

//       <Route path="/classes">
//         <Route index element={<ClassList token={token} setToken={setToken} />} />
//         <Route path="create" element={<ClassForm token={token} setToken={setToken} />} />
//         <Route path="edit/:classId" element={<EditClassDetails token={token} setToken={setToken} />} />
//         <Route path="trainer/:trainerId" element={<ViewOtherUserClasses />} />

//       </Route>

//       {isStaff ? (
//         // If is_staff is true, render TrainerViews for trainers
//         <Route path="trainer" element={<TrainerViews />} />
//       ) : (
//         // If is_staff is false, render AthleteViews for athletes
//         <Route path="athlete" element={<AthleteViews token={token} />} />
//       )}

//       <Route path="myClasses" element={<UserClasses token={token} setToken={setToken} />} />
//       <Route path="/my-athlete-classes" element={<MyAthleteClasses token={token} />} />
//     </Routes>
//   );
// };



// import { Route, Routes } from "react-router-dom";
// import { Login } from "../components/auth/Login";
// import { Register } from "../components/auth/Register";
// import { Authorized } from "./Authorized"
// import { TrainerViews } from "./TrainerViews.js";
// import { AthleteViews } from "./AthleteViews.js";

// export const ApplicationViews = ({token, setToken}) => {

//   <Routes>
//       <Route path="/login" element={<Login setToken={setToken} />} />
//       <Route path="/register" element={<Register setToken={setToken} />} />
//       <Route element={<Authorized token={token} />} />
//     </Routes>

// 	const localcurrentUser = localStorage.getItem("auth_token");
// 	const currentUserObject = JSON.parse(localcurrentUser);

// 	if (currentUserObject.user.is_staff) {

// 		return <TrainerViews />
// 	} else {

// 		return <AthleteViews />
// 	}

// }

// export const ApplicationViews = ({ token, setToken }) => {
  //   const localcurrentUser = localStorage.getItem("auth_token");
  //   console.log("localcurrentUser:", localcurrentUser);
  
  //   const currentUserObject = JSON.parse(localcurrentUser);
  //   console.log("currentUserObject:", currentUserObject);
  //   return (
    //     <Routes>
    //       <Route path="/login" element={<Login setToken={setToken} />} />
    //       <Route path="/register" element={<Register setToken={setToken} />} />
    //       <Route element={<Authorized token={token} />} />
    
    //       {currentUserObject.user.is_staff ? (
      //         // If is_staff is true, render TrainerViews for trainers
      //         <>
      //           <Route path="/classes">
      //             <Route index element={<ClassList token={token} setToken={setToken} />} />
      //             <Route path="create" element={<ClassForm token={token} setToken={setToken} />} />
      //             <Route path="edit/:classId" element={<EditClassDetails token={token} setToken={setToken} />} />
      //             <Route path="trainer/:trainerId" element={<ViewOtherUserClasses />} />
      //           </Route>
      
      //           <Route path="myClasses" element={<UserClasses token={token} setToken={setToken} />} />
      //         </>
      //       ) : (
        //         // If is_staff is false, render AthleteViews for athletes
        //         <>
        //           <Route path="/classes">
        //             <Route index element={<ClassList token={token} setToken={setToken} />} />
        //             <Route path="trainer/:trainerId" element={<ViewOtherUserClasses />} />
        //           </Route>
        
        //           <Route path="/my-athlete-classes" element={<MyAthleteClasses token={token} />} />
        //         </>
        //       )}
        //     </Routes>
        //   );
        // // };
        // import React, { useState, useEffect } from "react";
        // import { Route, Routes } from "react-router-dom";
        // import { Login } from "../components/auth/Login";
        // import { Register } from "../components/auth/Register";
        // import { Authorized } from "./Authorized";
        // import { ClassList } from "../components/classes/ClassList";
        // import { ClassForm } from "../components/classes/ClassForm";
        // import { UserClasses } from "../components/classes/UserClasses";
        // import { EditClassDetails } from "../components/classes/EditClass";
        // import { MyAthleteClasses } from "../components/classes/AthletesClasses";
        // import { ViewOtherUserClasses } from "../components/classes/OtherUserClasses";
        // import { TrainerViews } from "./TrainerViews";
        // import { AthleteViews } from "./AthleteViews";
        
        // import { getUserByToken } from "../managers/TokenManager"; // Import the getUserByToken function
        // // ... other imports
        
        // export const ApplicationViews = ({ token, setToken }) => {
        //   const [currentUser, setCurrentUser] = useState(null);
        
        //   useEffect(() => {
        //     // Fetch user information by token when the component mounts
        //     if (token) {
        //       getUserByToken(token)
        //         .then((userData) => {
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
        
        //   return (
        //     <Routes>
        //       <Route path="/login" element={<Login setToken={setToken} />} />
        //       <Route path="/register" element={<Register setToken={setToken} />} />
        //       <Route element={<Authorized token={token} />} />
        
        //       {isStaff ? (
        //         <Route element={<TrainerViews />} />
        //       ) : (
        //         <Route element={<AthleteViews />} />
        //       )}
        //     </Routes>
        //   );
        // };
        