const proxy = require('http-proxy-middleware');



const env = process.env.ENV

module.exports = function (app) {
    console.log(env)
    if (env == 'dev_docker') {

        app.use(proxy('/model-server', {
            target: 'http://model-server:1111', pathRewrite: {
                '^/model-server/dataModel': '/dataModel',
                '^/model-server/model': '/model',
                '^/model-server/deploy': '/deploy'
            }
        }));
        app.use(proxy('/prisma', {
            target: 'http://prisma:4466', pathRewrite: {
                '^/prisma': '/'
            }
        }))
        app.use(proxy('/app', {
            target: 'http://app-server:4000', pathRewrite: {
                '^/app': '/'
            }
        }))
    }
    if (env == 'dev_local') {
        app.use(proxy('/model-server', {
            target: 'http://localhost:1111', pathRewrite: {
                '^/model-server/dataModel': '/dataModel',
                '^/model-server/model': '/model',
                '^/model-server/deploy': '/deploy'
            }
        }));
        app.use(proxy('/prisma', {
            target: 'http://localhost:4466', pathRewrite: {
                '^/prisma': '/'
            }
        }))
        app.use(proxy('/app', {
            target: 'http://localhost:4000', pathRewrite: {
                '^/app': '/'
            }
        }))
    }
};


