import { Button, TextField } from '@mui/material';
import React from "react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from './AddItemForm.module.css'

export type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled=false}: AddItemFormPropsType) => {

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
            addItem(newTaskTitle);
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
                    disabled={disabled}
                    onChange={onNewTaskTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    variant={"standard"}
                    label={"Title"}
                    value={newTaskTitle}
                    helperText={error}
                    // className={error ? styles.error : ""}
                    error={!!error}                                   //         ????????????????
                    color={"primary"}
                    //   sx={{ input: { color: "#61dafb" } }}     // поменять цвет шрифта???
                    //   sx={{ input: { background: "#61dafb" } }}
                />
                <Button
                    disabled={disabled}
                    onClick={addNewTaskTitle}
                    variant={"contained"}
                    style={{ backgroundColor: "#61dafb" }}
                // className={styles.button_color}    //                Подключить стиль в AddItemForm.module.css
                >+</Button>
            </div>
            {/* {error && <div className={styles.error_message}>{error}</div>} */}
        </div>)
})