/*Importo el módulo fs*/ const fs = require("fs");

//Clase Contenedor
class Contenedor {
    constructor(fileName) {
      this.fileName = fileName;
      this.id = 0;
      this.data = [];
    }
    //Métodos
    async save(objeto) {
      await this.getAll();
      this.id++;
      this.data.push({
        product: objeto,
        id: this.id,
      });
      try {
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(this.data, null, 2)
        );
        //Devuelvo los id asignados
        return console.log("El id del objeto ingresado es", this.id);
      } catch (error) {
        console.log(error);
      }
    }
  
    async getById(id) {
      await this.getAll();
      try {
        //Busco el objeto con ese id
        const objetoId = this.data.find((dat) => dat.id == id);
        if (objetoId) {
          // return console.log("El objeto con el id", id, "es", objetoId);
          return objetoId;
        }
      } catch (error) {
        return null;
      }
    }
  
    async getAll() {
      //Manejo error con try catch
      try {
        const data = await fs.promises.readFile(this.fileName, "utf-8");
        if (data) {
          //Paso data a un objeto
          this.data = JSON.parse(data);
          this.data.map((producto) => {
            //Obtengo cual es el id máximo del archivo
            if (this.id < producto.id) this.id = producto.id;
          });
          return this.data;
        }
      } catch (error) {
        //Si hay un error que no retorne nada. Que siga.
        return;
      }
    }
  
    async deleteById(id) {
      try {
        const data = await fs.promises.readFile(this.fileName, "utf-8");
        if (data) {
          //Paso data a un objeto
          this.data = JSON.parse(data);
          //Nuevo array sin el objeto con el id pasado
          const objetoSinId = this.data.filter((dat) => dat.id != id);
          //Guardo el nuevo array en el archivo
          await fs.promises.writeFile(
            this.fileName,
            JSON.stringify(objetoSinId, null, 2)
          );
          console.log(`El producto con el id ${id} fue eliminado.`);
        }
      } catch (error) {
        //Si hay un error que no retorne nada. Que siga.
        return;
      }
    }
  
    async deleteAll() {
      this.data = [];
      try {
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(this.data, null, 2)
        );
        return console.log("Se borraron todos los objetos del archivo");
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  module.exports = Contenedor;
  