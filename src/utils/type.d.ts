export declare interface user {
    email: string,
    password: string,
    remember?: boolean,
    code?: string,
}

export declare interface ResponseParam { // 公共返回限制
    code?: string | number
    data: PageParam
    message: string
}
export declare interface ResponseDetailParam { // 公共返回限制
    code?: string | number
    data?: ResumeObj | any
    message?: string
}

export declare  interface PageParam {
    currentPage: string | number
    data?: ResumeList
    size: string | number
    total: string | number
}

export declare interface searchField {
    name: string
    email: string
}
export declare interface ResumeObj { // 简历人员列表
    confirm_enrollment?: string | undefined
    email?: string | undefined
    employment_intention?: string | undefined
    first_contact_time?: string | undefined
    follow?:boolean | undefined
    gender?: string | undefined
    id?: number | undefined
    jobbed?: string | undefined
    jobbed_year?: number | undefined
    level?: string | undefined
    name?: string | undefined
    person_charge?: string | undefined
    phone?: string | undefined
    post_salary?: string | undefined
    remarks?: string | undefined
    resume_status?: string | undefined
    resume_url?: string | undefined
    target_company?: string | undefined
    time_induction?: string | undefined
    user_id?: string | undefined
}

export declare interface ResumeList { // 简历人员列表
    confirm_enrollment: string
    email: string
    employment_intention: string
    first_contact_time: string
    follow:boolean
    gender: string
    id: number
    jobbed: string
    level: string
    name: string
    person_charge: string
    phone: string
    post_salary: string
    remarks: string
    resume_status: string
    resume_url: string
    target_company: string
    time_induction: string
    user_id: string
}[] | undefined

export declare interface BacklogList {
    backlog_status: number
    backlog_text: string
    backlog_type: number
    id: number
    user_id: string
}