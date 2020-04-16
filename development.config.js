module.exports = {
  apps: [
    {
      cwd: "./",
      env: {
        NODE_ENV: "development"
      },
      ignore_watch: ["node_modules"],
      merge_logs: true,
      name: "metastudio-news-front",
      script: "./dist/server.js",
      watch: ["dist"],
    }
  ]
}
