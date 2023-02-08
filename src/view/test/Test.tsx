import TestSon from './TestSon'
import {useCallback, useEffect, useMemo, useState} from "react";
import {GetMainResumeList} from "../../api";
import {ResponseParam} from "../../utils/type";
import TodoList from './TodoList'
const Test = () => {
    let [count, setCount] = useState<number>(0)
    let [count2, setCount2] = useState<number>(12)
    useEffect(() => {
        console.log("test页面渲染")
    }, [])
    const result = useMemo(() => addNumber(count, count2), [count])
    console.log("父组件渲染")
    return (<div>
        <TodoList/>
        <div>123---{count} --- result -- </div>
        <button onClick={add}>+</button>
        {/*<button onClick={addNumber}>相加计算</button>*/}
        <TestSon changeCount={changeCount}/>
    </div>)
    function add (){
        setCount(count + 1)
    }
    function addNumber (count:number, count2:number){
        /*console.log('计算之后的结果', count, count2)
        return count + count2*/
        GetMainResumeList().then((res:ResponseParam) => {
            const { code, data } = res
            if (code === "200") {
                console.log(data.data)
            }
        })
    }
    function changeCount(num: number) {
        console.log(num)
    }
    /*const changeCount = useCallback((num: number)=>{
        setCount(num)
    }, [])*/
}

// const Test = () => []

export default Test