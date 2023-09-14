import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getClassesByTrainer } from '../../managers/ClassManager';

export function ViewOtherUserClasses() {
  const { userId } = useParams();
  const [userClasses, setUserClasses] = useState([]);

  useEffect(() => {
    getClassesByTrainer(userId) // Use getClassesByTrainer function
      .then((userClassData) => setUserClasses(userClassData))
      .catch((error) => {
        // Handle the error here, e.g., show an error message
        console.error("Error fetching user classes:", error);
      });
  }, [userId]);

  return (
    <div className="container">
      <h1 className="classes-title">Classes by User</h1>

      <article>
        {userClasses.map((classObject) => (
          <div className="class" key={classObject.id}>
            <div className="title">
              {classObject.name} with{' '}
              <Link to={`/classes/${classObject.id}`}>
                {classObject.trainer.first_name}
              </Link>
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
    </div>
  );
}
