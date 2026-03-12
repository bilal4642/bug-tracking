const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { db } = require("./helpers");

const routes = require("./routes");
const app = express();
app.get("/test", (req:any, res:any) => {
  res.send("working");
});
// app.get("/", (req: any, res: any) => {
//   res.send("Hello");
// });

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"))

app.use("/", routes);

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log("Database connected....");
  } catch (error) {
    console.log("Database Connection Error", error);
    process.exit(1);
  }
};

startServer();

app.listen(3000, ()=>{
    console.log("app is running on port 5500"); 
});
