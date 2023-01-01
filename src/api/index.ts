import request from './fetch'
import useSWR from 'swr'

export function GetResumeList (){
    // return request.GetRequest("/api/list/resume")
    useSWR('/api/list/resume', request.GetRequest )
}