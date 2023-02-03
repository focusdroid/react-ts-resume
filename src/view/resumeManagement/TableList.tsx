import React, {FC, useState} from "react";
import { levelField } from "../../utils/types"
import {Button, Card, Row, Col, Drawer, message, Popconfirm, Table, Tag} from 'antd'
import {ResponseParam, ResumeObj, searchField} from "../../utils/type";
import {deleteResume, detail, modifyMain} from "../../api";
import styles from './resume.module.css'
interface IProps {
    list: any,
    freshSource: (values: searchField) => searchField | null | undefined | void
}

/*interface ColumnType {
    title: string
    dataIndex: string
    key: Key
    width: number
    fixed?: string | boolean
}*/


const TableList:FC<IProps> = (props) =>{
    const [open, setOpen] = useState<boolean>(false);
    const [resumeDetail, setResumeDetail] = useState<ResumeObj>()
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left' as 'left',
            width: 180,
            render: (text:any, record:ResumeObj, _:any) => <div>
                <span onClick={() => getCurrentDetail(record)}>{text}</span>
                {record.follow ? <Tag style={{marginLeft: 10}} color="#87d068">
                    重点关注
                </Tag> : ""}
                <Drawer width={800} title={`${resumeDetail?.name} 简历详情  / 当前年月日: ${new Date().toLocaleDateString().replaceAll("/", "-")}`} placement="right" onClose={onClose} open={open}>
                    <Card>
                        <Row gutter={[16, 16]}>
                            <Col span={8}><span className={styles.fontStyle}>姓名: {resumeDetail?.name}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>性别: {resumeDetail?.gender}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>级别: {getLevelField(resumeDetail?.level, resumeDetail?.jobbed)}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>邮箱: {resumeDetail?.email}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>电话: {resumeDetail?.phone}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>工作年限: {resumeDetail?.jobbed_year}年</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>是否重点关注: {!resumeDetail?.follow? <Tag style={{marginLeft: 10}} color="#87d068">
                                重点关注
                            </Tag> : ""}</span></Col>
                        </Row>
                    </Card>
                    <Card style={{marginTop: 10}}>
                        <Row gutter={[16, 16]}>
                            <Col span={8}><span className={styles.fontStyle}>目标公司: {resumeDetail?.target_company}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>入职负责人: {resumeDetail?.person_charge}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>几号入职: {resumeDetail?.time_induction}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>岗位工资: {resumeDetail?.post_salary}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>入职意向: {resumeDetail?.employment_intention}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>首次联系时间: {resumeDetail?.first_contact_time}</span></Col>
                            <Col span={8}><span className={styles.fontStyle}>备注信息: {resumeDetail?.remarks}</span></Col>
                        </Row>
                    </Card>
                    <Button style={{marginTop: 10}} type="primary">在线查看简历</Button>
                </Drawer>
            </div>
        },
        {
            title: '岗位/级别',
            dataIndex: 'level',
            key: 'level',
            render: (text:string, record:ResumeObj,a:any) => getLevelField(record.level, record.jobbed)
        },
        {
            title: '手机号',
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
            width: 100,
            render: (text:string, record:ResumeObj,_:any) => <span>
                {text === 'M' ? '男' : '女'}
            </span>
        },
        {
            title: '岗位目标公司',
            dataIndex: 'target_company',
            key: 'target_company',
            width: 160,
            render: (text:string, record:ResumeObj,a:any) => <span>
                {text}
            </span>
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
            dataIndex: 'action',
            key: 'action',
            fixed: 'right' as 'right',
            width: 100,
            render: (_: any, record: ResumeObj) => <div style={{ display: "flex",
                flexDirection: "column",
                alignItems: "center"}}>
                {!record.follow ? <Button size="small" type="primary" onClick={() => changeFollow(record, "1")}>关注</Button> : <Button size="small" onClick={() => changeFollow(record, '0')}>取消关注</Button> }
                <Popconfirm
                    title="确认删除？"
                    onConfirm={() => deleteConfirm(record)}
                    okText="删除"
                    cancelText="取消"
                >
                    <Button size="small" style={{marginTop: 4}} danger type="primary">删除</Button>
                </Popconfirm>
            </div>
        },
    ];
    function getLevelField(level: string | undefined, jobbed: string | undefined) {
        return `${levelField.get(level as string)} ${jobbed}`
    }
    const {list, freshSource} = props
    return <Table
        rowKey={(record:any)=> record.id}
        bordered
        scroll={{ x: 1800 }}
        dataSource={list}
        columns={columns} />
    function changeFollow (record: ResumeObj, status:string) { // 关注/取消关注
        console.log(record)
        modifyMain({
            id: record?.id,
            status,
        }).then((res:any) => {
            const { code } = res
            if (code === '200') {
                message.success(res.message)
                freshRequest()
            } else if (code === '-1') {
                message.error(res.message)
            }
        })
    }
    function deleteConfirm (ele: ResumeObj) {
        // console.log(e);
        deleteResume({id: ele?.id}).then(res => {
            if (res?.code === '200') {
                message.success(res.message)
                freshRequest()
            } else {
                message.error(res.message)
            }
        })
    }
    function getCurrentDetail (record: ResumeObj) { // 获取用户详情
        console.log(record, record.id)
        detail({id: record?.id}).then((res: ResponseParam) => {
            console.log(res)
            if (res.code === "200") {
                setResumeDetail(res.data as ResumeObj)
                setOpen(true);
                console.log("----", resumeDetail)
            }
        })
    }
    function onClose () {
        setOpen(false);
    }
    function freshRequest () {
        freshSource({name: '', email: ''})
    }
}

export default TableList