
import  { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { magic } from "../lib/magic";
import { CallToAction, TextButton } from "@magiclabs/ui";
import { UserContext } from "../lib/UserContext"
import Auth from "../utils/auth";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
//  export default function ButtonAppBat() {

// const Header = () => {
//     const logout = (event) => {
//         event.preventDefault();
//         Auth.logout();
//     };
const Header = () => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    magic.user.logout().then(() => {
      setUser({ user: null });
      history.push("/");
    });
  };

  const classes = useStyles();

  // funcction Header() {
  //   const { user, setUser } = useContext(USerContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {Auth.login() ? (
              <>
              <span> Hey loverbirds, {Auth.getProfile().data.username}!</span> */}
          {/* <Button variant="contained" color="inherit" textAlign="right" onClick={login}>Login</Button>
          <Button color="inherit" textAlign="left" onClick={logout}>Logout</Button>
          </>
          ) : (
              <> */}
          
            <Link to="/login">
              <Button variant="contained" color="inherit" textAlign="right" onPress={() => history.push('/login')}>
                Login
              </Button>
            </Link>
          
          
            <Link to="/viewwedding">
              <Button variant="contained" color="inherit" textAlign="right" onPress={() => history.push('/myweddings')}>
                My Weddings
              </Button>
            </Link>
          

          
            <Link to="/guests">
              <Button variant="contained" color="inherit" textAlign="right" onPress={() => history.push('/myguests')}>
                My Guests
              </Button>
            </Link>
          

          {/* <pre>{JSON.stringify(user, null, 2)}</pre>
                  {user ? ( */}
          {/* <Link to={logout}>
            <Button
              onPress= {logout}
            >
              Logout
              
            </Button>
          </Link> */}

<TextButton color='warning' size='sm' onPress={logout}>
                  Logout
                </TextButton>
        </Toolbar>
      </AppBar>
    </div>

    // };
  );
};
export default Header;
