const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
}


type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String! email: String!, password: String!): Auth
    removeUSer(userId: ID!): User
}
# Wedding gql
type Wedding {
    bride_first_name: String,
    bride_last_name: String,
    groom_first_name: String,
    groom_last_name: String,
    date: DataTypes.Data,
    venue: String,
}

# TODO add guest typedef and add menu choices to above

type Mutation {
    weddingLogin(bride_first_name: String!, bride_last_name: String!,
    groom_first_name: String!, groom_last_name: String!, 
    date: DataTypes.Data, venue: String!)
}
# TODO we dont need a wedding login we need to create a wedding and add guests 
`;

module.exports = typeDefs;