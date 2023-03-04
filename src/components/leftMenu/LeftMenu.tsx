import {FC, useState} from "react";

import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import style from './leftmenu.module.css'
import { useNavigate, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    path: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        path,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('首页/待办', '/', '/', <MailOutlined />),
    getItem('简历管理', '/resumeManagement', '/resumeManagement', <MailOutlined />),
    getItem('管理员', 'sub2', '', <AppstoreOutlined />, [
        getItem('管理员工(admin)', '/adminStaff', ''),
        getItem('查看操作记录', '/operationRecord', ''),
        getItem('获取已删除信息', 'sub3', '', null,
            [getItem('已删除员工', '7', ''),
                    getItem('已删除简历', '8', '')]),
    ]),
    getItem('上传测试', '/uploadTest', '/uploadTest', <MailOutlined />),
];

// submenu keys of first level
const rootSubmenuKeys = ['/', '/resumeManagement', 'sub2'];

const LeftMenu:FC = () => {
    const navigate = useNavigate() // 跳转
    let location = useLocation(); // 获取路径
    const [openKeys, setOpenKeys] = useState(['sub2']);

    const onOpenChange: MenuProps['onOpenChange'] = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const getClickItem = (item: any) => {
        navigate(item.key)
        console.log(item.key)
    }
    return  <Menu
        mode="inline"
        openKeys={openKeys}
        defaultSelectedKeys={[location.pathname]}
        onOpenChange={onOpenChange}
        className={style.menu}
        onClick={getClickItem}
        items={items}
    />
}
export default LeftMenu
