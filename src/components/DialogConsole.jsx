import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const DialogConsole = ({ value, onClick }) => {
    const [text, setText] = useState(value);

    // Sync with parent updates
    useEffect(() => {
        setText(value);
    }, [value]);

    return (
        <div className='console'
            onClick={onClick}
            style={{
                padding: '20px',
                background: '#f2f2f2',
                border: '3px solid #000',
                color: '#000',
                maxHeight: '450px',
                width: 'auto',
                overflowY: 'scroll',
                fontFamily: 'Courier New, monospace',
                fontSize: '14px',
                textTransform: 'uppercase',
                boxShadow: 'none',
                cursor: 'pointer'
            }}>
            <pre>{"\n" + text}</pre>
        </div>
    );
};

DialogConsole.propTypes = {
    value: PropTypes.any.isRequired,
    onClick: PropTypes.func,
};

export default DialogConsole;