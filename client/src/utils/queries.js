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
	{
		users {
			username
			_id
			wedding {
				_id
				bride_first_name
				bride_last_name
				groom_first_name
				groom_last_name
				date
				venue
			}
			guest {
				
			id
			}
		}
	}
`

// export const ORG_QUERRY = gql`
// {
// users{
// 	username
// 	_id
// 	wedding{
// 		_id
// 			bride_first_name
// 			bride_last_name
// 			groom_first_name
// 			groom_last_name
// 			date
// 			venue
// 	}

// }
// }`
