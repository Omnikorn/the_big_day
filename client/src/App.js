import React, { useState, useEffect } from "react"
import {
	BrowserRouter as Router,
	Route,
	
} from "react-router-dom"
import "./App.css"
import CreateWedding from "./components/createwedding/createwedding.form"
import Guests from "./components/Guests"
import Home from "./components/Home"
import Login from "./components/login"
import Header from "./components/header"
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


const httpLink = createHttpLink({
	uri: "/graphql",
	// credentials: "same-origin"
})

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("id_token")
	// return the headers to the context so httpLink can read them
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
	const [user, setUser] = useState();

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
			
			<Router>
			
			<UserContext.Provider value={[user, setUser]}>
			<Header />
				<div className="App">
					<Route exact path="/" component={Landing} />
					<Route exact path="/Home" component={Home} />
					<Route exact path="/login" component={Login} />
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
				</div>
				</UserContext.Provider>
			</Router>
		</ApolloProvider>
	)
}

export default App
