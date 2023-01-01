

// 项目中 *.d.ts 文件中加上如下配置
declare module '*.less' {
    const classes: { readonly [key: string]: string }
    export default classes
}
declare module '*.module.less' {
    const classes: { readonly [key: string]: string }
    export default classes
}
declare module '*.less'

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string }
    export default classes
}