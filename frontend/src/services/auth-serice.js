const endpoint = `http://localhost:5000/graphql`;

exports.signup = (user) => {};

exports.signin = (email, password) => {
  let requestBody = {
    query: `
      mutation{
          login(email: "${email}", password: "${password}"){
              userId
              token
              name
              email
              password
              photo
              lastLogin
              tokenExpiration
          }
      }
      `,
  };

  return fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .catch((error) => {
      return JSON.stringify(error);
    });
};

exports.updatePhoto = (url) => {};

exports.updateProfile = (url) => {};
