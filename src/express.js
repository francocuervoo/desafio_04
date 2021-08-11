const Contenedor = require("./class.js");

const objetoContenedor = new Contenedor("productos.json");

const express = require("express"); /*Import express*/
const app = express(); /*Server app*/

// No entendí bien lo del router
// const { Router } = express;
// const routerProducto = new Router();

app.use(express.json()); /*Transform to json*/
app.use(
  express.urlencoded({ extended: true }) /*Receives a parameter for the body*/
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  //eslint-disable-next-line no-undef
  res.sendFile(__dirName + "./public/index.html");
});

//All the products
app.get("/api/productos", async (req, res) => {
  let productos = await objetoContenedor.getAll();
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
  // No funciona, no se como hacer para que en la clase me quede el objeto con las propiedades correctas: title, price, thumbnail, id.
  const { product } = req.body;
  const productSave = await objetoContenedor.save(product);
  res.status(200).send(productSave);
});

// Receives and update a product according the id
app.put("/api/productos/:id", async (req, res) => {
  // No se me ocurre como armar la función de la clase que recibe y actualiza su producto según su id.
  const { id } = req.body;
  const productSave = await objetoContenedor.updateById(id);
  res.status(200).send(productSave);
});

// Delete a product according the id
app.delete("/api/productos/:id", async (req, res) => {
  const { id } = req.params;
  let productoId = await objetoContenedor.deleteById(id);
  try {
    // Funciona pero siempre devuelve "Producto no encontrado", ya que el productoId siempre me devuelve undefined
    if (productoId) {
      res.status(200).send(productoId);
    } else {
      res.status(400).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express corriendo en el puerto ${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

// Commands
// npm run start
// npx eslint --init | configuro el eslint 2 / 2 / 3 / No / No / 3
