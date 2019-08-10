const proxy = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use(proxy('/model-server', {
//         target: 'http://model-server:1111', pathRewrite: {
//             '^/model-server/dataModel': '/dataModel',
//             '^/model-server/model':'/model',
//             '^/model-server/deploy': '/deploy'
//         }
//     }));
//     app.use(proxy('/prisma', {
//         target: 'http://prisma:4466', pathRewrite: {
//             '^/prisma': '/'
//         }
//     }))
//     app.use(proxy('/app', {
//         target: 'http://app-server:4000', pathRewrite: {
//             '^/app': '/'
//         }
//     }))
// };



module.exports = function (app) {
    app.use(proxy('/model-server', {
        target: 'http://localhost:1111', pathRewrite: {
            '^/model-server/dataModel': '/dataModel',
            '^/model-server/model':'/model',
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
};