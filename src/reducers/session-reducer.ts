import { actionTypes } from '@constants/action-types'
import { User } from '@lib/models'
import { Action } from 'redux'
import { LocationInfo } from '@lib/common-defs'
import { currentLocation } from '@lib/isomorphic-helper'

export type SessionReducerStore = {
  locationInfo: LocationInfo
  user?: User
}

const initialState: SessionReducerStore = {
  locationInfo: undefined,
  user: undefined,
}

export const sessionReducer = (state = initialState, action: Action) => {
  let newState = state

  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      newState = {
        ...newState,
        locationInfo: currentLocation.locationInfo(),
      }
      break
    }
    case actionTypes.FETCH_USER__SUCCESS: {
      break
    }
    case actionTypes.LOGIN_USER__START:
    case actionTypes.REGISTER_USER__START: {
      break
    }
    default: {
      break
    }
  }
  return newState
}
