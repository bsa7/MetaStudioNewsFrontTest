import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createRootReducer } from '@reducers/index'

export const history = createBrowserHistory()

export const configureStore = (preloadedState: any) => {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
      ),
    ),
  )

  return store
}
