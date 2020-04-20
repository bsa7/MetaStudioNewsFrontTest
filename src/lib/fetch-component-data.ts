import { router } from '@components/router'
import { Dispatch } from 'redux'
import * as ApplicationPages from '@components/index'
import { ApplicationPage, ApplicationPageName, ValuesOf } from '@lib/common-defs'
import { Layout } from '@components/layout'

export const fetchComponentData = (dispatch: Dispatch): Promise<void[]> => {
  const pageName = router.currentPathSetting.componentName
  const CurrentPage: ApplicationPage = ApplicationPages[pageName as ApplicationPageName]
  const pages: Array<ApplicationPage> = [Layout, CurrentPage]
  const promises: Array<Promise<void>> = []
  pages.forEach((page) => {
    if ((page || {}).fetchData) {
      promises.push(page.fetchData(dispatch))
    }
  })
  return Promise.all(promises)
}
