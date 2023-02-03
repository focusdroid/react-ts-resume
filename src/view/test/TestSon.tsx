import {useEffect, memo} from "react";

interface IProps {
    changeCount: (num:number) => void
}

const TestSon = (props:IProps) => {
    useEffect(() => {
        console.log("testson 渲染")
    },[])
    console.log("testson 渲染123132132123")
    return (<div>
        <h1>testson</h1>
        <button onClick={() => props.changeCount(12)}>testson</button>
    </div>)
}

export default memo(TestSon)