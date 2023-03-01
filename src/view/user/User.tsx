import {ChangeEvent, FC, useState} from "react";
import {Input, Row, Col, Radio, Button} from 'antd'
import type { RadioChangeEvent } from 'antd';
import style from './user.module.css'
const User:FC = () => {
    const [name, setName] = useState<string>();
    const [nickname, setNickName] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [gender, setGender] = useState<string>();
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setGender(e.target.value);
    };
    return <div className={style.userbox}>
        <Row>
            <Col span={20}>
                <div>img</div>
            </Col>
            <Col span={20} className={`${style.disflex} ${style.aligncenter}`}>
                <Input
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setName(e.target.value.trim())}
                    className={`${style.inputwidth} ${style.mt20}`}
                    addonBefore="姓名" />
            </Col>
            <Col span={20} className={`${style.disflex} ${style.aligncenter}`}>
                <Input
                    value={nickname}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setNickName(e.target.value.trim())}
                    className={`${style.inputwidth} ${style.mt20}`}
                    addonBefore="昵称" />
            </Col>
            <Col span={20} className={`${style.disflex} ${style.aligncenter}`}>
                <Input
                    value={phone}
                    maxLength={11}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setPhone(e.target.value.trim())}
                    className={`${style.inputwidth} ${style.mt20}`}
                    addonBefore="手机号" />
            </Col>
            <Col span={20} className={`${style.disflex} ${style.aligncenter}`}>
                <span>性别</span>
                <Radio.Group className={`${style.inputwidth} ${style.mt20}`} onChange={onChange} value={gender}>
                    <Radio value="M">男</Radio>
                    <Radio value="F">女</Radio>
                </Radio.Group>
            </Col>
            <Col span={20} className={`${style.disflex} ${style.aligncenter}`}>
                <Button onClick={submit}>提交</Button>
            </Col>
        </Row>
    </div>
    function submit () {
        const obj = {
            name,
            gender,
            phone,
            nickname
        }
        console.log(obj)
    }
}

export default User
