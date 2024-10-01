import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import sequelize from "./db/index.js";
import {
  User,
  Basket,
  BasketDevice,
  Type,
  Device,
  DeviceInfo,
  Rating,
  Brand,
  TypeBrand,
} from "./models/models.js";
import dotenv from "dotenv";
import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
import fileUpload from "express-fileupload";
import { resolve } from "path";
import { __dirname } from "./helper/path.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(resolve(__dirname, 'static')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);

const startApp = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

startApp().catch((err) => {
  console.log(err);
});
