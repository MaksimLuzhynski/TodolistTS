import { Button, TextField } from "@material-ui/core";
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
                <TextField
                    onChange={onNewTaskTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    variant={"standard"}
                    label={"Title"}
                    value={newTaskTitle}
                    helperText={error}
                    // className={error ? styles.error : ""}
                    error={!!error}                                   //         ????????????????
                    color={"primary"}
                />
                <Button
                    onClick={addNewTaskTitle}
                    variant={"contained"}
                    style={{ backgroundColor: "#61dafb" }}
                // className={styles.button_color}    //                Подключить стиль в AddItemForm.module.css
                >+</Button>
            </div>
            {/* {error && <div className={styles.error_message}>{error}</div>} */}
        </div>)
}