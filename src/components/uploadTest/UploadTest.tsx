import React, {createRef, FC, useEffect, useState} from "react";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import useSWR from "swr";
import request from "../../api/fetch";
// import { GetResumeList} from '../../api/index'
const props: UploadProps = {
    name: 'file',
    action: '/upload/upload',
    method: "POST",
    onChange(info) {
        console.log(info)
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const UploadTest: FC = () => {
    const {data} = useSWR('/api/list/resume', request.GetRequest)
    function getList () {
        // request.GetRequest('/api/list/resume')
        // useSWR('/api/list/resume', request.GetRequest)
        /*fetch('/api/list/resume', {
            method: 'GET',
            headers: {
                'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJ3ZWV4c3NAMTYzLmNvbSIsIk5hbWUiOiIiLCJFbWFpbCI6IndlZXhzc0AxNjMuY29tIiwiUGhvbmUiOiIiLCJleHAiOjE2NzA1ODU3ODJ9.osdutADWCMD9syPoIX9dF4rPqnShQVBnMfkODHdqIi4'
            }
        }).then(res => {
            console.log(res)
        })*/
    }
    const [refs, setRefs] = useState<any>()
    useEffect(() =>{
        const refs = createRef<HTMLInputElement>()
        setRefs(refs)
    }, [])
    return <div>
        <Button onClick={getList}>reflush resume</Button>
        简历管理
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <input ref={refs} type="file"/>
        <button onClick={uploadFile}>上传</button>
        {/*<a onClick={getDownload} data-thunder href="https://pics6.baidu.com/feed/b219ebc4b74543a9f6acd627e12af889b801146a.jpeg@f_auto?token=2bd5a1e5e562aa2906561f9112925bc8">下载图片</a>*/}
    </div>
    function getDownload () {
        /*const links:any = document.querySelectorAll('a[data-thunder]')
        for (const link in links) {
            const newHref = btoa(`AA${link.href}ZZ`)
            link.href = `thunder://${newHref}`
        }*/
    }

    function uploadFile () {
        // let inputs = document.querySelector('input[type="file"]')
        let inputs = refs.current.files[0]
        console.log(inputs)

        let data = new FormData()
        data.append('file', inputs)
        data.append('scene', 'default')
        data.append('output', 'json')

        fetch('/upload', {
            method: 'POST',
            body: data
        }).then(res => {
            const { status, ok } = res
            if (status === 200 && ok) {
                return res.json()
            } else {
                return {url: ""}
            }
        }).then(res => {
            console.log(res)
        })
    }
    /*    const upload = () => {
            fetch('http://192.168.1.14/:8080/list/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJ3ZWV4c3NAMTYzLmNvbSIsIk5hbWUiOiIiLCJFbWFpbCI6IndlZXhzc0AxNjMuY29tIiwiUGhvbmUiOiIiLCJleHAiOjE2NzAyMzczOTN9.rxJ-jZ7yX2G6-Yh4AJlPQjbJv7hJWEgWMzgOValKRV0'
                },
                body: JSON.stringify({
                    name: 'Hubot',
                    login: 'hubot',
                })
            })
        }*/
}

export default UploadTest