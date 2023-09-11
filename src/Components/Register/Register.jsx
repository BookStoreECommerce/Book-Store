
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
export const Register = () => {
  const handleSubmit = (values) => {
console.log(values);
  }
let validationSchema = Yup.object({
    name :Yup.string().required('name is required').min(3 , 'name length less than 3').max(10 ,'name length more than 10' ),
    email :Yup.string().required('email is required').email('email is not valid'),
    password :Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password is not valid'),
    repassword :Yup.string().required('repassword is required').oneOf([Yup.ref('password')] , 'password is not match'),
    phone :Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'phone is not valid'),

})
 let formik = useFormik({
initialValues : {
name : '',
phone : '',
email : '',
password : '', 
repassword : ''
},
validationSchema  ,
onSubmit : handleSubmit
})
  return (
    <div className='w-57 mx-auto py-4'>
      <h3>Register Now</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name :</label>
        <input className='form-control mb-1' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id='name'/>
        {formik.errors.name && formik.touched.name? <div className='alert alert-danger'>{formik.errors.name}</div> : null}
      
        <label htmlFor="email">Email : </label>
        <input className='form-control mb-1' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" email='email' id='email'/>
        {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

        <label htmlFor="password">password :</label>
        <input className='form-control mb-1'onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.password} type="password" password='password' id='password'/>
        {formik.errors.password && formik.touched.password? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

        <label htmlFor="repassword">repassword :</label>
        <input className='form-control mb-1' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.repassword} type="repassword" repassword='repassword' id='repassword'/>
        {formik.errors.repassword && formik.touched.repassword? <div className='alert alert-danger'>{formik.errors.repassword}</div> : null}

        <label htmlFor="phone">Phone :</label>
        <input className='form-control mb-1' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" phone='phone' id='phone'/>
        {formik.errors.phone && formik.touched.phone? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}

        <button className='btn btn-info' type='submit' >submit</button>
      </form>

    </div>
  )
}
