import {Button, Card, Checkbox, Form, Input, message} from 'antd';
import style from './login.module.css'
import { user } from '../../utils/type'
import { LoginReuqest } from '../../api'
import { useNavigate } from "react-router-dom";
import { baseUrl } from '../../api/index'
import Requests from '../../api/fetch'
import useSWR from "swr";
const Login = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    return <div className={style.loginBox}>
        {contextHolder}
        <Card style={{width: 500, height: 260}}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <div style={{textAlign: 'end', padding: '10px 0'}}>没有账号，<span onClick={goRegister} style={{color: "#0a43fe", cursor: "pointer"}}>去注册</span></div>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" block size="large">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
    function onFinish (values: user) {
        /*console.log(values)
        const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
        let data = useSWR(`${baseUrl}/login`, (url) => fetcher(url))
        console.log(data)*/
        LoginReuqest(values).then((res:any) => {
            const { code, message, token } = res
            if (code === "200") {
                localStorage.token = token
                return code
            } else {
                messageApi.open({
                    type: 'warning',
                    content: message,
                });
            }
        }).then((code: string) => {
            if (code === "200") {
                navigate("/", {replace: true})
            }
        })
    };
    function onFinishFailed (errorInfo: any) {
        console.log('Failed:', errorInfo.trim);
    };
    function goRegister () {
        navigate("/register")
    }
}

export default Login