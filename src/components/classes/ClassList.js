

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClasses } from "../../managers/ClassManager";
import { createAthleteClass } from "../../managers/athleteClassesManager";
import { getUserByToken } from "../../managers/TokenManager";
import "./Class.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

// Utility function to initialize the counters with values from localStorage
const initializeCountersFromLocalStorage = () => {
    const storedGoingCount = JSON.parse(localStorage.getItem('goingCount')) || {};
    const storedThumbsUpCount = JSON.parse(localStorage.getItem('thumbsUpCount')) || {};
    const storedThumbsDownCount = JSON.parse(localStorage.getItem('thumbsDownCount')) || {};

    return {
        goingCount: storedGoingCount,
        thumbsUpCount: storedThumbsUpCount,
        thumbsDownCount: storedThumbsDownCount,
    };
};

// Utility function to retrieve the counters from localStorage
const getCountersFromLocalStorage = () => {
    const { goingCount, thumbsUpCount, thumbsDownCount } = initializeCountersFromLocalStorage();

    return {
        goingCount: goingCount || {},
        thumbsUpCount: thumbsUpCount || {},
        thumbsDownCount: thumbsDownCount || {},
    };
};

// Utility function to update and store the counters in localStorage
const updateAndStoreCounters = (counters) => {
    localStorage.setItem('goingCount', JSON.stringify(counters.goingCount));
    localStorage.setItem('thumbsUpCount', JSON.stringify(counters.thumbsUpCount));
    localStorage.setItem('thumbsDownCount', JSON.stringify(counters.thumbsDownCount));
};

export const ClassList = ({ token }) => {
    const [classes, setClasses] = useState([]);
    const [goingCount, setGoingCount] = useState({});
    const [thumbsUpCount, setThumbsUpCount] = useState({});
    const [thumbsDownCount, setThumbsDownCount] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getAllClasses().then((classesData) => setClasses(classesData));
    }, []);

    useEffect(() => {
        const initialCounts = getCountersFromLocalStorage();
        setGoingCount(initialCounts.goingCount);
        setThumbsUpCount(initialCounts.thumbsUpCount);
        setThumbsDownCount(initialCounts.thumbsDownCount);
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
                            // Update the Going count for the clicked class
                            const updatedGoingCount = {
                                ...goingCount,
                                [classId]: (goingCount[classId] || 0) + 1,
                            };
                            setGoingCount(updatedGoingCount);

                            // Update and store the counters in localStorage
                            updateAndStoreCounters({
                                goingCount: updatedGoingCount,
                                thumbsUpCount,
                                thumbsDownCount,
                            });

                            window.alert('This class has been added to your upcoming classes.');
                            navigate(`/classes`);
                        }
                    });
            }
        }
    };

    const handleThumbsUpClick = (classId) => {
        // Update the thumbs up count for the clicked class
        const updatedThumbsUpCount = {
            ...thumbsUpCount,
            [classId]: (thumbsUpCount[classId] || 0) + 1,
        };
        setThumbsUpCount(updatedThumbsUpCount);

        // Update and store the counters in localStorage
        updateAndStoreCounters({
            goingCount,
            thumbsUpCount: updatedThumbsUpCount,
            thumbsDownCount,
        });
    };

    const handleThumbsDownClick = (classId) => {
        // Update the thumbs down count for the clicked class
        const updatedThumbsDownCount = {
            ...thumbsDownCount,
            [classId]: (thumbsDownCount[classId] || 0) + 1,
        };
        setThumbsDownCount(updatedThumbsDownCount);

        // Update and store the counters in localStorage
        updateAndStoreCounters({
            goingCount,
            thumbsUpCount,
            thumbsDownCount: updatedThumbsDownCount,
        });
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
                            <Link to={`/users/${classObject.trainer.id}`}>
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
                            <div className="button-container">
                                <button
                                    className="going-button"
                                    onClick={() => handleGoingClick(classObject.id)}
                                >
                                    Going ({goingCount[classObject.id] || 0})
                                </button>
                                <button
                                    className="thumb-button thumbs-up"
                                    onClick={() => handleThumbsUpClick(classObject.id)}
                                >
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                    Thumbs Up ({thumbsUpCount[classObject.id] || 0})
                                </button>
                                <button
                                    className="thumb-button thumbs-down"
                                    onClick={() => handleThumbsDownClick(classObject.id)}
                                >
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                    Thumbs Down ({thumbsDownCount[classObject.id] || 0})
                                </button>
                            </div>
                        </section>
                    </div>
                ))}
            </article>
        </div>
    );
};
