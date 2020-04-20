import { combineReducers, Reducer } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { sessionReducer, SessionReducerStore } from '@reducers/session-reducer'

export const createRootReducer = (history?: History) => {
  return combineReducers({
    router: connectRouter(history || {} as History),
    session: sessionReducer,
  })
}

export type IApplicationState = {
  router?: RouterState
  session?: SessionReducerStore
}
