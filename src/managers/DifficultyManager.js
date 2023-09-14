export const getDifficulty = (difficultyId, token) => {
    return fetch(`http://localhost:8000/difficulties/${difficultyId}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    }).then(response => response.json());
  };
  
  export const getAllDifficulty = (token) => {
    return fetch("http://localhost:8000/difficulties", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    }).then(response => response.json());
  };