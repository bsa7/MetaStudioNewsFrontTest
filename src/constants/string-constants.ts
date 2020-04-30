export const constants = {
  REDIRECT_AUTH_SUCCESS: 'REDIRECT_AUTH_SUCCESS',
  ROOT: '/',
  THEME_NAME: 'THEME_NAME',
  USER_AUTH_TOKEN: 'USER_AUTH_TOKEN',
}

export type PROCESS = {
  env: {
    APPLICATION_SECRET: string
    API_HOST: string
    DEFAULT_THEME: string
    DOMAIN_MAIN: string
    ENVIRONMENT_NAME: string
    HTTP_PORT: string
    HTTPS_PORT: string
    PROTOCOL: string
    SSL_CERT_FILE_NAME: string
    SSL_KEY_FILE_NAME: string
  }
}
