import { useState } from 'react';
import '../App.css';
import '../assets/fonts/ArialPixel.css';
import '../assets/fonts/SpaceMono.css';
import kvm from '../assets/kvm.png';
import { useFetchStore } from '../zustand/fetchToAPI';
import DialogConsole from './DialogConsole';
import Headlines from './Headlines';
import Loader from './loader';
import OrderCard from './OrderCard';

var orderDefault = [{
  "creationTime": "2019-08-24T14:15:22Z",
  "filledQuantity": 0,
  "filledValue": 0,
  "id": 0,
  "limitPrice": 0,
  "quantity": 0,
  "status": "LOCAL",
  "stopPrice": 0,
  "strategy": "QUANTITY",
  "ticker": "AAPL_US_EQ",
  "type": "LIMIT",
  "value": 0
}, {
  "creationTime": "2019-08-24T14:15:22Z",
  "filledQuantity": 0,
  "filledValue": 0,
  "id": 12,
  "limitPrice": 0,
  "quantity": 0,
  "status": "LOCAL",
  "stopPrice": 0,
  "strategy": "QUANTITY",
  "ticker": "NTND_US",
  "type": "LIMIT",
  "value": 0
}, {
  "creationTime": "2019-08-24T14:15:22Z",
  "filledQuantity": 0,
  "filledValue": 0,
  "id": 0,
  "limitPrice": 0,
  "quantity": 0,
  "status": "LOCAL",
  "stopPrice": 0,
  "strategy": "QUANTITY",
  "ticker": "META_US",
  "type": "LIMIT",
  "value": 0
}];

function App() {
  const [data2, setData2] = useState([]);
  const [cash, setCash] = useState("");
  const [cashFree, setCashFree] = useState("");
  const [dataOrders, setDataOrders] = useState([]);

  const { fetchToAPI } = useFetchStore();

  const handleSubmit = async (n, obj) => {
    try {
      const result = await fetchToAPI(n, obj);
      return result;
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      return null;
    }
  };

  return (
    <div className="trading212" style={{ fontFamily: 'Space Mono, monospace', padding: '20px', borderRadius: '10px', outline: '4px solid #000', color: '#000' }}>
      <header className="header" style={{ marginBottom: '20px', padding: '10px', borderRadius: '0px', outline: '4px solid #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <h1 style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', animation: 'rainbow 3s linear infinite', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: 'Space Mono, monospace', flex: '1' }}><strong>Metil 212 | Dinero: {cash || cashFree}</strong> &emsp;
            <button className='cs-btn' onClick={async () => {
              setCashFree(null);
              let c = await handleSubmit(2);
              setCash("" + (JSON.parse(c)["total"]));
            }}>↻</button>
            <button className='cs-btn' onClick={async () => {
              setCash(null);
              let c = await handleSubmit(2);
              setCash("" + (JSON.parse(c)["free"]));
            }}><img src={kvm} alt="Descripción de la imagen" style={{ width: '20px', height: '20px' }} /></button>
          </h1>
          <div style={{ flex: '1', fontFamily: 'Space Mono, monospace' }}>
            <h3 >
              <Headlines text='ILLO' />
            </h3>
          </div>
        </div>
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
        <button className='cs-btn' onClick={() => {
          setData2([]);
        }}>LIMPIAR</button>
      </div>
      <main className="main-content" style={{ display: 'flex' }}>
        <section className="left-column" style={{ flex: '1', marginRight: '20px', padding: '10px', borderRadius: '0px', outline: '4px solid #000', color: '#500000', maxHeight: '500px', overflowY: 'auto', fontFamily: 'Space Mono, monospace' }}>
          <Loader arrayJsons={data2} />
        </section>
        <section className="right-column" style={{ flex: '2', padding: '10px', background: '#f5f5f5', borderRadius: '0px', maxHeight: '500px', outline: '4px solid #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>

          <div className="feature" style={{ marginBottom: '10px', fontFamily: 'Space Mono, monospace' }}>
            <h3 style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}><strong>Bienvenido a Metil 212</strong></h3>
            <p style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>Automatiza la compra y venta de acciones del mercado del primer mundo.<br />Mete en la lista de observación una sociedad para empezar.
            </p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p style={{ color: "white" }}><br />
                <div className="cs-tooltip">
                  Ticker:
                  <span
                    style={{ bottom: "100%", width: "100px", left: "50%", marginLeft: "-50px" }}
                    className="text">Introduce el Ticker, caso sensitivo </span>

                </div>
                <input className="cs-input"></input><button className='cs-btn'>OBSERVAR</button>
                <div className="cs-checkbox">
                  <input id="checkbox" type="checkbox" />
                  <label className="cs-checkbox__label" htmlFor="checkbox">Automatizar</label>
                </div>
              </p>
            </div>
          </div>

          <section className="right-column" style={{ flex: '1', padding: '10px', background: '#f5f5f5', borderRadius: '0px', outline: '4px solid #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto', maxHeight: '100px', overflowY: 'auto' }}>
          </section>
        </section >
        <section className="right-column" style={{ flex: '3', marginLeft: '20px', padding: '10px', borderRadius: '0px', outline: '4px solid #000', color: '#500000', maxHeight: 'auto', overflowY: 'auto', fontFamily: 'Space Mono, monospace', maxWidth: '300px' }}>
          <DialogConsole text="API lista"></DialogConsole>
        </section>

      </main >
      <br />
      <hr className='cs-hr' />
      <div style={{ display: 'flex' }}>
        <footer className="footer" style={{ flex: '1', marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '0px', outline: '4px solid #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>
          <h3 style={{ fontFamily: 'Space Mono, monospace' }}><strong>Órdenes de compra</strong></h3>
          <br />
          <hr className='cs-hr' />
          <br />
          <button className='cs-btn' onClick={async () => {
            let res = await handleSubmit(3);
            console.log(res);
            setDataOrders(res);
          }}>RECARGAR ORDENES</button><OrderCard jsonMeta={orderDefault} />
        </footer>
        <footer className="rightColumn" style={{ flex: '2', marginTop: '20px', marginLeft: '60px', padding: '10px', background: '#f5f5f5', borderRadius: '0px', outline: '4px solid #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto', fontFamily: 'Space Mono, monospace', width: 'auto', overflowY: 'auto', overflowX: 'auto' }}>
          <h3><strong>Órdenes de venta</strong></h3>
          <br />
          <hr className='cs-hr' />
          <br />

        </footer>

      </div>
    </div>
  );
}

export default App
