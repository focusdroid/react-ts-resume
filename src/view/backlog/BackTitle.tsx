import React, {useState} from "react";
import style from "./backlog.module.css";
import {Button, Input} from "antd";
import {addBacklog} from "../../api";
import {ResponseDetailParam} from "../../utils/type";

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

export default BackTitle