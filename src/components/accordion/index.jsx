import { useState } from "react"
import data from "./data"
import './styles.css'


export default function Accordion() {
    const [selected, setSelected] = useState(null)
    const [enableMultipleSelect, setEnableMultipleSelect] = useState(false)
    const [multiple, setMultiple] = useState([])

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId)
    }

    function handleMultiSelection(getCurrentId) {
        let cpyMultiple = [...multiple]
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId)

        findIndexOfCurrentId === -1 ? cpyMultiple.push(getCurrentId) : cpyMultiple.splice(findIndexOfCurrentId, 1)
        setMultiple(cpyMultiple)
    }


    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultipleSelect(!enableMultipleSelect)}>Enable Multiple Selection</button>
            <div className="accordion">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div className="item">
                            <div onClick={
                                enableMultipleSelect
                                    ? () => handleMultiSelection(dataItem.id)
                                    : () => handleSingleSelection(dataItem.id)}
                                className="title">
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                enableMultipleSelect
                                    ? multiple.indexOf(dataItem.id) !== -1 && (
                                        <div className="content">{dataItem.answer}</div>
                                    )
                                    : selected === dataItem.id && (
                                        <div className="content">{dataItem.answer}</div>
                                    )
                            }
                            <div className=""></div>
                        </div>
                    ))
                ) : (
                    <div>There is no data found!!</div>
                )}
            </div>
        </div>
    )
}