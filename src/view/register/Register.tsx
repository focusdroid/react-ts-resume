import {FC, useEffect, useState} from "react";
import {Button, Card, Form, Input, message} from 'antd';
import style from '../login/login.module.css'
import {RegisterRequest, SendEmail} from '../../api'
import { useNavigate } from "react-router-dom";
const Register: FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>()
    const [messageApi, contextHolder] = message.useMessage();
    const [text, setText] = useState<string>()
    const [disabled, setDisabled] = useState<boolean>(false)
    useEffect(() => {
        setText("获取验证码")
    }, [])
    return <div className={style.loginBox}>
        {contextHolder}
        <Card style={{width: 500, height: 360}}>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: '请输入邮箱' }]}
                >
                    <Input onChange={(e) => setEmail(e.target.value.trim())} />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                {<Form.Item
                    label="确认密码"
                    name="password2"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password style={{width: 300}} />
                </Form.Item>}
                <Form.Item
                    label="获取验证码"
                >
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Form.Item name="code"><Input style={{width: 180}} /></Form.Item>
                        <Button style={{width: 102}} disabled={disabled}  onClick={countDown}>{text}</Button>
                    </div>
                    <div style={{textAlign: 'end', padding: '10px 0'}}>已有账号，<span onClick={goLogin} style={{color: "#0a43fe", cursor: "pointer"}}>去登录</span></div>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" block size="large">注册</Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
    function onFinish (values:any) {
        if (values.password !== values.password2) {
            messageApi.open({
                type: 'warning',
                content: "两次密码输入不一致",
            });
            return
        }
        RegisterRequest(values).then((res:any) => {
            const { code, message } = res
            if (code === "200") {
                navigate("/login", {replace: true})
            } else {
                messageApi.open({
                    type: 'warning',
                    content: message,
                });
            }
        })
    };
    function onFinishFailed (errorInfo: any) {
        console.log('Failed:', errorInfo);
    };
    function countDown () { // 倒计时的计算还可以使用获取时间戳来准确
        const myreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (!myreg.test(email as string)) {
            messageApi.open({
                type: 'warning',
                content: "邮箱格式不符合",
            });
            return
        }
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
        sendEmailCode()
    }
    function sendEmailCode() {
        SendEmail({email}).then(res => {
            console.log(res)
            if (res.code === "200") {
                message.warning("验证码已发送")
            }
        })
    }
    function goLogin () {
        navigate("/login")
    }
}

export default Register
