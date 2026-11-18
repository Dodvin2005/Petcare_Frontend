// import React, { useState } from 'react'
// import { Link, Navigate, useNavigate } from 'react-router-dom'
// import { registerAPI } from '../../Services/AllApi'
// import { useFormik } from 'formik'

// function Register() {
//   const navigate = useNavigate()

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')


//    const formik = useFormik({
//     initialValues: {
//       username: "Username",
//       email: "",
//       password: ""
//     },
//     validationSchema: Yup.object({
//       username: Yup.string().min(3, "Must be altleast 3 characters").required("Required"),
//       email: Yup.string().email("Invalid email").required("Required"),
//       password: Yup.string().required("Required"),

//     }),
//     onSubmit: (values, resetForm) => {
//       console.log(values);

//       if (Register) {
//         console.log("Register API call");
//         handleRegister(values)

//       } else {
//         console.log("Login API call");
//         handleLogin(values)
//       }
//       resetForm()
//     }
//   })


//    const handleLogin = async (userData) => {
//     const result = await loginAPI(userData)
//     console.log(result);
//     if (result.status == 200) {
//       toast.success("Successfully logged in...!!!")
//       sessionStorage.setItem("token", result.data.token)
//       sessionStorage.setItem("user", JSON.stringify(result.data.user))
//       setTimeout(() => {
//         if (result.data.user.role == "admin") {
//           Navigate('/admin')
//         } else {
//           Navigate('/')
//         }
//       }, 2500)
//     } else {
//       toast.error(result)
//     }

//   }
  

//    const handleRegister = async (userData) => {
//     const result = await registerAPI(userData)
//     console.log(result);
//     if (result.status == 201) {
//       toast.success("Successfully Registered.. Please Login!!")
//     } else {
//       toast.error(result)

//     }
//     Navigate = ('/login')
//   }

  
//   return (
//     <div className="container-fluid bg-body-tertiary min-vh-100 py-5">
//       <div className="container">

//         {/* Brand Header */}
//         <div className="d-flex justify-content-between align-items-center mb-5">
//           <Link to="/" className="text-decoration-none">
//             <h3 className="fw-bold text-success mb-0">
//               PetCare<span className="text-warning">.</span>
//             </h3>

//             <small className="text-secondary">
//               Your Pet's Health Partner
//             </small>
//           </Link>

//           <div className="d-none d-sm-block">
//             <span className="text-secondary small">
//               Already a member?
//             </span>

//             <Link
//               to="/login"
//               className="btn btn-outline-success rounded-pill px-4 ms-2"
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>

//         {/* Main Registration Section */}
//         <div className="row justify-content-center align-items-stretch g-0">

//           {/* Left Information Panel */}
//           <div className="col-lg-5 d-none d-lg-flex">
//             <div className="bg-success text-white rounded-start-4 p-5 w-100 d-flex flex-column">

//               <span className="badge bg-white text-success rounded-pill px-3 py-2 align-self-start mb-4">
//                 YOUR PET'S WELLNESS STARTS HERE
//               </span>

//               <h1 className="display-5 fw-bold lh-sm mb-4">
//                 Every Pet
//                 <br />
//                 Deserves
//                 <br />
//                 <span className="text-warning">
//                   Better Care.
//                 </span>
//               </h1>

//               <p className="text-white-50 mb-5">
//                 Create your account and experience a smarter way to manage
//                 your pet's health, vaccination records, and veterinary
//                 appointments.
//               </p>

//               <div className="d-flex align-items-start mb-4">
//                 <div className="bg-white bg-opacity-10 rounded-3 p-3 me-3 flex-shrink-0">
//                   <span className="fs-4">01</span>
//                 </div>

//                 <div>
//                   <h5 className="fw-bold mb-2">
//                     Complete Health Records
//                   </h5>

//                   <p className="small text-white-50 mb-0">
//                     Keep your pet's medical history, treatments, and
//                     vaccination details organized.
//                   </p>
//                 </div>
//               </div>

//               <div className="d-flex align-items-start mb-4">
//                 <div className="bg-white bg-opacity-10 rounded-3 p-3 me-3 flex-shrink-0">
//                   <span className="fs-4">02</span>
//                 </div>

