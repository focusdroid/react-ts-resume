import React, {FC, Fragment, memo, useState} from "react";
import { useNavigate } from "react-router-dom"
import {Button, message, Popconfirm, Table, Tag} from 'antd'
import {ResponseParam, ResumeObj, searchField} from "../../utils/type";
import {deleteResume, detail, modifyMain} from "../../api";
import {formatTime, getLevelField, loadMF} from "../../utils/common";
import DetailDrawer from "../../plugins/DetailDrawer/DetailDrawer";

interface IProps {
    list?: any,
    freshSource?: (values: searchField) => searchField | null | undefined | void
}

const TableList:FC<IProps> = (props) =>{
    const [resumeDetail, setResumeDetail] = useState<ResumeObj>()
    const navigator = useNavigate()
    const [open, setOpen] = useState<boolean>(false);
    const [drawTileStatus, setdrawTileStatus] = useState<boolean>(false)
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left' as 'left',
            width: 180,
            render: (text:any, record:ResumeObj, _:any) => <div>
                <span style={{color: "blue", cursor: "pointer"}} onClick={() => getCurrentDetail(record)}>{text}</span>
                {record.follow ? <Tag style={{marginLeft: 10}} color="#87d068">重点关注 </Tag> : ""}
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
            width: 200,
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            width: 70,
            render: (text:string, record:ResumeObj,_:any) => <span>
                {loadMF(text)}
            </span>
        },
        {
            title: '岗位目标公司',
            dataIndex: 'target_company',
            key: 'target_company',
            width: 160,
        },
        {
            title: '首次联系时间',
            dataIndex: 'first_contact_time',
            key: 'first_contact_time',
            width: 200,
            render: (_: any, record: ResumeObj) => {
                return <span>{formatTime(record?.first_contact_time)}</span>
            }
        },
        {
            title: '入职意向',
            dataIndex: 'employment_intention',
            key: 'employment_intention',
            width: 70,
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
            width: 200,
            render: (_: any, record: ResumeObj) => {
                return <span>{formatTime(record.time_induction)}</span>
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right' as 'right',
            width: 120,
            render: (_: any, record: ResumeObj) => <div style={{ display: "flex",
                flexDirection: "column",
                alignItems: "center"}}>
                {!record.follow ?
                    <Button size="small" type="primary" onClick={() => changeFollow(record, "1")}>关注</Button> :
                    <Button size="small" onClick={() => changeFollow(record, '0')}>取消关注</Button> }
                    <Button size="small" onClick={() => editItem(record)} style={{marginTop: 4}}>编辑</Button>
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
    const {list} = props
    return <Fragment>
        <Table
            style={{marginTop: 10}}
            rowKey={(record:any)=> record.id}
            bordered
            scroll={{ x: 1800 }}
            dataSource={list}
            columns={columns} />
        {drawTileStatus ? <DetailDrawer resumeDetail={resumeDetail} open={open} closePriviewNotes={() => setOpen(false)}/> : null }
    </Fragment>
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
    function editItem (record: ResumeObj) {
        console.log(record)
        navigator('/editResume', { state: {id: record?.id} })
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
                console.log("----", resumeDetail)
                setOpen(true)
                setdrawTileStatus(true)
            }
        })
    }

    function freshRequest () {
        if (props.freshSource) {
            props?.freshSource({name: '', email: ''})
        }
    }
}

export default memo(TableList)
