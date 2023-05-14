const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://192.168.1.11:8080',
    changeOrigin: true,
    pathRewrite: {
      '^/api':''
    }
  }))
  app.use(createProxyMiddleware('/upload', {
    target: 'http://asmie.live:8080',
    changeOrigin: true,
    pathRewrite: {
      '^/upload':'/group1/upload'
    }
  }))
  app.use(createProxyMiddleware('/defaultUpload', {
    target: 'http://192.168.1.17:8080',
    changeOrigin: true,
    pathRewrite: {
      '^/defaultUpload':'/upload'
    }
  }))
}
// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';
//
// const app = express();
//
//   app.use(
//       '/api',
//       createProxyMiddleware({
//         target: 'http://192.168.1.12:8080',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api':''
//         }
//       })
//   );
//   app.use(
//       '/upload',
//       createProxyMiddleware({
//         target: 'http://asmie.live:8080',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/upload':'/group1/upload'
//         }
//       })
//   );
// app.listen(3000);
