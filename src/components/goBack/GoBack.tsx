import {FC} from "react";
import {Button} from 'antd'
import { useNavigate } from 'react-router-dom'
import {LeftOutlined} from '@ant-design/icons';
import style from './goback.module.css'
const GoBack:FC = () => {
    const naviagte = useNavigate()
    return <div className={style.goback}>
        <Button onClick={goback} icon={<LeftOutlined />}>返回</Button>
    </div>
    function goback () {
        naviagte(-1)
    }
}

export default GoBack