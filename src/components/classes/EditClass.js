
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for styling

import { useNavigate, useParams } from 'react-router-dom';
import { editClass, getSingleClass } from '../../managers/ClassManager';
import { getAllDifficulty } from '../../managers/DifficultyManager';
import './ClassForm.css'; // Ensure you import the appropriate CSS file

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
    <form className="container">
      <h2 className="classes-title">Edit Class</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Class Name: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control" // Apply the 'form-control' class for styling
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
            className="form-control" // Apply the 'form-control' class for styling
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
            className="form-control" // Apply the 'form-control' class for styling
            value={currentClass.price}
            onChange={(evt) => {
              setCurrentClass({ ...currentClass, price: evt.target.value });
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="difficultySelect">Difficulty: </label>
          <select
            id="difficultySelect"
            required
            autoFocus
            className="form-control" // Apply the 'form-control' class for styling
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
            type="datetime-local"
            name="timeDate"
            required
            autoFocus
            className="form-control" // Apply the 'form-control' class for styling
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
        className="btn btn-primary" // Apply the 'btn btn-primary' class for styling
      >
        Save
      </button>
    </form>
  );
};

