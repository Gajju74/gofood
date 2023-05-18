const express = require("express");
const app = express();
const cors = require("cors");
const mongoDB = require("./db");
mongoDB();
const PORT = process.env.PORT || 8000

app.get('/', function(req, res) {
  res.send('hello world')
});

app.use(cors());
app.use(express.json())
app.use('/api', require("./routes/CreateUser"))
app.use('/api', require("./routes/DisplayData"))
app.use('/api', require("./routes/OrderData"))


app.listen(PORT, function(req, res) {
  console.log(`Server start at port no ${PORT}`);
});