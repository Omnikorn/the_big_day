import React from "react"
import {
	BrowserRouter as Router,
	Route,
	
} from "react-router-dom"
import "./App.css"
import CreateWedding from "./components/createwedding/createwedding.form"
import Guests from "./components/Guests"
import Home from "./components/Home"

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
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="App">
					<Route exact path="/" component={Landing} />
					<Route exact path="/Home" component={Home} />
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
			</Router>
		</ApolloProvider>
	)
}

export default App
