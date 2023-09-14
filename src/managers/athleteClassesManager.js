export const createAthleteClass = (newAthleteClass, token) => {
    return fetch("http://localhost:8000/athleteclasses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(newAthleteClass),
    });
};


export const getAthleteClasses = (token) => {
    return fetch('http://localhost:8000/athleteclasses', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
};

export const getClassByAthlete = (token) => {
    return fetch(`http://localhost:8000/athleteclasses?token=${token}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json());
}