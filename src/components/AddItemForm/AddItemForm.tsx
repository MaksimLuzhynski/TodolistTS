import { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from './AddItemForm.module.css'

export type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<null | string>(null)

    const onNewTaskTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(event.currentTarget.value);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            addNewTaskTitle();
        }
    }

    const addNewTaskTitle = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        }
        else {
            setError("Field is required!");
            setNewTaskTitle("");
        }
    }

    return (
        <div>
            <div>
                <input
                    className={error ? styles.error : ""}
                    value={newTaskTitle}
                    onChange={onNewTaskTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addNewTaskTitle}>+</button>
            </div>
            {error && <div className={styles.error_message}>{error}</div>}
        </div>)
}