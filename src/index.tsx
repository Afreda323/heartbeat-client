import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './style/index.css'
import App from './containers/App'
import configureStore from './redux/store'
import 'antd/dist/antd.css'
import { AuthProvider } from './providers/Auth'

ReactDOM.render(
  <Provider store={configureStore()}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
  document.getElementById('root'),
)
