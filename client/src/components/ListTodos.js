import React, { Fragment, useState, useEffect } from "react"

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

  const handleDelete = async() =>  {
try{
const toDelete = await (fetch("http://localhost:5001/todos/:id"))
} catch(error){
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
              <span>
                <button>Edit</button>
              </span>

              <span>
                <button delete={handleDelete()}>Delete</button>
              </span>
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}

export default ListTodos
