import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import zenFetchRouter from "./zenFetch.js";
dotenv.config();

const app = express(); 
app.use(cors());
app.use(express.json()); 
app.get("/", async (req, res) => {
res.status(200).send({
    message: "que te cuentas",
  });
});

app.use("/api", zenFetchRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

