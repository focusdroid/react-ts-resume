import {Button, Card, Col, Row, Input, List, Typography, Tag, Avatar, Popconfirm} from "antd";
import style from "./backlog.module.css";
import React, {memo, useState} from "react";
import VirtualList from 'rc-virtual-list';
import {baseUrl, SpaceGETRequest, addBacklog} from "../../api";
import useSWR from "swr";
import {BacklogList, ResponseDetailParam} from "../../utils/type";

const BackTitle = memo(() => {
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
            if (res.code === '200'){
                setText('')
            }
        })
    }
})

interface DeleteComponentIprops {
    item: BacklogList
}

const DeleteComponent = (props: DeleteComponentIprops)=> {
    return <Popconfirm
        key={props?.item.id}
        title="确定删除?"
        onConfirm={() => deleteConfirm(props?.item)}
        onCancel={() => deleteCancel(props?.item)}
        okText="确定"
        cancelText="取消"
    >
        <Tag className={style.point}>删除</Tag>
    </Popconfirm>
    function deleteConfirm (item: BacklogList) {
        console.log(item);
    }
    function deleteCancel (item: BacklogList) {
        console.log(item);
    }
}

const Notes = () => {
    const [list, setList] = useState<BacklogList[]>([])
    const fetcher = (url: string) => SpaceGETRequest(url).then((res:ResponseDetailParam) => {
        console.log(res)
        if (res && res?.code === "200") {
            setList(res.data)
        }
    })
    useSWR(`${baseUrl}/backlog/getBacklogList`, (url:string) => fetcher(url))
    return <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
            <Card size="small" title={<BackTitle/>} className={style.cardstyle}>
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
                                        <DeleteComponent item={item}/>
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
                            dataSource={list}
                            renderItem={(item: BacklogList,index: number) => (
                                <List.Item key={item.id}>
                                    <DeleteComponent item={item}/>
                                    <Tag className={style.point} color="#069d05">已完成</Tag>
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