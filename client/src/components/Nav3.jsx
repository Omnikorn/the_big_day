import React, { useContext, Component } from "react"
import { MenuItems } from "./items"
import "./nav2.css"
import Auth from "../utils/auth"
import { useHistory } from "react-router-dom"
import { Link, useLocation } from "react-router-dom"
import { magic } from "../lib/magic"

const couplelogout = () => {
	Auth.logout()
}



const guestlogout =() => {
    
        localStorage.removeItem("guestEmail")
}




class Nav2 extends Component {
	state = { clicked: false}
   
	// Location = () =>useLocation()
	// History =()=> useHistory()

	couplelogout = () => {
		Auth.logout()
	}

	handleClick = () => {
		this.setState({ clicked: !this.state.clicked })
	}

	render() {
		return (
			<nav className="NavBarItems">
				{/* <h1 className="navbar-logo" href="/"> <i className="fas fa-fan"></i></h1> */}
				<div
					className="menu-icon"
					onClick={this.handleClick}
				>
					<i
						className={
							this.state.clicked
								? "fas fa-times"
								: "fas fa-bars"
						}
					></i>
				</div>
				<ul
					className={
						this.state.clicked
							? "nav-menu active"
							: "nav-menu"
					}
				>
					{MenuItems.map((item, index) => {
						return (
							<li kew={index} onClick={item.function}>
								<a className={item.cName} href={item.url}>
									{item.label}
								</a>
							</li>
						)
					})}
					<li className="nav-links" onClick={couplelogout}>
						Logout
					</li>

					<li>
						<a className="nav-links" href="/login">Guest Login</a>
					</li>

                    <li className="nav-links" onClick={guestlogout}>
                        Guest Logout
                    </li> 
				</ul>
			</nav>
		)
	}
}

export default Nav2
