module.exports = (templateParams) => {
  return `module.exports = {
    apps: [
      {
        cwd: "./",
        env: {
          NODE_ENV: "development"
        },
        merge_logs: true,
        name: "metastudio-news-front",
        script: "${templateParams.htmlWebpackPlugin.files.js[0].replace('server', 'dist/server')}",
      }
    ]
  }`
}
