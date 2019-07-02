const fs = require('fs');
const path = require('path');
const tool = require('./tool');

function Origin ({localesPath, originLanguage}) {
    this.localesPath = localesPath
    this.originLanguage = originLanguage
    this.targetObj = {}
}

Origin.prototype.start = function (params) {
    readDir(this.localesPath, this.originLanguage, this.targetObj, assignment)
    return this.targetObj
}

const readDir = (_localesPath, _originLanguage, _targetObj, _assignment) => {
    try {
        fs.readdirSync(_localesPath).forEach((page)=>{
            const pagePath = path.resolve(_localesPath, page);
            const stats = fs.statSync(pagePath);
                // 是否是目录
                if (stats.isDirectory()) {
                    readDir(pagePath, _originLanguage, _targetObj, _assignment);
                }else {
                    if(page == _originLanguage) {
                        // 找到目标文件
                        _assignment(pagePath, _originLanguage, _targetObj)
                    }
                }
        });
    }catch (err) {
        throw ("There's an error here " + err)
    }
}

// 给目标对象赋值
const assignment = (pagePath, targetFileName, _targetObj) => {
    fileData = tool.translationES6Import({ 
        fileData: tool.readFile(pagePath), 
        filePath: pagePath, 
        targetFileName 
    })
    const _fileData = tool.babelCore(fileData)
    Object.keys(_fileData).forEach((key)=>{
        _targetObj[key] = _fileData[key]
    })
}


module.exports = Origin