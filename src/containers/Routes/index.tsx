import React, { FC } from 'react'
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'
import { StaticContext } from 'react-router'

import Login from '../Login'
import Content from '../Content'
import Callback from '../Callback'

import PrivateRoute from '../../components/PrivateRoute'
import { useAuth } from '../../providers/Auth'

type RouteProps = RouteComponentProps<any, StaticContext, any>

const Routes: FC = () => {
  const auth = useAuth()

  /**
   * Check route props for auth values
   * if they are, set session vals
   * @param nextState
   */
  const handleAuthentication = (nextState: RouteProps) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication()
    }
  }
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/app" component={Content} />
        <Route
          path="/callback"
          render={(props: RouteProps) => {
            handleAuthentication(props)
            return <Callback {...props} />
          }}
        />
      </div>
    </BrowserRouter>
  )
}

export default Routes
