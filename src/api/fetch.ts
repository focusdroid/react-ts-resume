class Request {
    private headers: { token: string };
    constructor() {
        this.headers = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJ3ZWV4c3NAMTYzLmNvbSIsIk5hbWUiOiIiLCJFbWFpbCI6IndlZXhzc0AxNjMuY29tIiwiUGhvbmUiOiIiLCJleHAiOjE2NzE2MjUxMDR9.67_h9N2cbe5DstYiBShfSpLsYaKkiaL9bfqMHxDJZyc'
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
         fetch(url,{
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
        fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(params)
        }).then((res) => {
            const { status, ok } = res
            if (status === 200 && ok) {
                return res.json()
            }
        })
    }
}

export default new Request()