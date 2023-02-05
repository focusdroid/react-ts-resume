import {FC, useState} from "react";
import GoBack from '../../components/goBack/GoBack'
import {Card, Row, Col, Form, Input, Button, DatePicker, Select, Upload, UploadProps, message} from "antd";
import style from './addresume.module.css'
import { CloudUploadOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import {Document, Page, pdfjs} from "react-pdf";
import {baseUrl} from "../../api";
import {LoadingOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons/lib";

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const UserInfo = () =>{
    return <div style={{display: 'flex', justifyContent: "space-between"}}>
        <div>个人信息</div>
        <div><Button>预览简历</Button></div>
    </div>
}
const uploadProps: UploadProps = {
    name: 'file',
    action: `${baseUrl}/list/upload`,
    headers: {
        authorization: 'authorization-text',
        token: localStorage.token
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cat.net/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const AddResume:FC = () => {
    const [numPages, setNumPages] = useState<number>(1);
    let [pageNumber, setPageNumber] = useState<number>(1);
    let [scale, setScale] = useState<number>(1.2);
    // const [resumeUrl, setResumeUrl] = useState<string>("http://asmie.live:8080/group1/default/20230105/13/47/4/Web前端工程师.pdf?name=Web%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88.pdf")
    const [resumeUrl, setResumeUrl] = useState<string>("http://www.asmie.live:8080/group1/default/20230205/16/38/4/蚂蚁前端面经.pdf")
    return <div style={{width: "100%"}}>
        <GoBack/>
        <div style={{padding: 10, display: 'flex'}}>
            {/*左侧视图start*/}
            <div className={style.card}>
                <Card title={<UserInfo/>}>
                    <Form
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
                                    <Button block size="large" type="primary" htmlType="submit">
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
            <div className={`${style.card} ${style.cardresume}`}>
                <Card title="简历预览">
                    <Upload {...uploadProps}>
                        <Button type="text" icon={<CloudUploadOutlined />}>选择文件上传</Button>
                    </Upload>
                    <div>
                        <Button type="text">
                            {pageNumber}
                        </Button>/
                        <Button type="text">
                            {numPages}
                        </Button>
                        <Button icon={<LeftOutlined />} disabled={pageNumber <= 1} onClick={prevPage}>上一页</Button>
                        <Button icon={<RightOutlined />} disabled={pageNumber >= numPages} onClick={nextPage}>下一页</Button>
                        <Button shape="circle" onClick={() => changeScale('add')} icon={<PlusOutlined />}/>
                        <Button shape="circle" onClick={() => changeScale('reduce')} icon={<MinusOutlined />}/>
                    </div>
                    <Document
                        loading={<div><LoadingOutlined />加载中...</div>}
                        noData={<div>没有数据</div>}
                        file={resumeUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page
                            scale={scale}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            renderMode="canvas"
                            className={style.pagesetting}
                            pageNumber={pageNumber}/>
                    </Document>
                    <div>
                        当前第 {pageNumber}页 共{numPages}页
                    </div>
                </Card>
            </div>
            {/*右侧视图end*/}

        </div>
    </div>
    function onDocumentLoadSuccess({ numPages }:{numPages: any}) { // 获取pdf页面总数
        console.log(`获取第${numPages}页`)
        setNumPages(numPages);
    }
    function changeScale(field: string){
        if (field === 'add'){
            if (scale >= 1.7) {
                return
            } else {
                setScale(scale+=0.1)
            }
        } else if (field === 'reduce') {
            if (scale <= 0.7) {
                return
            } else {
                setScale(scale-=0.1)
            }
        }
    }
    function prevPage (){ // 展示上一页
        if (pageNumber <= 1){
            return
        } else {
            setPageNumber(pageNumber-=1)
        }
    }
    function nextPage () {// 展示下一页
        if (pageNumber > numPages){
            return
        } else {
            setPageNumber(pageNumber+=1)
        }
    }
}

export default AddResume