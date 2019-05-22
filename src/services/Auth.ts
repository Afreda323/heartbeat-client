import auth0 from 'auth0-js'

/**
 * Auth service
 * Used for all auth0 related tasks
 */
class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECT || '',
    responseType: 'token id_token',
    scope: 'openid',
  })

  /**
   * Login function
   * Brings up lock
   */
  login = () => {
    this.auth0.authorize()
  }

  /**
   * On login, check hash and store values
   */
  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        console.log(err)
      }
    })
  }

  /**
   * Set login creds to local storage
   * @param authResult result of user logging in
   */
  setSession = (authResult: auth0.Auth0DecodedHash) => {
    // Set the time that the Access Token will expire at
    if (authResult.expiresIn && authResult.accessToken && authResult.idToken) {
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime(),
      )
      localStorage.setItem('access_token', authResult.accessToken)
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('expires_at', expiresAt)
    }
  }

  /**
   * Log user out
   * Clears local storage auth vars
   */
  logout = () => {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  }

  /**
   * Check if user does not have 
   * an expired set of creds
   */
  isAuthenticated = () => {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '0')
    return new Date().getTime() < expiresAt
  }
}

export default Auth
