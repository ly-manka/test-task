import express from "express";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes";
import dataRoutes from "./routes/dataRoutes";
import { PORT } from "./constantas";

const app = express();
app.use(cors());

const port = PORT || 5000;

app.use("/recipes", recipeRoutes);
app.use("/data", dataRoutes);

app.get("/hi", (req, res) => {
  res.send("Welcome to the Recipe API");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
