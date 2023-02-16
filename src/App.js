import './App.css';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    // Load the JavaScript SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '719081352898093', // Facebook App ID
        cookie: true, // enable cookies
        xfbml: true, // parse social plugins on this page
        version: 'v15.0', // Graph API version
      });
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Cleanup function to remove the global variable added by the SDK
    return function cleanup() {
      delete window.fbAsyncInit;
      delete window.FB;
    };
  }, []);

  // Facebook Login with JavaScript SDK
  function launchWhatsAppSignup() {
    // Conversion tracking code
    
    // Check the login status and launch the login dialog if needed
    window.FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        const accessToken = response.authResponse.accessToken;
        console.log(accessToken)
        //Use this token to call the debug_token API and get the shared WABA's ID
      } else {
        window.FB.login(function (response) {
          if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            console.log(accessToken)
            //Use this token to call the debug_token API and get the shared WABA's ID
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        }, {
          scope: 'business_management,whatsapp_business_management',
          extras: {
            feature: 'whatsapp_embedded_signup'
          }
        });
      }
    });
  }

  return (
    <button
      onClick={launchWhatsAppSignup}
      style={{
        backgroundColor: '#1877f2',
        border: '0',
        borderRadius: '4px',
        color: '#fff',
        cursor: 'pointer',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        height: '40px',
        padding: '0 24px'
      }}
    >
      Login with Facebook
    </button>
  );
}

export default App;
