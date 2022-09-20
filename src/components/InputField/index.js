import {  useField } from 'formik';
import styles from './InputField.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const InputField = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className={cx('form-group', { invalid: meta.touched && meta.error })}>
            {label && (
                <label className={cx('title-form')} htmlFor={props.id || props.name}>
                    {label}
                </label>
            )}
            <input className={cx('form-input')} {...field} {...props} />
            {meta.touched && meta.error ? <div className={cx('error-msg')}>{meta.error}</div> : null}
        </div>
    );
};

export default InputField;