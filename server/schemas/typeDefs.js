const { gql } = require("apollo-server-express")

const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
		wedding: Wedding
		guests: Guest
	}

	# TODO is this for log in authentication instead of password?
	type Auth {
		token: ID!
		user: User
	}

	type Wedding {
		bride_first_name: String!
		bride_last_name: String!
		groom_first_name: String!
		groom_last_name: String!
		date: String!
		venue: String!
		menu_choice: [String]
		_id: String
		wedding_owner: String
	}

	input WeddingData {
		bride_first_name: String
		bride_last_name: String
		groom_first_name: String
		groom_last_name: String
		date: String
		venue: String
		menu_choice: [String]
		wedding_owner: String
	}

	type Guest {
		name: String
		email: String!
		rsvp: String
		menu: String
		_id: ID
		wedding_owner: String
	}

	input guestData {
		name: String
		email: String!
		rsvp: String
		menu: String
		wedding_owner: String
	}

	type Query {
		# me: User
		# user: User
		user(userId: String): User
		wedding: Wedding
		weddings: [Wedding]
		guest: Guest
		users: [User]
		guests: [Guest]
	}

	type Mutation {
		addWedding(bride_first_name: String, bride_last_name: String, groom_first_name: String, groom_last_name: String, date: String, venue: String, menu_choice: [String], wedding_owner: String):Wedding
		addGuests(name: String!, email: String!, rsvp: String!, menu: String!, wedding_owner: String!): Guest
		login(email: String!, password: String!): Auth
		addUser(
			username: String!
			email: String!
			password: String!
		): Auth

		# removeUSer(userId: ID!): User
		# TODO we can add remove user later not needed for minimum product ?
	}
`

module.exports = typeDefs
