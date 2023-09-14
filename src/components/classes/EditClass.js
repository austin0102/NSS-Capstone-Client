import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editClass, getSingleClass } from '../../managers/ClassManager';
import { getAllDifficulty } from '../../managers/DifficultyManager';
// ... (import statements and component setup)

export const EditClassDetails = () => {
    const navigate = useNavigate();
    const { classId } = useParams();
    const [difficulties, setDifficulties] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState();
    const [currentClass, setCurrentClass] = useState({});
  
    useEffect(() => {
      getSingleClass(classId).then((data) => {
        setCurrentClass(data);
        setSelectedDifficulty(data.difficulty.id);
      });
    }, [classId]);
  
    useEffect(() => {
      getAllDifficulty().then((difficultyList) => {
        setDifficulties(difficultyList);
      });
    }, []);
  
    return (
      <form className="classForm">
        <h2 className="classForm__title">Edit Class</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Class Name: </label>
            <input
              type="text"
              name="name"
              required
              autoFocus
              className="form-control"
              value={currentClass.name}
              onChange={(evt) => {
                setCurrentClass({ ...currentClass, name: evt.target.value });
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="location">Location: </label>
            <input
              type="text"
              name="location"
              required
              autoFocus
              className="form-control"
              value={currentClass.location}
              onChange={(evt) => {
                setCurrentClass({ ...currentClass, location: evt.target.value });
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="price">Price: </label>
            <input
              type="text"
              name="price"
              required
              autoFocus
              className="form-control"
              value={currentClass.price}
              onChange={(evt) => {
                setCurrentClass({ ...currentClass, price: evt.target.value });
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty: </label>
            <select
              name="difficulty"
              required
              autoFocus
              className="form-control"
              value={selectedDifficulty}
              onChange={(evt) => {
                setSelectedDifficulty(parseInt(evt.target.value));
              }}
            >
              <option value="">Select Difficulty</option>
              {difficulties.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.skillLevel}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="timeDate">Date and Time: </label>
            <input
              type="datetime-local" // Use the appropriate input type for date and time
              name="timeDate"
              required
              autoFocus
              className="form-control"
              value={currentClass.timeDate}
              onChange={(evt) => {
                setCurrentClass({ ...currentClass, timeDate: evt.target.value });
              }}
            />
          </div>
        </fieldset>
  
        <button
          type="submit"
          onClick={(evt) => {
            // Prevent form from being submitted
            evt.preventDefault();
  
            const editedClass = {
              name: currentClass.name,
              location: currentClass.location,
              price: currentClass.price,
              difficulty: selectedDifficulty,
              timeDate: currentClass.timeDate,
            };
  
            // Send PUT request to your API to edit the class
            editClass(classId, editedClass).then(() => navigate('/classes'));
          }}
          className="btn btn-primary"
        >
          Save
        </button>
      </form>
    );
  };
  