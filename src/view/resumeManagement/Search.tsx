import React, {FC, memo, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Card, Row,Col } from 'antd';
import {searchField} from "../../utils/type";
interface IProps {
    getAllResumeSource: (values: searchField) => searchField | null | undefined | void | Object
    // getAllResumeSource: (url: string, params:any) => searchField | null | undefined | void | Object
}
const Search: FC<IProps> = (props:IProps, _:any) => {
    const navigate = useNavigate()
    const {getAllResumeSource} = props
    const [form] = Form.useForm();
    return <Card title={<div style={{display: 'flex', justifyContent: "space-between"}}>
        <div>简历管理</div>
        <Button type="primary" onClick={addResume}>添加简历</Button>
    </div>} style={{width: "100%", height: 200}}>
        <Form
            layout="inline"
            form={form}
            initialValues={{name:"", email:""}}
            onFinish={onFinish}
        >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col>
                    <Form.Item label="姓名" name="name">
                        <Input allowClear />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item label="邮箱" name="email">
                        <Input allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Item>
                        <Button onClick={reset}>重置</Button>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Card>;
    function reset (){
        form.resetFields();
        getAllResumeSource({name: '', email: ''})
    }
    function onFinish (values: searchField) {
        getAllResumeSource(values)
    }
    function addResume () {
        navigate("/addResume")
    }
}

export default memo(Search)
