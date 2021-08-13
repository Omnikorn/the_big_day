import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "../utils/mutations"
import Auth from "../utils/auth"
import { usePartyContext } from "../utils/partycontext"
const bg_image = require("./chairs.jpg").default
const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: `src(${bg_image})`,
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function SignIn() {
	const classes = useStyles()

	const { organiser, setOrganiser } = usePartyContext()

	

	const [userFormData, setUserFormData] = useState({
		email: "",
		password: "",
	})

	const [login, { error, data }] = useMutation(LOGIN_USER)

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setUserFormData({ ...userFormData, [name]: value })
		setOrganiser(value)
		
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		
		try {
			const { data } = await login({
				variables: { ...userFormData },
			})
			const newuser = data.login.user
			console.log("the new user is ", newuser)
			setOrganiser(newuser)
			

			Auth.login(data.login.token, newuser)
		} catch (e) {
			console.error(e)
		}

		setUserFormData({
			email: "",
			password: "",
		})
	}

	return (
		<Grid
			container
			component="main"
			className={classes.root}
		>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				className={classes.image}
			/>
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleFormSubmit}
					>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							onChange={handleInputChange}
							value={userFormData.email}
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							onChange={handleInputChange}
							value={userFormData.password}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container></Grid>
						<Box mt={5}></Box>
					</form>
				</div>
			</Grid>
		</Grid>
	)
}
