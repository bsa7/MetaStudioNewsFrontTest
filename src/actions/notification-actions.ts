import { actionNames } from "@constants/action-types"
import { createSyncAction } from "@lib/flux-helper"
import { NotificationMessage } from "@lib/notification-helper"

export const hideNotificationMessage = (messageId: string) => {
  return createSyncAction<string>({
    actionName: actionNames.HIDE_NOTIFICATION_MESSAGE,
    result: messageId,
  })
}

export const pushNotificationMessage = (message: NotificationMessage) => {
  return createSyncAction<NotificationMessage>({
    actionName: actionNames.PUSH_NOTIFICATION_MESSAGE,
    result: message,
  })
}
