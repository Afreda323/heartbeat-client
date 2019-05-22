import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'
import { StaticContext } from 'react-router'

import Login from '../Login'
import Content from '../Content'
import Callback from '../Callback'

import PrivateRoute from '../../components/PrivateRoute'

const handleAuthentication = (
  nextState: RouteComponentProps<any, StaticContext, any>,
) => {
  // if (/access_token|id_token|error/.test(nextState.location.hash)) {
  //   auth.handleAuthentication()
  // }
}

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/app" component={Content} />
      <Route
        path="/callback"
        render={(props) => {
          handleAuthentication(props)
          return <Callback {...props} />
        }}
      />
    </div>
  </BrowserRouter>
)

export default Routes
