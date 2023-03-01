import {FC} from "react";
import {
    UserOutlined
} from '@ant-design/icons';

import header from "./header.module.css"
import {Button, Popover, Space} from "antd";
import {useNavigate} from "react-router-dom";


const Header: FC = () =>{
    const naviation = useNavigate()
    return <div>
        <div className={header.headerbox}>
            <div className={`${header.item1} ${header.item}`}>logo</div>
            <div className={`${header.item2} ${header.item}`}>上海HY信息科技有限公司</div>
            <div className={`${header.item3} ${header.item}`}>
                <Space wrap>
                    <Popover content={
                        <div style={{textAlign: 'center'}}>
                            <div><Button type="text" onClick={goUserInfo}>个人信息</Button></div>
                            <div><Button type="text" danger onClick={logout}>退出登录</Button></div>
                        </div>
                    } title="用户信息" trigger="click">
                        <UserOutlined className={header.user} />
                    </Popover>
                </Space>
            </div>
        </div>
    </div>
    function goUserInfo (){
        naviation("/userinfo")
    }
    function logout () {
        localStorage.clear()
        naviation("/login")
    }
}

export default Header
