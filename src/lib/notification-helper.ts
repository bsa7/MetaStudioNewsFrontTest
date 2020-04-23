import { NotificationReducerStore } from "@reducers/notification-reducer"
import { randomString } from "./string-helper"
import { AlertAreaType } from "@constants/enums"

export class NotificationMessage {
  public readonly id: string

  constructor(public type: AlertAreaType, public title?: string, public message?: string) {
    this.id = `${this.type as string}--${randomString()}`
  }
}


export const pushNotification = (state: NotificationReducerStore, message: NotificationMessage) => {
  return {
    ...state,
    messages: state.messages.concat(message),
  }
}
