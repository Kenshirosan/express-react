import PropTypes from 'prop-types';
import { Fragment } from 'react';

const Notification = ({ message, visible, level }) => {
    return (
        <Fragment>
            {visible ? (
                <div
                    style={style}
                    className={level}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            ) : null}
        </Fragment>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    level: PropTypes.string.isRequired,
};

const style = {
    position: 'fixed',
    top: '25px',
    right: '25px',
    padding: '1em',
};

export default Notification;
