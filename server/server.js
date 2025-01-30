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
  switch (req.body.phase) {
    case 1: {
      try {
        console.log("hola soy el backend no se que coño hago con mi vida");
        const resp = await fetch(
          `https://live.trading212.com/api/v0/equity/metadata/exchanges`,
          {
            method: "GET",
            headers: {
              Authorization: apiKey,
            },
          }
        );
        console.log(JSON.stringify(resp.json()));
        res.status(200).send({
          bot: resp.json(),
        });
      } catch (error) {
        console.log(error);
        alert(error);
        res.status(500).send({ error });
      }
      break;
    }
  }
});

app.listen(5000, () =>
  console.log("El servidor está en https://localhost:5000")
);
