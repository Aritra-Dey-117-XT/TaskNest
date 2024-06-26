"use client"

import {useState, useEffect, useRef} from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import TimeInput from "@/components/TimeInput"
import {toast} from "react-hot-toast"

export default function TodoList() {

    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const [expired, setExpired] = useState(false)
    const [fTime, setFTime] = useState("00:00");
    const [time, setTime] = useState("00:00");
    const [alert, setAlert] = useState(-1)
    const [user, setUser] = useState("")
    const [isAddFieldEmpty, setAddFieldEmpty] = useState(true)
    const [isUpdateFieldEmpty, setUpdateFieldEmpty] = useState(true)
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [editing, setEditing] = useState(-1)
    const [editedTask, setEditedTask] = useState("")
    const [newTask, setNewTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [todo, setTodo] = useState({
        task: "",
        user: "",
        date: ""
    })

    useEffect(() => {
        if(!user) {
            getUser()
        }
        getTasks()
    }, [user])

    useEffect(() => {
        (Date.parse(date) < Date.parse(new Date().toISOString().slice(0, 10))) ? setExpired(true) : setExpired(false)
        if(inputRef.current) {
            inputRef.current!.value = ""
        }
        setEditing(-1)
        setAlert(-1)
        getTasks()
    }, [date])

    useEffect(() => {
        setEditing(-1)
        setAlert(-1)
        setTodo({task: newTask, user: user, date: date})
    }, [newTask])

    useEffect(() => {
        (todo.task) ? setAddFieldEmpty(false) : setAddFieldEmpty(true);
        (editedTask) ? setUpdateFieldEmpty(false) : setUpdateFieldEmpty(true)
    }, [todo.task, editedTask])

    const getUser = async () => {
        if(!user) {
            const response = await axios.get("/api/users/me")
            setUser(response.data.data.email)
        } 
    }

    const getTasks = async () => {
        const getResponse = await axios.post("/api/todos/getAllTasks", {user: user, date: date})
        setTasks(getResponse.data.allTasks)
    }

    const onAdd = async () => {
        if(inputRef.current) {
            inputRef.current.value = ""
        }
        const postResponse = await axios.post("/api/todos/addNewTodo", {todo: todo})
        console.log(postResponse)
        getTasks()
        setTodo({task: "",  user: user, date: date})
    }

    const handleCheck = async (id: any, index: any, check: boolean) => {
        toast.dismiss()
        toast.loading("Loading", {duration: 1500})
        await axios.post("api/todos/setChecked", {id: id})
        getTasks()
    }

    const onDelete = async (id: any) => {
        const response = await axios.post("/api/todos/deleteTodo", {id: id})
        console.log(response)
        getTasks()
    }

    const onEdit = (index: any, task: any) => {
        setEditing(index) 
        setEditedTask(task)
    }

    const onUpdate = async (id: any, editedtask: string) => {
        const response = await axios.post("/api/todos/editTodo", {id: id, newTask: editedTask})
        console.log(response)
        setEditing(-1)
        getTasks()
    }

    const handleEdit  = (task: any) => {
        setEditedTask(task)
    }

    const cancelEdit = () => {
        setEditedTask("")
        setEditing(-1)
    }

    const onAlert = (index: any, task: any) => {
        const now = new Date();
        let alertHours = `0${now.getHours()}`.slice(-2);
        let alertMinutes = `0${now.getMinutes()}`.slice(-2);
        const newFTime = `${alertHours}:${alertMinutes}`;
        setFTime(newFTime)
        setAlert(index)
    }

    const onSetAlert = async () => {
        toast.dismiss()
        toast.loading("Loading...")
        const response = await axios.post("api/todos/todoAlert", {email: user, task: tasks[alert]["task"], date: date, time: time})
        toast.dismiss()
        toast.success(response.data.message)
        onAlertCancel()
    }

    const onAlertCancel = () => {
        const now = new Date();
        let alertHours = `0${now.getHours()}`.slice(-2);
        let alertMinutes = `0${now.getMinutes()}`.slice(-2);
        const newFTime = `${alertHours}:${alertMinutes}`;
        setFTime(newFTime)
        setAlert(-1)
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (dateRef.current && event.key !== 'Tab') {
                event.preventDefault();
            }
        };

        if (dateRef.current) {
            dateRef.current.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (dateRef.current) {
                dateRef.current.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4 flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <button 
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mb-2 rounded-lg transition duration-300"
                    onClick={() => router.push("/profile")}
            >Go To Profile</button>
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Your ToDos</h1>
            <label htmlFor="dateInput" className="block text-gray-600">Select Date:</label>
            <input
                type="date"
                name="dateInput"
                id="dateInput"
                ref={dateRef}
                className="w-full p-2 border rounded mt-2 mb-4"
                value={date || new Date().toISOString().slice(0, 10)}
                onChange={(event) => setDate(event.target.value)}
                min={`${new Date().getFullYear()}-01-01`}
                max={(new Date().getFullYear() + 1) + date.slice(4, 10)}
            />

            {!expired && (
                <>
                    <label htmlFor="todoInput" className="block text-gray-600">Enter A New Task:</label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            name="todoInput"
                            id="todoInput"
                            placeholder="Your Task"
                            ref={inputRef}
                            onChange={(event) => setNewTask(event.target.value)}
                            required
                            autoComplete="off"
                            className="w-full p-2 border rounded mt-2"
                        />
                        <button
                            className={`bg-green-500 text-white p-2 ml-2 rounded ${isAddFieldEmpty ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                            onClick={onAdd}
                            disabled={isAddFieldEmpty}
                        >Add</button>
                    </div>
                </>
            )}
        </div>

        <ul className="mt-6 w-full max-w-md">
            {!tasks.length && (
                <p className="text-lg text-red-400 bg-white p-4 rounded-lg shadow-md">Seems like there are No Tasks. If you think there are any Tasks, Please Reload the Page.</p>
            )}
            {tasks.map((item, index) => {
                const { id, task, checked: check } = item;
                return (
                    <li key={id} className={` ${expired ? "bg-gray-300" : "bg-white"} shadow-md rounded-lg p-4 mb-4 flex items-center justify-between transform transition-all duration-300 hover:scale-105`}>
                        {editing !== index ? (
                            <div className="flex items-center w-full">
                                <input
                                    type="checkbox"
                                    name="checkbox"
                                    id="checkbox"
                                    className="mr-4"
                                    onChange={() => {}}
                                    onClick={() => {handleCheck(id, index, check)}}
                                    checked={check}
                                />
                                <p className={`flex-1 ${check ? "text-gray-400 line-through" : ""} ${expired ? "opacity-60" : ""}`}>
                                    {index + 1}. {task} {expired && (!check) && (<span className="text-red-700 font-bold text-lg bg-yellow-500 rounded-full p-2 m-2">MISSED!</span>)}
                                </p>
                                {!check && (alert != index) && (!expired) && (
                                    <>
                                        <button
                                            className="bg-blue-500 text-white p-2 ml-2 rounded hover:bg-blue-600"
                                            onClick={() => onEdit(index, task)}
                                        >Edit</button>
                                        <button
                                            className="bg-pink-500 text-white p-2 ml-2 rounded hover:bg-pink-600"
                                            onClick={() => onAlert(index, task)}
                                        >Alert</button>
                                    </>
                                )}

                                {(alert != index) && (<button
                                    className="bg-red-500 text-white p-2 ml-2 rounded hover:bg-red-600"
                                    onClick={() => onDelete(id)}
                                >Delete</button>)}

                                {(alert == index) && 
                                    (
                                        <div className="block">
                                            { (Date.parse(date) != Date.parse(new Date().toISOString().slice(0, 10))) ? (
                                                <input
                                                    type="time"
                                                    name="timeInput"
                                                    id="timeInput"
                                                    value={fTime}
                                                    onChange={(event) => setFTime(event.target.value)}
                                                    className="w-24 p-2 m-2 border-2 border-blue-500 rounded-md text-blue-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                                />
                                            ) : 
                                                (<TimeInput time={time} setTime={setTime}/>)
                                            }  
                                            <button 
                                                type="button"
                                                onClick={onSetAlert}
                                                className="bg-green-500 text-white p-2 ml-2 rounded hover:bg-green-600"
                                            >Set Alert</button>
                                            <button 
                                                type="button"
                                                onClick={onAlertCancel}
                                                className="bg-red-500 text-white p-2 ml-2 rounded hover:bg-red-600"
                                            >Cancel</button>
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <div className="flex items-center w-full">
                                <input
                                    type="text"
                                    name="editInput"
                                    id="editInput"
                                    value={editedTask}
                                    onChange={(event) => handleEdit(event.target.value)}
                                    required
                                    autoComplete="off"
                                    className="w-full p-2 border rounded"
                                />
                                <button
                                    className={`bg-blue-500 text-white p-2 ml-2 rounded ${isUpdateFieldEmpty ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                                    onClick={() => onUpdate(id, editedTask)}
                                    disabled={isUpdateFieldEmpty}
                                >Update</button>
                                <button
                                    className="bg-red-500 text-white p-2 ml-2 rounded hover:bg-red-600"
                                    onClick={cancelEdit}
                                >Cancel</button>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>

    </div>
    )
}