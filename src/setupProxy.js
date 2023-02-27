const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'https://translation-platform.site:8443',
          changeOrigin: true
      })
  )
};