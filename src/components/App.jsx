import { useEffect, useState } from 'react';
import '../App.css';
import '../assets/fonts/SpaceMono.css';
import Loader from './loader';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/trading212/api/v0/equity/metadata/instruments`,
        {
          method: 'GET',
          headers: {
            Authorization: '35762281ZovmnIuZgETxpJAeGMYusMTOeCjZj'
          }
        }
      );
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (

    <div className="trading212" style={{ fontFamily: 'Space Mono, monospace', padding: '20px', background: 'rgb(4 25 33)', borderRadius: '10px', boxShadow: '5px 5px 15px #000', color: '#000' }}>
      <header className="header" style={{ marginBottom: '20px', padding: '10px', background: 'linear-gradient(0deg, rgb(25 5 65) 0%, rgb(25 5 155)) 100%', borderRadius: '0px', boxShadow: 'inset 2px 2px 5px #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite' }}>
        <h1 style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', animation: 'rainbow 3s linear infinite', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Porrex 35</h1>
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
      <main className="main-content" style={{ display: 'flex' }}>
        <section className="left-column" style={{ flex: '1', marginRight: '20px', padding: '10px', background: 'linear-gradient(0deg,rgb(0 0 0) 0%,rgb(4 25 33) 100%)', borderRadius: '0px', boxShadow: 'inset 2px 2px 5px #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>
          <Loader arrayJsons={data} />
        </section>
        <section className="right-column" style={{ flex: '2', padding: '10px', background: '#f5f5f5', borderRadius: '0px', boxShadow: 'inset 2px 2px 5px #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>
          <div className="feature" style={{ marginBottom: '10px' }}>
            <h3 style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>Acciones</h3>
            <p style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>Compra y vende acciones sin comisiones.</p>
          </div>
          <div className="feature" style={{ marginBottom: '10px' }}>
            <h3 style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>ETFs</h3>
            <p style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>Invierte en una variedad de ETFs.</p>
          </div>
          <div className="feature" style={{ marginBottom: '10px' }}>
            <h3 style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>Criptomonedas</h3>
            <p style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>Explora el mundo de las criptomonedas.</p>
          </div>
          <div className="feature">
            <h3 style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>Educación</h3>
            <p style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>Aprende a invertir con nuestros recursos.</p>
            <button>Polla</button>
          </div>
        </section>
      </main>
      <footer className="footer" style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '0px', boxShadow: 'inset 2px 2px 5px #000', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'rainbow 3s linear infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(237,255,0,1) 14%, rgba(0,255,21,1) 29%, rgba(0,255,239,1) 41%, rgba(12,0,255,1) 59%, rgba(149,0,255,1) 72%, rgba(255,0,159,1) 88%, rgba(255,0,0,1) 100%)', backgroundSize: '200% auto' }}>
        <p>© Trading 212</p>
      </footer>
    </div>
  );
}

export default App
