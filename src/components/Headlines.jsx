import PropTypes from 'prop-types';
import '../assets/NewsTicker.css';
import '../assets/fonts/SpaceMono.css';
const NewsTicker = ({ text }) => {
    return (
        <div className="ticker-container" >
            <div className="ticker-content">
                {text}
            </div>
        </div>
    );
};

NewsTicker.propTypes = {
    text: PropTypes.string.isRequired,
};

export default NewsTicker;
