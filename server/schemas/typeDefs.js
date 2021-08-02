const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    wedding: Wedding
}

# TODO is this for log in authentication instead of password? 
type Auth {
    token: ID!
    user: User
}




type Wedding {
    bride_first_name: String,
    bride_last_name: String,
    groom_first_name: String,
    groom_last_name: String,
    date: String,
    venue: String,
    menu_choice:[String],
    wedding_owner:ID
}



input WeddingData {
    bride_first_name: String,
    bride_last_name: String,
    groom_first_name: String,
    groom_last_name: String,
    date: String,
    venue: String,
    menu_choice:[String],
    wedding_owner:ID
}


type Guest {
    name: String,
    email: String!
    rsvp: String,
    menu:String,
    wedding_owner:ID
}

input guestData {
    name: String,
    email: String!
    rsvp: String,
    menu:String,
    wedding_owner:ID
}


type Query {
    me: User
    Wedding: Wedding
    Guest: Guest
}

type Mutation {
    createWedding(wedding: WeddingData):Wedding
    addGuest(Guest:guestData):Guest
    login(email: String!, password: String!): Auth
    addUser(username: String! email: String!, password: String!): Auth
    removeUSer(userId: ID!): User
    # TODO should this return a user ? or Auth ? 
}
`

module.exports = typeDefs;