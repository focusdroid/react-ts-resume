import {FC, useState} from "react";
import GoBack from '../../components/goBack/GoBack'

const AddResume:FC = () => {
    // const [resumeUrl, setResumeUrl] = useState<string>("http://asmie.live:8080/group1/default/20230105/13/47/4/Web前端工程师.pdf?name=Web%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88.pdf")
    const [resumeUrl, setResumeUrl] = useState<string>("http://asmie.live:8080/group1/default/20230105/13/47/4/Web前端工程师.pdf")
    return <div style={{width: "100%"}}>
        <GoBack/>
        <div style={{padding: 10}}>
            {/*<embed src={resumeUrl} type="application/pdf"/>*/}
            {/*<embed src={resumeUrl} type="application/pdf"/>*/}
            {/*<iframe src={resumeUrl} height="800px" width="800px"></iframe>*/}
            <object data={resumeUrl} type="application/pdf" height="800px" width="800px"></object>
        </div>
    </div>
}

export default AddResume