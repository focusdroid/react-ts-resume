class Request {
    private headers: { token: string };
    constructor() {
        this.headers = {
            token: localStorage.token || ''
        }
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
            headers: this.headers
        }).then((res: any) => {
             const { status, ok } = res
             if (status === 200 && ok) {
                 return res.json()
             }
        })
    }
    PostRequest (url: string, params: Object = {}) {
        return fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(params)
        }).then((res) => {
            const { status, ok } = res
            if (status === 200 && ok) {
                return res.json()
            } else {
                return {}
            }
        })
    }
}

export default new Request()