import express from "express"
import cors from "cors"

const [USER, tweets] = [{}, []]

const PORT = 5000
const app = express()
app.use(cors())
app.use(express.json())

app.post("/sign-up", (req, res) => {
	const data = req.body
	USER.username = data.username
	USER.avatar = data.avatar
	res.send(USER)
})

app.get("/tweets", (req, res) => {
	res.send(tweets)
})

app.listen(PORT, () => {
  console.log(`app initialized on port ${PORT}`)
})