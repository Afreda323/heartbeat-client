import React, {
  createContext,
  useContext,
  FunctionComponent,
  useState,
} from 'react'
import { WebAuth, Auth0UserProfile } from 'auth0-js'
import noop from 'lodash/noop'

interface IAuthContext {
  login: () => void
  logout: (cb: () => void) => void
  handleAuthentication: (cb: () => void) => void
  isAuthenticated: () => boolean
  getUser: () => any
}

const AuthContext = createContext<IAuthContext>({
  login: noop,
  logout: noop,
  handleAuthentication: noop,
  isAuthenticated: () => false,
  getUser: noop,
})

const AuthProvider: FunctionComponent = (props: any) => {
  const auth0 = new WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECT || '',
    responseType: 'token id_token',
    scope: 'openid profile',
  })

  const [user, setUser] = useState<Auth0UserProfile | null>(null)

  /**
   * Login function
   * Brings up lock
   */
  const login = () => {
    auth0.authorize()
  }

  /**
   * Set login creds to local storage
   * @param authResult result of user logging in
   */
  const setSession = (authResult: auth0.Auth0DecodedHash) => {
    // Set the time that the Access Token will expire at
    if (authResult.expiresIn && authResult.accessToken && authResult.idToken) {
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime(),
      )
      localStorage.setItem('access_token', authResult.accessToken)
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('expires_at', expiresAt)
      window.location.href = '/app'
    }
  }

  /**
   * User profile getter
   */
  const getUser = () => {
    if (!user) {
      auth0.client.userInfo(
        localStorage.getItem('access_token') || '',
        (err, userInfo) => {
          if (!err) {
            setUser(userInfo)
          }
        },
      )
    }
    return user
  }

  /**
   * On login, check hash and store values
   */
  const handleAuthentication = (cb: () => void) => {
    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult)
        cb()
      } else if (err) {
        console.log(err)
      }
    })
  }

  /**
   * Log user out
   * Clears local storage auth vars
   */
  const logout = (cb: () => void) => {
    // Clear Access Token and ID Token from local storage
    setUser(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')

    cb()
  }

  /**
   * Check if user does not have
   * an expired set of creds
   */
  const isAuthenticated = () => {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '0')
    return new Date().getTime() < expiresAt
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        handleAuthentication,
        getUser,
      }}
      {...props}
    />
  )
}
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
