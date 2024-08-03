
import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
    methods: ["POST"],
  })
);

app.use(express.json());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123",
  database: "inventory_management",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

app.post("/addToDb", (req, res) => {
  console.log(req.body)
  const { productName, categoryId, supplierId, quantity, price } = req.body;

  const query = `INSERT INTO products (product_name, category_id, supplier_id, quantity, price, created_at) VALUES (?, ?, ?, ?, ?, NOW())`;
  connection.query(
    query,
    [productName, categoryId, supplierId, quantity, price],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Internal Server Error");
      }

      res.send({message: "product added"})
    }
  );
});

app.listen(port);