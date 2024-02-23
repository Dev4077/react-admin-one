import * as Yup from 'yup';


export const loginSchema = Yup.object({
    email : Yup.string().email().required('Please Enter your Email'),
    password : Yup.string().min(6).required('Plaese Enter your Password'),
  })

export const registerSchema = Yup.object({
    adminName : Yup.string().max(25).min(2).required('Please Enter your Name'),
    email : Yup.string().email().required('Please Enter your Email'),
    password : Yup.string().min(6).required('Plaese Enter your Password'),
    confirm_password : Yup.string().min(6).required('Plaese Enter Password to Confirm').oneOf([Yup.ref('password'),null],"Password must Match")
  })