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

export declare  interface PageParam {
    currentPage: string | number
    data?: ResumeList
    size: string | number
    total: string | number
}


export declare interface ResumeList { // 简历人员列表
    confirm_enrollment: string
    email: string
    "157kkkk@163.com"
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