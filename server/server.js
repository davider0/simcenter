import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

var apiKey = "35762281ZovmnIuZgETxpJAeGMYusMTOeCjZj";
const corsOptions = {
  origin: 'http://localhost:5173/',
}
const app = express();
app.use(cors(corsOptions));
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
        async function run() {
          const resp = await fetch(
            `https://live.trading212.com/api/v0/equity/metadata/exchanges`,
            {
              method: "GET",
              headers: {
                Authorization: "35762281ZovmnIuZgETxpJAeGMYusMTOeCjZj",
              },
            }
          );

          const data = await resp.text();
          res.status(200).send({
            bot: data,
          });
        }
        run();
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
