import { SetStateAction, useState} from 'react'

const TodoList = () => {
    const [text, setText] = useState('')
    const [list, setTodoList] = useState([])
    return <div>
        <div>
            <input type="text" value={text} onChange={(e) => changeInputValue(e.target.value)}/>
            <button onClick={inputText}>新建</button>
        </div>
        {
            list.map((item, i) => {
                return <div key={`${item}${i}`}>
                    <div>{item}</div>
                    <div>
                        <button>删除</button>
                        <button>修改</button>
                    </div>
                </div>
            })
        }
    </div>

    function changeInputValue(value: SetStateAction<string>){
        setText(value)
    }
    function inputText(){
        // @ts-ignore
        list.push(text)
        // @ts-ignore
        setTodoList([...list])
        setText('')
    }
}
export default TodoList