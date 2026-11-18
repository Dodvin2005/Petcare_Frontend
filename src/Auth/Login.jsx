// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { loginAPI } from '../../Services/AllApi'

// function Login() {
//   const navigate = useNavigate()

//   const [showPassword, setShowPassword] = useState(false)
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: ''
//   })
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   // Handle input changes
//   const handleChange = (e) => {
//     setLoginData({
//       ...loginData,
//       [e.target.name]: e.target.value
//     })
//     setError('')
//   }

//   // Login function
//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       const response = await loginAPI(loginData)

//       // Get token and user details
//       const token = response.data.token
//       const user = response.data.user

//       // Save login details
//       if (token) {
//         localStorage.setItem('token', token)
//       }

//       if (user) {
//         localStorage.setItem('user', JSON.stringify(user))
//       }

//       // Navigate based on role
//       if (user?.role === 'admin') {
//         navigate('/admin')
//       } else if (user?.role === 'veterinarian' || user?.role === 'vet') {
//         navigate('/vet')
//       } else {
//         navigate('/')
//       }

//     } catch (err) {
//       console.error(err)
//       setError(
//         err.response?.data?.message ||
//         'Login failed. Please check your email and password.'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="container-fluid bg-body-tertiary min-vh-100 py-5">
//       <div className="container">

//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-center mb-5">
//           <Link to="/" className="text-decoration-none">
//             <h3 className="fw-bold text-success mb-0">
//               PetCare<span className="text-warning">.</span>
//             </h3>
//             <small className="text-secondary">
//               Your Pet's Health Partner
//             </small>
//           </Link>

//           <div>
//             <span className="text-secondary small d-none d-sm-inline">
//               New to PetCare?
//             </span>
//             <Link
//               to="/register"
//               className="btn btn-outline-success rounded-pill px-4 ms-2"
//             >
//               Create Account
//             </Link>
//           </div>
//         </div>

//         {/* Login Section */}
//         <div className="row justify-content-center g-0 shadow-lg rounded-4 overflow-hidden">

//           {/* Left Panel */}
//           <div className="col-lg-5 d-none d-lg-flex">
//             <div className="bg-success text-white p-5 w-100 d-flex flex-column">

//               <span className="badge bg-white text-success rounded-pill px-3 py-2 align-self-start mb-4">
//                 WELCOME BACK TO PETCARE
//               </span>

//               <h1 className="display-5 fw-bold lh-sm mb-4">
//                 Because
//                 <br />
//                 Every Pet
//                 <br />
//                 Deserves
//                 <br />
//                 <span className="text-warning">
//                   The Best Care.
//                 </span>
//               </h1>

//               <p className="text-white-50 mb-5">
//                 Sign in to manage appointments, track vaccinations,
//                 and keep your pet's medical records organized.
//               </p>

//               <div className="bg-white bg-opacity-10 rounded-4 p-4 mb-3">
//                 <h5 className="fw-bold">Manage Pet Health</h5>
//                 <p className="small text-white-50 mb-0">
//                   Access your pet's health records and medical history.
//                 </p>
//               </div>

//               <div className="bg-white bg-opacity-10 rounded-4 p-4 mb-3">
//                 <h5 className="fw-bold">Book Appointments</h5>
//                 <p className="small text-white-50 mb-0">
//                   Schedule visits with veterinary professionals.
//                 </p>
//               </div>

//               <div className="bg-white bg-opacity-10 rounded-4 p-4 mb-4">
//                 <h5 className="fw-bold">Vaccination Tracking</h5>
//                 <p className="small text-white-50 mb-0">
//                   Keep track of your pet's vaccination schedule.
//                 </p>
//               </div>

//               <div className="border-top border-white border-opacity-25 pt-4 mt-auto">
//                 <p className="fw-semibold mb-1">
//                   Happy pets. Healthy lives.
//                 </p>
//                 <p className="small text-white-50 mb-0">
//                   We're happy to have you back!
//                 </p>
//               </div>

//             </div>
//           </div>

//           {/* Right Panel */}
//           <div className="col-lg-7 col-12">
//             <div className="bg-white p-4 p-md-5 h-100">

//               <div className="mb-4">
//                 <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2 mb-3">
//                   SECURE SIGN IN
//                 </span>

//                 <h2 className="fw-bold text-dark mb-2">
//                   Welcome Back!
//                 </h2>

//                 <p className="text-secondary">
//                   Sign in to continue caring for your furry friend.
//                 </p>
//               </div>

//               {/* Login Form */}
//               <form onSubmit={handleLogin}>

//                 <div className="mb-4">
//                   <label className="form-label fw-semibold">
//                     Email Address or Username
//                   </label>

//                   <input
//                     type="text"
//                     name="email"
//                     className="form-control form-control-lg rounded-3"
//                     placeholder="Enter your email or username"
//                     value={loginData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">
//                     Password
//                   </label>

//                   <div className="input-group input-group-lg">
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       name="password"
//                       className="form-control"
//                       placeholder="Enter your password"
//                       value={loginData.password}
//                       onChange={handleChange}
//                       required
//                     />

//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? 'Hide' : 'Show'}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                   <div className="alert alert-danger mt-3">
//                     {error}
//                   </div>
//                 )}

//                 {/* Login Button */}
//                 <button
//                   type="submit"
//                   className="btn btn-success btn-lg w-100 rounded-3 fw-bold py-3 mt-3"
//                   disabled={loading}
//                 >
//                   {loading ? 'Signing In...' : 'Sign In →'}
//                 </button>

//                 <div className="text-center my-4">
//                   <span className="text-secondary">
//                     YOUR PET'S CARE STARTS HERE
//                   </span>
//                 </div>

//                 <div className="text-center">
//                   <span className="text-secondary">
//                     Don't have an account?
//                   </span>

//                   <Link
//                     to="/register"
//                     className="text-success fw-bold text-decoration-none ms-2"
//                   >
//                     Create Account
//                   </Link>
//                 </div>

//                 <div className="bg-success-subtle rounded-3 p-3 text-center mt-4">
//                   <p className="text-success fw-semibold mb-1">
//                     Your Pet. Your Care. Our Commitment.
//                   </p>
//                   <small className="text-secondary">
//                     Your pet's well-being is always our priority.
//                   </small>
//                 </div>

//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-4">
//           <small className="text-secondary">
//             © {new Date().getFullYear()} PetCare. All rights reserved.
//           </small>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Login