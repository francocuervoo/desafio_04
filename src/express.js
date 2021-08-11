const Contenedor = require("./class.js");

const express = require("express"); /*Import express*/
const app = express(); /*Server app*/
app.use(express.json()); /*Transform to json*/
app.use(
  express.urlencoded({ extended: true }) /*Receives a parameter for the body*/
);
app.use(express.static("public"));

//Productos
// let p1 = {
//   title: "Heladera",
//   price: 80000,
//   thumbnail: "https://imgur.com/GkEYT7d",
// };

// let p2 = {
//   title: "Lavarropas",
//   price: 60000,
//   thumbnail: "https://imgur.com/RRNmknL",
// };
// let p3 = {
//   title: "Microondas",
//   price: 40000,
//   thumbnail: "https://imgur.com/gSBY8op",
// };

// let p4 = {
//   title: "Televisor",
//   price: 70000,
//   thumbnail: "https://imgur.com/oCD5WBs",
// };

app.get("/", (req, res) => {
  //eslint-disable-next-line no-undef
  res.sendFile(__dirName + "./public/index.html");
});

//All the products
app.get("/api/productos", async (req, res) => {
  let productos = await this.objetoContenedor.getAll();
  res.status(200).send(productos);
});

//A product by id
app.get("/api/productos/:id", async (req, res) => {
  const { id } = req.params;
  let productoId = await objetoContenedor.getById(id);
  try {
    //productoId me devuelve undefined
    if (productoId) {
      res.status(200).send(productoId);
    } else {
      res.status(400).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

// A product random
app.get("/api/productoRandom", async (req, res) => {
  let arrayProducts = await objetoContenedor.getAll();
  let max = arrayProducts.length;
  let randomId = Math.floor(Math.random() * max);
  let randomProduct = arrayProducts[randomId];
  res.send(randomProduct);
});

// Receives and adds a product, and returns it with its assigned id
app.post("/api/productos", async (req, res) => {
  //No funciona
  const { product } = req.body;
  const productSave = await objetoContenedor.save(product);
  res.status(200).send(productSave);
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express corriendo en el puerto ${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

// Commands
// npm run start
// npx eslint --init | configuro el eslint 2 / 2 / 3 / No / No / 3
