const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/model-server', {
        target: 'http://model-server:1111', pathRewrite: {
            '^/model-server/dataModel': '/dataModel'
        }
    }));
    app.use(proxy('/prisma', {
        target: 'http://prisma:4466', pathRewrite: {
            '^/prisma': '/'
        }
    }))
};