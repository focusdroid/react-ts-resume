import {FC, useEffect, useState} from "react";

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
    getItem('路由管理', 'sub2', '', <AppstoreOutlined />, [
        getItem('Option 5', '5', ''),
        getItem('Option 6', '6', ''),
        getItem('Submenu', 'sub3', '', null, [getItem('Option 7', '7', ''), getItem('Option 8', '8', '')]),
    ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['/', '/resumeManagement', 'sub2'];

const LeftMenu:FC = () => {
    const navigate = useNavigate() // 跳转
    let location = useLocation(); // 获取路径
    const [openKeys, setOpenKeys] = useState(['sub2']);

    const onOpenChange: MenuProps['onOpenChange'] = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        console.log(keys)
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