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
    const ticker = req.body.ticker;
    let response;
    if(ticker){
      req.method = 'POST';
      response = 
    }

    res.status(200).send({
      bot: response.data.choices[0].message.content,
    });

    // Esperar antes de hacer la próxima solicitud
    await delay(1000); // Espera 1 segundo
  } catch (error) {
    console.log(error);
    alert(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () =>
  console.log("El servidor está en https://localhost:5000")
);
