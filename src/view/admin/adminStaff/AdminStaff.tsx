import React, {memo, FC, useState, useEffect} from 'react'
import {Button, Card, Col, Form, Input, Row, Table, Pagination} from "antd";
import style from './admin.module.css'
import { searchField, UserInfo} from "../../../utils/type";
import {getUsersList} from "../../../api";
const dayjs = require('dayjs')
interface IPropsPage {
    page: number
    pageSize: number
}
const AdminStaff:FC = memo(() => {
    const [userList, setUserList] = useState<UserInfo[]>([])
    const [page, setPage] = useState<IPropsPage>({page: 1, pageSize: 10})
    const [total, setTotal] = useState<number>(0)
    const [form] = Form.useForm();
    useEffect(() => {
        searchUserList()
    }, [])
    const columns = [
        {
            title: '昵称/姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text:any, record:any, _:any) => {
                return <div>
                    <span>{record.nick_name}</span><span>({record.name})</span>
                </div>
            }
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            render: (text:any, record:any, _:any) => {
                return <span>{text === 'M' ? '男' : '女'}</span>
            }
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '用户创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text:any, record:any, _:any) => {
                return <span>{dayjs(record?.created_at).format("YYYY-MM-DD HH:mm:ss")}</span>
            }
        },
    ];
    return <div className={style.userbox}>
        <Card>
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
        </Card>
        <Card title="查询结果">
            <Table
                rowKey={(record:any)=> record.id}
                bordered
                dataSource={userList}
                pagination={false}
                columns={columns} />
            <Row>
                <Col offset={16} style={{marginTop: 10}}>
                    <Pagination
                        showSizeChanger
                        onChange={onShowSizeChange}
                        onShowSizeChange={onShowSizeChange}
                        current={page.page}
                        defaultCurrent={page.page}
                        total={total}
                    />
                </Col>
            </Row>
        </Card>
    </div>
    function reset (){
        form.resetFields();
    }
    function onFinish (values: searchField) {
        console.log(values)
        searchUserList(values)
    }
    function searchUserList (values = {}) {
        getUsersList(Object.assign(page, values)).then((res: any) => {
            const { code, data } = res
            if (code === '200') {
                setUserList(data.data)
                const { currentPage, pageSize, total } = data
                page.page = currentPage
                page.pageSize = pageSize
                setPage(page)
                setTotal(total)
            }
        })
    }
    function onShowSizeChange (current:number, pageSize: number) {
        page.page = current
        page.pageSize = pageSize
        setPage(page)
        searchUserList()
    };
})

export default AdminStaff
