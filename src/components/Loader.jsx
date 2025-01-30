
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';


const Loader = ({ arrayJsons }) => {
    return (
        <div>
            {arrayJsons.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h2 style={{ margin: '0 0 5px 0' }}>{item.name} ({item.shortName})</h2>
                    <p style={{ margin: '0' }}>Ticker: {item.ticker}</p>
                    <p style={{ margin: '0' }}>Tipo: {item.type}</p>
                    <p style={{ margin: '0' }}>ISIN: {item.isin}</p>
                    <p style={{ margin: '0' }}>Moneda: {item.currencyCode}</p>
                    <p style={{ margin: '0' }}>Cantidad mínima de comercio: {item.minTradeQuantity}</p>
                    <p style={{ margin: '0' }}>Cantidad máxima abierta: {item.maxOpenQuantity}</p>
                    <p style={{ margin: '0' }}>Añadido el: {new Date(item.addedOn).toLocaleDateString()}</p>
                    <Button variant="outlined">AÑADIR</Button>
                </div>
            ))}
        </div>
    );
}
Loader.propTypes = {
    arrayJsons: PropTypes.array.isRequired,
};
export default Loader;