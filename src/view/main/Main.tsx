import { Outlet} from "react-router-dom";
import Header from "../../components/header/Header";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import styles from "./main.module.css"
// import {isLine} from "../../api";
// import {ResponseParam} from "../../utils/type";
// import {message} from "antd";
function RequireAuth({children}:{children: JSX.Element|JSX.Element[]}):any{
    /*isLine().then((res:ResponseParam)=>{ // 验证有效期
        const { code } = res
        console.log(res)
        if (code === '2001') {
            if (res.code === "2001") { // token失效跳转登录
                console.log("token可能失效了")
                message.warning("token可能失效了")
                window.location.replace("/login")
                return
            }
        }
    })*/
    return children
}
function Main() {
    return <div>
        <RequireAuth>
            <Header/>
            <div className={styles.mains}>
                <LeftMenu/>
                <Outlet />
                </div>
        </RequireAuth>
    </div>
}

export default Main;
