const Contenedor = require("./class.js");

const express = require("express"); /*Import express*/
const app = express(); /*Server app*/
app.use(express.json()); /*Transform to json*/
app.use(
  express.urlencoded({ extended: true }) /*Receives a parameter for the body*/
);

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

const objetoContenedor = new Contenedor("productos.txt");

async function allFunctionsContenedor() {
  // await objetoContenedor.save(p1);
  // await objetoContenedor.save(p2);
  // await objetoContenedor.save(p3);
  // await objetoContenedor.save(p4);
  // await objetoContenedor.getAll();
  //await objetoContenedor.getById(3);
  //await objetoContenedor.deleteById(5);
  //await objetoContenedor.deleteAll();
}
allFunctionsContenedor();

app.get("/", (req, res) => {
  //eslint-disable-next-line no-undef
  res.sendFile(__dirName + "./index.html");
});

//All the products
app.get("/api/productos", async (req, res) => {
  let productos = await objetoContenedor.getAll();
  res.status(200).send(productos);
});

//A product by id
app.get("/api/productos/:id", async (req, res) => {
  let productos = await objetoContenedor.getAll();
  const { id } = req.params;
  try {
    //No me toma el caso de que sea un producto que no exista
    if (productos[id - 1] !== undefined);
    {
      res.status(200).send(productos[id - 1]);
    }
  } catch (error) {
    res.status(400).json({ error: "Producto no encontrado" });
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
