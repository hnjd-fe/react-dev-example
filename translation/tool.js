const fs = require('fs')
const path = require('path')
const babel = require('babel-core')
const {Translate} = require('@google-cloud/translate')
const {projectId, key} = require('./config.js')
const {Translate} = require('@google-cloud/translate')


// Instantiates a client
const translate = new Translate({projectId: projectId, key})


// 写文件
const writeFile = (filePath, fileData) => {
  try {
    fs.writeFileSync(filePath, fileData, 'utf8')
  } catch (err) {
    // 写入文件出错
    console.log('地址:' + filePath + '------>写入失败', err)
  }
}

// 读取文件
const readFile = (filePath) => {
  let data = ''
  try {
    data = fs.readFileSync(filePath, 'utf8')
  } catch (err) {
    // 读取文件出错
    console.log('地址:' + filePath + '------>读取失败', err)
  }
  return data
}

// 转换import
const translationES6Import = ({ fileData, filePath, targetFileName }) => {
  const exp = new RegExp("[\"]*import[\\s]+[a-z0-9]*[\\s]+from[\\s]+'[a-z0-9./_]*'", 'gi')
  const exp_arr = fileData.match(exp)
  if (Array.isArray(exp_arr)) {
    exp_arr.forEach((item) => {
      const _exp = new RegExp("\(\?\<\=import[\\s]+[a-z0-9]*[\\s]+from[\\s]+\'\)[a-z0-9.\/_]*", 'i')
      const p = item.match(_exp)
      const _filePath = path.join(filePath.replace(targetFileName, ''), p[0])
      const _fileData = readFile(_filePath)
      const babelData = babelCore(_fileData)
      const _exp_prefix = new RegExp('(?<=import[\\s])[a-z0-9./]*', 'i')
      const variable = item.match(_exp_prefix)
      fileData = fileData.replace(item, 'var ' + variable[0] + ' = "' + babelData + '"')
    })
  }
  return fileData
}

// babel处理
const babelCore = (fileData)=>{
  const babelData = babel.transform(fileData, {
      presets: [require('babel-preset-env')],
      plugins: ["transform-object-rest-spread"]
  })
  return eval(babelData.code)
}

// 翻译api
const getTranslate = (text, target) => {
  return new Promise((resolve, reject) => {
    translate.translate(text, target).then(results => {
        const translation = results[0]
        resolve(translation)
      })
      .catch(err => {
        console.error('ERROR:', err)
        reject(err)
      })
  })
}


// reactIntl常量映射  data字段
const reactIntlConstant = {
    'zh_CN': 'zh',
    'zh_TW': 'zh',
    'en_US': 'en',
    'ja_JP': 'ja',
    'vi_VN': 'vi',
    'th_TH': 'th',
    'ru_RU': 'ru',
    'ko_KR': 'ko',
    'fr_FR': 'fr'
}

// reactIntl常量映射 
const reactIntlConstantLocale = {
    'zh_CN': 'zh-CN',
    'zh_TW': 'zh-TW',
    'en_US': 'en-US',
    'ja_JP': 'ja-JP',
    'vi_VN': 'vi-VN',
    'th_TH': 'th-TH',
    'ru_RU': 'ru-RU',
    'ko_KR': 'ko-KR',
    'fr_FR': 'fr-FR'
}

// 谷歌翻译常量映射
const chromeConstant = {
    'zh_CN': 'zh-CN',
    'zh_TW': 'zh-TW',
    'en_US': 'en',
    'ja_JP': 'ja',
    'vi_VN': 'vi',
    'th_TH': 'th',
    'ru_RU': 'ru',
    'ko_KR': 'ko',
    'fr_FR': 'fr'
}


module.exports = {
    writeFile,
    readFile,
    translationES6Import,
    babelCore,
    getTranslate,
    chromeConstant,
    reactIntlConstantLocale,
    reactIntlConstant,
}