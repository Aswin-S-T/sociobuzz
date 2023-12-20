const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true, userId: user.id });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
