import React, {useState} from 'react'
import FileDropZoneTest from '../../utils/FileDropZoneTest'

const OptionTest = [
    {key:1, value:"옵션1"}, 
    {key:2, value:"옵션2"}, 
    {key:3, value:"옵션3"}, 
]


function Write() {
    const [WriteIntputChg1, setWriteIntputChg1] = useState("");
    const [TestSelchg, setTestSelchg] = useState(1)
    const inputChg1 = (e) => {
        setWriteIntputChg1(e.currentTarget.value);
    }

    const testSelectChangeHandler = (e) => {
        setTestSelchg(e.currentTarget.value);
    }
    

    return (
        <div>
            <h1>테스트 글쓰기</h1>
            <FileDropZoneTest />
            <input type="text" onChange={inputChg1} value={WriteIntputChg1} />
            <select onChange={testSelectChangeHandler} value={TestSelchg}>
                {OptionTest.map(item => (
                    <option key={item.key} value={item.key}>{item.value}</option>
                )) }
                
            </select>
        </div>
    )
}

export default Write;
