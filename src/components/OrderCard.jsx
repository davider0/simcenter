import PropTypes from 'prop-types';

const OrderCard = ({ jsonMeta }) => {

    return (
        <div>
            {jsonMeta && jsonMeta.map((item, index) => {
                const tabId = `tab${index % 3 + 1}`;
                return (
                    <div className="cs-tabs" key={index}>
                        <input
                            className="radiotab"
                            name="tabs"
                            tabIndex={index + 1}
                            type="radio"
                            id={tabId}
                            defaultChecked={index % 3 === 0}
                        />
                        <label className="label" htmlFor={tabId}>Orden {index + 1}: {item.ticker}</label>
                        <div className="panel" tabIndex={index + 1}>
                            <h2>Orden {index + 1}</h2>
                            <p>Ticker: {item.ticker}</p>
                            <p>Tipo: {item.type}</p>
                            <p>Estado: {item.status}</p>
                            <p>Precio Límite: {item.limitPrice}</p>
                            <p>Cantidad: {item.quantity}</p>
                            <p>Valor: {item.value}</p>
                            <p>Creación: {new Date(item.creationTime).toLocaleDateString()}</p>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <button className='cs-btn'>CANCELAR ORDEN DE COMPRA</button>
                                    <button className='cs-btn' disabled>DETENER OBSERVACION PRECIO</button>
                                    <button className='cs-btn' >PONER LIMITE...</button>
                                    <button className='cs-btn' disabled>VENDER</button>
                                </div>
                                <button className='cs-btn'>QUITAR</button>
                                <div className='console' style={{ padding: '10px', background: '#393c31', borderRadius: '0px', boxShadow: 'inset 2px 2px 5px #000', color: 'red', height: 'auto', width: '300px', overflowY: 'scroll' }}>
                                    <p>

                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                );
            })}
        </div>
    );


}
OrderCard.propTypes = {
    jsonMeta: PropTypes.array.isRequired,
};
export default OrderCard;