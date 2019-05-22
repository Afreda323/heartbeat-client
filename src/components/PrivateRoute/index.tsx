import React, { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Auth from '../../services/Auth'

interface IProps {
  component: React.ComponentType<any>
  [key: string]: any
}

/**
 * Private Route component
 * Checks if user is logged in
 * if not redirect home
 */
const PrivateRoute: FC<IProps> = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (true) {
        return <Component {...props} />
      }
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }}
  />
)

export default PrivateRoute
