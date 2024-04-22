import * as yup from 'yup'

const register = yup
  .object()
  .shape({
    firstName: yup.string().required('firstName is required'),
    email: yup.string().email('invalid email').required('email is required'),
    phoneNumber: yup.string().nullable(),
    isActive: yup.boolean().nullable(),
    tokenVerify: yup.string().nullable(),
    language_Id: yup.number().required('language is not selected'),
    newPassword: yup
      .string()
      .min(8, 'at least 8 characters')
      .oneOf([yup.ref('confirmNewPassword')], 'passwords are not the same'),
    confirmNewPassword: yup
      .string()
      .min(8, 'at least 8 characters')
      .oneOf([yup.ref('newPassword')], 'passwords are not the same'),
  })
  .required()

const login = yup
  .object()
  .shape({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
  })
  .required()

export default { register, login }
