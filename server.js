const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

async function getConnection() {
  return await mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "ep2db",
  });
}

app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend + MySQL funcionando"
  });
});

app.get("/items", async (req, res) => {
  try {
    const connection = await getConnection();

    const [rows] = await connection.execute(
      "SELECT * FROM items"
    );

    await connection.end();

    res.json(rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error base de datos"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo puerto ${PORT}`);
});