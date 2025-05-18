import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import request from "request";

dotenv.config();

let apiKeyTrading = "35762281ZJaTAvxiDLrvFiYEaitcAaXeHgulc";
let apiKeyAlphaVenture = "INMBO0KVFJB81SXC";

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

    case 10: {
      console.log("hola soy el backend vengo a analizar las noticias");
      const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${apiKeyAlphaVenture}`;
      function procesarTickers(data) {
        const resultados = [];
        for (const noticia of data.feed) {
          if (noticia.ticker_sentiment && noticia.ticker_sentiment.length > 0) {
            for (const tickerInfo of noticia.ticker_sentiment) {
              resultados.push(
                `${tickerInfo.ticker}: ${tickerInfo.ticker_sentiment_score}`
              );
            }
          }
        }

        return resultados.join(", ");
      }

      request.get(
        {
          url: url,
          json: true,
          headers: { "User-Agent": "request" },
        },
        (err, response, data) => {
          if (err) {
            console.log("Error:", err);
          } else if (response.statusCode !== 200) {
            console.log("Status:", response.statusCode);
            console.log(response);
          } else {
            console.log(data);
            const x = procesarTickers(data);
            res.status(200).send({
              bot: x,
            });
          }
        }
      );
      break;
    }
    case 11: {
      const url = `https://live.services.trading212.com/rest/watchlists/v4/pinned-lists`;

      request.get(
        {
          url: url,
          json: true,
          headers: {
            Accept: "application/json",
            "User-Agent": "request",
            Cookie:
              "LANDING_PAGE=%2Fes; __adal_id=bf2a90c3-3747-4209-a6d0-9f988642470d.1734389483.73.1747402585.1747342927.8f7a2939-7fe1-4731-8633-aa5e6094b006; __adal_ca=so%3DGoogle%26me%3Dorganic%26ca%3D%28not%2520set%29%26co%3D%28not%2520set%29%26ke%3D%28not%2520set%29; _ga_MHBZW1QBME=GS2.1.s1747503433$o158$g1$t1747504117$j0$l0$h462150800; _ga=GA1.1.1441778917.1734389483; _tt_enable_cookie=1; _ttp=gzOajZ0Wj0jhhr00BW88b0V5ksw.tt.1; FPID=FPID2.2.fgB3IZG4bxUKU3iMYoFbIyc6kFHUwuDIDNtL25WkuoQ%3D.1734389483; _gtmeec=eyJlbSI6ImViNm…eRC329SYDgLPwaJJgFWP2mhnM2QaHtVcZHQ-1747503433-1.0.1.1-yQeI15OcJonbdgJ.VW7S2WFOyd11MpU5RlnKSyE7AiGzP_Qz8eNRudj_1z4bIBh5bMTphnodmTrz.fx6W7kvpu8eaTys9L0iwnBo_R9Ze74; FPLC=wHQEhSldJvq9E6dF4hCFsg8WRThDZXEKckWLircZVm1cp%2F0LTOyxPY%2F6sxc4yUWgqdlVQmsaQxhgqiyEgwudBwK90YC9bHHJO793YJeXDCvRLg78Eb%2BC84BiPl6sAA%3D%3D; FPGSID=1.1747503433.1747503433.G-MHBZW1QBME.2r4dtxjEcM7W34J3R2zmXQ; _rdt_uuid=1734389482376.d10edaa3-67b0-45dd-a526-72507ff067b1; _rdt_em=eb6a549d4b709aafa27a236b99fed69829bf5c56a544e0689dbb47c6758ab4a7",
            Host: "live.services.trading212.com",
            Origin: "https://app.trading212.com",
            Priority: "u=6",
            Referer: "https://app.trading212.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "Sec-GPC": "1",
          },
        },
        (err, response, data) => {
          if (err) {
            console.log("Error:", err);
          } else if (response.statusCode !== 200) {
            console.log("Status:", response.statusCode);
            console.log(response);
          } else {
            console.log({ ...data });
            res.status(200).send({
              bot: { ...data },
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
