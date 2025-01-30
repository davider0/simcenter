import { useEffect, useState } from 'react';
import '../App.css';
import '../assets/fonts/ArialPixel.css';
import '../assets/fonts/SpaceMono.css';
import Loader from './loader';



const handleSubmit = async (n) => {
  console.log("Hola soy JavaScript estoy intetando hacer un fetch");
  const response = await fetch('https://porrex35.onrender.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phase: n
    })
  })

  if (response.ok) {
    const data = await response.json();
    console.log("data: " + JSON.stringify(data));
    console.log("typeof data: " + typeof data);
    console.log("response status 200 (⌐■_■)");
    const parsedData = Array.from(data.bot);
    return parsedData;

  } else {
    const err = await response.text();
    console.log("Hola soy JavaScript y me he equivocado no como el programador que nunca se equivoca: " + err);
    alert(err);
  }
}
var test = [
  {
    "ticker": "STN_US_EQ",
    "type": "STOCK",
    "workingScheduleId": 56,
    "isin": "CA85472N1096",
    "currencyCode": "USD",
    "name": "Stantec",
    "shortName": "STN",
    "minTradeQuantity": 0.02,
    "maxOpenQuantity": 5804,
    "addedOn": "2023-11-02T16:28:13.000+02:00"
  },
  {
    "ticker": "ZGYd_EQ",
    "type": "STOCK",
    "workingScheduleId": 171,
    "isin": "US31620M1062",
    "currencyCode": "EUR",
    "name": "Fidelity National Information Services",
    "shortName": "ZGY",
    "minTradeQuantity": 1,
    "maxOpenQuantity": 40,
    "addedOn": "2025-01-24T14:50:22.000+02:00"
  },
  {
    "ticker": "ZGYd_EQ",
    "type": "STOCK",
    "workingScheduleId": 171,
    "isin": "US31620M1062",
    "currencyCode": "EUR",
    "name": "Fidelity National Information Services",
    "shortName": "ZGY",
    "minTradeQuantity": 1,
    "maxOpenQuantity": 40,
    "addedOn": "2025-01-24T14:50:22.000+02:00"
  },
  {
    "ticker": "ZGYd_EQ",
    "type": "STOCK",
    "workingScheduleId": 171,
    "isin": "US31620M1062",
    "currencyCode": "EUR",
    "name": "Fidelity National Information Services",
    "shortName": "ZGY",
    "minTradeQuantity": 1,
    "maxOpenQuantity": 40,
    "addedOn": "2025-01-24T14:50:22.000+02:00"
  }];
function App() {
  const [data2, setData2] = useState([]);

  useEffect(() => {




  }, []);

  return (

    <div className="trading212" style={{ fontFamily: 'CustomFont', padding: '20px', borderRadius: '10px', boxShadow: '5px 5px 15px #000', color: '#000' }}>
      <header className="header" style={{ marginBottom: '20px', padding: '10px', borderRadius: '0px', boxShadow: 'inset 2px 2px 5px #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite' }}>
        <h1 style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', animation: 'rainbow 3s linear infinite', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: 'Space Mono, monospace' }}><strong>Porrex 35</strong></h1>
      </header>
      <style>
        {`
          @keyframes rainbow {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 0%; }
            100% { background-position: 0% 0%; }
          }
        `}
      </style>
      <div style={{ color: 'white' }}>
        <button className='cs-btn' onClick={async () => {
          let res = await handleSubmit(1);
          setData2(res);
        }}>CARGAR</button>
        <button className='cs-btn'>LISTA EXCHANGE</button>
        <input className='cs-input'></input>
        <button className='cs-btn'>BUSCAR TICKER</button>
      </div>
      <main className="main-content" style={{ display: 'flex' }}>
        <section className="left-column" style={{ flex: '1', marginRight: '20px', padding: '10px', borderRadius: '0px', boxShadow: 'inset 2px 2px 5px #000', color: '#500000', maxHeight: '500px', overflowY: 'auto', fontFamily: 'Space Mono, monospace' }}>
          <Loader arrayJsons={data2} />
        </section>
        <section className="right-column" style={{ flex: '2', padding: '10px', background: '#f5f5f5', borderRadius: '0px', boxShadow: 'inset 2px 2px 5px #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>

          <div className="feature" style={{ marginBottom: '10px', fontFamily: 'Space Mono, monospace' }}>
            <h3 style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}><strong>Bienvenido a Porrex 35</strong></h3>
            <p style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>Automatiza la compra y venta de acciones del mercado del primer mundo.<br />Mete en la lista de observación una sociedad para empezar.
            </p>
          </div>



        </section>
        <div style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <button className='cs-btn'>OBSERVAR</button>
          <button className='cs-btn'>COMPRAR</button>
          <button className='cs-btn'>QUITAR</button>
        </div>
      </main>
      <br />
      <hr className='cs-hr' />
      <div>
        <footer className="footer" style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '0px', boxShadow: 'inset 2px 2px 5px #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto', fontFamily: 'Space Mono, monospace' }}>
          <h3><strong>Órdenes (todas) | Dinero: 0 EUR</strong></h3>
          <br />
          <hr className='cs-hr' />
        </footer>
      </div>
    </div>
  );
}

export default App
