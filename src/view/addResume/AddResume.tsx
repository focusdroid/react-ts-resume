import {useEffect, useRef, useState} from "react";
import GoBack from '../../components/goBack/GoBack'
import {
    Card,
    Row,
    Col,
    Form,
    Input,
    Button,
    DatePicker,
    Select,
    Upload,
    UploadProps,
    message,
    FormInstance, Radio
} from "antd";
import style from './addresume.module.css'
import {addResume, detail, updateResumeInfo} from "../../api";
import {ResponseDetailParam, ResponseParam, ResumeObj} from "../../utils/type";
import UplaodPreview from "./UplaodPreview";
import { useLocation } from 'react-router-dom'
import DetailDrawer from "../../plugins/DetailDrawer/DetailDrawer";

interface UserInfoIprops {
    formRef: any
}

const UserInfo = (props: UserInfoIprops) =>{
    const [userInfo, setUserInfo] = useState<ResumeObj>()
    const [open, setOpen] = useState<boolean>(false)
    return <div style={{display: 'flex', justifyContent: "space-between"}}>
        <div>个人信息</div>
        <div><Button onClick={userInfoPriview}>预览简历</Button></div>
        <DetailDrawer resumeDetail={userInfo} open={open} closePriviewNotes={() => setOpen(false)}/>
    </div>
    function userInfoPriview (){
        const obj = props?.formRef.current?.getFieldsValue()
        setUserInfo(obj)
        setOpen(true)
    }
}
const AddResume = () => {
    let [resumeUrl, setResumeUrl] = useState<string | undefined>('')
    const [form] = Form.useForm();
    const location = useLocation()
    // 编辑获取详情页面start
    useEffect(() =>{
        const { state } = location
        if (state) {
            detail({id: state.id}).then((res: ResponseDetailParam) => {
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
        if (!resumeUrl) {
            message.warning("请上传简历或确定简历上传成功!")
            return
        }
        if (location?.state?.id) { // updateResumeInfo
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
    const formRef = useRef<FormInstance>(null);
    return <div style={{width: "100%"}}>
        <GoBack/>
        <div style={{padding: 10, display: 'flex'}}>
            {/*左侧视图start*/}
            <div className={style.card}>
                <Card title={<UserInfo formRef={formRef}/>}>
                    <Form
                        form={form}
                        name="basic"
                        ref={formRef}
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
                                    <Radio.Group>
                                        <Radio value="M"> 男 </Radio>
                                        <Radio value="F"> 女 </Radio>
                                    </Radio.Group>
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
