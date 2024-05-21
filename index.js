const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var compiler = require("compilex");
var options = { stats: true };
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
compiler.init(options);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/compile/C", (req, res) => {
  try {
    var { code } = req.body;
    var envData = { OS: "windows" };
    if (!code) {
      return res.status(400).send("No code provided");
    }
    compiler.compileCPP(envData, code, function (data) {
      res.send(data).status(200);
      console.log(data);
    });
  } catch (error) {
    console.log(error);
    res.send(error).status(500);
  }
});

app.post("/compile/Java", (req, res) => {
  try {
    var { code } = req.body;
    var envData = { OS: "windows" };
    if (!code) {
      return res.status(400).send("No code provided");
    }
    compiler.compileJava(envData, code, function (data) {
      res.send(data).status(200);
      console.log(data);
    });
  } catch (error) {
    res.send(error).status(500);
    console.log(error);
  }
});

app.post("/compile/Py", (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).send("No code provided");
    }
    console.log(code);
    var envData = { OS: "windows" };
    compiler.compilePython(envData, code, function (data) {
      res.send(data).status(200);

      console.log(data);
    });
  } catch (error) {
    res.send(error).status(500);
    console.log(error);
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
