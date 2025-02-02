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
        async function run() {
          const resp = await fetch(
            `https://live.trading212.com/api/v0/equity/metadata/instruments`,
            {
              method: "GET",
              headers: {
                Authorization: apiKey,
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

    case 2: {
      try {
        console.log(
          "hola soy el backend quiero ver el numero de tu tarjeta de crédito"
        );
        async function run() {
          const resp = await fetch(
            `https://live.trading212.com/api/v0/equity/account/cash`,
            {
              method: "GET",
              headers: {
                Authorization: apiKey,
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

    case 3: {
      try {
        console.log(
          "hola soy el backend quiero ver en donde te gastas el dinero"
        );
        async function run() {
          const resp = await fetch(
            `https://live.trading212.com/api/v0/equity/orders`,
            {
              method: "GET",
              headers: {
                Authorization: apiKey,
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
    case 4: {
      try {
        console.log(
          "hola soy el backend quiero ver por ID en donde te gastas el dinero"
        );
        async function run() {
          const id = req.body.id_order;
          const resp = await fetch(
            `https://live.trading212.com/api/v0/equity/orders/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: apiKey,
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
    case 5: {
      try {
        console.log(
          "hola soy el backend quiero joder todos tus planes de vida (por ID)"
        );
        async function run() {
          const id = req.body.id_order;
          const resp = await fetch(
            `https://live.trading212.com/api/v0/equity/orders/${id}`,
            {
              method: "CANCEL",
              headers: {
                Authorization: apiKey,
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
    case 6: {
      try {
        console.log(
          "hola soy el backend quiero comprarme el nuevo pase de batalla"
        );
        async function run() {
          const resp = await fetch(
            `https://live.trading212.com/api/v0/equity/orders/market`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: apiKey,
              },
              body: JSON.stringify({
                quantity: req.body.quantity,
                ticker: req.body.ticker,
              }),
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

    case 7: {
      try {
        console.log("hola soy el backend vengo a parar la orden");
        async function run() {
          const resp = await fetch(
            `https://live.trading212.com/api/v0/equity/orders/stop`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: apiKey,
              },
              body: JSON.stringify({
                quantity: req.body.quantity,
                stopPrice: req.body.stopPrice,
                ticker: req.body.ticker,
                timeValidity: req.body.timeValidity,
              }),
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
