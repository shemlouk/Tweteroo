import express from "express";
import cors from "cors";

const [users, tweets] = [[], []];
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
  const data = req.body;
  users.push(data)
  res.send("OK");
});

app.post("/tweets", (req, res) => {
	const data = req.body
	const user = users.find(u => u.username === data.username)
  if (!user) {
    res.sendStatus(401, "UNAUTHORIZED");
    return;
  }
	tweets.push({...data, avatar: user.avatar})
	res.send("OK")
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.listen(PORT, () => {
  console.log(`app initialized on port ${PORT}`);
});