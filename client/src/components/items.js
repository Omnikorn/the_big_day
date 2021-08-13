import React from "react"
import Auth from "../utils/auth"

const couplelogout=()=>{
    Auth.logout()
}

export const MenuItems=[
    {
        label:'Home',
        url:'/',
        cName:'nav-links'
    },
    {
        label:'Create Wedding',
        url:'/createwedding',
        cName:'nav-links'
    },
    {
        label:'My Wedding',
        url:'/viewwedding',
        cName:'nav-links'
    },
    {
        label:'My Guests',
        url:'/guests',
        cName:'nav-links'
    },
    {
        label:'Couple login',
        url:'/home',
        cName:'nav-links'
    },
   
    {
        label:'Signup',
        url:'/createuser',
        cName:'nav-links'
    },
  
    


]