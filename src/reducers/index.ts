import { combineReducers } from 'redux'
import { sessionReducer } from '@reducers/session-reducer'

export const applicationReducers = combineReducers({
  sessionReducer,
})
