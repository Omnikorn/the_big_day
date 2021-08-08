import React, {
	useContext,
	useEffect,
	useState,
} from "react"
import { PartyContext } from "../../utils/partycontext"
import { useQuery } from "@apollo/client"
import { WEDDING_QUERY } from "../../utils/queries"
import Auth from "../../utils/auth"
const weddingID = "6109605f79f0bf8d3c072c97"

function ViewWedding() {
	const [organiserState, setOrganiserState] = useState(null)

	useEffect(() => {
		const { organiser } = Auth.loggedIn()
		console.log(
			"this is the organiser from local storage",
			organiser
		)
		setOrganiserState(organiser)
	}, [])

	const { loading, data } = useQuery(WEDDING_QUERY)
	if (loading) {
		return <p> loading ...</p>
	}
	
console.log("the wedding data from wedding query is" , data)

	const weddingData = data.weddings.filter((wedding) => {
		const weddingID = "6109605f79f0bf8d3c072c97"
		return wedding._id === "6109605f79f0bf8d3c072c97"
	})

	console.log("the wedding data is ", data.weddings)
	console.log("the filtered wedding data is ", weddingData)
	return (
		<div>
			<h1> this is the user</h1>
			<p> the user is {JSON.stringify(organiserState)}</p>

			<h1> This is your wedding</h1>
			<div>
				{weddingData.map((wedding) => (
					<div>
						<p>wedding id = {wedding._id}</p>
						<p>
							Bride first name: {wedding.bride_first_name}
						</p>
						<p>
							Bride last name: {wedding.bride_last_name}
						</p>
						<p>
							Groom first name: {wedding.groom_first_name}
						</p>
						<p>
							Groom last name: {wedding.groom_last_name}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default ViewWedding
