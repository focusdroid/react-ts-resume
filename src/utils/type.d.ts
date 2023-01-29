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

export declare interface searchField {
    name: string
    email: string
}
export declare interface ResumeObj { // 简历人员列表
    confirm_enrollment?: string
    email?: string
    employment_intention?: string
    first_contact_time?: string
    follow?:boolean
    gender?: string
    id?: number
    jobbed?: string
    jobbed_year?: number
    level?: string
    name?: string | undefined
    person_charge?: string
    phone?: string
    post_salary?: string
    remarks?: string
    resume_status?: string
    resume_url?: string
    target_company?: string
    time_induction?: string
    user_id?: string
}

export declare interface levelFieldType {
    "1": string,
    "2": string,
    "3": string,
    "4": string,
    "5": string,
    "6": string,
    "7": string,
    "8": string,
    "9": string,
    "10": string,
    "11": string,
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