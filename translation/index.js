const fs = require('fs');
const path = require('path');
const tool = require('./tool')
const Origin = require('./origin.js')
const Translation = require('./translation.js')
const WriteProject = require('./writeProject.js')

const localesPath = path.resolve(__dirname, '../src/locales')
const originSvaePath = 'dist'



const handleProject = (translationData) => {
    tool.writeFile(path.resolve(__dirname, `${originSvaePath}/translationData.json`), JSON.stringify(translationData)) // 保存源文件
    new WriteProject({
        localesPath,
        translationData, 
        originLanguage, 
        targetLanguage 
    }).start()
}



const targetLanguage = process.argv.length >= 3 ? process.argv[2] : null
const originLanguage = 'zh-CN.js'

if(!targetLanguage) {
    throw('缺少翻译的目标语言')
} 
console.log('翻译的目标语言：' + targetLanguage)

// 查找提取 src/locales 下的 所有zh-CN.js文件
const origin = new Origin({localesPath, originLanguage }).start()
tool.writeFile(path.resolve(__dirname, `${originSvaePath}/origin.json`), JSON.stringify(origin)) // 保存源文件

// 翻译
new Translation({
    origin, 
    targetLanguage: tool.chromeConstant[targetLanguage],
 }).start(handleProject)
