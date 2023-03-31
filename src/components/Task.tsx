import styles from './Task.module.css'
import { Trash } from 'phosphor-react';
import { useState, ChangeEvent } from 'react';

interface TaskProps {
    id: string, 
    title: string, 
    isCompleted: boolean, 
    OnDeleteTask: (id: string) => void
    OnCheckTask: (id: string) => void
}

export function Task({ id, title, isCompleted, OnDeleteTask, OnCheckTask }:TaskProps) {

    function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
        OnCheckTask(id)
    }

    function handleDeleteTask() {
        OnDeleteTask(id)
    }

    
    return (
        
            <li key= { id } >
                <div className = { styles.task }>
                    <label>
                        <input 
                            type="checkbox"
                            id= { id }
                            onChange= { handleCheckboxChange }
                        />
                        <p className= { isCompleted ? styles.completed : styles.incomplete }>{ title }</p>
                    </label>
                    
                    <button
                            type='button'
                            title='delete' >
                            <Trash size={24}
                            onClick={ handleDeleteTask }
                     />
                    </button>
                </div>
            </li>
        
    )
}