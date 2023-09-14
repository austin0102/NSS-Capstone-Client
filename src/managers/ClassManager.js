export const getAllClasses = () => {
    return fetch("http://localhost:8000/classes", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
      .then(response => response.json())
  };

  export const createClass = (newClass) => {
    return fetch("http://localhost:8000/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(newClass),
    })
};

export const getSingleClass = (id) => {
    return fetch(`http://localhost:8000/classes/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
      .then(response => response.json())
  }


  export const getClassesByTrainer = (trainerId) => {
    const authToken = localStorage.getItem("auth_token");
    const apiUrl = `http://localhost:8000/classes?trainer=${trainerId}`;
  
    return fetch(apiUrl, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching classes for trainer ${trainerId}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Rethrow the error for the caller to handle
      });
  };
  
  

      export const getUserClasses = (token) => {
        return fetch(`http://localhost:8000/classes?token=${token}`, {
          headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
          }
        })
          .then(response => response.json());
      }
  
  
  
  export const editClass = (classId, Class) => {
    return fetch(`http://localhost:8000/classes/${classId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(Class),
    })
  };
  
  export const deleteClass = (classId) => {
    return fetch(`http://localhost:8000/classes/${classId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
  }
  
