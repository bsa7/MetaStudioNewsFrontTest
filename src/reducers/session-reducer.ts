import { actionTypes } from '@constants/action-types'
import { User } from '@lib/models'
import { Action } from 'redux'

export type SessionReducerStore = {
  user: User;
}

const initialState: SessionReducerStore = {
  user: undefined,
}

export const sessionReducer = (state = initialState, action: Action) => {
  let newState = state

  switch (action.type) {
    case actionTypes.FETCH_USER__SUCCESS: {
      break
    }
    default: {
      break
    }
  }
  return newState
}
