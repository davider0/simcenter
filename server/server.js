import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import request from "request";

dotenv.config();

let apiKeyTrading = "35762281ZovmnIuZgETxpJAeGMYusMTOeCjZj";
let apiKeyAlphaVenture = "K9XDG449WV87CB31";

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
                Authorization: apiKeyTrading,
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
                Authorization: apiKeyTrading,
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
                Authorization: apiKeyTrading,
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
                Authorization: apiKeyTrading,
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
                Authorization: apiKeyTrading,
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
                Authorization: apiKeyTrading,
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
                Authorization: apiKeyTrading,
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

    case 8: {
      var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.body.tickerAV}&interval=${req.body.interval}&apikey=${apiKeyAlphaVenture}`;
      request.get(
        {
          url: url,
          json: true,
          headers: { "User-Agent": "request" },
        },
        (err, res, data) => {
          if (err) {
            console.log("Error:", err);
          } else if (res.statusCode !== 200) {
            console.log("Status:", res.statusCode);
          } else {
            res.status(200).send({
              bot: data,
            });
          }
        }
      );

      break;
    }

    case 9: {
      request.get(
        {
          url: `https://version-12-0.string-db.org/api/svg/network?identifiers=${req.body.identifiers}?species=${req.body.species}?caller_identity=${req.body.caller_identity}?network_flavor=${req.body.network_flavor}?add_white_node=${req.body.add_white_node}`,
          json: true,
          headers: { "User-Agent": "request" },
        },
        (err, res, data) => {
          if (err) {
            console.log("Error:", err);
          } else if (res.statusCode !== 200) {
            console.log("Status:", res.statusCode);
            console.log(res);
          } else {
            res.status(200).send({
              bot: data,
            });
          }
        }
      );

      break;
    }
  }
});

app.listen(5000, () =>
  console.log("El servidor está en https://localhost:5000")
);
