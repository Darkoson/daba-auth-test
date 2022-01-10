const  {buildSchema} = require('graphql')

module.exports = buildSchema(`

input UserInput{
    photo: String!
    name: String!
    bio: String!
    email: String!
    password: String!
    phone: String!
}

type User{
    _id: ID!
    photo: String!
    name: String!
    bio: String!
    email: String!
    password: String!
    phone: String!
    lastSignin: String
}


type AuthData{
    userId: ID!
    token: String!
    photo: String!
    name: String!
    bio: String!
    email: String!
    password: String!
}

type RootQuery{
    users: [User!]!
}

type RootMutation{
    createUser(input: UserInput): User
    login(email: String!, password: String!): AuthData!
    updateUser(input: UserInput): User
    uploadPhoto(url:String!): String
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)