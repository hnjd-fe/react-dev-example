import React from 'react';
import { addLocaleData, intlShape, IntlProvider} from 'react-intl';
import { LocaleProvider } from 'antd';
import {_setIntlObject} from '@intl';
import localeInfo from './localeInfo.js'

const InjectedWrapper = (() => {
  let sfc = (props, context) => {
    _setIntlObject(context.intl);
    return props.children;
  };
  sfc.contextTypes = {
    intl: intlShape,
  };
  return sfc;
})();

const baseNavigator = true;
const useLocalStorage = true;




let defaultAntd = require('antd/lib/locale-provider/zh_CN');
defaultAntd = defaultAntd.default || defaultAntd;

let appLocale = {
  locale: 'zh-CN',
  messages: {
    ...require('@locales/language-zh-CN').default,
  },
  antd: require('antd/lib/locale-provider/zh_CN'),
  data: require('react-intl/locale-data/zh'),
};

if (useLocalStorage && localStorage.getItem('360-language') && localeInfo[localStorage.getItem('360-language')]) {
  appLocale = localeInfo[localStorage.getItem('360-language')];
} else if (localeInfo[navigator.language] && baseNavigator){
  appLocale = localeInfo[navigator.language];
} else {
  appLocale = localeInfo['zh-CN'] || appLocale;
}

window.g_lang = appLocale.locale;
window.appLocale = appLocale;
appLocale.data && addLocaleData(appLocale.data);










export default function LocaleWrapper(props) {
    let ret = props.children;
    ret = (<IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <InjectedWrapper>{ret}</InjectedWrapper>
    </IntlProvider>)
    ret = (<LocaleProvider locale={appLocale.antd ? (appLocale.antd.default || appLocale.antd) : defaultAntd}>
      {ret}
    </LocaleProvider>);
    return ret;
}