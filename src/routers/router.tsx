import {Component, FC, lazy, Suspense, useEffect} from 'react'
import {RouterProvider, Route, BrowserRouter, Routes} from "react-router-dom";
import App from "../App";
import {Login, Backlog, Main, Register, Hello, ResumeManagement, UploadTest, router} from './routes'

/*const localRouterMap = {
    'App': <App/>,
    'Login': <Login/>,
    'Backlog': <Backlog/>,
    'Register': <Register/>,
    'Main': <Main/>,
    'Hello': <Hello/>,
    'ResumeManagement': <ResumeManagement/>,
}*/

/*const Router: FC = () => {
    return <RouterProvider router={router}/>
    function renderRoute (route:any) {
         return route.map((item:any)=> {
            if (item.children) {
                 renderRoute(item.children)
            }
             <Route key={item.id} path={item.path} element={`<${item.component}/>`} />
        })
    }
}
export default Router*/
const Router: FC = () => {
    return <BrowserRouter>
            <Suspense fallback={'...'}>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/" element={<Main/>}>
                            <Route index element={<Backlog/>}></Route>
                            <Route path="/resumeManagement" element={<ResumeManagement/>}></Route>
                            <Route path="/hello" element={<Hello/>}></Route>
                            <Route path="/uploadTest" element={<UploadTest/>}></Route>
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
    </BrowserRouter>
}

export default Router

/*
*
*  <Route path="/" element={<App/>}>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/main" element={<Main/>}>
                            <Route path="hello" element={<Hello/>}></Route>
                        </Route>
                    </Route>
*
* {routes.map((item: any) => {
                    return
                            if (item && item.children){
                            return <Route index key={item.id} path={item.path} element={<item.component/>}/>
                        }
                            <Route index key={item.id} path={item.path} element={<item.component/>}/>
                })}*/