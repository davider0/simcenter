import PropTypes from 'prop-types';
import '../App.css'; // Asegúrate de que el CSS esté importado

const Loader = ({ arrayJsons }) => {
    return (
        <div>
            {arrayJsons.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px', marginTop: '15px', padding: '20px', border: '4px solid #000', borderRadius: '0', backgroundColor: '#fff', boxShadow: '10px 10px 0 #000' }}>
                    <h2 style={{ margin: '0 0 5px 0', fontFamily: 'Space Mono, monospace', fontWeight: 'bold', color: '#000' }}>{item.name} ({item.shortName})</h2>
                    <p style={{ margin: '0', fontFamily: 'Space Mono, monospace', color: '#000' }}>Ticker: {item.ticker}</p>
                    <p style={{ margin: '0', fontFamily: 'Space Mono, monospace', color: '#000' }}>Tipo: {item.type}</p>
                    <p style={{ margin: '0', fontFamily: 'Space Mono, monospace', color: '#000' }}>ISIN: {item.isin}</p>
                    <p style={{ margin: '0', fontFamily: 'Space Mono, monospace', color: '#000' }}>Moneda: {item.currencyCode}</p>
                    <p style={{ margin: '0', fontFamily: 'Space Mono, monospace', color: '#000' }}>Cantidad mínima de comercio: {item.minTradeQuantity}</p>
                    <p style={{ margin: '0', fontFamily: 'Space Mono, monospace', color: '#000' }}>Cantidad máxima abierta: {item.maxOpenQuantity}</p>
                    <p style={{ margin: '0', fontFamily: 'Space Mono, monospace', color: '#000' }}>Añadido el: {new Date(item.addedOn).toLocaleDateString()}</p>
                    <div style={{display: 'flex'}}>
                        <button className="cs-btn" >&#x21B5;</button>
                        <input className="cs-input"></input>
                    </div>
                </div>
            ))}
        </div>
    );
}

Loader.propTypes = {
    arrayJsons: PropTypes.array.isRequired,
};

export default Loader;