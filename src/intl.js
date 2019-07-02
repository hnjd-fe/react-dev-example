
const ReactIntl = require('react-intl');
// import ReactIntl from 'react-intl'

// init api methods
let intl;
const intlApi = {};

[
  'formatMessage',
  'formatHTMLMessage',
  'formatDate',
  'formatTime',
  'formatRelative',
  'formatNumber',
  'formatPlural',
  'now',
  'onError',
].forEach(methodName => {
  intlApi[methodName] = function() {
    if (intl && intl[methodName]) {
      // _setIntlObject has been called
      return intl[methodName].call(intl, ...arguments);
    } else if (console && console.warn) {
      console.warn(
        `${methodName} not initialized yet, you should use it after react app mounted.`,
      );
    }
    return null;
  };
});

// react-intl 没有直接暴露 formatMessage 这个方法
// 只能注入到 props 中，所以通过在最外层包一个组件然后组件内调用这个方法来把 intl 这个对象暴露到这里来
// TODO 查找有没有更好的办法
export function _setIntlObject(theIntl) {
  intl = theIntl;
}

export default {
    ...ReactIntl,
    ...intlApi,
};