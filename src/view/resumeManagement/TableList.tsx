import React, {FC} from "react";
import {ColumnsType } from "antd/es/table"
import {Button, Space, Table} from 'antd'
import {ResumeObj} from "../../utils/type";
// import {ResumeList} from "../../utils/type";
interface IProps {
    list: any
}

interface ColumnType {
    title: string
    dataIndex: string
    key: React.Key
    width: number
    fixed?: string | boolean
}

const columns:ColumnsType<ColumnType> = [
    {
        title: '序号',
        width: 50
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        render: (text, record,_) => <a onClick={() => getCurrentDetail(record)}>{text}</a>,
    },
    {
        title: '岗位/级别',
        dataIndex: 'level',
        key: 'level',
        width: 100
    },
    {
        title: '邮箱',
        dataIndex: 'phone',
        key: 'phone',
        width: 100
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 100
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        width: 100
    },
    {
        title: '岗位目标公司',
        dataIndex: 'target_company',
        key: 'target_company',
        width: 120
    },
    {
        title: '首次联系时间',
        dataIndex: 'first_contact_time',
        key: 'first_contact_time',
        width: 120
    },
    {
        title: '入职意向',
        dataIndex: 'employment_intention',
        key: 'employment_intention',
        width: 100
    },
    {
        title: '是否确认入职',
        dataIndex: 'confirm_enrollment',
        key: 'confirm_enrollment',
        width: 120
    },
    {
        title: '岗位工资',
        dataIndex: 'post_salary',
        key: 'post_salary',
        width: 100
    },
    {
        title: '最后确认工资',
        dataIndex: 'post_salary',
        key: 'post_salary',
        width: 150
    },
    {
        title: '入职时间',
        dataIndex: 'time_induction',
        key: 'time_induction',
        width: 100
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right' as 'right',
        width: 80,
        render: (_, record) => <div style={{ display: "flex",
                flexDirection: "column",
                alignItems: "center"}}>
                <Button onClick={() => changeFollow(record)} size="small" style={{marginTop: 10}}>关注</Button>
                <Button onClick={() => deleteCurrent(record)} size="small" style={{marginTop: 10}} danger type="primary">删除</Button>
            </div>
    },
];
const getCurrentDetail = (record:ColumnType) => { // 获取用户详情
    console.log(record)
}
const changeFollow = (record: ColumnType) => { // 关注/取消关注
    console.log(record)
}
const deleteCurrent = (record:ColumnType) => { // 删除用户
    console.log(record)
}
const TableList:FC<IProps> = (props) =>{
    const {list} = props
    return <Table
            rowKey={(record:any)=> record.id}
            bordered
            scroll={{ x: true }}
            dataSource={list}
            columns={columns} />
}

export default TableList