const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
var path = require("path")
app.use(cors())

app.use(express.json())
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query(
      "Insert into todo(description)  values($1) returning *",
      [description]
    )
    res.json(newTodo.rows[0])
  } catch (err) {
    console.error(err)
  }
})
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM TODO")
    res.json(allTodos.rows)
  } catch (err) {
    console.error(err)
  }
})

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    res.json(todo.rows[0])
    console.log(id)
  } catch (err) {
    console.error(err)
  }
})

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updateTodo = await pool.query(
      "UPDATE todo SET description  = $1 WHERE todo_id = $2",
      [description, id]
    )
    res.json("todo was updated")
  } catch (error) {
    console.error(error)
  }
})
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ])
    res.json("todo was deleted")
  } catch (error) {
    console.error(error)
  }
})
app.listen(5001, () => {
  console.log("server is listening on port 5001")
})
