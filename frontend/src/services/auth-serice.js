const endpoint = `http://localhost:5000/graphql`;
const {getCurrentUser} = require('../contexts/AuthContext')

const token = (getCurrentUser())? getCurrentUser().token : '';


const sendRequest = (requestBody) =>{

  return fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
  })
    .then((result) => result.json())
    .catch((error) => {
      return JSON.stringify(error);
    });
}


exports.signup = (email, password) => {
  let requestBody = {
    query: `
      mutation{
          register(email: "${email}", password: "${password}"){
              _id
              email
          }
      }
      `}
      return sendRequest(requestBody)
  };


exports.signin = (email, password) => {
  let requestBody = {
    query: `
      mutation{
          login(email: "${email}", password: "${password}"){
              _id
              token
              name
              email
              password
              photo
              lastLogin
              tokenExpiration
          }
      }
      `
  };

  return sendRequest(requestBody)
  
};

exports.updatePhoto = (url) => {};

exports.updateProfile = (data) => {
  let requestBody = {
    query: `
      mutation{
        updateUser(input:{photo: "${data.photo}" ,name: "${data.name}" ,bio: "${data.bio}" ,email: "${data.email}" ,phone: "${data.phone}" , password: "${data.password}"}){
              _id
              name
              email
              password
              photo
          }
      }
      `
  };

  return sendRequest(requestBody)
};
