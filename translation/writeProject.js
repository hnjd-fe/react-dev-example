const fs = require('fs');
const path = require('path');
const tool = require('./tool');

const readDir = (_localesPath, _originLanguage, _targetLanguage, _translationData, callback) => {
    try {
        fs.readdirSync(_localesPath).forEach((page) => {
            const pagePath = path.resolve(_localesPath, page);
            const stats = fs.statSync(pagePath);
            // 是否是目录
            if (stats.isDirectory()) {
                readDir(pagePath, _originLanguage, _targetLanguage, _translationData, callback);
            } else {
                if (page == _originLanguage) {
                    // 找到目标文件
                    callback(pagePath, _originLanguage, _targetLanguage, _translationData)
                }
            }
        });
    } catch (err) {
        throw ("There's an error here " + err)
    }
}

function handleFile (pagePath, originLanguage, targetLanguage, data) {
    const fileData = tool.babelCore(tool.readFile(pagePath));
    Object.keys(fileData).forEach((key) => {
        fileData[key] = data[key]
    })
    tool.writeFile(pagePath.replace(originLanguage, `${tool.reactIntlConstantLocale[targetLanguage]}.js`), 'export default ' + JSON.stringify(fileData))
}



function WriteProject({ localesPath, translationData, originLanguage, targetLanguage }) {
    this.originLanguage = originLanguage
    this.targetLanguage = targetLanguage
    this.translationData = translationData
    this.localesPath = localesPath
}

function addLanguage (localesPath, originLanguage, targetLanguage) {
    const lang = tool.reactIntlConstantLocale[targetLanguage]
    const originPath = path.resolve(localesPath, `language-${originLanguage}`)
    const origin = tool.readFile(originPath)
    const name = originLanguage.split('.')[0]
    const exp = new RegExp(name, 'gi')
    const newData = origin.replace(exp, lang)
    const newPath = path.resolve(localesPath, `language-${lang}.js`)
    tool.writeFile(newPath, newData)
}

WriteProject.prototype.start = async function () {
    await this.handleLocales()
    this.handleLocaleWrapper()
    this.handleUtilsLocal()
}

// 处理locales目录
WriteProject.prototype.handleLocales = function () {
    return new Promise(async (resolve, reject) => {
        // 处理翻译后的数据写入项目文件
        readDir(this.localesPath, this.originLanguage, this.targetLanguage, this.translationData, handleFile)
        // 处理language-zh-CN.js
        addLanguage(this.localesPath, this.originLanguage, this.targetLanguage)
        resolve()
    })
}
// 处理LocaleWrapper目录 localeInfo文件
WriteProject.prototype.handleLocaleWrapper = function () {
    const localeInfoPath = path.resolve(__dirname, '../src/components/LocaleWrapper/localeInfo.js')
    const fileData = tool.readFile(localeInfoPath);
    const exp = new RegExp(/,[\n\t]};/, 'gi')
    const targetExp = new RegExp(this.targetLanguage, 'g')
    if( targetExp.test(fileData)) {
        return console.log('handleLocaleWrapper 语言：' + this.targetLanguage + '已存在')
    }
    if( exp.test(fileData) ) {
        const lang = tool.reactIntlConstantLocale[this.targetLanguage]
        const reactIntlLang = tool.reactIntlConstant[this.targetLanguage]
        const newFileData = fileData.replace(exp, `,\n\t'${this.targetLanguage}': {\n\t\tmessages: {\n\t\t\t...require('@locales/language-${lang}').default,\n\t\t},\n\t\tlocale: '${lang}',\n\t\tantd: require('antd/lib/locale-provider/${this.targetLanguage}'),\n\t\tdata: require('react-intl/locale-data/${reactIntlLang}'),\n\t},\n};`)
        tool.writeFile(localeInfoPath, newFileData)
    }else {
        throw('LocaleWrapper/localeInfo.js 无法匹配到关键词进行替换')
    }
}

// 处理utils目录 local文件
WriteProject.prototype.handleUtilsLocal = function () {
    const localPath = path.resolve(__dirname, '../src/utils/local.js')
    const fileData = tool.readFile(localPath);
    const exp = new RegExp(/supportLanguage\s=\s\[[\w\'\_\,\s]+\]\n/, 'gi')
    const arr = fileData.match(exp)
    if(arr.length == 1) {
        const val = arr[0];
        const targetExp = new RegExp(this.targetLanguage, 'g')
        if(targetExp.test(val)) {
            return console.log('handleUtilsLocal 语言：' + this.targetLanguage + '已存在')
        }
        const new_exp = new RegExp(/\'\]/, 'g')
        const newVal = val.replace(new_exp, `', '${this.targetLanguage}']`)
        const newFileData = fileData.replace(exp, newVal)
        tool.writeFile(localPath, newFileData)
    }else {
        throw(('关键词：supportLanguage匹配错误'))
    }
}

module.exports = WriteProject