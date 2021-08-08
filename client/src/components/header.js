
import { useContext } from "react";
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
          <Link to="/">
            <Button variant="contained" color="inherit" textAlign="right" onPress={() => history.push('/myguests')}>
              Home
            </Button>
          </Link>
          <Link to="/home">
            <Button variant="contained" color="inherit" textAlign="right" onPress={() => history.push('/myguests')}>
              Couple Login
            </Button>
          </Link>
          < Link to="/viewwedding">
            <Button variant="contained" color="inherit" textAlign="right" onPress={() => history.push('/myweddings')}>
              My Weddings
            </Button>
          </Link>



          <Link to="/guests">
            <Button variant="contained" color="inherit" textAlign="right" onPress={() => history.push('/myguests')}>
              My Guests
            </Button>
          </Link>

          {user?.loading ? (
            <div style={{ height: '58px' }}></div>
          ) : user?.issuer ? (
            <>



              <TextButton color='warning' size='sm' onPress={logout}>
                Guest Logout
              </TextButton>

            </>
          ) : (

            <CallToAction color='primary' size='sm' onPress={() => history.push('/login')}>
              Guest Login
            </CallToAction>

          )}

        </Toolbar>
      </AppBar>
    </div >
  )
}
export default Header;