//                 <div>
//                   <h5 className="fw-bold mb-2">
//                     Simple Appointment Booking
//                   </h5>

//                   <p className="small text-white-50 mb-0">
//                     Find veterinary care and manage upcoming appointments
//                     conveniently.
//                   </p>
//                 </div>
//               </div>

//               <div className="d-flex align-items-start mb-4">
//                 <div className="bg-white bg-opacity-10 rounded-3 p-3 me-3 flex-shrink-0">
//                   <span className="fs-4">03</span>
//                 </div>

//                 <div>
//                   <h5 className="fw-bold mb-2">
//                     Vaccination Tracking
//                   </h5>

//                   <p className="small text-white-50 mb-0">
//                     Stay informed about vaccination schedules and
//                     important health reminders.
//                   </p>
//                 </div>
//               </div>

//               <div className="border-top border-white border-opacity-25 pt-4 mt-auto">
//                 <p className="mb-1 fw-semibold">
//                   Better health. Happier pets.
//                 </p>

//                 <p className="small text-white-50 mb-0">
//                   A caring community for every pet and every pet parent.
//                 </p>
//               </div>

//             </div>
//           </div>

//           {/* Right Registration Form */}
//           <div className="col-lg-7 col-md-10 col-12">
//             <div className="bg-white shadow-lg rounded-end-4 rounded-start-0 p-4 p-md-5 h-100">

//               {/* Form Heading */}
//               <div className="mb-4">
//                 <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2 mb-3">
//                   CREATE YOUR ACCOUNT
//                 </span>

//                 <h2 className="fw-bold text-dark mb-2">
//                   Welcome to PetCare!
//                 </h2>

//                 <p className="text-secondary mb-0">
//                   Join us to give your furry friend the care they deserve.
//                 </p>
//               </div>

//               {/* Registration Form */}
//               <form onSubmit={handleRegister} noValidate>

//                 {/* Personal Information */}
//                 <h6 className="fw-bold text-success mb-3">
//                   Personal Information
//                 </h6>

//                 <div className="row">

//                   <div className="col-md-6 mb-3">
//                     <label className="form-label fw-semibold">
//                       Full Name
//                     </label>

//                     <input
//                       type="text"
//                       name="name"
//                       className="form-control rounded-3 py-2"
//                       placeholder="Enter your full name"
//                       autoComplete="name"
//                       value={userData.name}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label className="form-label fw-semibold">
//                       Username
//                     </label>

//                     <input
//                       type="text"
//                       name="username"
//                       className="form-control rounded-3 py-2"
//                       placeholder="Choose a username"
//                       autoComplete="username"
//                       value={userData.username}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label className="form-label fw-semibold">
//                       Email Address
//                     </label>

//                     <input
//                       type="text"
//                       name="email"
//                       className="form-control rounded-3 py-2"
//                       placeholder="you@example.com"
//                       autoComplete="email"
//                       value={userData.email}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label className="form-label fw-semibold">
//                       Phone Number
//                     </label>

//                     <input
//                       type="tel"
//                       name="phone"
//                       className="form-control rounded-3 py-2"
//                       placeholder="Enter your phone number"
//                       autoComplete="tel"
//                       value={userData.phone}
//                       onChange={handleChange}
//                     />
//                   </div>

//                 </div>

//                 {/* Pet Information */}
//                 <div className="border-top pt-4 mt-2 mb-4">

//                   <h6 className="fw-bold text-success mb-3">
//                     Tell Us About Your Pet
//                   </h6>

//                   <div className="row">

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Pet's Name
//                         <span className="text-secondary small ms-1">
//                           (Optional)
//                         </span>
//                       </label>

//                       <input
//                         type="text"
//                         name="petName"
//                         className="form-control rounded-3 py-2"
//                         placeholder="Enter your pet's name"
//                         value={userData.petName}
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Pet Type
//                       </label>

//                       <select
//                         name="petType"
//                         className="form-select rounded-3 py-2"
//                         value={userData.petType}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select pet type</option>
//                         <option value="dog">Dog</option>
//                         <option value="cat">Cat</option>
//                         <option value="bird">Bird</option>
//                         <option value="rabbit">Rabbit</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>

