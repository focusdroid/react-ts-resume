import {Outlet} from "react-router-dom";
import Header from "../../components/header/Header";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import styles from "./main.module.css"
function Main() {
    return <div>
            <Header/>
            <div className={styles.mains}>
                <LeftMenu/>
                <Outlet />
            </div>
        </div>
}

export default Main;
