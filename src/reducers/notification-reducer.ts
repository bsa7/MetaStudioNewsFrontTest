import { actionTypes } from '@constants/action-types'
import { Action as ReduxAction } from 'redux'
import { NotificationMessage, pushNotification } from '@lib/notification-helper'
import { AlertAreaType } from '@constants/enums'

export type NotificationReducerStore = {
  messages?: Array<NotificationMessage>
}

type Action = ReduxAction & {
  result?: any
}

export const initialState: NotificationReducerStore = {
  messages: [],
}

export const notificationReducer = (state = initialState, action: Action) => {
  let newState = state

  switch (action.type) {
    case actionTypes.HIDE_NOTIFICATION_MESSAGE__START: {
      newState = {
        ...newState,
        messages: newState.messages.filter(({ id }) => id !== action.result),
      }
      break
    }
    case actionTypes.PUSH_NOTIFICATION_MESSAGE__START: {
      newState = pushNotification(newState, action.result)
      break
    }
    case actionTypes.LOGIN_USER__FAILURE: {
      newState = pushNotification(newState, new NotificationMessage(AlertAreaType.error, 'Auth failure.'))
      newState = pushNotification(newState, new NotificationMessage(AlertAreaType.warning, 'Check password and login'))
      break
    }
    default: {
      break
    }
  }
  return newState
}
