import React, { useEffect, useState } from 'react';
import { getClassByAthlete } from '../../managers/athleteClassesManager';

export const MyAthleteClasses = ({ token }) => {
  const [athleteClasses, setAthleteClasses] = useState([]);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    getClassByAthlete(token)
      .then((data) => {
        setAthleteClasses(data);
        setOriginalData(data);
      })
      .catch((error) => console.error('Error fetching athlete classes:', error));
  }, [token]);

  const filterUpcoming = () => {
    const filteredUpcoming = originalData.filter(
      (classObject) =>
        new Date(classObject.class_attended.timeDate) > new Date()
    );
    setAthleteClasses(filteredUpcoming);
    setShowUpcoming(true);
  };

  const filterCompleted = () => {
    const filteredCompleted = originalData.filter(
      (classObject) =>
        new Date(classObject.class_attended.timeDate) <= new Date()
    );
    setAthleteClasses(filteredCompleted);
    setShowUpcoming(false);
  };

  const resetFilters = () => {
    setAthleteClasses(originalData);
    setShowUpcoming(false);
  };

  return (
    <div className="container">
      <h1 className="classes-title">My classes</h1>

      <div>
        <button onClick={filterUpcoming}>Upcoming</button>
        <button onClick={filterCompleted}>Completed</button>
        <button onClick={resetFilters}>All Classes</button>
      </div>

      <article>
        {athleteClasses.map((classObject) => (
          <div className="post" key={classObject.id}>
            <div className="title">
              {classObject.class_attended.name} with{' '}
              {classObject.class_attended.trainer.first_name}
            </div>
            <section>
              <div>
                {classObject.class_attended.location}{' '}
                {classObject.class_attended.timeDate}
              </div>
              <div>{classObject.class_attended.difficulty.skillLevel}</div>
              <div>{classObject.class_attended.price}</div>
            </section>
          </div>
        ))}
      </article>
    </div>
  );
};



// import React, { useEffect, useState } from 'react';
// import { getClassByAthlete } from '../../managers/athleteClassesManager';

// export const MyAthleteClasses = ({ token }) => {
//   const [athleteClasses, setAthleteClasses] = useState([]);

//   useEffect(() => {
//     getClassByAthlete(token)
//       .then((data) => setAthleteClasses(data))
//       .catch((error) => console.error('Error fetching athlete classes:', error));
//   }, [token]);

//   return (
//     <div className="container">
//       <h1 className="classes-title">My classes</h1>

//       <article>
//         {athleteClasses.map((classObject) => (
//           <div className="post" key={classObject.id}>
//             <div className="title">
//               {classObject.class_attended.name} with{' '}
//               {classObject.class_attended.trainer.first_name}
//             </div>
//             <section>
//               <div>
//                 {classObject.class_attended.location}{' '}
//                 {classObject.class_attended.timeDate}
//               </div>
//               <div>{classObject.class_attended.difficulty.skillLevel}</div>
//               <div>{classObject.class_attended.price}</div>
//             </section>
//           </div>
//         ))}
//       </article>
//     </div>
//   );
// };
