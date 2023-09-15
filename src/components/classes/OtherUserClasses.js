import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSingleUser } from '../../managers/UserManager';

export function ViewOtherUserClasses() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ensure that getSingleUser returns a Promise with the data
    getSingleUser(id)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

  if (!user) {
    // Handle the case where user data is still loading
    return <div>Loading...</div>;
  }

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
      <h1 className="classes-title">Classes by {user.first_name}</h1>

      <article>
        {user.my_classes.map((classObject) => (
          <div className="class" key={classObject.id}>
            <div className="title">
              {classObject.name}
              
                
              
            </div>
            <section>
              <div>
                {classObject.location} 
                <div className="time-date">{formatDate(classObject.timeDate)}</div>
              </div>
              <div>{classObject.difficulty.skillLevel}</div>
              <div>${classObject.price}</div>
            </section>
          </div>
        ))}
      </article>
    </div>
  );
}
