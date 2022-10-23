const winstaller = require("electron-winstaller")

async function createInstaller(){
    await winstaller.createWindowsInstaller({
        appDirectory: "/home/riccardo/NavigatorInNodeJS"
    })
}

createInstaller()