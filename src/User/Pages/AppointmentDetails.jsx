import React from 'react'
import { Link, useParams } from 'react-router-dom'

function AppointmentDetails() {

  const { id } = useParams()

  return (
    <div style={{ backgroundColor: '#F7F9F5', minHeight: '100vh' }}>

      {/* Page Header */}
      <div
        className="py-5"
        style={{ backgroundColor: '#315A3D', color: 'white' }}
      >
        <div className="container">

          <p className="small mb-2" style={{ color: '#C8DFC6' }}>
            PETCARE / MY APPOINTMENTS / DETAILS
          </p>

          <div className="row align-items-center g-3">

            <div className="col-md-8">

              <h1 className="fw-bold mb-3">
                Appointment Details
              </h1>

              <p className="mb-0" style={{ color: '#D5E4D5' }}>
                View your pet's appointment information, veterinarian details,
                and healthcare visit schedule.
              </p>

            </div>

            <div className="col-md-4 text-md-end">

              <Link
                to="/my-appointments"
                className="btn rounded-3 px-4 py-3 fw-semibold"
                style={{
                  backgroundColor: '#E0EEDB',
                  color: '#315A3D'
                }}
              >
                ← Back to Appointments
              </Link>

            </div>

          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">

        {/* Appointment ID and Status */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">

          <div className="card-body p-4">

            <div className="row align-items-center g-3">

              <div className="col-md-8">

                <p className="text-muted small mb-2">
                  APPOINTMENT REFERENCE
                </p>

                <h4 className="fw-bold mb-2" style={{ color: '#315A3D' }}>
                  #{id || 'APT-001'}
                </h4>

                <p className="text-muted mb-0">
                  Keep this reference number for future communication.
                </p>

              </div>

              <div className="col-md-4 text-md-end">

                <span
                  className="badge rounded-pill px-4 py-3"
                  style={{
                    backgroundColor: '#FFF0CC',
                    color: '#946200',
                    fontSize: '14px'
                  }}
                >
                  Upcoming Appointment
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="row g-4">

          {/* Left Column */}
          <div className="col-lg-8">

            {/* Pet Information */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-4" style={{ color: '#315A3D' }}>
                  Pet Information
                </h5>

                <div className="row align-items-center g-4">

                  <div className="col-md-4 text-center">

                    <img
                      src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=400"
                      alt="Pet"
                      className="img-fluid rounded-4"
                      style={{
                        width: '180px',
                        height: '180px',
                        objectFit: 'cover'
                      }}
                    />

                  </div>

                  <div className="col-md-8">

                    <h4 className="fw-bold mb-3" style={{ color: '#315A3D' }}>
                      Bruno
                    </h4>

                    <div className="row g-3">

                      <div className="col-sm-6">
                        <p className="text-muted small mb-1">Pet Type</p>
                        <p className="fw-semibold mb-0">Dog</p>
                      </div>

                      <div className="col-sm-6">
                        <p className="text-muted small mb-1">Breed</p>
                        <p className="fw-semibold mb-0">Golden Retriever</p>
                      </div>

                      <div className="col-sm-6">
                        <p className="text-muted small mb-1">Age</p>
                        <p className="fw-semibold mb-0">3 Years</p>
                      </div>

                      <div className="col-sm-6">
                        <p className="text-muted small mb-1">Gender</p>
                        <p className="fw-semibold mb-0">Male</p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Appointment Information */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-4" style={{ color: '#315A3D' }}>
                  Appointment Information
                </h5>

                <div className="row g-4">

                  <div className="col-md-6">

                    <div
                      className="rounded-4 p-3 h-100"
                      style={{ backgroundColor: '#F7F9F5' }}
                    >

                      <p className="text-muted small mb-2">
                        Appointment Date
                      </p>

                      <h6 className="fw-bold mb-1">
                        05 November 2026
                      </h6>

                      <p className="small text-muted mb-0">
                        Thursday
                      </p>

                    </div>

                  </div>

                  <div className="col-md-6">

                    <div
                      className="rounded-4 p-3 h-100"
                      style={{ backgroundColor: '#F7F9F5' }}
                    >

                      <p className="text-muted small mb-2">
                        Appointment Time
                      </p>

                      <h6 className="fw-bold mb-1">
                        10:30 AM
                      </h6>

                      <p className="small text-muted mb-0">
                        Estimated duration: 30 minutes
                      </p>

                    </div>

                  </div>

                  <div className="col-md-6">

                    <p className="text-muted small mb-2">
                      Service Type
                    </p>

                    <h6 className="fw-semibold">
                      General Health Checkup
                    </h6>

                  </div>

                  <div className="col-md-6">

                    <p className="text-muted small mb-2">
                      Appointment Mode
                    </p>

                    <h6 className="fw-semibold">
                      In-Clinic Visit
                    </h6>

                  </div>

                  <div className="col-12">

                    <p className="text-muted small mb-2">
                      Reason for Visit
                    </p>

                    <div
                      className="rounded-3 p-3"
                      style={{ backgroundColor: '#F7F9F5' }}
                    >

                      <p className="mb-0 text-secondary">
                        Routine health checkup to monitor Bruno's overall
                        health, physical condition, and vaccination schedule.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Additional Notes */}
            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-3" style={{ color: '#315A3D' }}>
                  Important Instructions
                </h5>

                <div
                  className="rounded-4 p-4"
                  style={{ backgroundColor: '#EAF2E7' }}
                >

                  <p className="mb-3">
                    Please keep the following points in mind before your visit:
                  </p>

                  <ul className="text-secondary mb-0">

                    <li className="mb-2">
                      Arrive 10–15 minutes before your scheduled appointment.
                    </li>

                    <li className="mb-2">
                      Bring your pet's previous medical records.
                    </li>

                    <li className="mb-2">
                      Carry the vaccination record if available.
                    </li>

                    <li>
                      Inform the veterinarian about any recent health concerns.
                    </li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

          {/* Right Column */}
          <div className="col-lg-4">

            {/* Veterinarian Details */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-4" style={{ color: '#315A3D' }}>
                  Your Veterinarian
                </h5>

                <div className="text-center">

                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300"
                    alt="Veterinarian"
                    className="rounded-circle mb-3"
                    style={{
                      width: '110px',
                      height: '110px',
                      objectFit: 'cover'
                    }}
                  />

                  <h5 className="fw-bold mb-1">
                    Dr. Anjali Thomas
                  </h5>

                  <p className="text-muted small mb-3">
                    Veterinary Doctor
                  </p>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor: '#E5EFE7',
                      color: '#315A3D'
                    }}
                  >
                    General Veterinary Care
                  </span>

                </div>

                <hr className="my-4" />

                <div className="mb-3">

                  <p className="text-muted small mb-1">
                    Clinic
                  </p>

                  <p className="fw-semibold mb-0">
                    PetCare Veterinary Clinic
                  </p>

                </div>

                <div>

                  <p className="text-muted small mb-1">
                    Location
                  </p>

                  <p className="fw-semibold mb-0">
                    Kochi, Kerala
                  </p>

                </div>

              </div>

            </div>

            {/* Appointment Summary */}
            <div
              className="card border-0 shadow-sm rounded-4"
              style={{ backgroundColor: '#315A3D', color: 'white' }}
            >

              <div className="card-body p-4">

                <h5 className="fw-bold mb-4">
                  Appointment Summary
                </h5>

                <div className="d-flex justify-content-between mb-3">

                  <span style={{ color: '#D5E4D5' }}>
                    Pet Name
                  </span>

                  <span className="fw-semibold">
                    Bruno
                  </span>

                </div>

                <div className="d-flex justify-content-between mb-3">

                  <span style={{ color: '#D5E4D5' }}>
                    Service
                  </span>

                  <span className="fw-semibold text-end ms-3">
                    Health Checkup
                  </span>

                </div>

                <div className="d-flex justify-content-between mb-3">

                  <span style={{ color: '#D5E4D5' }}>
                    Date
                  </span>

                  <span className="fw-semibold">
                    05 Nov 2026
                  </span>

                </div>

                <hr style={{ borderColor: '#6B8B73' }} />

                <div className="d-flex justify-content-between align-items-center">

                  <span style={{ color: '#D5E4D5' }}>
                    Appointment Fee
                  </span>

                  <h4 className="fw-bold mb-0">
                    ₹500
                  </h4>

                </div>

                <p className="small mt-3 mb-0" style={{ color: '#D5E4D5' }}>
                  Sample appointment information for display purposes.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Banner */}
        <div
          className="rounded-4 p-4 p-md-5 mt-5"
          style={{ backgroundColor: '#EAF2E7' }}
        >

          <div className="row align-items-center g-4">

            <div className="col-lg-8">

              <p
                className="small fw-semibold mb-2"
                style={{ color: '#64816A' }}
              >
                YOUR PET'S WELLNESS MATTERS
              </p>

              <h4 className="fw-bold mb-3" style={{ color: '#315A3D' }}>
                Every Visit Is a Step Towards Better Health
              </h4>

              <p className="text-secondary mb-0">
                Regular checkups help keep your furry friend healthy,
                active, and happy.
              </p>

            </div>

            <div className="col-lg-4 text-lg-end">

              <Link
                to="/my-appointments"
                className="btn rounded-3 px-4 py-3 fw-semibold"
                style={{
                  backgroundColor: '#315A3D',
                  color: 'white'
                }}
              >
                View My Appointments
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AppointmentDetails