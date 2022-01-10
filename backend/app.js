const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const grahpQlSchema = require('./graphql/schema/index')
const grahpQlResolvers = require('./graphql/resolvers/index')

const mongoose = require("mongoose");
const isAuth = require('./middlewares/is-auth')
const app = express();

// setup of middlewares to use by our application
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(isAuth);

/**
 * Allowing cors policy when runing both front & backend on the same machine
 * Setting the request methods & header that the application must accept
 */

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
  if(req.method === 'OPTIONS'){ // just sending status 200 to the browser, incase of its test
    return res.sendStatus(200)
  }
  next()
})

// configuration of the graphql endpoing
app.use(
  "/graphql",
  
  graphqlHTTP({
    schema: grahpQlSchema,
    rootValue: grahpQlResolvers,
    graphiql: true, // activation of GraphQl's interface
  })
);

app.get("/", (req, res, next) => {
  res.send(" Welcome to my Graphql application ...");
});

// Lunching the backend server: we are starting the web server only if the connection to the database is successful
const port = 5000;
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster-01.z3ewq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(
        `The database is connected  and the server is running on port ${port}. . .`
      );
    });
  })
  .catch((err) => {
    console.log("The application failed to connect to the database:  " + err);
  });
