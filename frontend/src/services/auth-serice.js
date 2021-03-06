
const  { backendEndpoint } = require("../setting");

const endpoint = `${backendEndpoint}graphql`;

const sendRequest = (requestBody, token='') =>{


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
              bio
              email
              password
              photo
              phone
              lastLogin
              tokenExpiration
          }
      }
      `
  };

  return sendRequest(requestBody)
  
};


exports.updatePhoto = (data,token) => {

  return fetch(backendEndpoint+"upload", {
    method: "POST",
    body: data,
    headers: {
      "Authorization": `Bearer ${token}` 
    },
  })
    .then((result) => result.json())
    .catch((error) => {
      return JSON.stringify(error);
    });
};


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
              phone
              bio
          }
      }
      `
  };

  return sendRequest(requestBody,data.token)
};
