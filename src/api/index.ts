import { user, searchField } from '../utils/type'
import request from './fetch'

const baseUrl = "/api"
export function GetMainResumeList (){ // 获取重点关注人员简历
    return request.GetRequest(`${baseUrl}/list/mainResume`)
    // useSWR('/api/list/resume', request.GetRequest )
}
export function GetAllResumeList(params: searchField){ // 获取全部人员简历
    return request.GetRequest(`${baseUrl}/list/resume`, params)
}
export function LoginReuqest(params: user):any { // 登录
    return request.PostRequest(`${baseUrl}/login`, params)
}

export function RegisterRequest (params: user):any { // 注册
    return request.PostRequest(`${baseUrl}/register`, params)
}
export function SendEmail (params: Object){ // 获取邮箱验证码
    return request.PostRequest(`${baseUrl}/sendMail`, params)
}
export function RefreshToken (params: Object) {
    return request.GetRequest(`${baseUrl}/refreshToken`, params)
}
export function modifyMain(params: Object){ // 添加/取消关注
    return request.PostRequest(`${baseUrl}/list/modifyMain`, params)

}