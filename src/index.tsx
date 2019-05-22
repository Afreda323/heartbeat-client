import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './style/index.css'
import App from './containers/App'
import configureStore from './redux/store'
import 'antd/dist/antd.css'

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
