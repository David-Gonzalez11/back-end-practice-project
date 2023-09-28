import React, { Fragment, useState, useEffect } from "react"
import EditTodo from "./EditTodo"

const ListTodos = () => {
  const [list, setList] = useState([])

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5001/todos")
      const jsonData = await response.json()
      setList(jsonData)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const toDelete = await fetch(`http://localhost:5001/todos/${id}`, {
        method: "DELETE",
      })
      setList(list.filter((listItem) => listItem.todo_id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])
  return (
    <Fragment>
      <div>
        {list.map((todo) => {
          return (
            <div className="d-flex" key={todo.todo_id}>
              <li>{todo.description}</li>
                <EditTodo todo={todo} />

              <span>
                <button onClick={() => handleDelete(todo.todo_id)}>
                  Delete
                </button>
              </span>
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}

export default ListTodos
