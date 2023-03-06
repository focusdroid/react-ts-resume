import TestSon from './TestSon'
import {useEffect, useMemo, useState} from "react";
import {GetMainResumeList} from "../../api";
import {ResponseParam} from "../../utils/type";
import { connect } from 'react-redux'
import TodoList from './TodoList'
const Test = (props:any) => {
    let [count, setCount] = useState<number>(0)
    let [count2, setCount2] = useState<number>(12)
    /*useEffect(() => {
        console.log(props.value.counter.values)
    }, [])*/
    // const [count,setCount] = useState(0);

    /*useEffect(() => {
        let timer = setInterval(() => {
            setCount(count + 1);
        }, 500);
        return () => clearInterval(timer);
    }, [count]);

    useEffect(() => {
        let timer = setInterval(() => {
            console.log(count);
        }, 500);
        return () => clearInterval(timer);
    }, [count]);*/
    // useMemo(() => addNumber(count, count2), [count])
    return (<div>
        <TodoList/>
        <h2>values {props.value.counter.values}</h2>
        <h2>name {props.value.user.user.name}</h2>
        <div>123---{count} --- result -- </div>
        <button onClick={add}>+</button>
        {/*<button onClick={addNumber}>相加计算</button>*/}
        <TestSon changeCount={changeCount}/>
    </div>)
    function add (){
        setCount(count + 1)
    }
    function addNumber (count:number, count2:number){
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
const mapStateToProps = (state: any, _:any) => ({
    value: state
})

const mapDispatchToProps = {
    // ... normally is an object full of action creators
}
export default connect(mapStateToProps, mapDispatchToProps)(Test)
