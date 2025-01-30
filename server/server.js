import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

var apiKey = "35762281ZovmnIuZgETxpJAeGMYusMTOeCjZj";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
  res.status(200).send({
    message: "que te cuentas",
  });
});

app.post("/", async (req, res) => {
  try {
    switch (req.body.phase) {
      case 1:
        {
          const resp = await fetch(
            `https://live.trading212.com/api/v0/equity/metadata/exchanges`,
            {
              method: "GET",
              headers: {
                Authorization: apiKey,
              },
            }
          );
          res.status(200).send({
            bot: resp,
          });
        }
        break;
    }
  } catch (error) {
    console.log(error);
    alert(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () =>
  console.log("El servidor está en https://localhost:5000")
);
