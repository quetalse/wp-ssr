const clientConfig = require('./client/webpack.config.prod.js');
const serverConfig = require('./server/webpack.config.prod.js');

module.exports = [clientConfig,
    // serverConfig
];