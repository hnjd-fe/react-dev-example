const fs = require('fs');
const path = require('path');
const tool = require('./tool');

function Translation ({origin, targetLanguage}) {
    this.origin = origin
    this.targetLanguage = targetLanguage
    this.translationData = {}
}

Translation.prototype.start = async function (cb) {
    await this.handleTranslation(this.origin, this.targetLanguage)
    cb(this.translationData)
}

// 翻译
Translation.prototype.handleTranslation = function (origin, targetLanguage) {
    return new Promise(async (resolve, reject) => {
        const promises = []
        const arrKey = Object.keys(origin)
        const len = arrKey.length
        for (let i = 0; i < len; i++) {
            const key = arrKey[i]
            promises.push( tool.getTranslate(origin[key], targetLanguage) )
        }
        const arrVal = await Promise.all(promises)
        for (let i = 0; i < len; i++) {
            const key = arrKey[i]
            this.translationData[key] = arrVal[i]
        }
        resolve()
    })
}


module.exports = Translation