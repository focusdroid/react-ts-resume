import { useEffect, useState} from "react";
import GoBack from '../../components/goBack/GoBack'
import {Card, Row, Col, Form, Input, Button, DatePicker, Select, Upload, UploadProps, message} from "antd";
import style from './addresume.module.css'
import {addResume, detail, updateResumeInfo} from "../../api";
import {ResponseDetailParam, ResponseParam, ResumeObj} from "../../utils/type";
import UplaodPreview from "./UplaodPreview";
import { useLocation } from 'react-router-dom'
const UserInfo = () =>{
    return <div style={{display: 'flex', justifyContent: "space-between"}}>
        <div>个人信息</div>
        <div><Button>预览简历</Button></div>
    </div>
}
const AddResume = () => {
    let [resumeUrl, setResumeUrl] = useState<string | undefined>('')
    const [form] = Form.useForm();
    const location = useLocation()
    console.log(location, location.state)
    // 编辑获取详情页面start
    useEffect(() =>{
        const { state } = location
        if (state) {
            detail({id: state.id}).then((res: ResponseDetailParam) => {
                console.log(res)
                const {code, data} = res
                if (code === '200') {
                    const { resume_url } = data as ResumeObj
                    form.setFieldsValue(data)
                    setResumeUrl(resume_url)
                }
            })
        }

    }, [])
    // 编辑获取详情页面end

    const onFinish = (values: any) => {
        console.log('Success:', values);
        if (!resumeUrl) {
            message.warning("请上传简历或确定简历上传成功!")
            return
        }
        if (location.state.id) { // updateResumeInfo
            console.log(location.state.id)
            updateResumeInfo(Object.assign(values, {id: location.state.id.toString(), resumeUrl: resumeUrl})).then((res: ResponseParam) => {
                const {code} = res
                if (code === '200') {
                    message.success(res.message)
                } else {
                    message.warning(res.message)
                }
            })
        } else {
            addResume(Object.assign(values, {resumeUrl: resumeUrl})).then((res: ResponseParam) => {
                console.log(res)
                const {code} = res
                if (code === '200') {
                    message.success(res.message)
                    form.resetFields();
                    setResumeUrl('')
                } else {
                    message.warning(res.message)
                }
            })
        }

    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return <div style={{width: "100%"}}>
        <GoBack/>
        <div style={{padding: 10, display: 'flex'}}>
            {/*左侧视图start*/}
            <div className={style.card}>
                <Card title={<UserInfo/>}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row gutter={16}>
                            <Col span={22}>
                                <Form.Item
                                    label="姓名"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="性别"
                                    name="gender"
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                    >
                                        <Select.Option value="M">男</Select.Option>
                                        <Select.Option value="F">女</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="手机号"
                                    name="phone"
                                    rules={[{ required: true, message: '请输入手机号！' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="邮箱"
                                    name="email"
                                    rules={[{ required: true, message: '请输入邮箱!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="入职意向"
                                    name="username"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="是否确认入职"
                                    name="confirmEnrollment"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="技术岗位"
                                    name="jobbed"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="级别"
                                    name="level"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="目标公司"
                                    name="targetCompany"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="薪资"
                                    name="postSalary"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="入职时间"
                                    name="timeInduction"
                                >
                                    <DatePicker placeholder="请选择入职时间" style={{width: "100%"}} />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="首次联系时间"
                                    name="firstContactTime"
                                >
                                    <DatePicker placeholder="请选择首次联系时间" style={{width: "100%"}} />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="入职负责人"
                                    name="personCharge"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="备注"
                                    name="remarks"
                                >
                                    <Input.TextArea />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
                                    <Button onClick={() => form.resetFields()}>
                                        重置
                                    </Button>
                                    <Button style={{marginLeft: 10}} type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
            {/*左侧视图end*/}
            {/*右侧视图start*/}
            <UplaodPreview resumeUrl={resumeUrl} setResumeUrl={setChangeResumeUrl}/>
            {/*右侧视图end*/}
        </div>
    </div>
    function setChangeResumeUrl(url:string){
        setResumeUrl(url)
    }
}

export default AddResume