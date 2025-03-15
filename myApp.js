require("dotenv").config();
console.log("MESSAGE_STYLE: ", process.env.MESSAGE_STYLE);
let express = require("express");
let app = express();
console.log("Hello World");

const absolutePath = __dirname + "/views/index.html";
const assetsPath = __dirname + "/public";

app.use((req, res, next) => {
  var string = req.method + ' ' + req.path + ' - ' + req.ip;
  console.log(string);
  next();
});
app.get("/",  (req, res) => {
  // res.send('Hello Express')
  res.sendFile(absolutePath);
});

app.use("/public", express.static(assetsPath));

app.get("/json", (req, res) => {
  var message = "Hello json";
  

  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = message.toUpperCase();
  } else {
    response = message;
  }
  res.json({ message: response });
});





module.exports = app;