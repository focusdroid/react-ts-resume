import {BacklogList, ResponseDetailParam} from "../../utils/type";
import {Popconfirm, Tag} from "antd";
import style from "./backlog.module.css";
import {changeBackStatus} from "../../api";
import React from "react";

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
            const { code } = res
            if (code === '200') {
                props?.freshBack()
            }
        })
    }
}

export default DeleteComponent