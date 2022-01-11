const  {buildSchema} = require('graphql')

module.exports = buildSchema(`

input UserInput{
    photo: String!
    name: String!
    bio: String!
    email: String!
    phone: String!
    password: String!
}

type User{
    _id: ID!
    photo: String!
    name: String!
    bio: String!
    email: String!
    password: String!
    phone: String!
}


type AuthData{
    _id: ID!
    token: String!
    photo: String!
    name: String!
    bio: String!
    phone: String!
    email: String!
    password: String!
    lastLogin: String
    tokenExpiration: Int!
}

type RootQuery{
    users: [User!]!
}

type RootMutation{
    register(email: String!, password: String!): User
    login(email: String!, password: String!): AuthData!
    updateUser(input: UserInput): User
    uploadPhoto(url:String!): String
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)