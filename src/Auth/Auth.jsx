import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginAPI, registerAPI } from '../../Services/AllApi'



function Auth() {

  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)


  // Formik Configuration
  const formik = useFormik({

    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    validationSchema: Yup.object({

      name: Yup.string().when([], {
        is: () => !isLogin,
        then: (schema) => schema
          .min(3, 'Name must contain at least 3 characters')
          .required('Full name is required'),
        otherwise: (schema) => schema.notRequired()
      }),

      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

      password: Yup.string()
  .min(8, 'Password must contain at least 8 characters')
  .required('Password is required'),

      confirmPassword: Yup.string().when([], {
        is: () => !isLogin,
        then: (schema) => schema
          .oneOf([Yup.ref('password')], 'Passwords do not match')
          .required('Please confirm your password'),
        otherwise: (schema) => schema.notRequired()
      })

    }),

    onSubmit: async (values, { resetForm }) => {

      if (isLogin) {

        await handleLogin(values, resetForm)

      } else {

        await handleRegister(values, resetForm)

      }

    }

  })


  // LOGIN FUNCTION
const handleLogin = async (userData, resetForm) => {

  try {

    setLoading(true)

    const result = await loginAPI({

      email: userData.email.trim().toLowerCase(),
      password: userData.password

    })

    console.log('Login Response:', result.data)

    if (result.status === 200 && result.data.success) {

      const { token, user } = result.data

      // Clear old authentication data
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')

      // Remember Me functionality
      const storage = rememberMe ? localStorage : sessionStorage

      // Store authentication details
      storage.setItem('token', token)
      storage.setItem('user', JSON.stringify(user))

      toast.success('Login Successful! Welcome to PetCare.')

      resetForm()

      // Role-based navigation
      setTimeout(() => {

        if (user.role === 'admin') {

          navigate('/admin')

        } else if (user.role === 'veterinarian') {

          navigate('/vet')

        } else {

          navigate('/')

        }

      }, 1000)

    } else {

      toast.error(result.data?.message || 'Login failed!')

    }

  } catch (error) {

    console.error(
      'Login Error:',
      error.response?.data || error.message
    )

    toast.error(
      error.response?.data?.message || 'Invalid email or password!'
    )

  } finally {

    setLoading(false)

  }

}


  // REGISTER FUNCTION
const handleRegister = async (userData, resetForm) => {

  try {

    setLoading(true)

    // Generate username from full name
    const username = userData.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')

    // Register API
    const result = await registerAPI({

      name: userData.name.trim(),

      username: username,

      email: userData.email.trim().toLowerCase(),

      password: userData.password

    })

    console.log('Register Response:', result.data)

    if (result.status === 201) {

      toast.success('Successfully Registered! Please Login.')

      resetForm()

      setTimeout(() => {

        setIsLogin(true)

        navigate('/login')

      }, 1500)

    }

  } catch (error) {

    console.error(
      'Registration Error:',
      error.response?.data || error.message
    )

    toast.error(
      error.response?.data?.message || 'Registration failed!'
    )

  } finally {

    setLoading(false)

  }

}


  // SWITCH BETWEEN LOGIN AND REGISTER
  const handleToggle = () => {

    setIsLogin(!isLogin)

    setShowPassword(false)

    formik.resetForm()

  }


  // FORGOT PASSWORD
  const handleForgotPassword = () => {

    toast.info('Please contact the administrator to reset your password.')

  }


  return (

    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{ backgroundColor: '#F2F7F0' }}
    >

      <div
        className="card border-0 shadow-lg overflow-hidden"
        style={{
          maxWidth: '950px',
          width: '100%',
          borderRadius: '20px'
        }}
      >

        <div className="row g-0">

          {/* Left Side */}
          <div
            className="col-md-5 d-flex flex-column justify-content-center align-items-center text-center text-white p-5"
            style={{ backgroundColor: '#315A3D' }}
          >

            <div className="mb-4">
              <i className="fa-solid fa-paw fs-1"></i>
            </div>

            <h2 className="fw-bold mb-3">
              PETCARE.
            </h2>

            <h4 className="fw-semibold mb-3">
              Better Care. Happier Pets.
            </h4>

            <p className="text-white-50">
              Your pet's health and happiness matter.
              Manage appointments, vaccinations and medical
              records all in one place.
            </p>

            <div className="mt-4">
              <i className="fa-solid fa-heart fs-3"></i>
            </div>

          </div>


          {/* Right Side */}
          <div className="col-md-7 p-4 p-md-5">

            <div className="mb-4">

              <h3 className="fw-bold" style={{ color: '#315A3D' }}>
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h3>

              <p className="text-secondary">
                {isLogin
                  ? 'Login to continue managing your pet care.'
                  : 'Join PetCare and give your pets the best care.'}
              </p>

            </div>


            {/* Form */}
            <form onSubmit={formik.handleSubmit}>

              {/* Name */}
              {!isLogin && (

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className={`form-control py-2 ${
                      formik.touched.name && formik.errors.name
                        ? 'is-invalid'
                        : ''
                    }`}
                    placeholder="Enter your full name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.name && formik.errors.name && (

                    <div className="invalid-feedback">
                      {formik.errors.name}
                    </div>

                  )}

                </div>

              )}


              {/* Email */}
              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  className={`form-control py-2 ${
                    formik.touched.email && formik.errors.email
                      ? 'is-invalid'
                      : ''
                  }`}
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email && (

                  <div className="invalid-feedback">
                    {formik.errors.email}
                  </div>

                )}

              </div>


              {/* Password */}
              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Password
                </label>

                <div className="input-group">

                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className={`form-control py-2 ${
                      formik.touched.password && formik.errors.password
                        ? 'is-invalid'
                        : ''
                    }`}
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >

                    <i
                      className={`fa-solid ${
                        showPassword ? 'fa-eye-slash' : 'fa-eye'
                      }`}
                    ></i>

                  </button>

                </div>

                {formik.touched.password && formik.errors.password && (

                  <div className="text-danger small mt-1">
                    {formik.errors.password}
                  </div>

                )}

              </div>


              {/* Confirm Password */}
              {!isLogin && (

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Confirm Password
                  </label>

                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className={`form-control py-2 ${
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? 'is-invalid'
                        : ''
                    }`}
                    placeholder="Confirm your password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (

                    <div className="invalid-feedback">
                      {formik.errors.confirmPassword}
                    </div>

                  )}

                </div>

              )}


              {/* Remember Me */}
              {isLogin && (

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div className="form-check">

                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />

                    <label
                      className="form-check-label text-secondary"
                      htmlFor="remember"
                    >
                      Remember me
                    </label>

                  </div>

                  <button
                    type="button"
                    className="btn btn-link text-decoration-none fw-semibold p-0"
                    style={{ color: '#315A3D' }}
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>

                </div>

              )}


              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn w-100 py-2 fw-semibold text-white"
                style={{
                  backgroundColor: '#315A3D',
                  borderRadius: '8px'
                }}
              >

                {loading ? (

                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Please wait...
                  </>

                ) : (

                  isLogin ? 'Login to Account' : 'Create Account'

                )}

              </button>


              {/* Switch Login/Register */}
              <div className="text-center mt-4">

                <span className="text-secondary">

                  {isLogin
                    ? "Don't have an account? "
                    : 'Already have an account? '}

                </span>

                <button
                  type="button"
                  className="btn btn-link text-decoration-none fw-bold p-0"
                  style={{ color: '#315A3D' }}
                  onClick={handleToggle}
                >

                  {isLogin ? 'Register Now' : 'Login'}

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>


      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={3000}
      />

    </div>

  )

}

export default Auth