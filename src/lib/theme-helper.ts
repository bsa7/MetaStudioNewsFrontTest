import { ThemeNames } from '@constants/enums'
import { HashMap, ThemeName } from '@lib/common-defs'
import { cookie } from '@lib/cookie-helper'
import { constants } from '@constants/string-constants'
import { defaultThemeName } from '@config/front-settings'

export class ThemeMapper {
  private themeCssFileNamesHash: HashMap<string>
  private otherCssFileNameList: Array<string>
  static instance: ThemeMapper

  constructor(cssFileNames?: Array<string>) {
    if (ThemeMapper.instance) {
      return ThemeMapper.instance
    }
    if (typeof cssFileNames === 'undefined') {
      throw new Error('Error, you must pass css filenames list at first ThemeMapper initialization.')
    }
    const themeNames: Array<string> = Object.values(ThemeNames)
    this.themeCssFileNamesHash = {}
    this.otherCssFileNameList = []
    themeNames.forEach((themeName) => {
      const cssThemeFileName: string = cssFileNames.find((x) => (new RegExp(`^css${themeName}-.+\.css$`)).test(x))
      if (!cssThemeFileName) {
        throw new Error(`Error, not found css entry for theme "${themeName}".`)
      }
      this.themeCssFileNamesHash[themeName] = cssThemeFileName
    })
    cssFileNames.forEach((cssFileName: string) => {
      const themeName = themeNames.find((x) => (new RegExp(`^css${x}-.+\.css$`)).test(cssFileName))
      if (!themeName) {
        this.otherCssFileNameList.push(cssFileName)
      }
    })

    ThemeMapper.instance = this
  }

  public get nextThemeName(): ThemeName {
    const themeNames = Object.values(ThemeNames)
    const currentPositionInList = themeNames.findIndex((x) => x.toString() === this.currentThemeName.toString())
    if (currentPositionInList === -1) return themeNames[1]
    const nextPositionInList = currentPositionInList >= themeNames.length - 1 ? 0 : currentPositionInList + 1
    return themeNames[nextPositionInList]
  }

  public get currentThemeName(): ThemeName {
    const themeNames = Object.values(ThemeNames)
    const currentThemeName = cookie.get(constants.THEME_NAME) || defaultThemeName || themeNames[0]
    return currentThemeName as ThemeName
  }

  public get currentThemeStylesheetFileName(): string {
    return this.themeCssFileNamesHash[this.currentThemeName]
  }

  public get otherCssFileNames(): Array<string> {
    return this.otherCssFileNameList
  }
}
