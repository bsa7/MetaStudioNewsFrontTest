import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { sessionReducer } from '@reducers/session-reducer'

export const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  sessionReducer,
})
