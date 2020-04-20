import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux'
import { History } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { hostSettings } from '@config/front-settings'
import { promiseMiddleware } from '@middlewares/promise-middleware'
import { createRootReducer, IApplicationState } from '@reducers/index'
import { AppWindow } from '@lib/common-defs'

const developmentEnv = (process.env.NODE_ENV == 'development')
const enhancer = (history: History): StoreEnhancer => {
  const reduxRouterMiddleware = routerMiddleware(history)
  let result: StoreEnhancer
  if (developmentEnv) {
    const logger = createLogger({
      collapsed: true,
      level: 'info',
    })
    if (typeof window !== 'undefined') {
      (window as AppWindow).$REDUX_DEVTOOL = developmentEnv
    }
    const enhancerComponents = [
      applyMiddleware(promiseMiddleware, thunk, logger, reduxRouterMiddleware)
    ]
    result = composeWithDevTools(...enhancerComponents)
  } else {
    const enhancerComponents = []
    if (hostSettings.environment.name === 'production') {
      enhancerComponents.push(
        applyMiddleware(promiseMiddleware, thunk, reduxRouterMiddleware)
      )
    } else {
      enhancerComponents.push(
        composeWithDevTools(applyMiddleware(promiseMiddleware, thunk, reduxRouterMiddleware))
      )
    }
    result = compose(...enhancerComponents)
  }
  return result
}

export const configureStore = (initialState: IApplicationState, history?: History) => {
  const reducers = createRootReducer(history)

  return createStore(reducers, initialState, enhancer(history))
}
