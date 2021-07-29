import React, { useState } from "react"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import RemoveIcon from "@material-ui/icons/Remove"
import AddIcon from "@material-ui/icons/Add"
import Icon from "@material-ui/core/Icon"
import emailjs from "emailjs-com"

import { makeStyles } from "@material-ui/core/styles"
import ("./createwedding.css")

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
		},
	},

	button: {
		margin: theme.spacing(1),
	},
}))

function CreateWedding() {
	const classes = useStyles()
	const [inputFields, setInputField] = useState([
		{
			brideFirstName: "",
			brideLastName: "",
			groomFirstName: "",
			groomLastName: "",
			venue: "",
			weddingDate: "",
			menuChoices: "",
		},
	])

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("input fields", inputFields)
	}

	const handleChangeInput = (index, event) => {
		console.log(index, event.target.name)
		const values = [...inputFields]
		values[index][event.target.name] = event.target.value
		setInputField(values)
	}

	const handleAddField = () => {
		setInputField([
			...inputFields,
			{
				firstName: "",
				lastName: "",
				email: "",
				rsvp: "",
				menue: "",
			},
		])
	}

	const handleRemoveField = (index) => {
		const values = [...inputFields]
		values.splice(index, 1)
		setInputField(values)
	}

	return (
		<Container className="bigcontainer">
			<h1 className="heading"> Fill in your wedding details</h1>
			<form
				className={classes.root}
				onSubmit={handleSubmit}
			>
				{inputFields.map((inputField, index) => (
					<div key={index}>
						<div>
							<TextField
								name="brideFirstName"
								label="Bride's First Name"
								value={inputField.brideFirstName}
								onChange={(event) =>
									handleChangeInput(index, event)
								}
							/>
							<TextField
								name="brideLastName"
								label="Bride's Last Name"
								value={inputField.brideLastName}
								onChange={(event) =>
									handleChangeInput(index, event)
								}
							/>
						</div>
						<div>
							<TextField
								name="groomFirstName"
								label="Groom's First Name"
								value={inputField.groomFirstName}
								onChange={(event) =>
									handleChangeInput(index, event)
								}
							/>
							<TextField
								name="groomLastName"
								label="Groom's Last Name"
								value={inputField.groomLastName}
								onChange={(event) =>
									handleChangeInput(index, event)
								}
							/>
						</div>
						<div>
						    <TextField
    							name="venue"
    							label="Wedding Venue"
    							value={inputField.venue}
    							onChange={(event) =>
    								handleChangeInput(index, event)
    							}
    						/>
						</div>
                        <div>
						    <TextField
    							name="weddingDate"
    							label="Wedding Date"
    							value={inputField.weddingDate}
    							onChange={(event) =>
    								handleChangeInput(index, event)
    							}
    						/>
						</div>

						<TextField
							name="menuChoices"
							label="Menu Choices"
							value={inputField.menuChoices}
							onChange={(event) =>
								handleChangeInput(index, event)
							}
						/>

						{/* 
                   <IconButton
                   onClick={()=> handleRemoveField(index)}>
                       <RemoveIcon />
                   </IconButton>
                   <IconButton
                   onClick={() => handleAddField()}>
                       <AddIcon />
                   </IconButton> */}
					</div>
				))}
				<Button
					className={classes.button}
					vareient="contained"
					color="secondary"
					type="submit"
					onClick={handleSubmit}
					endIcon={<Icon>favorite</Icon>}
				>
					create your wedding
				</Button>
			</form>
		</Container>
	)
}

export default CreateWedding
