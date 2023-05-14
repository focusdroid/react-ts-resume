import Notes from './Notes'
import style from './backlog.module.css'
import {useState} from "react";
import {SpaceGETRequest} from "../../api";
import useSWR from "swr";
import { baseUrl } from '../../api/index'
import TableList from "../resumeManagement/TableList";
import {ResumeList} from "../../utils/type";
import {Card} from "antd";

const Backlog = () => {
    const [list, setResumeList] = useState<ResumeList>()
    const fetcher = (url:string, params?: Object) => SpaceGETRequest(url,params).then(res => {
        if (res && res?.code === "200") {
            setResumeList(res.data.data)
        }
    })
    let obj = {name: "tree", age: 12} // 测试
    useSWR([`${baseUrl}/list/mainResume`, obj], ([url, obj]) => fetcher(url, obj))
    return <div className={style.backlogview}>
        <Notes/>
        <Card title="重点关注" className={style.mt10}>
            <TableList list={list} freshSource={freshDataSource}/>
        </Card>
    </div>
    function freshDataSource (){
        fetcher(`${baseUrl}/list/mainResume`, '')
    }
}

export default Backlog
