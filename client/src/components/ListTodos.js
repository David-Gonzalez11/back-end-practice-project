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
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}

export default ListTodos
