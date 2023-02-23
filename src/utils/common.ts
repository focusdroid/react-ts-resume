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
