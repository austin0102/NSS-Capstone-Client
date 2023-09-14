
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClasses } from "../../managers/ClassManager";
import { createAthleteClass } from "../../managers/athleteClassesManager";
import { getUserByToken } from "../../managers/TokenManager";
import "./Class.css"

export const ClassList = ({ token}) => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllClasses().then((classesData) => setClasses(classesData));
  }, []);

  const handleGoingClick = async (classId) => {
    const user = await getUserByToken(token);
  
    if (user) {
      const confirmation = window.confirm('Are you sure you want to attend this class?');
  
      if (confirmation) {
        const newAthleteClass = {
          athlete: user.user.id,
          class_attended: classId
        };
  
        createAthleteClass(newAthleteClass)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              window.alert('This class has been added to your upcoming classes.');
              navigate(`/classes`);
            }
          });
      }
    }
  };
  
  

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="container">
      <h1 className="classes-title">All classes</h1>

      <article>
        {classes.map((classObject) => (
          <div className="class" key={classObject.id}>
            <div className="title">
              {classObject.name} with{" "}
              <Link to={`/classes?trainer=${classObject.trainer.id}`}>
                {classObject.trainer.first_name}
              </Link>
            </div>
            <section>
              <div>
                {classObject.location} 
                <div className="time-date">{formatDate(classObject.timeDate)}</div>
              </div>
             
              <div>{classObject.difficulty.skillLevel}</div>
              <div>${classObject.price}</div>
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
