export const getAllClasses = () => {
    return fetch("http://localhost:8000/classes", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
      .then(response => response.json())
  };