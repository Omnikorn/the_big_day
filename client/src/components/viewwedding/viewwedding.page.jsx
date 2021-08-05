import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { WEDDING_QUERY } from "../../utils/queries"
 const weddingID = "6109605f79f0bf8d3c072c97"
function ViewWedding() {
	const { loading, data } = useQuery(WEDDING_QUERY)
	if (loading) {
		return <p> loading ...</p>
	}
	// if (error) return<p>Error...</p>

	 const weddingData = data.weddings.filter((wedding) => {
 const weddingID = "6109605f79f0bf8d3c072c97"
		return wedding._id === "6109605f79f0bf8d3c072c97";
	})

	console.log("the wedding data is ", data.weddings)
	console.log("the filtered wedding data is ", weddingData)
	return (
		<div>
			<h1> This is your wedding</h1>
			<div>
				
				{weddingData.map((wedding) => (
					<div>
						<p>wedding id = {wedding._id}</p>
						<p>Bride first name: {wedding.bride_first_name}</p>
						<p>Bride last name: {wedding.bride_last_name}</p>
						<p>Groom first name: {wedding.groom_first_name}</p>
						<p>Groom last name: {wedding.groom_last_name}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default ViewWedding
