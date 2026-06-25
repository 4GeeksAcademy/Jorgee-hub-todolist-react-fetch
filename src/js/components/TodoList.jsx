import { useEffect, useState } from "react";

const TodoList = () => {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);
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
    useEffect(() => {
        loadTodos();
    }, []);
    const keyboardControl = (event) => {
        if (event.key === "Enter") {
            addTask(task)
            setTask("");
        }
    }
    const deleteTask = async (id) => {
        try {
            await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE"
            });
            loadTodos();
        } catch (error) {
            console.log(error);
        }
    }
    const addTask = async (label) => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/Jorgee-hub", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ label: label, is_done: false })
            });
            const newTodo = await response.json();
            setList([...list, newTodo]);
        } catch (error) {
            console.log(error);
        }
    }
    const clearAll = async () => {
        try {
            await Promise.all(list.map((item) => deleteTask(item.id)));
            setList([]);
        } catch (error) {
            console.log(error);
        }
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
                            {item.label}
                            <span className="deleteBtn text-secondary" onClick={() => deleteTask(item.id)}>x</span>
                        </li>
                    ))}
                </ul>
                <footer className="m-1 text-secondary">
                    {list.length} {list.length === 1 ? "item left" : "items left"}
                </footer>
            </div>
            <div className="mt-3 d-flex justify-content-center"><button className=" clearBtn btn btn-dark text-light" onClick={clearAll}>Limpiar lista</button></div>
        </>
    )
}
export default TodoList;
