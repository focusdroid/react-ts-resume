import {Navigate, Outlet} from "react-router-dom";
import Header from "../../components/header/Header";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import styles from "./main.module.css"
import {isLine} from "../../api";
import {ResponseParam} from "../../utils/type";
function RequireAuth({children}:{children: JSX.Element|JSX.Element[]}):any{
    isLine().then((res:ResponseParam)=>{ // 验证有效期
        const { code } = res
        if (code !== '200') {
            return null
        }
        return children
    })
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
