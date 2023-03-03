import {ChangeEvent, FC, useRef, useState} from "react";
import {Input, Row, Col, Radio, Button} from 'antd'
import type { RadioChangeEvent } from 'antd';
import style from './user.module.css'
const User:FC = () => {
    const [name, setName] = useState<string>();
    const [nickname, setNickName] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [gender, setGender] = useState<string | Blob>();
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setGender(e.target.value);
    };
    const inputref = useRef(null)
    const imgRef = useRef(null)
    const [imgUrl, setImgUrl] = useState<string>()
    return <div className={style.userbox}>
        <Row>
            <Col span={20}>
                <img id="img" ref={imgRef} src={imgUrl} className={style.preview} alt=""/>
                <input onChange={(e) => getFile(e)} ref={inputref} type="file"/>
                <Button onClick={updateImage}>上传图像</Button>
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
    function getFile (e: ChangeEvent<HTMLInputElement> | any) {
        console.log(e, e?.target?.files[0])
        const file = e.target.files[0] // 获取文件
        const reader = new FileReader() // 获取文件流对象
        reader.onload = (e:any) => {
            console.log(e.target.result)
            setImgUrl(e.target.result)
        }
        reader.readAsDataURL(file)
    }
    function updateImage () {
        console.log(imgUrl)
        // var data = new FormData()
        // data.append('file', imgUrl)
        // let bytes = window.atob(imgUrl.split(',')[1])
        // let arrayBuffer = new ArrayBuffer(bytes.length)
        //
        // let intArray = new Uint8Array(arrayBuffer)
        //
        // let blob = new Blob([intArray], {
        //     type: 'application/json'
        // })
        //
        // let file = new File([], data)
        // fetch('/upload', {
        //     method: 'POST',
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     body: data
        // })
    }
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
