import {Button, Card, Col, Row, Input, List, Typography, Tag} from "antd";
import style from "./backlog.module.css";
import {useState} from "react";
import {baseUrl, SpaceGETRequest} from "../../api";
import useSWR from "swr";
import {BacklogList, ResponseDetailParam} from "../../utils/type";

const Notes = () => {
    const [text, setText] = useState<string | undefined>()
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
            <Card size="small" title={<div className={style.backbox}>
                <div className={style.divitem}>今日待办</div>
                <div className={style.backinput}>
                    <Input type="text" value={text} onChange={(e) => getInputValue(e.target.value)}/>
                    <Button className={style.ml10} type="primary">添加待办</Button>
                </div>
            </div>} className={style.cardstyle}>
                <Row gutter={16}>
                    <Col span={12}>
                        <List
                            header={<div>未完成</div>}
                            bordered
                            dataSource={list}
                            renderItem={(item: BacklogList,index: number) => (
                                <List.Item>
                                    <Tag color="#f50">删除</Tag>
                                    <Typography.Text>{index+1}.</Typography.Text>
                                    {item.backlog_text}
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <List
                            header={<div>已完成</div>}
                            bordered
                            dataSource={list}
                            renderItem={(item: BacklogList,index: number) => (
                                <List.Item>
                                    <Tag color="#f50">删除</Tag>
                                    <Tag color="#87d068">已完成</Tag>
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
    function getInputValue(value:string){
        setText(value)
    }
}
export default Notes