import React, { useState, useContext, useMemo, useEffect } from "react"
import {
	BrowserRouter as Router,
	Route,
} from "react-router-dom"
import "./App.css"
import CreateWedding from "./components/createwedding/createwedding.form"
import Guests from "./components/Guests"
import Home from "./components/Home"
import Createuser from "./components/createuser"
import Login from "./components/login"

import { magic } from './lib/magic';
import { UserContext } from './lib/UserContext';
import Landing from "./components/landing/landing.page"
import ViewWedding from "./components/viewwedding/viewwedding.page"
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { PartyProvider, usePartyContext } from "./utils/partycontext"
import Auth from "./utils/auth"
import NavBar from './components/NavBar'
import GuestLanding from './components/GuestLanding'
import { slide as Menu } from 'react-burger-menu'
import createuser from './components/createuser'



const httpLink = createHttpLink({
	uri: "/graphql",
	// credentials: "same-origin"
})

const authLink = setContext((_, { headers }) => {
	
	const token = localStorage.getItem("id_token")
	
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})


function App() {
	const partycontext = usePartyContext()
	console.log("party context=", partycontext)
	const [user, setUser] = useState();
	const [openMenu, setOpenMenu] = useState(false)

	useEffect(() => {
		const { organiser } = Auth.loggedIn()
		console.log("this is the organiser from local storage", organiser)
	}, [])
	// If isLoggedIn is true, set the UserContext with user data
	// Otherwise, set it to {user: null}
	useEffect(() => {
		setUser({ loading: true });
		magic.user.isLoggedIn().then((isLoggedIn) => {
			return isLoggedIn
				? magic.user.getMetadata().then((userData) => setUser(userData))
				: setUser({ user: null });
		});
	}, []);

	return (
		<ApolloProvider client={client}>
			<PartyProvider>
				<Router>

					<UserContext.Provider value={[user, setUser]}>




						<div className="App">
							<div>
								<NavBar />
								<Route exact path="/" component={Landing} />
							</div>



							<Route exact path="/Home" component={Home} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/guestlanding" component={GuestLanding} />
							<Route
								exact
								path="/guests"
								component={Guests}
							/>
							<Route
								exact
								path="/createwedding"
								component={CreateWedding}
							/>
							<Route
								exact
								path="/viewwedding"
								component={ViewWedding}
							/>
							<Route
								exact
								path="/createuser"
								component={createuser}
							/>
						</div>
					</UserContext.Provider>

				</Router>
			</PartyProvider>
		</ApolloProvider>
	)
}





export default App
