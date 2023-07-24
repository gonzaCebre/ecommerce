//Va a importar data a la base de datos. Es un script separado a nuestra aplicacion, funciona independiente

import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //Limpia la base de datos
    await Order.deleteMany(); //Elimina toda la data
    await Product.deleteMany();
    await User.deleteMany();

    //Pasa la nueva data
    const createdUsers = await User.insertMany(users); //Inserta los usuarios creados

    const adminUser = createdUsers[0]._id; //Porque es el que figura primero en el array

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; //Trae toda la info del producto y setea como si hubiera sido el admin el que lo creó
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported".green.inverse);
    process.exit(); //Termina el proceso
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); //El "1" significa que finaliza el proceso con un error
  }
};

const destroyData = async () => {
  try {
    //Limpia la base de datos
    await Order.deleteMany(); //Elimina toda la data
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed".red.inverse);
    process.exit(); //Termina el proceso
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); //El "1" significa que finaliza el proceso con un error
  }
};

//Al ejecutar el comando si se le pasa un segundo argumento "-d" destruye la data, sino la crea
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
