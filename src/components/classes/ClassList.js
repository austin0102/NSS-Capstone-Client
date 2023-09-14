
// import React, { useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllClasses } from "../../managers/ClassManager";
// import { createAthleteClass } from "../../managers/athleteClassesManager";
// import { getUserByToken } from "../../managers/TokenManager";

// export const ClassList = () => {
//     const [classes, setClasses] = useState([]);
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       getAllClasses().then((classesData) => setClasses(classesData));
//     }, []);
  
//     const handleGoingClick = (classId) => {
//       // Fetch the user data using the auth_token
//       getUserByToken(localStorage.getItem("auth_token"))
//         .then((userData) => {
//           if (userData.id) {
//             // Send a POST request to create a new AthleteClasses entry
//             fetch("http://localhost:8000/athleteclasses", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Token ${localStorage.getItem("auth_token")}`,
//               },
//               body: JSON.stringify({
//                 athlete: userData.id,
//                 class_attended: classId,
//               }),
//             })
//               .then((response) => {
//                 if (response.ok) {
//                   // Handle the response, e.g., show a success message
//                   console.log("AthleteClasses created successfully");
//                 } else {
//                   // Handle errors, e.g., show an error message
//                   console.error("Error creating AthleteClasses:", response.statusText);
//                 }
//               })
//               .catch((error) => {
//                 // Handle errors, e.g., show an error message
//                 console.error("Error creating AthleteClasses:", error);
//               });
//           }
//         })
//         .catch((error) => {
//           // Handle errors, e.g., show an error message
//           console.error("Error fetching user data:", error);
//         });
//     };
  
//     return (
//       <div className="container">
//         <h1 className="classes-title">All classes</h1>
  
//         <article>
//           {classes.map((classObject) => (
//             <div className="post" key={classObject.id}>
//               <div className="title">
//                 {classObject.name} with{" "}
//                 <Link to={`/classes?trainer=${classObject.trainer.id}`}>{classObject.trainer.first_name}</Link>

//               </div>
//               <section>
//                 <div>
//                   {classObject.location} {classObject.timeDate}
//                 </div>
//                 <div>{classObject.difficulty.skillLevel}</div>
//                 <div>{classObject.price}</div>
//                 <button
//                   className="going-button"
//                   onClick={() => handleGoingClick(classObject.id)}
//                 >
//                   Going
//                 </button>
//               </section>
//             </div>
//           ))}
//         </article>
  
        
//       </div>
//     );
//   };

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClasses } from "../../managers/ClassManager";
import { createAthleteClass } from "../../managers/athleteClassesManager";
import { getUserByToken } from "../../managers/TokenManager";

export const ClassList = ({ token}) => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllClasses().then((classesData) => setClasses(classesData));
  }, []);

  const handleGoingClick = async (classId) => {
    
        
    
        const user = await getUserByToken(token);
    
        if (user) {
          const newAthleteClass = {
            athlete: user.user,
            class_attended: classId
          }
          createAthleteClass(newAthleteClass)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            navigate(`/classes`);
          }
        });
    }
  };

  return (
    <div className="container">
      <h1 className="classes-title">All classes</h1>

      <article>
        {classes.map((classObject) => (
          <div className="post" key={classObject.id}>
            <div className="title">
              {classObject.name} with{" "}
              <Link to={`/classes?trainer=${classObject.trainer.id}`}>
                {classObject.trainer.first_name}
              </Link>
            </div>
            <section>
              <div>
                {classObject.location} {classObject.timeDate}
              </div>
              <div>{classObject.difficulty.skillLevel}</div>
              <div>{classObject.price}</div>
              <button
                className="going-button"
                onClick={() => handleGoingClick(classObject.id)}
              >
                Going
              </button>
            </section>
          </div>
        ))}
      </article>
    </div>
  );
};
