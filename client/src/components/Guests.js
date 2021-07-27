import React, {useState} from "react";
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove"
import AddIcon from "@material-ui/icons/Add"
import Icon from "@material-ui/core/Icon";
import emailjs from "emailjs-com"

import {makeStyles} from "@material-ui/core/styles"

const service = process.env.REACT_APP_SERVICE_ID
const template = process.env.REACT_APP_TEMPLATE_ID
const user = process.env.REACT_APP_USER_ID




const useStyles = makeStyles((theme)=>({
    root:{
        "& .MuiTextField-root":{
          margin: theme.spacing(1),
        }
    },

    button:{
        margin: theme.spacing(1)
    }
}))

function Guests () {
const classes=useStyles()
const [inputFields, setInputField] = useState([
    {firstName: "", lastName:"", email:"", rsvp:"", menue:""},
])


const handleSubmit =(e) =>{
    e.preventDefault();
    console.log("input fields", inputFields)

}

const handleChangeInput = (index, event) =>{
console.log(index, event.target.name)
const values =[...inputFields];
values[index][event.target.name] = event.target.value
setInputField(values)
}

const handleAddField = () =>{
    setInputField([...inputFields,{firstName: "", lastName:"", email:"", rsvp:"", menue:""}])
}


const handleRemoveField =(index) =>{
const values = [...inputFields]
values.splice(index, 1)
setInputField(values)
}

function sendEmail(index) {
    // function to send email to each guest based on their index in the table
    const values = [...inputFields]
    const email = values[index].email
    const first_name = values[index].firstName
    const last_name = values[index].lastName

    const params = {
        first_name: first_name,
        email:email,
        last_name: last_name
    }
   

    emailjs.send(service,template,params,user)
        .then((res) => {
            console.log(res)
            alert("email sent thank you")
        })
        .catch((err) => console.log(err))
}


    return (
        <Container>
        <h1> Your Guest List</h1>
        <form className={classes.root} onSubmit={handleSubmit}>
            {inputFields.map((inputField, index)=>(
                <div key={index}>
                    <TextField 
                    name="firstName"
                    label="First Name"
                    value={inputField.firstName}
                    onChange={event => handleChangeInput(index, event)}
                    />
                    <TextField 
                    name="lastName"
                    label="Last Name"
                    value={inputField.lastName}
                    onChange={event => handleChangeInput(index, event)}
                    />
                    <TextField
                    name="email"
                    label="Email"
                    value={inputField.email}
                    onChange={event => handleChangeInput(index, event)}
                    />
                    <TextField 
                    name="rsvp"
                    label="RSVP"
                    value={inputField.rsvp}
                    onChange={event => handleChangeInput(index, event)}
                   />
                   <TextField 
                   name="menue"
                   label="Menu Choice"
                   value={inputField.menue}
                   onChange={event => handleChangeInput(index, event)}
                   />
                    <Button className={classes.button}
                    vareient="contained" 
                    color="secondary"
                    onClick={(event)=> sendEmail(index)}
                    >Send email</Button>

                   <IconButton
                   onClick={()=> handleRemoveField(index)}>
                       <RemoveIcon />
                   </IconButton>
                   <IconButton
                   onClick={() => handleAddField()}>
                       <AddIcon />
                   </IconButton>

                </div>
            ))}
            <Button 
            className={classes.button}
            vareient="contained" 
            color="secondary" 
            type="submit" 
            onClick={handleSubmit}
            endIcon={<Icon>save</Icon>}>
                Save Guest List
                </Button>
        </form>
        </Container>
    )
}





export default Guests