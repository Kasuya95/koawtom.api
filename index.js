require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

app.use(cors());

const connection = mysql.createConnection(process.env.DATABASE_URL);

app.get("/", (req, res) => {
    console.log("Hello express");
    res.send("Hello");
  });

app.get("/food", (req, res)=> {
    connection.query("SELECT * From food", function (err, results, fields){
        res.send(results);
    });
});

app.get("/menu", (req, res) => {
    connection.query("SELECT * FROM menu", function (err, results, fields) {
      res.send(results);
    });
  });
  
  app.get("/foodmenu", (req, res) => {
    connection.query("SELECT Food_ID, FoodName, Price, Menu_Name FROM food , menu Where food.Menu_ID = menu.Menu_ID ", function (err, results, fields) {
      res.send(results);
    });
  });
  
  app.post("/addmenu", function (req, res)  {
    connection.query("INSERT INTO `menu`(`Menu_ID`, `Menu_Name`) VALUES (?,?)",
      [req.body.menuID, req.body.Menu_Name],
  
      function (err, results) {
        if (err) throw err;
        return res.send({
          err: false,
          data: results,
          message: "New menu has been created successfully.",
        });
      }
    );
  });
  
  
  
  app.listen(process.env.PORT || 1111);
  