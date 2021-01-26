//WebpackBeforeBuildPlugin создает экземпляр плагина для конфига вебпака. Он проверяет наличие файла перед началом сборки. В моем случае это:
// Не начинать сборку серверной сборки пока не соберется клиентский код (из за файла stats.json)
const WebpackBeforeBuildPlugin = require('before-build-webpack')
const fs = require('fs')

class WaitPlugin extends WebpackBeforeBuildPlugin {
    constructor(file, interval = 100, timeout = 40000) {
        super(function(stats, callback) {
            let start = Date.now()

            function poll() {
                console.log(`${(Date.now() - start)/1000} second left`)
                if (fs.existsSync(file)) {
                    callback()
                } else if (Date.now() - start > timeout) {
                    throw Error("Возможно, ошибка в клиентской сборке")
                } else {
                    setTimeout(poll, interval)
                }
            }
            poll()
        })
    }
}

module.exports = WaitPlugin