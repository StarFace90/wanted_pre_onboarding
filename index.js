const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

const port = 4000;

app.get("/", (req, res) => {
  res.status(200);
  res.send("<h1>wanted_pre_onboarding</h1>");
});

app.listen(port, () => {
  console.log(`http://localhost${port} 에서 서버가 실행됩니다.`);
});
