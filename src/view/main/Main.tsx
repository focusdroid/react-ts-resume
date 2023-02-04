import {Navigate, Outlet} from "react-router-dom";
import Header from "../../components/header/Header";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import styles from "./main.module.css"
import {isLine} from "../../api";
// @ts-ignore
function RequireAuth({children}):any{
    // const authed = localStorage.getItem("token")
    console.log("localStorage.token", window.localStorage.token)
    if (window.localStorage.token) {
        return children
    } else {
        console.log("main component")
        isLine().then(res=>{ // 验证有效期
            console.log(res)
        })
        // window.location.replace("/login")
    }
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
