import React, { useState, useEffect } from "react"

import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";


import { useHistory } from "react-router-dom";
import { magic } from "../lib/magic";
import { CallToAction, button } from "@magiclabs/ui";
import { UserContext } from "../lib/UserContext"
import Auth from "../utils/auth";
import { slide as Menu } from 'react-burger-menu'
import './burger.css'



const Header = () => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  

  const Logout = () => {
    magic.user.logout().then(() => {
      setUser({ user: null });
      localStorage.removeItem("guestEmail")
      history.push("/");

    })

  };

  const authenticateWithServer = async didToken => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });

    if (res.status === 200) {
      // Set the UserContext to the now logged in user
      const { email } = await magic.user.getMetadata();
      await setUser(email);
      //   history.push('/profile');
      console.log("email address is:  ", email)

    }
  };
 
    
  

  return (
    <Menu burgerButtonClassName={ "my-class" }>
      <ul>
        <li>
          <Link to="/" >
            <button className="menu-item" onPress={() => history.push('/myguests')} >
              Home
            </button>
          </Link>
        </li>
        {/* <Link to="/home">
            <button variant="contained" color="inherit" textAlign="right" onPress={() => history.push('/myguests')}>
              Couple Login
            </button>
          </Link> */}
        <li>
          < Link to="/viewwedding">
            <button className="menu-item" variant="contained" color="inherit" textAlign="right" onPress={() => history.push('/myweddings')} >
              My Weddings
            </button>
          </Link>
        </li>

        <li>
          <Link to="/guests">
            <button className="menu-item" variant="contained" color="inherit" textAlign="right" onPress={() => history.push('/myguests')}>
              My Guests
            </button>
          </Link>
        </li>
        {user?.loading ? (
          <div style={{ height: '58px' }}></div>
        ) : user?.issuer ? (
          <>


            <li>
              <button color='warning' size='sm' onPress={Logout}>
                Guest Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <CallToAction color='primary' size='sm' onPress={() => history.push('/login')}>
              Guest Login
            </CallToAction>
          </li>
        )}


        {user?.loading ? (
          <div style={{ height: '58px' }}></div>
        ) : user?.issuer ? (
          <>


            <li>
              <button color='warning' size='sm' onPress={Logout}>
                Couple Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <CallToAction color='primary' size='sm' onPress={() => history.push('/home')}>
              Couple Login
            </CallToAction>
          </li>
        )}

      </ul>

    </Menu>

  )
}

export default Header;
