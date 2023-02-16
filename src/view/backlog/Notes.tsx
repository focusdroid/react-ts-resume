import {Button, Card, Col, Row, Input, List, Typography, Tag, Avatar, Popconfirm} from "antd";
import style from "./backlog.module.css";
import React, {memo, useState} from "react";
import VirtualList from 'rc-virtual-list';
import {baseUrl, SpaceGETRequest, addBacklog, changeBackStatus} from "../../api";
import useSWR from "swr";
import {BacklogList, ResponseDetailParam} from "../../utils/type";

interface NoteIprops {
    freshBack: () => void
}
const BackTitle = (props: NoteIprops, _:any) => {
    const [text, setText] = useState<string | undefined>()
    return <div className={style.backbox}>
        <div className={style.divitem}>今日待办</div>
        <div className={style.backinput}>
            <Input type="text" value={text} onChange={(e) => getInputValue(e.target.value)}/>
            <Button onClick={addBack} className={style.ml10} type="primary">添加待办</Button>
        </div>
    </div>
    function getInputValue(value:string){
        setText(value)
    }
    function addBack (){
        addBacklog({backlogText: text}).then((res:ResponseDetailParam) => {
            if (res && res.code === '200'){
                setText('')
                props?.freshBack()
            }
        })
    }
}

interface DeleteComponentIprops {
    item: BacklogList,
    freshBack: () => void
}

const DeleteComponent = (props: DeleteComponentIprops)=> {
    return <Popconfirm
        key={props?.item.id}
        title="确定删除?"
        onConfirm={() => deleteConfirm(props?.item)}
        okText="确定"
        cancelText="取消"
    >
        <Tag className={style.point}>删除</Tag>
    </Popconfirm>
    function deleteConfirm (item: BacklogList) {
        console.log(item);
        const obj = {
            id: item?.id,
            backlog_type: item.backlog_type,
            backlog_status: 0, // 0是删除状态
        }
        changeBackStatus(obj).then((res: ResponseDetailParam) => {
            console.log(res)
            const { code } = res
            if (code === '200') {
                props?.freshBack()
            }
        })
    }
}

const Notes = () => {
    const [list, setBackList] = useState<BacklogList[]>([])
    const [completedList, setCompletedList] = useState<BacklogList[]>([])
    const fetcher = (url: string, obj:Object) => SpaceGETRequest(url, obj).then((res:ResponseDetailParam) => {
        console.log(res)
        if (res && res?.code === "200" && res?.backlog_type === 1) {
            setBackList(res.data)
        } else if (res && res?.code === "200" && res?.backlog_type === 2) {
            setCompletedList(res.data)
        }
    })
    const obj = { backlog_type: 1 }
    const obj2 = { backlog_type: 2 }
    useSWR([`${baseUrl}/backlog/getBacklogList`, obj], ([url, obj]) => fetcher(url, obj))
    useSWR([`${baseUrl}/backlog/getBacklogList`, obj2], ([url, obj]) => fetcher(url, obj))
    function freshBack (){
        fetcher(`${baseUrl}/backlog/getBacklogList`, obj)
        fetcher(`${baseUrl}/backlog/getBacklogList`, obj2)
    }
    return <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
            <Card size="small" title={<BackTitle freshBack={freshBack}/>} className={style.cardstyle}>
                <Row gutter={16}>
                    <Col span={12}>
                        <List
                            bordered
                            style={{marginBottom: 20, overflowY: 'scroll', height: 300, minHeight: 300}}
                        >
                            <VirtualList
                                data={list}
                                itemKey="backlog_text"
                            >
                                {(item:BacklogList, index: number) => (
                                    <List.Item key={item.id}>
                                        <DeleteComponent freshBack={freshBack} item={item}/>
                                        <Tag className={style.point} color="#069d05">置为已完成</Tag>
                                        <Typography.Text>{index+1}.</Typography.Text>
                                        {item.backlog_text}
                                    </List.Item>
                                )}
                            </VirtualList>
                        </List>
                    </Col>
                    <Col span={12}>
                        <List
                            bordered
                            style={{marginBottom: 20, overflowY: 'scroll', height: 300, minHeight: 300}}
                            dataSource={completedList}
                            renderItem={(item: BacklogList,index: number) => (
                                <List.Item key={item.id}>
                                    <DeleteComponent freshBack={freshBack} item={item}/>
                                    <Tag color="#007e1e">已完成</Tag>
                                    <Typography.Text>{index+1}.</Typography.Text>
                                    {item.backlog_text}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
}
export default Notes