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
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            "sec-ch-ua":
              '"Chromium";v="125", "Google Chrome";v="125", "Not.A/Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            Cookie:
              "LANDING_PAGE=%2Fes; " +
              "__adal_id=bf2a90c3-3747-4209-a6d0-9f988642470d.1734389483.73.1747402585.1747342927.8f7a2939-7fe1-4731-8633-aa5e6094b006; " +
              "__adal_ca=so%3DGoogle%26me%3Dorganic%26ca%3D%28not%2520set%29%26co%3D%28not%2520set%29%26ke%3D%28not%2520set%29; " +
              "__adal_cw=1746975263576; " +
              "__cf_bm=2W11bjhfeRC329SYDgLPwaJJgFWP2mhnM2QaHtVcZHQ-1747503433-1.0.1.1-yQeI15OcJonbdgJ.VW7S2WFOyd11MpU5RlnKSyE7AiGzP_Qz8eNRudj_1z4bIBh5bMTphnodmTrz.fx6W7kvpu8eaTys9L0iwnBo_R9Ze74; " +
              "_cfuvid=6hB.C7iEABDN9oIGQvOYZsrYnHRP_ScdI2g8_YT4Ewg-1746975265322-0.0.1.1-604800000; " +
              "_ga=GA1.1.1441778917.1734389483; " +
              "_ga_MHBZW1QBME=GS2.1.s1747503433%24o158%24g1%24t1747504117%24j0%24l0%24h462150800; " +
              "_gcl_au=1.1.1613101044.1742916809; " +
              "_gtmeec=eyJlbSI6ImViNmE1NDlkNGI3MDlhYWZhMjdhMjM2Yjk5ZmVkNjk4MjliZjVjNTZhNTQ0ZTA2ODlkYmI0N2M2NzU4YWI0YTciLCJleHRlcm5hbF9pZCI6ImFiM2QwZDBhLTZjZTEtNDI1OS1iN2I0LTUyNDI2ZjUzMWRkYyJ9; " +
              "_rdt_em=eb6a549d4b709aafa27a236b99fed69829bf5c56a544e0689dbb47c6758ab4a7; " +
              "_rdt_uuid=1734389482376.d10edaa3-67b0-45dd-a526-72507ff067b1; " +
              "_tt_enable_cookie=1; " +
              "_ttp=gzOajZ0Wj0jhhr00BW88b0V5ksw.tt.1; " +
              "5d60904a5b52802c63d8b5b97bf8a1ea=%22cc4b78db-f3c3-4549-abb4-4b614df316b0%22; " +
              "amp_795329=cc4b78db-f3c3-4549-abb4-4b614df316b0.YWIzZDBkMGEtNmNlMS00MjU5LWI3YjQtNTI0MjZmNTMxZGRj..1irfl4hpa.1irflpenb.3aa.3g4.6qe; " +
              "COOKIES_CONSENT=all; " +
              "CUSTOMER_SESSION=1198f5f699954f6a9b2fb2277d41d6d6; " +
              "FPAU=1.1.1613101044.1742916809; " +
              "FPGSID=1.1747503433.1747503433.G-MHBZW1QBME.2r4dtxjEcM7W34J3R2zmXQ; " +
              "FPID=FPID2.2.fgB3IZG4bxUKU3iMYoFbIyc6kFHUwuDIDNtL25WkuoQ%3D.1734389483; " +
              "FPLC=wHQEhSldJvq9E6dF4hCFsg8WRThDZXEKckWLircZVm1cp%2F0LTOyxPY%2F6sxc4yUWgqdlVQmsaQxhgqiyEgwudBwK90YC9bHHJO793YJeXDCvRLg78Eb%2BC84BiPl6sAA%3D%3D; " +
              "GEOLOCATION=es; " +
              "LOGIN_TOKEN=eyJ0b2tlbiI6IjZlZWYxYTI3LWFmNWItNGM1Ni05YzI3LTU4ZmIwOTZiZDBjNCJ9; " +
              "REDIRECT_TO_APP=1; " +
              "TRADING212_SESSION_LIVE=1198f5f699954f6a9b2fb2277d41d6d6; " +
              "ttcsid=1745334942713%3A%3A35NuPwYwH8X4tLja6Z1w.6.1745334942713; " +
              "ttcsid_CE50IL3C77U118FB7AL0=1745334942713%3A%3AYINohrgZ7t1Wiwqykdug.6.1745334943014; " +
              "WZRK_G=6c36b6268bc0412085d27be95f4e0606; " +
              "WZRK_S_6ZW-WZ7-6W7Z=%7B%22s%22%3A1747503433%2C%22t%22%3A1747504118%2C%22p%22%3A1%7D",
            Origin: "https://app.trading212.com",
            Referer: "https://app.trading212.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
          },
        },
        (err, response, data) => {
          if (err) {
            console.log("Error:", err);
          } else if (response.statusCode !== 200) {
            console.log("Status:", response.statusCode);
            console.log(response);
          } else {
            console.log({...data.lists[2].metadata.instrumentSet.instruments});
            res.status(200).send({
              bot: {...data.lists[2].metadata.instrumentSet.instruments},
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
