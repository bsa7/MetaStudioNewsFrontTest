import { actionTypes } from '@constants/action-types'
import { User } from '@lib/models'
import { Action as ReduxAction } from 'redux'
import { LocationInfo, WebpackStats, ThemeName } from '@lib/common-defs'
import { currentLocation } from '@lib/isomorphic-helper'
import { ThemeNames } from '@constants/enums'

export type SessionReducerStore = {
  locationInfo: LocationInfo
  themeName?: ThemeName
  webpackStats: WebpackStats
  user?: User
}

type Action = ReduxAction & {
  result?: any
}

export const initialState: SessionReducerStore = {
  locationInfo: currentLocation.locationInfo(),
  themeName: undefined,
  webpackStats: {} as WebpackStats,
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
    case actionTypes.CHANGE_THEME__START: {
      newState = {
        ...newState,
        ...action.result,
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
