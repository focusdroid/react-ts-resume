import {Navigate, Outlet} from "react-router-dom";
import Header from "../../components/header/Header";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import styles from "./main.module.css"
import {isLine} from "../../api";
function RequireAuth({children}:{children: JSX.Element|JSX.Element[]}):any{
    isLine().then(res=>{ // 验证有效期
        console.log(res)
        const { code } = res
        if (code !== '200') {
            return children
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
