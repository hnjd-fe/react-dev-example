import React from 'react'
import Intl from '@intl';
import { Form, Icon, Input, Button, Checkbox, Card, message } from 'antd'
import './login.less'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setGlobalLoading, checkIsLogin } from 'actions/global'

const { FormattedMessage, formatMessage } = Intl

const FormItem = Form.Item

@connect(
	state => ({}),
	dispatch => bindActionCreators({ setGlobalLoading, checkIsLogin }, dispatch)
)
class Login extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
				const isAllow = this.allowLogin({ userName: values.userName, password: values.password })
				if (isAllow) {
					message.success(formatMessage({id:'app.login.submitSuc'}), .5)
						.then(() => {
							this.props.checkIsLogin(true)
							this.props.history.push('/admin/home/homePage')
						})
				} else {
					message.error(formatMessage({id:'app.login.submitErr'}))
				}
			}
		})
	}
	allowLogin = (obj) => {
		const { userName = '', password = '' } = obj
		if (userName === 'admin' && password === '12345') {
			return true
		} else {
			return false
		}
	}
	componentDidMount() {
		this.props.setGlobalLoading(true)
		this.props.form.setFieldsValue({userName: 'admin'})
		this.props.form.setFieldsValue({password: '12345'})
		
	}
	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<div className="page-login">
				<Card style={{ width: 350 }} className="card-login">
					<Form onSubmit={this.handleSubmit} className="login-form">
						<FormItem>
							{getFieldDecorator('userName', {
								rules: [{ required: true, message: 'Please input your username!' }],
							})(
								<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="admin" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please input your Password!' }],
							})(
								<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="12345" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true,
							})(
								<Checkbox><FormattedMessage id="app.login.remember"/></Checkbox>
							)}
							<Button type="primary" htmlType="submit" className="login-form-button">
								<FormattedMessage id="app.login.submit"/>
          					</Button>
						</FormItem>
					</Form>
				</Card>
			</div>
		)
	}
}
export default Form.create()(Login)