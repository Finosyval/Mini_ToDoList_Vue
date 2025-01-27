const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // Désactive ESLint au démarrage
  configureWebpack: {
    devServer: {
      client: {
        overlay: {
          warnings: false, // Désactive l'affichage des warnings dans le navigateur
          errors: false,   // Désactive l'affichage des erreurs dans le navigateur
        },
      },
    },
  },
})
