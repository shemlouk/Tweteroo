import express from "express";
import cors from "cors";

const [users, tweets] = [[], []];
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
  const data = req.body;
	if (!data.username || !data.avatar) {
		res.sendStatus(400, "Todos os campos são obrigatórios!")
		return
	}
  users.push(data);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const data = req.body;
	if (!data.username || !data.tweet) {
		res.sendStatus(400, "Todos os campos são obrigatórios!")
		return
	}
  const user = users.find((u) => u.username === data.username);
  if (!user) {
    res.sendStatus(401, "UNAUTHORIZED");
    return;
  }
  if (tweets.length >= 10) tweets.splice(0, 1);
  tweets.push({ ...data, avatar: user.avatar });
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.listen(PORT, () => {
  console.log(`app initialized on port ${PORT}`);
});
