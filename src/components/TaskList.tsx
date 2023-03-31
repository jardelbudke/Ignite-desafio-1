import styles from './TaskList.module.css'
import iconPlusButton from '../assets/plus-icon-button.svg'
import clipboardImg from '../assets/clipboard.svg'
import { Task } from './Task'
import { v4 as uuidv4 } from 'uuid'
import { useState, MouseEvent, ChangeEvent, useEffect } from 'react'

interface TaskProps {
    id: string,
    isCompleted: boolean, 
    title: string
}



export function TaskList() {

    const [newTextTask, setNewTextTask] = useState('')

    const [tasks, setTasks] = useState<TaskProps[]>([])

    const [completedTasks, setCompletedTasks] = useState(0)

    const [createdTasks, setCreatedTasks] = useState(0)

    function handleChangeTextNewTask(event : ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setNewTextTask(event.target.value)
    }

    function handleCreateTask(event: MouseEvent) {
        event.preventDefault()
        
        if(!newTextTask) {
            alert('O campo não pode ser vazio.');
            return
        }

        const newTask = {
            id: uuidv4(),
            isCompleted: false,
            title: newTextTask
        } 

        setTasks([...tasks, newTask])
        setNewTextTask('')
    
    }

    function deleteTask(taskToDelete:string) {

        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task.id !== taskToDelete
        })
        setTasks(tasksWithoutDeletedOne)

    }

    function checkBoxTaskChange(id:string) {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
              return { ...task, isCompleted: !task.isCompleted }
            } else {
              return task
            }
          })
          setTasks(updatedTasks)
        
    }

    function checkTasksCreatedAndCompleted() {
        let completed = 0
        tasks.filter(task => {
            if(task.isCompleted) completed ++
        })

        setCompletedTasks(completed)
        setCreatedTasks(tasks.length)
    }
    

    useEffect(() => {
        checkTasksCreatedAndCompleted()
    }, [tasks])


    return (
        <section className= { styles.sectionNewTask }>
            <form className={ styles.formNewTask }>
                <input 
                    type="text" 
                    placeholder="Adicione uma nova tarefa"
                    value= { newTextTask }
                    onChange= { handleChangeTextNewTask }
                />
                <button 
                    type="submit"
                    onClick= { handleCreateTask }>
                    Criar
                    <img src= { iconPlusButton } alt="" />
                </button>
            </form>
            <main>
                <header>
                    <span>
                        Tarefas criadas <span className= { styles.counter }>{createdTasks}</span>
                    </span>
                    <span>
                        Concluídas <span className= { styles.counter }>{`${completedTasks} de ${createdTasks}`}</span>
                    </span>
                </header>
               {tasks.length === 0 ? (
                    <div className= { styles.emptyTask }>
                        <img src= { clipboardImg } alt="" />
                        <p>Você ainda não tem tarefas cadastradas</p>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                ) : (
                    <section className= { styles.taskList }>
                        <ul>
                            {
                                tasks.map(task => {
                                    return ( 
                                        <Task 
                                            key= { task.id }
                                            id= { task.id }
                                            title= { task.title }
                                            isCompleted= { task.isCompleted }
                                            OnDeleteTask= { deleteTask }
                                            OnCheckTask = { checkBoxTaskChange }
                                        />
                                    )
                                })
                            }
                        </ul>
                    </section>
                )
               }
                
            </main>
        </section>
    )
}