import * as yup from 'yup';

const register = yup.object().shape({
    firstName: yup.string().required('firstname is required'),
    email: yup.string().email('invalid email').required('email is required'),
    phoneNumber: yup.string().nullable(),
    isActive: yup.boolean().nullable(),
    tokenVerify: yup.string().nullable(),
    newPassword: yup.string().min(8, 'at least 8 charecters')
        .oneOf([yup.ref('confirmNewPassword')], 'password are not the same'),
    confirmPassword: yup.string().min(8, 'at least 8 charecters')
        .oneOf([yup.ref('newPassword')], 'password are not the same')
});

const login = yup.object()
    .shape({
        email: yup.string().required('email is required'),
        password: yup.string().required('password is required'),
    }).required();

export default { register, login }