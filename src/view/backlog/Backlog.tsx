import {Card, Button, Row, Col, Table, Space} from 'antd';
import style from './backlog.module.css'
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];
const columns = [
    {
        title: '序号',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '姓名',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '岗位/级别',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '性别',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '岗位目标公司',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '首次联系时间',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '入职意向',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '是否确认入职',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '岗位工资',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '最后确认工资',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '入职时间',
        dataIndex: 'age',
        key: 'age',
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
            <Table bordered dataSource={dataSource} columns={columns} />
        </Card>
    </div>
}

export default Backlog
