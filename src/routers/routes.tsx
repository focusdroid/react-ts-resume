import {createBrowserRouter, createHashRouter, useRoutes} from "react-router-dom";
import React, {lazy} from "react";

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
/*import App from "../App"
import Main from "../view/main/Main"
import Login from "../view/login/Login"
import Register from "../view/register/Register"
import Hello from "../components/hello/Hello"
import Backlog from "../view/backlog/Backlog"
import ResumeManagement from "../view/resumeManagement/ResumeManagement"*/

interface Router {
    id: number,
    path: string,
    component: any,
    index?: boolean,
    children?: Array<Router>
}
function Other(){
    return <div>"没有这个页面"</div>
}

let userAuth = [
    { path: '', element: <App/>, children: [
            { path: '/test', element: <Test/>},
            { path: '/login', element: <Login/>},
            { path: '/register', element: <Register/>},
            { path: '/', element: <Main/>, children: [
                    {  index: true, path: '/', element: <Backlog/>},
                    {  path: '/resumeManagement', element: <ResumeManagement/>},
                    {  path: '/hello', auth: "root", element: <Hello/>},
                    {  path: '/uploadTest', auth: "other", element: <UploadTest/>},
                    {  path: '/addResume', auth: "other", element: <AddResume/>},
                ]},
            { path: '*', element: <Other/>},
        ]}
]

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
