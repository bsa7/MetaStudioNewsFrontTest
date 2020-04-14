module.exports = (templateParams) => {
  const serverFileName = templateParams.htmlWebpackPlugin.files.js.find((filename) => {
    return /server.*\.js$/.test(filename)
  })

  return `module.exports = {
    apps: [
      {
        cwd: "./",
        env: {
          NODE_ENV: "development"
        },
        ignore_watch: ["node_modules"],
        merge_logs: true,
        name: "metastudio-news-front",
        script: "${serverFileName.replace('server', 'dist/server')}",
        watch: ["dist"],
      }
    ]
  }
  `
}
