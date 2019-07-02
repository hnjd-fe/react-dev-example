import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import { formatFirstMenu, formatSecondMenu } from 'utils/tool'
import { getLanguage, setLanguage, supportLanguage, languageConstant } from 'utils/local'
import { Layout, Menu, Icon, Row, Col, Avatar, Dropdown } from 'antd'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {setGlobalLoading, checkIsLogin} from 'actions/global'
import Intl from '@intl';

const { FormattedMessage, formatMessage } = Intl
const prefixIntl = 'app.BaseLayout'

const SubMenu = Menu.SubMenu
const { Header, Sider, Content } = Layout

@connect(
  state => state.getIn(['global']),
  dispatch => bindActionCreators({ setGlobalLoading, checkIsLogin }, dispatch)
)
class BaseLayout extends React.Component {
  state = {
    currentMenu: formatSecondMenu(this.props.location.pathname),
    currenLanguage: getLanguage(),
    menuData: {
      theme: 'dark', // 菜单主题色
      defaultSelectedKeys: this.props.location.pathname, // 当前默认值
      mode: 'inline', // 菜单模式
      defaultOpenKeys: formatFirstMenu(this.props.location.pathname),
      list: [
        {
          id: 'home',
          icon: 'home',
          value: formatMessage({id:`${prefixIntl}.home`}),
          subtitle: [
            {
              value: formatMessage({id:`${prefixIntl}.home.index`}),
              link: '/admin/home/homePage'
            },
            {
              value: formatMessage({id:`${prefixIntl}.home.setting`}),
              link: '/admin/home/setting'
            }
          ]
        },
      ] // 用户
    }
  }
  getCurrentMenu = (item) => {
    this.setCurrentMenu(item.key)
  }
  setCurrentMenu = (item) => {
    this.setState(() => ({
      currentMenu: formatSecondMenu(item)
    }))
  }
  redirectRoute = () => {
    const { isLogin, location, history } = this.props
    if (isLogin) {
      history.push(location.pathname)
    } else {
      history.push('/login')
    }
  }
  onLogout = () => {
    this.props.checkIsLogin(false)
  }
  componentDidMount () {
    this.redirectRoute()
    this.props.setGlobalLoading(true)
  }
  switchLanguage = (language) => {
    setLanguage(language)
    this.setState({
      currenLanguage: language
    })
  }
  render () {
    const { routes = [] } = this.props
    const { menuData, currenLanguage } = this.state
    const list = menuData.list
    const menu = (
      <Menu>
        <Menu.Item>
          <NavLink to="/login" onClick={this.onLogout}>
            <FormattedMessage id={`${prefixIntl}.logout`}/>
          </NavLink>
        </Menu.Item>
      </Menu>
    )
    const menuLang = (
      <Menu>
          {
            supportLanguage.map((item, idx)=>{
              return (
                <Menu.Item className={`switchLanguage ${currenLanguage === item ? 'activeLanguage':''}`} key={idx} onClick={()=>this.switchLanguage(item)}  >{languageConstant[item]}</Menu.Item>
              )
            })
          }
      </Menu>
    )
    return (
      <Layout className="base-layout">
        <Sider>
          <div className="logo">logo</div>
          <Menu
            theme={menuData.theme}
            mode={menuData.mode}
            defaultOpenKeys={[menuData.defaultOpenKeys]}
            defaultSelectedKeys={[menuData.defaultSelectedKeys] }
          >
          {
              list.map((item) => {
                return (
                  <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.value}</span></span>}>
                  {
                    item.subtitle.map(second => {
                      return (
                        <Menu.Item
                          key={second.link}
                          onClick={this.getCurrentMenu}
                          >
                          <NavLink to={second.link}>
                            {second.value}
                          </NavLink>
                        </Menu.Item>
                      )
                    })
                  }
                  </SubMenu>
                )
              })
          }
          </Menu>
        </Sider>
        <Layout>
          <Row gutter={ 12 }>
            <Col span={ 24 }>
      
              <Layout>
                <Header className="base-header">
                  <span className="header-tag">
                  </span>
                  <span className="header-right">
                    <Dropdown overlay={menuLang} trigger={['click']}>
                      <span className="switchLang">{languageConstant[currenLanguage]}</span>
                    </Dropdown>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <Avatar size="large" icon="user" />
                    </Dropdown>
                  </span>
                </Header>
                <Content className="base-content">
                  {
                    routes.map((r, key) => {
                      return (
                        <Route
                          component={r.component}
                          exact={!!r.exact}
                          key={r.path + key}
                          path={r.path}
                        />
                      )
                    })
                  }
                </Content>
              </Layout>
            </Col>
  
          </Row>
        </Layout>
      </Layout>
    )
  }
}

export default BaseLayout