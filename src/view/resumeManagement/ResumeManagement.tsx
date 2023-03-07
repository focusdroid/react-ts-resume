import React, {memo, useState} from "react";
import Search from "./Search"
import TableList from './TableList'
import {baseUrl, GetAllResumeList, SpaceGETRequest,} from "../../api";
import {ResponseParam, ResumeObj, searchField} from "../../utils/type";
import backlog from '../backlog/backlog.module.css'
import useSWR  from 'swr'
const ResumeManagement = memo(() => {
    const [list, setListData] = useState<ResumeObj>()
    const getResumeList = (url:string, params: Object) => SpaceGETRequest(url, params).then(res => {
        const { code, data } = res
        if (code === "200") {
            setListData(data.data)
        }
    })
    const obj = {name:"", email:"", pageNum: 1, pageSize: 10, size: 14}
    useSWR([`${baseUrl}/list/resume`, obj], ([url, obj]) => getResumeList(url, obj))
    return <div className={backlog.backlogview}>
        <Search getAllResumeSource={getAllResumeSource}/>
        <TableList freshSource={getAllResumeSource} list={list}/>
    </div>
    function getAllResumeSource (values: searchField) {
        GetAllResumeList(Object.assign(values, {pageNum: 1, pageSize: 10})).then((res:ResponseParam) => {
            const { code, data } = res
            if (code === "200") {
                setListData(data.data)
            }
        })
    }
})

export default ResumeManagement
