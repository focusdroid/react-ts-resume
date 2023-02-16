import React, { useState} from "react";
import { Card, Col, Row, List, Typography, Tag} from "antd";
import BackTitle from './BackTitle'
import DeleteComponent from './DeleteComponent'
import VirtualList from 'rc-virtual-list';
import {SpaceGETRequest, getBacklogListUrl, changeBackStatus} from "../../api";
import useSWR from "swr";
import {BacklogList, ResponseDetailParam} from "../../utils/type";
import style from "./backlog.module.css";

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
    useSWR([getBacklogListUrl, obj], ([url, obj]) => fetcher(url, obj))
    useSWR([getBacklogListUrl, obj2], ([url, obj]) => fetcher(url, obj))
    function freshBack (){
        fetcher(getBacklogListUrl, obj)
        fetcher(getBacklogListUrl, obj2)
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
                                        <Tag onClick={() => currentToComplate(item, 2)} className={style.point} color="#069d05">置为已完成</Tag>
                                        <Typography.Text>{index+1}.</Typography.Text>
                                        {item.backlog_text}
                                    </List.Item>
                                )}
                            </VirtualList>
                        </List>
                    </Col>
                    <Col span={12}>
                        <List
                            header={<div>已完成</div>}
                            bordered
                            style={{marginBottom: 20, overflowY: 'scroll', height: 300, minHeight: 300}}
                            dataSource={completedList}
                            renderItem={(item: BacklogList,index: number) => (
                                <List.Item key={item.id}>
                                    <DeleteComponent freshBack={freshBack} item={item}/>
                                    <Tag onClick={() => currentToComplate(item, 1)} className={style.point} color="#007e1e" >置为待办</Tag>
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
    function currentToComplate (item: BacklogList, type: number) {
        const obj = {
            id: item?.id,
            backlog_type: type,
            backlog_status: item.backlog_status,
        }
        changeBackStatus(obj).then((res: ResponseDetailParam) => {
            const { code } = res
            if (code === '200') {
                freshBack()
            }
        })
    }
}

export default Notes