import {RefreshToken} from "./index";
import {parseUrlParams} from "../utils/common";
import {message} from "antd";


class Request {
    constructor() {
        this.refleshToken()
    }
    HttpRequest (url: string, methods: string = 'GET', params: any = {}) { // 将所有请求整合移植
        // console.log(url, methods, params)
        let fetchOption = {}
        if (methods.toUpperCase() === "GET") {
            url = parseUrlParams(url, params)
        } else if (methods.toUpperCase() === "POST") {
            fetchOption = {body: JSON.stringify(params)}
        }
        const options = Object.assign(fetchOption, {
            method: methods.toUpperCase(),
            headers: {
                token: localStorage.getItem("token") || ''
                }
            }
        )
        return fetch(url,options).then((res: any) => {
            // console.log("res--->", res)
            /*const total = res.headers.get('content-length')
            const decoder = new TextDecoder()
            const reader = res.body.getReader()
            let loaded = 0

            while (1) {
                const { done, value } = await reader.read()
                if (done) {
                    break;
                }
                loaded += value.length
            }*/
            const { status, ok } = res
            if (status === 200 && ok) {
                return res.json()
            }
        }).then(res => {
            if (res.code === "2001") { // token失效跳转登录
                console.log("token可能失效了")
                message.warning("token可能失效了")
                window.location.replace("/login")
                return
            }
            return res
        })
    }
    GetRequest (url: string, params: any = {}) {
        if (Object.keys(params).length){
            let paramsArr: Array<any> = []
            Object.keys(params).forEach(key => paramsArr.push(key + "=" + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArr.join('&')
            } else {
                url += '&' + paramsArr.join('&')
            }
        }
         return fetch(url,{
            method: "GET",
            headers: {
                token: localStorage.getItem("token") || ''
            }
        }).then((res: any) => {
             const { status, ok } = res
             if (status === 200 && ok) {
                 return res.json()
             }
        })
    }
    refleshToken () {
        const path = window.location.pathname
        const disabledPath = ['/login', '/register']
        if (disabledPath.includes(path)) {
            return;
        }
        let timer
        if (timer) {
            return
        }
        timer = setInterval(() =>{
            RefreshToken({token: localStorage.getItem("token")}).then(res => {
                if (res.code === "200") {
                    localStorage.token = ""
                    localStorage.token = res.token
                }
            })
            console.log("刷新token", new Date().getTime())
        }, 1000*60*10)
    }
}

export default new Request()
