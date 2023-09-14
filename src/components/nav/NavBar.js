// import { useRef } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"

// import { getUserByToken } from "../../managers/TokenManager"
// import { useState, useEffect } from "react";

// export const NavBar = ({ token, setToken }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate()
//   const navbar = useRef()
//   const hamburger = useRef()

//   useEffect(() => {
//         // Fetch user information by token when the component mounts
//         if (token) {
//           getUserByToken(token)
//             .then((userData) => {
//               console.log("Fetched user data:", userData);
//               setCurrentUser(userData);
//             })
//             .catch((error) => {
//               // Handle errors here
//               console.error("Error fetching user data:", error);
//             });
//         }
//       }, [token]);

//   const showMobileNavbar = () => {
//     hamburger.current.classList.toggle('is-active')
//     navbar.current.classList.toggle('is-active')
//   }

//   const isStaff = currentUser ? currentUser.user.is_staff : false;

//   return (
//     <nav className="twitter-blue" role="navigation" aria-label="main navigation">
//       <div className="navbar-brand">
//         <a className="navbar-item" href="/">
//            <h1 className="title is-4">ParkFit</h1>
//         </a>

//         {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//         <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
//           <span aria-hidden="true"></span>
//           <span aria-hidden="true"></span>
//           <span aria-hidden="true"></span>
//         </a>
//       </div>

//       <div className="navbar-menu" >
//   <div className="navbar-start">
//     {token ? (
//       <>
//         <Link to="/classes" className="navbar-item">Classes</Link>
//         {isStaff ? (
//           // Render these links for staff
//           <>
//             <Link to="/myClasses" className="navbar-item">My Classes</Link>
//             <Link to="/classes/create" className="navbar-item">New Class</Link>
//           </>
//         ) : (
//           // Render these links for non-staff (athletes)
//           <>
//             <Link to="/my-athlete-classes" className="navbar-item">My Upcoming Classes</Link>
//           </>
//         )}
//       </>
//     ) : null}
//   </div>

//   <div className="navbar-end">
//     <div className="navbar-item">
//       <div className="buttons">
//         {token ? (
//           <button className="button is-outlined" onClick={() => {
//             setToken('');
//             navigate('/login');
//           }}>Logout</button>
//         ) : (
//           <>
//             <Link to="/register" className="button is-link">Register</Link>
//             <Link to="/login" className="button is-outlined">Login</Link>
//           </>
//         )}
//       </div>
//     </div>
//   </div>
// </div>

//     </nav>
//   )
// }


import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

import { getUserByToken } from "../../managers/TokenManager";
import { useState, useEffect } from "react";

export const NavBar = ({ token, setToken }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();

  useEffect(() => {
    // Fetch user information by token when the component mounts
    if (token) {
      getUserByToken(token)
        .then((userData) => {
          console.log("Fetched user data:", userData);
          setCurrentUser(userData);
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error fetching user data:", error);
        });
    }
  }, [token]);

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  const isStaff = currentUser ? currentUser.user.is_staff : false;

  return (
    <nav className="twitter-blue" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h1 className="title is-4">ParkFit</h1>
        </a>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {token ? (
            <>
              <Link to="/classes" className="navbar-item">
                Classes
              </Link>
              {isStaff ? (
                // Render these links for staff
                <>
                  <Link to="/myClasses" className="navbar-item">
                    My Classes
                  </Link>
                  <Link to="/classes/create" className="navbar-item">
                    New Class
                  </Link>
                </>
              ) : (
                // Render these links for non-staff (athletes)
                <>
                  <Link to="/my-athlete-classes" className="navbar-item">
                    My Upcoming Classes
                  </Link>
                </>
              )}
            </>
          ) : null}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {token ? (
                <button
                  className="button is-outlined"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" className="button is-link">
                    Register
                  </Link>
                  <Link to="/login" className="button is-outlined">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
