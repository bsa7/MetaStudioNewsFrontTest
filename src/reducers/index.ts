import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { sessionReducer, SessionReducerStore, initialState as initialSessionState } from '@reducers/session-reducer'
import { AppWindow } from '@lib/common-defs'
import { decompressApplicationState } from '@lib/server-helper'

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

let preloadedSessionState: IApplicationState
if (typeof window !== 'undefined') {
  preloadedSessionState = decompressApplicationState((window as AppWindow).__PRELOADED_STATE__)
  delete preloadedSessionState.router
}

export const initialApplicationState: IApplicationState = preloadedSessionState || {
  session: initialSessionState,
}
