export const getAllTrainers = () => {
    return fetch(`http://localhost:8000/trainers`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
    .then((res) => res.json());
  };
  

export const getSingleTrainer = (id) => {
    return fetch(`http://localhost:8000/trainers/${id}`)
    .then( res => res.json())
}