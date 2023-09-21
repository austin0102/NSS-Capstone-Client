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
  
      <article className="all">
        {user.my_classes.map((classObject) => (
          <div className="class" key={classObject.id}>
            <div className="class-header">
              <div className="title">
                {classObject.name} 
                 
              </div>
              <div className="trainer-name">
              </div>
            </div>
            <div className="class-details">
              <div className="location">
                <strong>Location:</strong> {classObject.location}
              </div>
              <div className="time-date">
              <strong>Date & Time:</strong> {formatDate(classObject.timeDate)}
              </div>
              <div className="difficulty">
              <strong>Difficulty:</strong> {classObject.difficulty.skillLevel}
              </div>
              <div className="price">
              <strong>Price:</strong> ${classObject.price}
              </div>
            </div>
            <div>
            <h2 className="comment-header">Comments</h2>
                            <ul>
                                {classObject.comments.map((comment) => (
                                    <li key={comment.id}>
                                        <strong>{comment.user.username}: </strong>
                                        {comment.review}
                                    </li>
                                ))}
                            </ul>
            </div>
          </div>
        ))}
      </article>
    </div>
  );
        }  