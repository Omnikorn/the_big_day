import React, { useState } from "react";
import "../vendor/bootstrap.css"
import { useQuery } from "@apollo/client"
import { WEDDING_QUERY, GUEST_QUERY } from "../utils/queries"
import "./guestlanding.css"
import gl from "../gl.jpg"
import loc from "../loc.jpg"
import clock from "../clock.jpg"

function GuestLanding() {

    // to retreive guest email from local storage
    const guestEmail = localStorage.getItem("guestEmail")
    console.log("the stored email is ", guestEmail)




    // search guest list for matching email
    const { loading, data } = useQuery(GUEST_QUERY)
    if (loading) {
        return <p>loading</p>
    }

    const correctGuest = data.guests.filter((guest) => {
        return guest.email == guestEmail

    })

    console.log("the correct guest is ", correctGuest)
    console.log("the guest name is", correctGuest[0].name)

    return (
        <div className="bg container content d-flex flex-row p-2 justify-content-between">
            <div className="container content d-flex flex-row p-2 justify-content-between">
                <div className="row">
                    <div className="col-sm- talk">
                        <h1>Welcome to our Wedding</h1>
                        <h1>{correctGuest[0].name}</h1>
                        <br />
                        <img className="img" src={gl}></img>
                        
                        

                    
                        
                                    
                                    
                                
                                <div className="container content d-flex flex-column p-2">
                        <form className="mb-5">
                            <h1><label for="Menu">Please RSVP</label></h1>
                            <select id="rsvp" name="rsvp">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                
                            </select>
                            <input type="submit" value="Submit" />
                            </form>
                            
                           
                            <form>
                            <h1><label for="Menu">Choose your preferred Menu:</label></h1>
                            <select id="menu" name="mwnu">
                                <option value="vegan">Vegan</option>
                                <option value="vegeterian">Vegeterian</option>
                                <option value="meat">Meat</option>
                            </select>
                            <input type="submit" value="Submit" />
                            </form>
                            




                    <div className="container content d-flex flex-column p-2">
                        <h1>We will Celebrate it at:<br/>{correctGuest[0].name}</h1>
                        
                        <img className="location" src={loc}></img>
                        <br />
                    
                        <h1>On <br /> {correctGuest[0].name}</h1>
                        <br />
                        <h6 className="bold-four">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, nesciunt molestiae ex inventore quibusdam id architecto quos cupiditate nobis magnam eum voluptatem quas quis obcaecati dolor vero veritatis similique alias.
                        </h6>
                        <img src={clock} className="clock" />
                        <br />

                        <h1>COUNTDOWN</h1>




                    </div>
                    </div>
                    </div>
                    </div>
                    

                </div>
            </div>

            );
}

            export default GuestLanding;