# News - the test application.

## Setup project
1. install `NodeJS`, `npm`, `nvm`;
   1. check versions:
  ```bash
  $ node -v
    => v13.9.0
  $ npm -v
    => 6.9.0
  $ nvm --version
    => 0.16.1
  ```
2. clone repository to a local folder: `git clone git@github.com:r72cccp/MetaStudioNewsFrontTest.git`;
3. install process manager for serve application: `npm i -g pm2`;
4. copy `.env.example` to `.env` and fill necessary fields;
5. add `dev.metastudio-news-front.ru` to your hosts file;
7. run `npm start` to start development server;

## Configuration
1. [./config/routes.ts](./config/routes.ts) - contains info about application routes;
