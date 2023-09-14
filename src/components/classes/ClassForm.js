// import React, { useState } from 'react';
// import { createClass } from '../../managers/ClassManager';
// import { useNavigate } from 'react-router-dom';
// import { getUserByToken } from '../../managers/TokenManager';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";




// export const ClassForm = ({ token, difficulty }) => {
//     const navigate = useNavigate();
//     const [selectedDifficulty, setSelectedDifficulty] = useState([]);
//     const [className, setClassName] = useState('');
//     const [classLocation, setClassLocation] = useState('');
//     const [classPrice, setClassPrice] = useState('');
//     const [selectedDate, setSelectedDate] = useState(null);
    
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       const user = await getUserByToken(token);
  
//       if (user) {
//         const newClass = {
//           trainer: user.user,
//           name: className,
//           location: classLocation,
//           difficulty: selectedDifficulty,
//           price: classPrice,
//           timeDate: selectedDate
//         };
  
//         createClass(newClass)
//           .then((response) => response.json())
//           .then((data) => {
//             if (data) {
//               navigate(`/classes`);
//             }
//           });
//       }
//     };
  
//     return (
//       <div>
//         <h2>Create Class</h2>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="className">Class Name:</label>
//           <input
//             type="text"
//             id="className"
//             value={className}
//             onChange={(e) => setClassName(e.target.value)}
//             required
//           />
//           <br />
//           <label htmlFor="classLocation">Location:</label>
//           <input
//             type="text"
//             id="classLocation"
//             value={classLocation}
//             onChange={(e) => setClassLocation(e.target.value)}
//             required
//           />
//           <br />
//           <label htmlFor="classPrice">Price:</label>
//           <input
//             type="text"
//             id="classPrice"
//             value={classPrice}
//             onChange={(e) => setClassPrice(e.target.value)}
//             required
//           />
//           <br />
//           <label htmlFor="classDate">Date and Time:</label>
//           <DatePicker
//             id="classDate"
//             selected={selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//             showTimeSelect
//             timeFormat="HH:mm"
//             timeIntervals={15}
//             dateFormat="MMMM d, yyyy h:mm aa"
//             timeCaption="Time"
//             required
//           />
//           <br />
//           <label>Difficulty:</label>
//           {difficulty.map((difficulty) => (
//             <label key={difficulty.id}>
//               <input
//                 type="checkbox"
//                 value={difficulty.id}
//                 checked={selectedDifficulty.includes(difficulty.id)}
//                 onChange={(e) =>
//                   e.target.checked
//                     ? setSelectedDifficulty([...selectedDifficulty, difficulty.id])
//                     : setSelectedDifficulty(selectedDifficulty.filter((id) => id !== difficulty.id))
//                 }
//               />
//               {difficulty.skillLevel}
//             </label>
//           ))}
//           <br />
//           <button type="submit">Create Class</button>
//         </form>
//       </div>
//     );
//   };
  


import React, { useState, useEffect } from 'react';
import { createClass } from '../../managers/ClassManager';
import { useNavigate } from 'react-router-dom';
import { getUserByToken } from '../../managers/TokenManager';
import { getAllDifficulty } from '../../managers/DifficultyManager';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ClassForm = ({ token }) => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [className, setClassName] = useState('');
  const [classLocation, setClassLocation] = useState('');
  const [classPrice, setClassPrice] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [difficultyOptions, setDifficultyOptions] = useState([]);

  useEffect(() => {
    // Fetch difficulty options when the component mounts
    getAllDifficulty(token)
      .then((data) => setDifficultyOptions(data))
      .catch((error) => console.error('Error fetching difficulty options:', error));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await getUserByToken(token);

    if (user) {
      const newClass = {
        trainer: user.user.id,
        name: className,
        location: classLocation,
        difficulty: selectedDifficulty, // Now a single value, not an array
        price: classPrice,
        timeDate: selectedDate.toISOString(),
      };

      createClass(newClass)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            navigate(`/classes`);
          }
        });
    }
  };

  return (
    <div>
      <h2>Create Class</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="className">Class Name:</label>
        <input
          type="text"
          id="className"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="classLocation">Location:</label>
        <input
          type="text"
          id="classLocation"
          value={classLocation}
          onChange={(e) => setClassLocation(e.target.value)}
          required
        />
        <br />
        <label htmlFor="classPrice">Price:</label>
        <input
          type="text"
          id="classPrice"
          value={classPrice}
          onChange={(e) => setClassPrice(e.target.value)}
          required
        />
        <br />
        <label htmlFor="classDate">Date and Time:</label>
        <DatePicker
          id="classDate"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="Time"
          required
        />
        <br />
        <label htmlFor="difficultySelect">Difficulty:</label>
        <select
          id="difficultySelect"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          required
        >
          <option value="">Select a difficulty</option>
          {difficultyOptions.map((difficulty) => (
            <option key={difficulty.id} value={difficulty.id}>
              {difficulty.skillLevel}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Create Class</button>
      </form>
    </div>
  );
};
