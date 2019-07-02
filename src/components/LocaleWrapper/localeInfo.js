
const localeInfo = {
  'en_US': {
    messages: {
      ...require('@locales/language-en-US.js').default,
    },
    locale: 'en-US',
    antd: require('antd/lib/locale-provider/en_US'),
    data: require('react-intl/locale-data/en'),
  },
  'zh_CN': {
    messages: {
      ...require('@locales/language-zh-CN').default,
    },
    locale: 'zh-CN',
    antd: require('antd/lib/locale-provider/zh_CN'),
    data: require('react-intl/locale-data/zh'),
  },
};

export default localeInfo