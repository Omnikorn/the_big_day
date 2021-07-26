import React, {useState} from "react";
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove"
import AddIcon from "@material-ui/icons/Add"
import Icon from "@material-ui/core/Icon";

import {makeStyles} from "@material-ui/core/styles"





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