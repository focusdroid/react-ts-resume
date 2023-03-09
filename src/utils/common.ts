import React from "react";

const dayjs = require('dayjs')
export function parseUrlParams(url:string, params: any){
    if (Object.keys(params).length){
        let paramsArr: Array<any> = []
        Object.keys(params).forEach(key => paramsArr.push(key + "=" + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArr.join('&')
        } else {
            url += '&' + paramsArr.join('&')
        }
    }
    return url
}

export function formatTime(time:string | undefined){
    return time ? dayjs(time).format("YYYY-MM-DD HH:mm:ss") : null
}
export const getLevelField = (level: string | undefined, jobbed: string | undefined) => {
    if (level && jobbed) {
        return `${level} ${jobbed}`
    }
    if (jobbed) {
        return jobbed
    }
    if (level) {
        return level
    }
}
export function loadMF (gender: string | null | undefined):string | null | undefined {
    return gender === 'M' ? '男' : gender === 'F' ? '女' : null
}
