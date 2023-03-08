

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://translation-platform.site:8443',
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};