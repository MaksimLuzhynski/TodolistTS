import { ChangeEvent, KeyboardEvent, useState } from "react"

export type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editeMode, setEditeMode] = useState(false)
    let [title, setTitle] = useState("")

    const activeteEditMode = () => {
        setEditeMode(true);
        setTitle(props.title);
    };

    const activeteViewMode = () => {
        setEditeMode(false);
        props.onChangeTitle(title);
    };

    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    return (
        editeMode
            ? <input
                value={title}
                onChange={onTitleChangeHandler}
                onBlur={activeteViewMode}
                autoFocus>
            </input>
            : <span onDoubleClick={activeteEditMode}>{props.title}</span>
    )
}