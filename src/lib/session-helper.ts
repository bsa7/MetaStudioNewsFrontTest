import { userAuthTokenCookie } from "@lib/cookie-helper"
import { checkRouteRedirect } from "@lib/router-helper"
import { router } from "@components/router"

export const logout = () => {
  userAuthTokenCookie('')
  const redirect = checkRouteRedirect()
  if (redirect) {
    router.redirectTo(redirect)
  }
}