//                   </div>

//                   <div className="alert alert-success border-0 rounded-3 small mb-0">
//                     Pet details are optional. You can add or update your
//                     pet's information after creating your account.
//                   </div>

//                 </div>

//                 {/* Account Security */}
//                 <div className="border-top pt-4 mb-4">

//                   <h6 className="fw-bold text-success mb-3">
//                     Account Security
//                   </h6>

//                   <div className="row">

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Password
//                       </label>

//                       <div className="input-group">
//                         <input
//                           type={showPassword ? 'text' : 'password'}
//                           name="password"
//                           className="form-control rounded-start-3 py-2"
//                           placeholder="Create a password"
//                           autoComplete="new-password"
//                           value={userData.password}
//                           onChange={handleChange}
//                         />

//                         <button
//                           type="button"
//                           className="btn btn-outline-secondary rounded-end-3"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? 'Hide' : 'Show'}
//                         </button>
//                       </div>
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Confirm Password
//                       </label>

//                       <div className="input-group">
//                         <input
//                           type={showConfirmPassword ? 'text' : 'password'}
//                           name="confirmPassword"
//                           className="form-control rounded-start-3 py-2"
//                           placeholder="Re-enter your password"
//                           autoComplete="new-password"
//                           value={userData.confirmPassword}
//                           onChange={handleChange}
//                         />

//                         <button
//                           type="button"
//                           className="btn btn-outline-secondary rounded-end-3"
//                           onClick={() =>
//                             setShowConfirmPassword(!showConfirmPassword)
//                           }
//                         >
//                           {showConfirmPassword ? 'Hide' : 'Show'}
//                         </button>
//                       </div>
//                     </div>

//                   </div>
//                 </div>

//                 {/* Terms and Conditions */}
//                 <div className="form-check mb-4">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="terms"
//                   />

//                   <label
//                     className="form-check-label small text-secondary"
//                     htmlFor="terms"
//                   >
//                     I agree to the{' '}

//                     <Link
//                       to="/terms"
//                       className="text-success fw-semibold text-decoration-none"
//                     >
//                       Terms & Conditions
//                     </Link>

//                     {' '}and{' '}

//                     <Link
//                       to="/privacy"
//                       className="text-success fw-semibold text-decoration-none"
//                     >
//                       Privacy Policy
//                     </Link>.
//                   </label>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                   <div className="alert alert-danger rounded-3" role="alert">
//                     {error}
//                   </div>
//                 )}

//                 {/* Success Message */}
//                 {success && (
//                   <div className="alert alert-success rounded-3" role="alert">
//                     {success}
//                   </div>
//                 )}

//                 {/* Create Account Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="btn btn-success btn-lg w-100 rounded-3 fw-bold py-3 shadow-sm"
//                 >
//                   {loading ? (
//                     <>
//                       <span
//                         className="spinner-border spinner-border-sm me-2"
//                         role="status"
//                         aria-hidden="true"
//                       />
//                       Creating Account...
//                     </>
//                   ) : (
//                     <>
//                       Create My Account <span className="ms-2">→</span>
//                     </>
//                   )}
//                 </button>

//                 {/* Login Link */}
//                 <div className="text-center mt-4">
//                   <span className="text-secondary">
//                     Already have an account?
//                   </span>

//                   <Link
//                     to="/login"
//                     className="text-success fw-bold text-decoration-none ms-2"
//                   >
//                     Sign In
//                   </Link>
//                 </div>

//                 {/* Trust Message */}
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

//         {/* Copyright */}
//         <div className="text-center mt-4">
//           <small className="text-secondary">
//             © {new Date().getFullYear()} PetCare. All rights reserved.
//           </small>

//           <div className="mt-2">
//             <Link
//               to="/privacy"
//               className="text-secondary small text-decoration-none me-3"
//             >
//               Privacy Policy
//             </Link>

//             <Link
//               to="/terms"
//               className="text-secondary small text-decoration-none"
//             >
//               Terms & Conditions
//             </Link>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Register