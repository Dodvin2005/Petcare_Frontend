import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#F5F8F3' }}  >

      <div className="container py-5">

        <div className="row align-items-center justify-content-center g-5">

          {/* Left Section */}
          <div className="col-lg-6 text-center text-lg-start">

            <h1  className="display-1 fw-bold mb-2"  style={{ color: '#426B4F' }}  >
              404
            </h1>

            <h2 className="fw-bold mb-3" style={{ color: '#263D2C' }}> Oops! Page Not Found </h2>

            <p className="text-secondary fs-5 mb-4">
              Looks like this page has wandered off!
              The page you're looking for doesn't exist or may have been moved.
            </p>

            <Link to="/" className="btn btn-lg text-white rounded-pill px-4" style={{ backgroundColor: '#426B4F' }} >
              Back to Home
            </Link>

            <p className="text-secondary mt-4 mb-0">
              Need help?{' '}
              <Link  to="/contact"  className="text-decoration-none fw-semibold"  style={{ color: '#426B4F' }}  >
                Contact Us
              </Link>
            </p>

          </div>


          {/* Right Section */}
          <div className="col-lg-5 text-center">

            <img
              src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=85"
              alt="Cute dog"
              className="img-fluid rounded-5 shadow-sm"
              style={{ maxHeight: '400px',  width: '100%', objectFit: 'cover' }} />

            <h5 className="fw-bold mt-4" style={{ color: '#426B4F' }}>
              Lost your way?
            </h5>

            <p className="text-secondary">
              Let's get you back to happier tails!
            </p>

          </div>

        </div>


        {/* Footer */}
        <div className="text-center mt-5 pt-4 border-top">

          <p className="mb-0 text-secondary">
            <span className="fw-bold" style={{ color: '#426B4F' }}>
              PetCare.
            </span>
            Better Care. Happier Pets.
          </p>

        </div>

      </div>

    </div>
  )
}

export default Pnf