import { Button, Form, Icon, Input, Layout, notification, Spin, } from 'antd';
import * as React from 'react';
import { API_HOST } from '../utils/config'
import { iRequest } from './../utils/credientials'
import FooterComponent from './Footer'

const { Content } = Layout;
const FormItem = Form.Item;

class LoginComponent extends React.Component<any, any> {

    public constructor(props: any) {
        super(props)

        this.state = {
            spinning: false
        }
    }

    public componentDidMount() {
        this.count()
    }

    public componentDidCatch(e: any) {
        window.console.log(e)
    }

    public handleSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                window.console.log('Received values of form: ', values);
            }

            const form = new FormData()
            form.append("username", values.username)
            form.append("password", values.password)

            const request = new Request(`http://${API_HOST}/api/v1/auth/login`, {
                body: form,
                credentials: "include",
                method: 'post',
                mode: "cors"
            })

            this.login(request)
        });
    }

    public async count()  {
        const request = new Request(`http://${API_HOST}/api/v1/admin/count`, {
            cache: "no-cache",
            credentials: "include",
            method: 'GET',
            mode: 'cors',
            redirect: "error"
        })

        const json = iRequest(request)

        window.console.log(json)
    }

    public async login(request: Request) {

        this.setState({ spinning: true })
        const response = await fetch(request)
        const json =  await response.json()

        this.setState({ spinning: false })

        if (json.code === 200) {
            notification.success({
                description: "登录成功",
                message: "登录成功",
            })
        } else {
            notification.error({
                description: json.reason,
                message: "登录失败",
            })

            return
        }


    }

    public render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-container'>
                <Content className='login-content'>
                    <Spin spinning={ this.state.spinning } tip="正在登录，请稍候">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!' }],
                                })(
                                    <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!' }],
                                })(
                                    <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Content>
                <FooterComponent />
            </div>
        );
    }

}


export default Form.create()(LoginComponent);