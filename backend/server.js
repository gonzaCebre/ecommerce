import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from 'cors'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config(); //Inicializa las variables de entorno

connectDB(); //Conecta con la base de datos

const app = express(); //Inicializa express

//Body parser middleware
app.use(express.json()); //Para que pueda recibir JSONS en el body
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//Cookie parser middleware
app.use(cookieParser()); //Nos permite acceder a las cookies

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes); //Todo lo que vaya a '/api/products' lo va a procesar productRoutes
app.use("/api/users", userRoutes); //Todo lo que vaya a '/api/users' lo va a procesar productRoutes
app.use("/api/orders", orderRoutes); //Todo lo que vaya a '/api/orders' lo va a procesar productRoutes
app.use("/api/upload", uploadRoutes); //Todo lo que vaya a '/api/upload' lo va a procesar productRoutes
app.use("/api/payment", paymentRoutes); //Todo lo que vaya a '/api/payment' lo va a procesar productRoutes

app.get('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))
app.get('/api/config/mercadopago', (req, res) => res.send({publicKey: process.env.MERCADOPAGO_PUBLIC_KEY}))

//convirtiendo la carpeta de 'uploads' en estatica
const __dirname = path.resolve(); //Setea __dirname al directorio actual
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


//Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
