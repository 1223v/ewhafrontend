const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/user/login', {
      target: 'https://edu-trans.ewha.ac.kr:8443',
		secure: false,
      changeOrigin: true,
    }),
  );
};