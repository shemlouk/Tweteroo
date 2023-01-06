import express from "express";
import cors from "cors";

const PORT = 5000;
const TWEETS_PER_PAGE = 10;
const [users, tweets] = [[], []];

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
  const data = req.body;
  if (!data.username || !data.avatar) {
    res.sendStatus(400, "Todos os campos são obrigatórios!");
    return;
  }
  users.push(data);
  res.sendStatus(201, "OK");
});

app.post("/tweets", (req, res) => {
  const data = req.body;
  const username = req.get("user");
  if (!username || !data.tweet) {
    res.sendStatus(400, "Todos os campos são obrigatórios!");
    return;
  }
  const user = users.find((u) => u.username === username);
  if (!user) {
    res.sendStatus(401, "UNAUTHORIZED");
    return;
  }
  tweets.push({ ...user, tweet: data.tweet });
  res.sendStatus(201, "OK");
});

app.get("/tweets", (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  if (page < 1) {
    res.sendStatus(400, "Informe uma página válida!");
    return;
  }
  const [inferiorLimit, superiorLimit] = [
    TWEETS_PER_PAGE * (page - 1),
    page * TWEETS_PER_PAGE - 1,
  ];
  const tweetsSpan = [...tweets]
    .reverse()
    .filter((t, index) => index >= inferiorLimit && index <= superiorLimit);
  res.status(200).json(tweetsSpan);
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  const tweetsFromUser = tweets.filter((t) => t.username === username);
  res.status(200).json(tweetsFromUser);
});

app.listen(PORT, () => {
  console.log(`app initialized on port ${PORT}`);
});
