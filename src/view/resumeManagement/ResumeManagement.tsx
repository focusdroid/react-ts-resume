import React, {FC, useState} from "react";
import Search from "./Search"
import TableList from './TableList'
import {GetAllResumeList} from "../../api";
import {ResponseParam, searchField} from "../../utils/type";
const ResumeManagement: FC = () => {
    const [list, setListData] = useState<any>()
    return <div style={{width: "100%"}}>
        <Search getAllResumeSource={getAllResumeSource}/>
        <TableList list={list}/>
    </div>
    function getAllResumeSource (values: searchField) {
        console.log("values---", values)
        GetAllResumeList(values).then((res:ResponseParam) => {
            const { code, data } = res
            if (code === "200") {
                setListData(data)
            }
        })
    }
}

export default ResumeManagement