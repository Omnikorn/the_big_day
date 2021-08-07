import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email:$email, password:$password) {
			token
			user {
				_id
				username
				wedding{
					bride_first_name
    bride_last_name
    groom_first_name
    groom_last_name
    date
    venue
    menu_choice
    _id
				}
				
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
