const express =  require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
app.use(cors())

app.use(express.json())
app.post("/todos", async(req, res) => {
  try{
const {description} = req.body
const newTodo = await pool.query("Insert into todo(description)  values($1) returning *",[description] )
res.json(newTodo.rows[0])
  } catch(err){
    console.error(err)
  }
})
app.get("/todos", async(req,res) => {
  try{
const allTodos =  await pool.query("SELECT * FROM TODO")
res.json(allTodos.rows)
  } catch(err){
    console.error(err)
  }
})

app.listen(5001, () => {
  console.log("server is listening on port 5001")
})
