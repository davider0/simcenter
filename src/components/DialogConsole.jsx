import PropTypes from 'prop-types';
import { useState } from 'react';

const DialogConsole = ({ initialText }) => {
    const [text, setText] = useState(initialText);

    return (
        <div className='console' style={{ padding: '10px', background: '#393c31', borderRadius: '0px', boxShadow: 'inset 2px 2px 5px #000', color: 'green', height: '60vh', width: 'auto', overflowY: 'scroll' }}>
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
    initialText: PropTypes.array.isRequired,
};

export default DialogConsole;