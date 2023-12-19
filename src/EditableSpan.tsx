import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    oldTitle: string
    callBack:(newTitle:string)=>void
}

export const EditableSpan = (props: EditableSpanProps) => {
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const activateEditHandler=()=>{
        setEdit(!edit)
        props.callBack(newTitle)
    }

    return (
        edit
            ? <input value={newTitle} onBlur={activateEditHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={activateEditHandler}>{props.oldTitle}</span>
    );
};

