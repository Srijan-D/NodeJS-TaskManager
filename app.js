require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notfound");
const errorHandler = require("./middleware/errorhandler");

require("dotenv").config();

//middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(errorHandler);

//routes:controllers
app.use(notFound);
app.use("/api/v1/tasks", tasks);

const port = 3000;
const start = async () => {
  try { 
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is running at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();

console.log("Task Manager App");
