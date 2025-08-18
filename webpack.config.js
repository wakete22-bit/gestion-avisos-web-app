const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // Eliminar console.log, console.debug, console.info, console.warn en producción
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.debug', 'console.info', 'console.warn']
          },
          mangle: true,
          output: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  }
};
