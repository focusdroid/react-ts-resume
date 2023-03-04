import {FC, useState} from "react";
import { Upload,  Button, Radio, Form, Input} from 'antd';
import {CloseOutlined} from '@ant-design/icons'
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import style from './user.module.css'
import {addUserInfo} from "../../api";


const User:FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imgUrl, setImageUrl] = useState<string>()
    const [iconStatus, setIconStatus] = useState<boolean>(false)
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log(newFileList)
        const fileurl = newFileList[0]?.response
        setImageUrl(fileurl)
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    return <div className={style.userbox}>
        <div className={style.img}>
            {
                imgUrl ? <div>
                        <img onMouseEnter={mouseImage} onMouseOut={mouseoutimg} className={style.imgUrl} src={imgUrl} alt=""/>
                        {iconStatus ? <div className={style.closeout}>
                           <CloseOutlined onMouseEnter={mouseImage} style={{position: 'absolute', zIndex: 100}} onClick={resetImage} />
                        </div>: null }
                    </div> :
                <ImgCrop rotate>
                <Upload
                action="/upload"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                >
            {fileList.length < 1 && '上传图像'}
                </Upload>
                </ImgCrop>
            }
        </div>
        <Form
            name="basic"
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="姓名"
                name="name"
            >
                <Input maxLength={20}/>
            </Form.Item>
            <Form.Item
                label="昵称"
                name="nick_name"
            >
                <Input maxLength={20} />
            </Form.Item>
            <Form.Item
                label="手机"
                name="phone"
            >
                <Input maxLength={11}/>
            </Form.Item>

            <Form.Item label="性别" name="gender">
                <Radio.Group>
                    <Radio value="M"> 男 </Radio>
                    <Radio value="F"> 女 </Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    </div>
    function mouseImage () {
        console.log("进入")
        setIconStatus(true)
    }
    function mouseoutimg () {
        console.log("离开")
        setIconStatus(false)
    }
    function resetImage () {
        setImageUrl('')
        setFileList([])
    }
    function onFinish(values: any) {
        console.log('Success:', values);
        const obj = Object.assign(values, { avatar_url: imgUrl })
        addUserInfo(obj).then((res:any) => {
            console.log(res)
        })
    };

    function onFinishFailed(errorInfo: any) {
        console.log('Failed:', errorInfo);
    };
}

export default User
