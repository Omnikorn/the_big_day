import React, { useState } from "react";
import "../vendor/bootstrap.css"
import {useQuery} from "@apollo/client"
import { WEDDING_QUERY, GUEST_QUERY } from "../utils/queries"

function GuestLanding() {

// to retreive guest email from local storage
const guestEmail = localStorage.getItem("guestEmail")
console.log("the stored email is ", guestEmail)




// search guest list for matching email
const {loading, data} = useQuery(GUEST_QUERY)
if (loading) {
    return <p>loading</p>
}

const correctGuest = data.guests.filter((guest) =>{
    return guest.email == guestEmail

})

console.log("the correct guest is ", correctGuest)
console.log("the guest name is", correctGuest[0].name)

    return (
        <div>
            <div className="container content d-flex flex-row p-2 justify-content-between">
                <div className="row">
                    <div className="col-sm-4 talk">
                        <h1>Welcome to our Wedding</h1>
                        <h1>{correctGuest[0].name}</h1>
                        <br />
                        <img src="https://via.placeholder.com/200"></img>
                        <h6 className="bold-four">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, nesciunt molestiae ex inventore quibusdam id architecto quos cupiditate nobis magnam eum voluptatem quas quis obcaecati dolor vero veritatis similique alias.
                        </h6>
                        

                    </div>
                    <div className="col-sm-8 showcase-img">
                        {/* <div className="circle"></div> */}

                        <div className="">
                            <div className="">
                                <div className="col-sm-10 talk">
                                    <h1>You ae invited on.... at</h1>
                                    <h1>"Place"</h1>
                                    <br />
                                    <h6 className="bold-four">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, nesciunt molestiae ex inventore quibusdam id architecto quos cupiditate nobis magnam eum voluptatem quas quis obcaecati dolor vero veritatis similique alias.
                                    </h6>
                                    <img src="https://via.placeholder.com/200"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            


            <div className="col-sm-6 talk">
                <h1>Welcome to our Wedding</h1>
                <h1>{correctGuest[0].name}</h1>
                <img src="https://via.placeholder.com/300x150"></img>
                <br />
                <h6 className="bold-four">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, nesciunt molestiae ex inventore quibusdam id architecto quos cupiditate nobis magnam eum voluptatem quas quis obcaecati dolor vero veritatis similique alias.
                </h6>
                <h1>"countdown"</h1>
                        <br />
                        <img src="https://via.placeholder.com/400x150" />




                        </div>

            </div>
        </div>

    );
}

export default GuestLanding;