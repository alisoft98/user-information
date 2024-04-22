import * as yup from 'yup'

const userRoles = yup
  .object()
  .shape({
    userId: yup.string().required('userId is required'),
  })
  .required()

 
const latestTemplates = yup
  .object()
  .shape({
    userId: yup.string().required('userId is required'),
  })
  .required() 

export default { userRoles, latestTemplates }