import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { WEDDING_QUERY } from "../../utils/queries"

function ViewWedding() {
	const { loading, data } = useQuery(WEDDING_QUERY)
	if (loading) {
		return <p> loading ...</p>
	}
	// if (error) return<p>Error...</p>

	 const weddingData = data.weddings
	console.log("the wedding data is ", weddingData)

	return (
		<div>
			<h1> This is your wedding</h1>
			<div>
				{weddingData.map((wedding) => (
					<div>
						<p>{wedding.bride_first_name}</p>
						<p>{wedding.brid_last_name}</p>
						<p>{wedding.groom_first_name}</p>
						<p>{wedding.groom_last_name}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default ViewWedding
