

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Class.css';
import { deleteClass, getUserClasses } from '../../managers/ClassManager';

export function UserClasses({ token }) {
  const [userClasses, setUserClasses] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', or 'completed'
  const navigate = useNavigate();

  useEffect(() => {
    getUserClasses(token).then((userClassData) => setUserClasses(userClassData));
  }, [token, filter]);

  const handleDeleteClass = (classId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this class?');

    if (shouldDelete) {
      deleteClass(classId).then(() => {
        const updatedClasses = userClasses.filter((classObject) => classObject.id !== classId);
        setUserClasses(updatedClasses);
      });
    }
  };

  const handleEditClass = (classId) => {
    // Navigate to the edit page for the specific class
    navigate(`/classes/edit/${classId}`);
  };

  const handleFilter = (type) => {
    setFilter(type);
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

  const filteredClasses = () => {
    if (filter === 'upcoming') {
      return userClasses.filter((classObject) => new Date(classObject.timeDate) > new Date());
    } else if (filter === 'completed') {
      return userClasses.filter((classObject) => new Date(classObject.timeDate) <= new Date());
    }
    return userClasses;
  };

  return (
    <div className="container">
      <h1 className="classes-title">Your Classes</h1>

      <div className="class-actions">
        <button className="filter-button" onClick={() => handleFilter('all')}>
          All Classes
        </button>
        <button className="filter-button" onClick={() => handleFilter('upcoming')}>
          Upcoming
        </button>
        <button className="filter-button" onClick={() => handleFilter('completed')}>
          Completed
        </button>
      </div>

      <article className="all">
        {filteredClasses().map((classObject) => (
          <div className="class" key={classObject.id}>
            <div className="title">
              {classObject.name}
            </div>
            <section>
              <div>
                <strong>Location:</strong> {classObject.location}
                <div className="time-date"><strong>Date & Time:</strong> {formatDate(classObject.timeDate)}</div>
              </div>
              <div><strong>Difficulty:</strong> {classObject.difficulty.skillLevel}</div>
              <div><strong>Price:</strong> ${classObject.price}</div>
              <div className="class-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEditClass(classObject.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClass(classObject.id)}
                >
                  Delete
                </button>
              </div>
            </section>
          </div>
        ))}
      </article>
    </div>
  );
}
