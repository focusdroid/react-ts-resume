import {createBrowserRouter} from "react-router-dom";
import React, {lazy} from "react";
import OperationRecord from "../view/admin/operationRecord/OperationRecord";

export const App = lazy(() => import("../App"))
export const Main = lazy(() => import("../view/main/Main"))
export const Login = lazy(() => import("../view/login/Login"))
export const Test = lazy(() => import("../view/test/Test"))
export const Register = lazy(() => import("../view/register/Register"))
export const Hello = lazy(() => import("../components/hello/Hello"))
export const Backlog = lazy(() => import("../view/backlog/Backlog"))
export const ResumeManagement = lazy(() => import("../view/resumeManagement/ResumeManagement"))
export const UploadTest = lazy(() => import("../components/uploadTest/UploadTest"))
export const AddResume = lazy(() => import("../view/addResume/AddResume"))
export const User = lazy(() => import("../view/user/User"))
export const AdminStaff = lazy(() => import("../view/admin/adminStaff/AdminStaff"))
export const OperationRecords = lazy(() => import("../view/admin/operationRecord/OperationRecord"))
/*import App from "../App"
import Main from "../view/main/Main"
import Login from "../view/login/Login"
import Register from "../view/register/Register"
import Hello from "../components/hello/Hello"
import Backlog from "../view/backlog/Backlog"
import ResumeManagement from "../view/resumeManagement/ResumeManagement"*/

function Other(){
    return <div>"没有这个页面"</div>
}

let userAuth = [
    { id: 1, path: '', element: <App/>, children: [
            { id: 11, path: '/test', element: <Test/>},
            { id: 12, path: '/login', element: <Login/>},
            { id: 13, path: '/register', element: <Register/>},
            { id: 14, path: '/', element: <Main/>, children: [
                    {  id: 141, index: true, path: '/', element: <Backlog/>},
                    {  id: 142, path: '/resumeManagement', element: <ResumeManagement/>},
                    {  id: 143, path: '/hello', auth: "root", element: <Hello/>},
                    {  id: 144, path: '/uploadTest', auth: "other", element: <UploadTest/>},
                    {  id: 145, path: '/addResume', auth: "other", element: <AddResume/>},
                    {  id: 146, path: '/editResume', auth: "other", element: <AddResume/>},
                    {  id: 147, path: '/userinfo', auth: "other", element: <User/>},
                    {  id: 148, path: '/adminStaff', auth: "other", element: <AdminStaff/>},
                    {  id: 149, path: '/operationRecord', auth: "other", element: <OperationRecords/>},
                ]},
            { id: 15, path: '*', element: <Other/>},
        ]}
]
// @ts-ignore
export let router = createBrowserRouter(userAuth)


/*
export const router = [
    { id: 0, path: '/', component: lazy(() => import("../App")), children: [
            { id: 10000, path: '/test', component: lazy(() => import("../view/test/Test"))},
            { id: 1, path: '/login', component: lazy(() => import("../view/login/Login"))},
            { id: 2, path: '/register', component: lazy(() => import("../view/register/Register"))},
            { id: 3, path: '/', component: lazy(() => import("../view/main/Main")), children: [
                    { id: 4, index: true, path: '/', component: lazy(() => import("../view/backlog/Backlog"))},
                    { id: 5, path: '/resumeManagement', component: lazy(() => import("../view/resumeManagement/ResumeManagement"))},
                    { id: 6, path: '/hello', component: lazy(() => import("../components/hello/Hello"))},
                    { id: 7, path: '/uploadTest', component: lazy(() => import("../components/uploadTest/UploadTest"))},

                ]},
        ]}
]
*/
