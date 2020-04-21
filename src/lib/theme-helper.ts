import { ThemeName } from '@constants/enums'
import { HashMap } from '@lib/common-defs'

export class ThemeMapper {
  public hash: HashMap<string>
  static instance: ThemeMapper

  constructor(cssThemeFileNames?: Array<string>) {
    if (ThemeMapper.instance) {
      return ThemeMapper.instance
    }
    if (typeof cssThemeFileNames === 'undefined') {
      throw new Error('Error, you must pass css filenames list at first ThemeMapper initialization.')
    }
    const themeNames: Array<string> = Object.values(ThemeName)
    this.hash = {}
    themeNames.forEach((themeName) => {
      const cssThemeFileName: string = cssThemeFileNames.find((x) => (new RegExp(`^css${themeName}-.+\.css$`)).test(x))
      if (!cssThemeFileName) {
        throw new Error(`Error, not found css entry for theme "${themeName}".`)
      }
      this.hash[themeName] = cssThemeFileName
    })
    ThemeMapper.instance = this
  }

  public set(themeName: keyof typeof ThemeName): void {
    if (typeof document === 'undefined') return
    const themeStylesheetLinkId: string = `theme-stylesheet-${themeName}`
    const head = document.getElementsByTagName('head')[0]
    document.querySelectorAll('[id^="theme-stylesheet-"]').forEach((item) => item.remove())
    let themeStylesheetLink = document.createElement('link')
    themeStylesheetLink.id = themeStylesheetLinkId
    themeStylesheetLink.rel = 'stylesheet'
    themeStylesheetLink.type = 'text/css'
    themeStylesheetLink.href = `./${this.hash[themeName]}`
    themeStylesheetLink.media = 'all'
    head.appendChild(themeStylesheetLink)
  }

  public nextThemeName(currentThemeName: keyof typeof ThemeName): keyof typeof ThemeName {
    const themeNames = Object.values(ThemeName)
    const currentPositionInList = themeNames.findIndex((x) => x.toString() === currentThemeName.toString())
    if (currentPositionInList === -1) return themeNames[0]
    const nextPositionInList = currentPositionInList >= themeNames.length - 1 ? 0 : currentPositionInList + 1
    return themeNames[nextPositionInList]
  }
}
