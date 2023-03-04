import {FC, useState} from "react";
import {
    UserOutlined
} from '@ant-design/icons';
import style from "./header.module.css"
import {Button, Popover, Space} from "antd";
import {useNavigate} from "react-router-dom";
import useSWR from "swr";
import {UserInfo, UserInfoResponse} from "../../utils/type";
import Request from "../../api/fetch";


const Header: FC = () =>{
    const [user, setUserInfo] = useState<UserInfo>()
    const fetchGetUser = (url: string) => {
        Request.HttpRequest(url, 'get').then((res: UserInfoResponse) => {
            console.log(res)
            const {code, data} = res
            if (code === "200") {
                setUserInfo(data)
            }
        })
    }
    // useSWR('/api/user/userinfo', fetchGetUser)
    const naviation = useNavigate()
    return <div>
        <div className={style.headerbox}>
            <div className={`${style.item1} ${style.item}`}>logo</div>
            <div className={`${style.item2} ${style.item}`}>上海HY信息科技有限公司</div>
            <div className={`${style.item3} ${style.item}`}>
                <Space wrap>
                    <Popover content={
                        <div style={{textAlign: 'center'}}>
                            <div><Button type="text" onClick={goUserInfo}>个人信息</Button></div>
                            <div><Button type="text" danger onClick={logout}>退出登录</Button></div>
                        </div>
                    } title="用户信息" trigger="click">
                        {user?.avatar_url ?
                            <div className={style.namebox}>
                                <img className={style.avatar} src={user?.avatar_url} alt=""/>
                                <span className={style.name}>{user?.nick_name ? user?.nick_name : null}</span>
                                <span className={style.name}>{user?.name ? <span>({user?.name})</span> : null}</span>
                            </div>
                            : <UserOutlined className={style.user} /> }
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
