import Button from '~/components/Button';
import styles from './Auth.module.scss';
import classNames from 'classnames/bind';

import { useContext, useState } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../InputField';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const RegisForm = () => {
    const [isloading, setIsLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ fullname: '', email: '', password: '' }}
            validationSchema={Yup.object().shape({
                fullname: Yup.string()
                    .trim()
                    .required('The Fullname field is required')
                    .min(6, 'Fullname must be 6 to 20 characters')
                    .max(20, 'Fullname must be 6 to 20 characters'),
                email: Yup.string().email('Invalid email format').required('The Email field is required'),
                password: Yup.string()
                    .trim()
                    .required('The Password field is required')
                    .min(6, 'Password must be 6 to 20 characters')
                    .max(20, 'Password must be 6 to 20 characters'),
            })}
            onSubmit={async (values, { setFieldError }) => {
                setIsLoading(true);
                const result = await register(values);
                setIsLoading(false);
                console.log(result);
                if (!result.success) {
                    setFieldError('email', result.message);
                } else {
                    navigate('/');
                }
            }}
        >
            {(formik) => {
                const { values, initialValues, isValid, handleChange, handleSubmit, setFieldTouched } = formik;
                const hasChanged = !(values === initialValues);
                return (
                    <Form className={cx('form-login')} onSubmit={handleSubmit}>
                        <InputField
                            label="Fullname"
                            name="fullname"
                            placeholder="Fullname"
                            type="text"
                            onChange={(e) => {
                                setFieldTouched('fullname', false);
                                handleChange(e);
                            }}
                        />

                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={(e) => {
                                setFieldTouched('email', false);
                                handleChange(e);
                            }}
                        />

                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setFieldTouched('password', false);
                                handleChange(e);
                            }}
                        />

                        <Button
                            className={cx('form-btn')}
                            typeBtn={`full ${!hasChanged || !isValid ? 'disabled dark' : 'primary'}`}
                            type="submit"
                        >
                            {isloading ? (
                                <div className={cx('load')}>
                                    <i className="bx bx-loader"></i>
                                </div>
                            ) : (
                                'Sign up'
                            )}
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default RegisForm;
