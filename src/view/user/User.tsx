import {FC, useEffect, useState} from "react";
import {Upload, Button, Radio, Form, Input, Row, Col, message} from 'antd';
import {CloseOutlined} from '@ant-design/icons'
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import style from './user.module.css'
import {addUserInfo, getUserInfo} from "../../api";
import {PartialUserInfo, UserInfo, UserInfoResponse} from "../../utils/type";
const User:FC = () => {
    const [user, setUser] = useState<UserInfo>()
    const [isEdit, setIsEdit]= useState<boolean>(false)
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imgUrl, setImageUrl] = useState<string>() // img链接单独设置
    const [iconStatus, setIconStatus] = useState<boolean>(false) // 删除图像的图标
    const [form] = Form.useForm();
    useEffect(() => {
        getUserInfoFn()
    }, [])
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
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
    }
    return <div className={style.userbox}>
        {!isEdit ? <div className={style.img}>{ user?.avatar_url ? <img className={style.imgUrl} src={user?.avatar_url} alt=""/> : null } </div> : <div className={style.img}>
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
        </div> }
        <div>
            <Form
                name="basic"
                form={form}
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
                    {isEdit ? <Input maxLength={20}/> : <span>{user?.name}</span> }
                </Form.Item>
                <Form.Item
                    label="昵称"
                    name="nick_name"
                >
                    {isEdit ? <Input maxLength={20}/> : <span>{user?.nick_name}</span> }
                </Form.Item>
                <Form.Item
                    label="手机"
                    name="phone"
                    rules={[
                        {pattern: new RegExp(/^1[345789]{1}\d{9}$/, 'g')}
                    ]}
                >
                    {isEdit ? <Input maxLength={11}/> : <span>{user?.phone}</span> }
                </Form.Item>

                <Form.Item label="性别" name="gender">
                    {isEdit ? <Radio.Group disabled={!isEdit}>
                        <Radio value="M"> 男 </Radio>
                        <Radio value="F"> 女 </Radio>
                    </Radio.Group> : <span>{user?.gender === "F" ? "女" : user?.gender === "M" ? "男" : ""}</span> }
                </Form.Item>
                {!isEdit ? <Form.Item label="邮箱" name="gender"> <span>{user?.email}</span>
                </Form.Item> : null}

                <Form.Item wrapperCol={{ span: 18 }}>
                    {isEdit ? <Button size="large" block type="primary" htmlType="submit">
                        提交
                    </Button> : null }

                </Form.Item>
            </Form>
            {!isEdit ? <Row>
                <Col span={18}><Button onClick={editUserInfo} size="large" block>
                    编辑
                </Button></Col>
            </Row> : null}
        </div>
    </div>
    function mouseImage () {
        setIconStatus(true)
    }
    function mouseoutimg () {
        setIconStatus(false)
    }
    function resetImage () {
        setImageUrl('')
        setFileList([])
    }
    function editUserInfo () { // 编辑逻辑
        setIsEdit(true)
        getUserInfoFn(true)
    }
    function onFinish(values: PartialUserInfo<UserInfo>) { // 修改用户信息
        const obj = Object.assign(values, { avatar_url: imgUrl })
        addUserInfo(obj).then((res:any) => {
            if (res.code === "200") {
                setIsEdit(false)
                getUserInfoFn()
            } else if (res.code === "-1") {
                message.warning(res.message)
            }
        })
    }
    function getUserInfoFn (status:boolean = false) { // 获取用户信息
        getUserInfo().then((res:UserInfoResponse) => {
            const { code, data } = res
            if (code === '200') {
                setUser(data)
                if (status) {
                    console.log(data)
                    form.setFieldsValue(data)
                }
            } else if (res.code === "-1") {
                message.warning(res.message)
            }
        })
    }
    function onFinishFailed(errorInfo: any) {
        console.log('Failed:', errorInfo);
    }
}
export default User
