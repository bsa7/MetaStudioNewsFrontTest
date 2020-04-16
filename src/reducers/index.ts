import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { sessionReducer, SessionReducerStore } from '@reducers/session-reducer'

export const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  session: sessionReducer,
})

export type IApplicationState = {
  router?: RouterState;
  session?: SessionReducerStore;
}
