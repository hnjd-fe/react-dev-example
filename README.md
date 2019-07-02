
# 基于React-intl、React全家桶集成的多语言脚手架

## 如何使用

### 项目快速开始

<blockquote>
  yarn start
</blockquote>

### 命令行执行翻译操作

>yarn translation zh_TW

#### PS: 目前使用的是谷歌翻译，可能需要自备梯子

#### [目标语言]
| 语言 | 对应值 |
| ------ | ------ |
| 中文 | zh_CN |
| 繁体 | zh_TW |
| 英文 | en_US |
| 日语 | ja_JP |
| 越南语 | vi_VN |
| 泰语 | th_TH |
| 俄语 | ru_RU |
| 韩语 | ko_KR |
| 法语 | fr_FR |

### 文件结构

```shell
config                          // 项目配置目录
translation                     // 翻译目录
src
├── index.js                    // 应用入口
├── App.js
├── actions                     // redux actions
│   └── login.js
│   └── ...
├── assets                      // 静态资源，如图片、图标和字体等
│   ├── images
│   └── ...
├── components                  // 公共组件
│   ├── BaseLayout
│   └── Loading
│   └── LocaleWrapper
│   └── NoMatch
├── locales                     // 多语言国际化的语言包
│   ├── language-zh-CN.js
│   ├── language-en-US.js
│   └── ...
├── middleware                  // redux middleware
│   ├── authorizeMiddleware.js            // 认证中间件
│   └── ...
├── reducers                    // redux store
│   └── login.js
│   └── ...
├── router                      // react-router 入口
│   ├── config.js
│   └── index.js
├── styles                      // 全局功能性样式入口，如 全局变量、工具函数等
│   ├── global.less
│   └── index.less
├── utils                       // 公用函数，如 XHR 请求等
│   └── const.js                // 公共常量
│   └── local.js                // 多语言国际化相关配置
│   └── request.js              // 请求相关
│   └── tool.js                 // 工具函数
└── pages                       // 业务逻辑，原则上每个路由入口形成一个文件夹，如何需要使用到redux 请在 actions 和 reducers 定义
    ├── Login
    │   ├── Login.js
    │   ├── login.less
    └── ...
```


## Example
### 组件渲染（推荐）
```js
import React from 'react'
import Intl from '@intl';
const { formatMessage } = Intl
const prefixIntl = 'app.demo'
class Demo extends React.Component {
	render() {
		return (
			<FormattedMessage id={`${prefixIntl}.title`}/>
		)
	}
}
export default Demo
```

### 函数渲染
```js
import React from 'react'
import Intl from '@intl';
const { formatMessage } = Intl
const prefixIntl = 'app.demo'
class Demo extends React.Component {
	render() {
		return (
			{formatMessage({id: `${prefixIntl}.title`})}
		)
	}
}
export default Demo
```


## API
* [`FormattedMessage`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`FormattedHTMLMessage`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`FormattedDate`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`FormattedTime`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`FormattedRelative`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`FormattedNumber`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`FormattedPlural`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`formatMessage`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`formatHTMLMessage`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`formatDate`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`formatTime`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`formatRelative`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`formatNumber`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`formatPlural`](//github.com/yahoo/react-intl/wiki/API#formatmessage)
* [`now`](//github.com/yahoo/react-intl/wiki/API#formatmessage)

## More
更多API可以点击 [React-Intl](//github.com/yahoo/react-intl) 查看

##