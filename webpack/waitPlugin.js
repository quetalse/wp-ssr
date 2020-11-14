//WebpackBeforeBuildPlugin создает экземпляр плагина для конфига вебпака. Он проверяет наличие файла перед началом сборки. В моем случае это:
// Не начинать сборку серверной сборки пока не соберется клиентский код (из за файла stats.json)
const WebpackBeforeBuildPlugin = require('before-build-webpack')
const fs = require('fs')

class WaitPlugin extends WebpackBeforeBuildPlugin {
    constructor(file, interval = 100, timeout = 10000) {
        super(function(stats, callback) {
            let start = Date.now()
            console.log('file', file)
            function poll() {
                if (fs.existsSync(file)) {
                    callback()
                } else if (Date.now() - start > timeout) {
                    throw Error("Maybe it just wasn't meant to be.")
                } else {
                    setTimeout(poll, interval)
                }
            }

            poll()
        })
    }
}

module.exports = WaitPlugin