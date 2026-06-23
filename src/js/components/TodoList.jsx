import { useEffect, useState } from "react";

const TodoList = () => {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const response = await fetch("https://playground.4geeks.com/todo/users/Jorgee-hub");
                const data = await response.json();
                console.log(data);
                setList(data.todos)
            } catch (error) {
                console.log(error);
            }
        }
        loadTodos();
    }, []);
    const keyboardControl = (event) => {
        if (event.key === "Enter") {
            setList([...list, task])
            setTask("");
        }
    }
    const deleteTask = (indexToDelete) => {
        const newList = list.filter((_, index) => index !== indexToDelete);
        setList(newList);
    }
    return (
        <>
            <div className="d-flex justify-content-center">
                <h1 className="text-dark">To-do list</h1>
            </div>
            <div className="todo-box">{/* Contenedor principal */}
                <input value={task} onKeyDown={keyboardControl} type="text" placeholder="Agregar nueva tarea" onChange={(e) => { setTask(e.target.value) }} />
                <ul>{/* lista de tareas */}
                    {list.map((item, index) => (
                        <li key={index}>
                            {item}
                            <span className="deleteBtn text-secondary" onClick={() => deleteTask(index)}>x</span>
                        </li>
                    ))}
                </ul>
                <footer className="m-1 text-secondary fs-6">
                    {list.length} {list.length === 1 ? "item left" : "items left"}
                </footer>
            </div>
        </>
    )
}
export default TodoList;
