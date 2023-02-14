import { user, searchField } from '../utils/type'
import request from './fetch'
export const baseUrl = "/api"
export function SpaceGETRequest(url: string, params: any = {}){
    return request.HttpRequest(url, "GET", params)
}
export function SpacePOSTRequest(url: string, params: any = {}){
    return request.HttpRequest(url, "POST", params)
}
export function isLine(){
    return request.HttpRequest(`${baseUrl}/isLine`, "get")
}
export function GetMainResumeList (){ // 获取重点关注人员简历
    return request.HttpRequest(`${baseUrl}/list/mainResume`, "GET")
}
export function GetAllResumeList(params: searchField){ // 获取全部人员简历
    return request.HttpRequest(`${baseUrl}/list/resume`, "GET", params)
}
export function LoginReuqest(params: user):any { // 登录
    return request.HttpRequest(`${baseUrl}/login`, "POST", params)
}
export function RegisterRequest (params: user):any { // 注册
    return request.HttpRequest(`${baseUrl}/register`, "POST", params)
}
export function SendEmail (params: Object){ // 获取邮箱验证码
    return request.HttpRequest(`${baseUrl}/sendMail`, "POST", params)
}
export function RefreshToken (params: Object) { // 刷新token
    return request.HttpRequest(`${baseUrl}/refreshToken`, "GET", params)
}
export function modifyMain(params: Object){ // 添加/取消关注
    return request.HttpRequest(`${baseUrl}/list/modifyMain`, "POST", params)
}
export function deleteResume(params: Object){ // 添加/取消关注
    return request.HttpRequest(`${baseUrl}/list/delete`, "GET", params)
}
export function detail(params:Object){
    return request.HttpRequest(`${baseUrl}/list/detail`, "GET", params)
}
export function addResume(params:Object){ // 添加简历
    return request.HttpRequest(`${baseUrl}/list/addUserResume`, "post", params)
}
export function updateResumeInfo(params:Object){ // 添加简历
    return request.HttpRequest(`${baseUrl}/list/updateInfo`, "post", params)
}
export function addBacklog(params:Object){ // 新增待办
    return request.HttpRequest(`${baseUrl}/backlog/addBacklog`, 'post', params)
}