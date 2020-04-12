# News - the test application.

## Setup project
1. install `NodeJS`, `npm`, `nvm`;
   1. check versions:
  ```bash
  ~/mounted/projects/worktest/meta-studio/news-front$ node -v
  => v13.9.0
  ~/mounted/projects/worktest/meta-studio/news-front$ npm -v
  => 6.9.0
  ~/mounted/projects/worktest/meta-studio/news-front$ nvm --version
  => 0.16.1
  ```
2. clone repository to a local folder: `git clone git@github.com:r72cccp/MetaStudioNewsFrontTest.git`;
3. install process manager for serve application: `npm i -g pm2`;
4. copy `./config/front-settings.ts.example` to `./config/front-settings.ts` and fill necessary fields;
5. add `dev.metastudio-news-front.ru` to your hosts file;
6. on linux run `./rundev`
7. on windows run `npm run dev`, ``