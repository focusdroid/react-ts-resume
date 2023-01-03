import {FC} from "react";
import {Button, Space, Table} from 'antd'
// import {ResumeList} from "../../utils/type";
interface IProps {
    list: any
}

const columns = [
    {
        title: '序号',
        width: 50
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 100
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
        width: 150
    },
    {
        title: '首次联系时间',
        dataIndex: 'first_contact_time',
        key: 'first_contact_time',
        width: 150
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
        width: 150
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
        key: 'action',
        width: 100,
        render: () => (
            <div style={{    display: "flex",
                flexDirection: "column",
                width: 120,
                alignItems: "center"}}>
                <Button>取消重点关注</Button>
                <Button danger type="primary">删除</Button>
                <Button type="primary">详情</Button>
            </div>
        )
    },
];
const TableList:FC<IProps> = (props) =>{
    const {list} = props
    return <div style={{marginTop: 10}}>
        <Table
            rowKey={(record:any)=> record.key}
            bordered
            dataSource={list}
            columns={columns} />
    </div>
}

export default TableList