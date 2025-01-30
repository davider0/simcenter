import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { Configuration } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: "35762281ZovmnIuZgETxpJAeGMYusMTOeCjZj",
});

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
    const prompt = req.body.prompt;
    const response = await fetch(
      `/trading212/api/v0/equity/metadata/instruments`,
      {
        method: "GET",
        headers: {
          Authorization: "35762281ZovmnIuZgETxpJAeGMYusMTOeCjZj",
        },
      }
    );

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
