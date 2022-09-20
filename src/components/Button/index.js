import PropTypes from 'prop-types';
import './Button.scss';
function Button({ children, typeBtn = '', onClick, className = '', disabled, ...rest }) {
    const classes = `btn ${typeBtn} ${className}`.trim();

    const props = {
        onClick,
        ...rest,
    };

    if (typeBtn.indexOf('disabled') !== -1) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
};
export default Button;
