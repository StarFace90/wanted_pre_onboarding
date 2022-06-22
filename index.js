const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
const port = 4000;

const company_router = require("./routes/company");
const recruit_router = require("./routes/recruit");
const user_router = require("./routes/user");
const apply_router = require("./routes/applicant");

app.use("/company", company_router);
app.use("/user", user_router);
app.use("/recruit", recruit_router);
app.use("/applicant", apply_router);

app.get("/", (req, res) => {
  res.status(200);
  res.send("<h1>wanted_pre_onboarding</h1>");
});

app.listen(port, () => {
  console.log(`http://localhost${port} 에서 서버가 실행됩니다.`);
});
