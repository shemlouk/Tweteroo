import express from "express";
import cors from "cors";

const [user, tweets] = [{}, []];
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
  const data = req.body;
  user.username = data.username;
  user.avatar = data.avatar;
  res.send(user);
});

app.post("/tweets", (req, res) => {
  if (!user.username) {
    res.sendStatus(401, "UNAUTHORIZED");
    return;
  }
	const data = req.body
	tweets.push({...data, avatar: user.avatar})
	res.send("OK")
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.listen(PORT, () => {
  console.log(`app initialized on port ${PORT}`);
});