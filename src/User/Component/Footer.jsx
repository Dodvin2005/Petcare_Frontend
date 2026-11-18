import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer
      className="text-white mt-5"
      style={{
        backgroundColor: '#244631',
        width: '100%',
        overflow: 'hidden'
      }}
    >

      {/* Top Footer Section */}
      <div className="container-fluid px-4 px-md-5 pt-5 pb-4">

        <div className="row g-4">

          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">

            <h2 className="fw-bold mb-3" style={{ letterSpacing: '-1px' }}>
              PET<span style={{ color: '#B9DDB9' }}>CARE</span>
              <span style={{ color: '#E8C98B' }}>.</span>
            </h2>

            <p
              className="mb-4"
              style={{
                color: '#D1E1D2',
                fontSize: '14px',
                lineHeight: '1.9',
                maxWidth: '350px'
              }}
            >
              Your trusted partner in pet wellness. From health records
              to veterinary appointments, we make caring for your
              beloved companions easier every day.
            </p>

            <div
              className="rounded-4 p-3"
              style={{
                backgroundColor: '#31583E',
                border: '1px solid #456B4E',
                maxWidth: '330px'
              }}
            >
              <h6 className="fw-bold mb-1" style={{ color: '#D8EBD4' }}>
                Better Care. Happier Pets.
              </h6>

              <p className="mb-0 small" style={{ color: '#C2D7C4' }}>
                Because every little paw deserves the best.
              </p>
            </div>

          </div>


          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">

            <h6 className="fw-bold mb-4" style={{ color: '#D5E9D0' }}>
              QUICK LINKS
            </h6>

            <div className="d-flex flex-column gap-3">

              <Link
                to="/"
                className="text-decoration-none"
                style={{ color: '#D1E1D2', fontSize: '14px' }}
              >
                Home
              </Link>

              <Link
                to="/my-pets"
                className="text-decoration-none"
                style={{ color: '#D1E1D2', fontSize: '14px' }}
              >
                My Pets
              </Link>

              <Link
                to="/services"
                className="text-decoration-none"
                style={{ color: '#D1E1D2', fontSize: '14px' }}
              >
                Our Services
              </Link>

              <Link
                to="/book-appointment"
                className="text-decoration-none"
                style={{ color: '#D1E1D2', fontSize: '14px' }}
              >
                Appointments
              </Link>

            </div>

          </div>


          {/* Pet Care Services */}
          <div className="col-lg-3 col-md-6 col-6">

            <h6 className="fw-bold mb-4" style={{ color: '#D5E9D0' }}>
              PET CARE
            </h6>

            <div className="d-flex flex-column gap-3">

              <Link
                to="/my-pets"
                className="text-decoration-none"
                style={{ color: '#D1E1D2', fontSize: '14px' }}
              >
                Pet Profiles
              </Link>

              <Link
                to="/services"
                className="text-decoration-none"
                style={{ color: '#D1E1D2', fontSize: '14px' }}
              >
                Health Records
              </Link>

              <Link
                to="/services"
                className="text-decoration-none"
                style={{ color: '#D1E1D2', fontSize: '14px' }}
              >
                Vaccination Details
              </Link>

              <Link
                to="/book-appointment"
                className="text-decoration-none"
                style={{ color: '#D1E1D2', fontSize: '14px' }}
              >
                Vet Appointments
              </Link>

            </div>

          </div>


          {/* Contact Section */}
          <div className="col-lg-3 col-md-6">

            <h6 className="fw-bold mb-4" style={{ color: '#D5E9D0' }}>
              LET'S CONNECT
            </h6>

            <p
              className="mb-3"
              style={{ color: '#D1E1D2', fontSize: '14px', lineHeight: '1.8' }}
            >
              Have questions about your pet's care? We're here to help
              you make every moment healthier and happier.
            </p>

            <Link
              to="/contact"
              className="btn rounded-pill px-4 py-2 fw-semibold"
              style={{
                backgroundColor: '#D5E9D0',
                color: '#244631',
                fontSize: '13px',
                border: 'none'
              }}
            >
              Contact Us →
            </Link>

          </div>

        </div>


        {/* Decorative Divider */}
        <hr
          className="my-5"
          style={{
            borderColor: '#B8D5B9',
            opacity: 0.25
          }}
        />


        {/* Bottom Footer */}
        <div className="row align-items-center gy-3">

          <div className="col-md-6 text-center text-md-start">

            <p
              className="mb-0"
              style={{ color: '#BFD2C1', fontSize: '13px' }}
            >
              © 2026 <span className="fw-bold text-white">PETCARE.</span>
              {' '}All rights reserved.
            </p>

          </div>

          <div className="col-md-6 text-center text-md-end">

            <p
              className="mb-0"
              style={{ color: '#BFD2C1', fontSize: '13px' }} >
              Made with care for every little paw.
            </p>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer