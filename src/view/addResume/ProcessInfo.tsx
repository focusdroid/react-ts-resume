import {memo} from "react";
import style from "./addresume.module.css";
import {Button, Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import any = jasmine.any;

const UserInfo = () =>{
    return <div style={{display: 'flex', justifyContent: "space-between"}}>
        <div>个人信息</div>
        <div><Button>预览简历</Button></div>
    </div>
}
interface IProps{
    onFinish: (values: any) => void,
    onFinishFailed: (errorInfo: any) => void,
}

const ProcessInfo = (props:IProps, _:any) => {
    const [form] = Form.useForm();
    return <div className={style.card}>
        <Card title={<UserInfo/>}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={props.onFinish}
                onFinishFailed={props.onFinishFailed}
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
}
export default memo(ProcessInfo)