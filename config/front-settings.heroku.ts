import path from 'path'
// import { PROCESS } from '@constants/string-constants'
// declare var process: PROCESS

export const hostSettings = {
  domains: {
    MAIN: 'metastudio-news.herokuapp.com/',
  },
  environment: {
    name: 'development',
  },
  https: {
    port: 8001,
    certFileName: path.join(__dirname, './ssl/metastudio.pem'),
    keyFileName: path.join(__dirname, './ssl/metastudio.key'),
  },
  http: {
    port: 3001,
  },
  protocol: 'https',
}

export const apiSettings = {
  hostname: 'https://metastudio-news-api.herokuapp.com/',
}

export const defaultThemeName = 'Bootstrap'
export const applicationSecret = '4387gt734o5tg7239t8y32p8uy2308t9y43589tgyw4598tg'
