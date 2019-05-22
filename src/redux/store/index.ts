import { applyMiddleware, createStore, Middleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import rootSaga from '../sagas'
import reducer from '../reducers'

/**
 * Create a redux store
 * apply middleware
 */
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares: Middleware[] = [sagaMiddleware]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(
      createLogger({
        collapsed: true,
      }),
    )
  }

  const store = createStore(reducer, applyMiddleware(...middlewares))

  sagaMiddleware.run(rootSaga)

  store.dispatch({ type: 'hey' })
  return store
}

export default configureStore
