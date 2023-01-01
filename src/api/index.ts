import { user } from '../utils/type'
import request from './fetch'

const baseUrl = "/api"
export function GetResumeList (){
    return request.GetRequest(`${baseUrl}/list/resume`)
    // useSWR('/api/list/resume', request.GetRequest )
}
export function LoginReuqest(params: user):any { // 登录
    return request.PostRequest(`${baseUrl}/login`, params)
}

export function RegisterRequest (params: user):any { // 注册
    return request.PostRequest(`${baseUrl}/register`, params)
}