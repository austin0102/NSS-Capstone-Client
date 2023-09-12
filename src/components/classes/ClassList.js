import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAllClasses } from "../../managers/ClassManager";


export const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getAllClasses().then((classesData) => {
      console.log(classesData); // Check the data in the console
      setClasses(classesData);
    });
  }, []);
  

  useEffect(() => {
    getAllClasses().then((classesData) => setClasses(classesData));
  }, []);

  return (
    <div className="container">
      <h1 className="classes-title">All classes</h1>

      <article>
        {classes.map((classObject) => (
          <div className="post" key={classObject.id}>
            <div className="title">
              {classObject.name} with <Link to={`/classes/${classObject.id}`}>{classObject.trainer.first_name}</Link>
            </div>
            <section>
              <div>
                {classObject.location} {classObject.timeDate}
              </div>
              <div>{classObject.difficulty.skillLevel}</div>
              <div>{classObject.price}</div>
            </section>
          </div>
        ))}
      </article>

      <Link to="/classes/create" className="add-post-button">
        Add Post +
      </Link>
    </div>
  );
};
