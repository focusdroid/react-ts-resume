import React, {FC,Suspense} from 'react'
import {RouterProvider} from "react-router-dom";
import {router} from './routes'

const Router: FC = () => {
    return <Suspense fallback={"..."}>
        <RouterProvider router={router}/>
    </Suspense>
}
export default Router

/*
// import {Login, Backlog, Main, Register, Hello, ResumeManagement, UploadTest, Test, router, AddResume} from './routes'
const Router: FC = () => {
    return <BrowserRouter>
            <Suspense fallback={'...'}>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="/test" element={<Test/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/" element={<Main/>}>
                                <Route index element={<Backlog/>}></Route>
                                <Route path="/resumeManagement" element={<ResumeManagement/>}></Route>
                                <Route path="/hello" element={<Hello/>}></Route>
                                <Route path="/uploadTest" element={<UploadTest/>}></Route>
                                <Route path="/addResume" element={<AddResume/>}></Route>
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
    </BrowserRouter>
}
export default Router*/