import React, {FC, useState} from "react";
import Search from "./Search"
import TableList from './TableList'
import {GetAllResumeList} from "../../api";
import {ResponseParam, ResumeObj, searchField} from "../../utils/type";
import backlog from '../backlog/backlog.module.css'
const ResumeManagement: FC = () => {
    const [list, setListData] = useState<ResumeObj>()
    return <div className={backlog.backlogview}>
        <Search getAllResumeSource={getAllResumeSource}/>
        <TableList freshSource={freshSource} list={list}/>
    </div>
    function getAllResumeSource (values: searchField) {
        GetAllResumeList(Object.assign(values, {pageNum: 1, pageSize: 10})).then((res:ResponseParam) => {
            const { code, data } = res
            if (code === "200") {
                setListData(data.data)
            }
        })
    }
    function freshSource (values: searchField) {
        getAllResumeSource(values)
    }
}

export default ResumeManagement