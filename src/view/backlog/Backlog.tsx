import {Card, Button, Row, Col, Table, Space} from 'antd';
import style from './backlog.module.css'
import {useEffect, useState} from "react";
import {GetMainResumeList} from "../../api";
import {ResponseParam} from "../../utils/type";
const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '岗位/级别',
        dataIndex: 'level',
        key: 'level',
    },
    {
        title: '邮箱',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: '岗位目标公司',
        dataIndex: 'target_company',
        key: 'target_company',
    },
    {
        title: '首次联系时间',
        dataIndex: 'first_contact_time',
        key: 'first_contact_time',
    },
    {
        title: '入职意向',
        dataIndex: 'employment_intention',
        key: 'employment_intention',
    },
    {
        title: '是否确认入职',
        dataIndex: 'confirm_enrollment',
        key: 'confirm_enrollment',
    },
    {
        title: '岗位工资',
        dataIndex: 'post_salary',
        key: 'post_salary',
    },
    {
        title: '最后确认工资',
        dataIndex: 'post_salary',
        key: 'post_salary',
    },
    {
        title: '入职时间',
        dataIndex: 'time_induction',
        key: 'time_induction',
    },
    {
        title: '操作',
        key: 'action',
        render: () => (
            <Space size="middle">
                <Button>取消重点关注</Button>
                <Button danger type="primary">删除</Button>
                <Button type="primary">详情</Button>
            </Space>
        )
    },
];
const Backlog = () => {
    const [lists, setResumeList] = useState<any>()
    useEffect(() =>{
        getMainResumeList()
    }, ["1"])
    // @ts-ignore
    return <div className={style.backlogview}>
        <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={12}>
                <Card size="small" title="今日待办" extra={<Button type="text">编辑</Button>} className={style.cardstyle}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} >
                <Card size="small" title="工作便签" extra={<Button type="text">编辑</Button>} className={style.cardstyle}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
        </Row>
        <div></div>
        <Card title="重点关注人群" style={{padding: 0}}>
            <Table bordered dataSource={lists} columns={columns}/>
        </Card>
    </div>
    function getMainResumeList () {
        GetMainResumeList().then((res:ResponseParam) => {
            const { code, data } = res
            if (code === "200") {
                setResumeList(data.data)
                console.log(lists)
            }
        })

    }
}

export default Backlog
