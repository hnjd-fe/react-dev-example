// 获取本地语言类型
const getLanguage = () => {
    const language = window.localStorage.getItem('360-language') || 'zh_CN'
    if(supportLanguage.indexOf(language) === -1) {
        return 'zh_CN'
    }
    return  language
}

// 设置本地语言类型
const setLanguage = (val) => {
    if (val !== undefined && !/^([a-z]{2})_([A-Z]{2})$/.test(val)) {
        // for reset when lang === undefined
        throw new Error('setLocale lang format error');
    }
    if (getLanguage() !== val) {
        window.localStorage.setItem('360-language', val || '');
        window.location.reload();
    }
}

// 获取支持语言列表
const supportLanguage = ['zh_CN', 'en_US']

// 语言选择映射表
const languageConstant = {
    "zh_CN": '简体中文',
    "zh_TW": '繁體中文',
    "en_US": 'Endlish',
    "ja_JP": '日本語',
    "vi_VN": 'Tiếng Việt',
    "th_TH": 'ภาษาไทย',
    "ru_RU": 'русский язык',
    "ko_KR": '한국어.',
    "fr_FR": 'Français',
}

// reactIntl常量映射  data字段
export const reactIntlConstant = {
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
export const reactIntlConstantLocale = {
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
export const chromeConstant = {
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

// 谷歌翻译常量映射
export const constant = {
    'en': 'en-US',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    'ja': 'ja-JP',
    'vi': 'vi-VN',
    'th': 'th-TH',
    'ru': 'ru-RU',
    'ko': 'ko-KR',
    'fr': 'fr-FR'
}

export {
    getLanguage,
    setLanguage,
    supportLanguage,
    languageConstant
} 