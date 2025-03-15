require("dotenv").config();
// console.log("MESSAGE_STYLE: ", process.env.MESSAGE_STYLE);
const bodyParser = require("body-parser");
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
app.use(bodyParser.urlencoded({ extended: false }))

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

app.get('/now', (req, res, next) => {
  req.time= new Date().toString()
  next()
}, (req, res) => {
  res.json({time:req.time})
  
})

app.get('/:word/echo', (req, res, next) => {
  const word=req.params.word
  res.json({echo:word})
})

// app.get('/name', (req, res, next) => {
//   const nombre=req.query.first+' '+req.query.last
//   res.json({name:nombre })
// })

app.route('/name').get((req, res, next) => {
  const nombre=req.query.first+' '+req.query.last
  res.json({name:nombre })

}).post((req, res, next) => {
  const nombre = req.body.first + ' ' + req.body.last
  res.json({name:nombre})
})


module.exports = app;