import React, { createContext, useContext, FC } from 'react'
import { WebAuth } from 'auth0-js'
import noop from 'lodash/noop'
import history from '../../services/history'

interface IAuthContext {
  login: () => void
  logout: () => void
  handleAuthentication: () => void
  isAuthenticated: () => boolean
}

const AuthContext = createContext<IAuthContext>({
  login: noop,
  logout: noop,
  handleAuthentication: noop,
  isAuthenticated: () => false,
})

const AuthProvider: FC = (props: any) => {
  const auth0 = new WebAuth({
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

      history.push('/app')
    }
  }

  /**
   * On login, check hash and store values
   */
  const handleAuthentication = () => {
    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult)
      } else if (err) {
        console.log(err)
      }
    })
  }

  /**
   * Log user out
   * Clears local storage auth vars
   */
  const logout = () => {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')

    history.push('/')
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
      }}
      {...props}
    />
  )
}
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
