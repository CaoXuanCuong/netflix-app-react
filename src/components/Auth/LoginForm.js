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


const LoginForm = () => {
    const [isloading, setIsLoading] = useState(false);
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Invalid email format').required('The email field is required'),
                password: Yup.string().required('The password field is required'),
            })}
            onSubmit={async (values, { setFieldError }) => {
                setIsLoading(true);
                const result = await loginUser(values);
                setIsLoading(false);
                if (!result.success) {
                    setFieldError('email', ' ');
                    setFieldError('password', result.message);
                }
                else {
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
                            label="Email"
                            name="email"
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
                                'Sign in'
                            )}
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};


export default LoginForm;
