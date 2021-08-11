import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`

export const ADD_USER = gql`
	mutation addUser(
		$username: String!
		$email: String!
		$password: String!
	) {
		addUser(
			username: $username
			email: $email
			password: $password
		) {
			token
			user {
				_id
				username
			}
		}
	}
`

// export const ADD_GUESTS = gql`
// mutation addGuests($input: Name ){
// 						addGuests(
// 							guestData:$input
// 						)
// 					}

// `
export const ADD_GUESTS = gql`
	mutation addGuests(
		$name: String!
		$email: String!
		$rsvp: String!
		$menu: String!
		$wedding_owner: String!
	) {
		addGuests(
			name: $name
			email: $email
			rsvp: $rsvp
			menu: $menu
			wedding_owner: $wedding_owner
		)
		{
			name 
			}
		}
	
`

// export const ADD_GUESTS =gql`
// mutation Mutation($input:guestData){
// 	addGuests(guestData:$input){
// 		guest{
// 			_id
// 		}
// 	}

// }
// `
