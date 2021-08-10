import { gql } from "@apollo/client"

export const WEDDING_QUERY = gql`
	{
		weddings {
			_id
			bride_first_name
			bride_last_name
			groom_first_name
			groom_last_name
			date
			venue
		}
	}
`
export const QUERY_ME = gql`
	{
		me {
			_id
			username
			email
			wedding
		}
	}
`

export const ORG_QUERY = gql`
	query finduser($userId: String) {
		user(userId: $userId){
			username
			_id
			
						
		}
	}
`

export const GUEST_QUERY = gql`
query getGuests{
	guests{
		name
		email
		rsvp
		menu
		_id
		wedding_owner
	}
}
`

