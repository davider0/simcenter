import { useState } from 'react';
import '../App.css';
import '../assets/fonts/ArialPixel.css';
import '../assets/fonts/SpaceMono.css';
import { useFetchStore } from '../zustand/fetchToAPI';
import Large3DList from './Large3DList';
/*
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
*/
function App() {
  const [data2, setData2] = useState([]);
  const [cash, setCash] = useState("");
  const [cashFree, setCashFree] = useState("");
  const [dataOrders, setDataOrders] = useState([]);
  const [headlines2, setHeadlines] = useState("");
  const [textDialog, setTextDialog] = useState("Haga clic aquí para recargar");

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
    <div className="trading212" style={{
      fontFamily: 'Space Mono, monospace',
      padding: '20px',
      margin: '60px 100px',
      borderRadius: '0px',
      border: '4px solid #000',
      color: '#000',
      boxShadow: `
        20px 20px 60px rgba(255, 0, 0, 0.3),
        -20px -20px 60px rgba(0, 0, 255, 0.3),
        inset 5px 5px 10px rgba(255, 165, 0, 0.3),
        inset -5px -5px 10px rgba(128, 0, 128, 0.3)
      `,
      position: 'relative',
      transform: 'translate(-2px, -2px)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translate(0, 0)'
      }
    }}>
      <header className="header" style={{ marginBottom: '20px', padding: '10px', borderRadius: '0px', outline: '4px solid #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <h1 style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', animation: 'rainbow 3s linear infinite', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: 'Space Mono, monospace', flex: '1' }}><strong>Centro de Simulación Frontend</strong> &emsp;

          </h1>
        </div>
        <Large3DList items={['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']} />



      </header>
    </div>
  );
}

export default App
