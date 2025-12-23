import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const PORT = process.env.PORT || 2000;

//middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
import authRoute from "./src/routes/authRoute.js";
import adminRoute from "./src/routes/adminRoute.js";
import productRoute from "./src/routes/productRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admins", adminRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", categoryRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Its live",
  });
});

//error handler
import { errorHandler } from "./src/middlewares/errorHandler.js";
app.use(errorHandler);

//dbconnecton & servr start
import { dbConnect } from "./src/config/dbConfig.js";

dbConnect()
  .then(() => {
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
