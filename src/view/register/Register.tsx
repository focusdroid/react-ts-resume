import {FC, useEffect, useState} from "react";
import {Button, Card, Checkbox, Form, Input, message} from 'antd';
import style from '../login/login.module.css'
import { user } from '../../utils/type'
import { RegisterRequest} from '../../api'
import { useNavigate } from "react-router-dom";
const Register: FC = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [text, setText] = useState<string>()
    const [disabled, setDisabled] = useState<boolean>(false)
    useEffect(() => {
        setText("获取验证码")
    }, ['123'])
    return <div className={style.loginBox}>
        {contextHolder}
        <Card style={{width: 500, height: 360}}>
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
                    rules={[{ required: true, message: '请输入邮箱' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="确认密码"
                    name="password2"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password style={{width: 300}} />
                </Form.Item>
                <Form.Item
                    label="获取验证码"
                    name="code"
                    rules={[{ required: true, message: '请输入验证码' }]}
                >
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Input style={{width: 180}} />
                        <Button style={{width: 102}} disabled={disabled}  onClick={countDown}>{text}</Button>
                    </div>
                    <div style={{textAlign: 'end', padding: '10px 0'}}>已有账号，<span onClick={goLogin} style={{color: "#0a43fe", cursor: "pointer"}}>去登录</span></div>
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" block size="large">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
    function onFinish (values: user) {
        RegisterRequest(values).then((res:any) => {
            const { code, message, token } = res
            if (code === "200") {
                localStorage.token = token
                navigate("/", {replace: true})
            } else {
                messageApi.open({
                    type: 'warning',
                    content: message,
                });
            }
        })
    };
    function onFinishFailed (errorInfo: any) {
        console.log('Failed:', errorInfo.trim);
    };
    function countDown () { // 倒计时的计算还可以使用获取时间戳来准确
        let timer: string | number | NodeJS.Timer | undefined
        setDisabled(true)
        if (timer) {
            return
        }
        let time = 60
        timer = setInterval(() => {
            if (time > 0) {
                time--
                let content = `${time}s`
                setText(content)
            } else {
                clearInterval(timer)
                setDisabled(false)
                setText("获取验证码")
            }
        }, 1000)
    }
    function goLogin () {
        navigate("/login")
    }
}

export default Register