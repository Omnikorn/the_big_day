import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { magic } from '../lib/magic';
import { UserContext } from '../lib/UserContext';
import EmailForm from './email-form';
import SocialLogins from './social-logins';

const Login = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useContext(UserContext);

  // If user is already logged in, redirect to profile page
  useEffect(() => {
    user && user.issuer && history.push('/viewedding');
  }, [user, history]);

  async function handleLoginWithEmail(email) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      let didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/viewwedding', window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      // Validate didToken with server
      const res = await fetch(`${process.env.REACT_APP_MAGIC_KEY}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });

      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        let userMetadata = await magic.user.getMetadata();
        await setUser(userMetadata);
        // history.push('/profile');
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  async function handleLoginWithSocial(provider) {
    await magic.oauth.loginWithRedirect({
      provider,
      redirectURI: new URL('/callback', window.location.origin).href, // required redirect to finish social login
    });
  }

  return (
    <>
      <div className='login'>
        <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
        <SocialLogins onSubmit={handleLoginWithSocial} />
      </div>
      <style>{`
        .login {
          max-width: 20rem;
          margin: 40px auto 0;
          padding: 1rem;
          border: 1px solid #dfe1e5;
          border-radius: 4px;
          text-align: center;
          box-shadow: 0px 0px 6px 6px #f7f7f7;
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};

export default Login;