import React from "react"
import HorizontalScroll from "react-scroll-horizontal"
import "./horizontal.css"


function Landing () {

    // const child= {width:"300em", height:"100%"}

    return (
        <div className="page">
            <HorizontalScroll  reverseScroll={true}>
                <div  className="main bg">
                    <h1> The Big Day</h1>
                </div>

                <div  className="main bg1">
                    <div>
                        <h1> We are here to help</h1>
                        <div className="paragraph">
                            <p>Planning a wedding can be a very magical but strssful time.</p>
                            <p> Let us take the stress out of it for you and leave you to enjoy the magic</p>
                        </div>
                    </div>
                </div>

                <div  className="main bg2">
                    <div>
                        <h1> Send it in an Email</h1>
                        <div className="paragraph">
                                <p>Save time (and the planet) and send all your invites electronically from one place</p>
                                
                            </div>
                    </div>
                </div>

                <div  className="main bg3">
                    <div>
                        <h1> Track it All</h1>
                        <div className="paragraph">
                                    <p>For your peace of mind, track your guests' RSVPs and menue choices from our app</p>
                                    
                                </div>
                    </div>
                    </div>

                <div  className="main bg4">
                    
                </div>
            </HorizontalScroll>

        </div>
    )
}

export default Landing