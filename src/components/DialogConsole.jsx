import PropTypes from 'prop-types';
import { useState } from 'react';

const DialogConsole = ({ initialText }) => {
    const [text, setText] = useState(initialText);

    return (
        <div className='console' style={{ 
            padding: '20px', 
            background: '#f2f2f2', 
            border: '3px solid #000', 
            color: '#000', 
            height: '100%', 
            width: 'auto', 
            overflowY: 'scroll', 
            fontFamily: 'Courier New, monospace', 
            fontSize: '14px', 
            textTransform: 'uppercase',
            boxShadow: 'none'
        }}>
            <p>
                {"\n" + text}
            </p>
        </div>
    );
};

// Convertimos addText en un método estático
DialogConsole.addText = (setText, texto = "") => {
    setText(prevText => prevText + "\n" + texto);
};

DialogConsole.propTypes = {
    initialText: PropTypes.any.isRequired,
};

export default DialogConsole;