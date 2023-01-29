import React, {FC, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Card, Row,Col } from 'antd';
import {searchField} from "../../utils/type";
interface IProps {
    getAllResumeSource: (values: searchField) => searchField | null | undefined | void | Object
}
const Search: FC<IProps> = (props:IProps, _:any) => {
    const navigate = useNavigate()
    const {getAllResumeSource} = props
    const [form] = Form.useForm();
    useEffect(() => {
        getAllResumeSource({name:"", email:""})
    },[])
    return <Card title="简历管理" style={{width: "100%", height: 200}}>
        <Form
            layout="inline"
            form={form}
            initialValues={{name:"", email:""}}
            onFinish={onFinish}
        >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col>
                    <Form.Item label="姓名" name="name">
                        <Input />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item label="邮箱" name="email">
                        <Input />
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
        <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 24 }}>
            <Col span={24}>
                <Button onClick={addResume} style={{margin: "20px 0"}}>添加简历</Button>
            </Col>
        </Row>
    </Card>;
    function reset (){
        form.resetFields();
    }
    function onFinish (values: searchField) {
        getAllResumeSource(values)
    }
    function addResume () {
        navigate("/addResume")
    }
}

export default Search