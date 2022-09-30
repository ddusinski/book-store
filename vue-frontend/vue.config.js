// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  pages: {
    index: {
      entry: "./src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Home",
      chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    stock: {
      entry: "./src/pages/stock/main.js",
      template: "public/index.html",
      filename: "stock.html",
      title: "Stock",
      chunks: ["chunk-vendors", "chunk-common", "stock"]
    }
  }
}
