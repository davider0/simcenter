import PropTypes from 'prop-types';
import { useState } from 'react';

const DialogConsole = ({ initialText, onTextChange }) => {
    const [text, setText] = useState(initialText);

    // Handler for text updates
    const handleTextChange = (newText) => {
        setText(newText);
        if (onTextChange) {
            onTextChange(newText);
        }
    };

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


DialogConsole.propTypes = {
    initialText: PropTypes.any.isRequired,
    onTextChange: PropTypes.func,
};

export default DialogConsole;