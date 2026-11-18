import React from 'react'

function AppointmentCard() {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">

        <div className="row align-items-center g-4">

          {/* Pet Image */}
          <div className="col-lg-2 col-md-3 text-center">
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=300"
              alt="Max"
              className="img-fluid rounded-4"
              style={{
                width: '125px',
                height: '125px',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Appointment Information */}
          <div className="col-lg-4 col-md-9">

            <span
              className="badge rounded-pill px-3 py-2 mb-3"
              style={{
                backgroundColor: '#FFF0CC',
                color: '#946200'
              }}
            >
              Pending
            </span>

            <h5 className="fw-bold mb-2" style={{ color: '#315A3D' }}>
              Max - Golden Retriever
            </h5>

            <p className="text-muted small mb-3">
              Appointment ID: #APT1024
            </p>

            <p className="mb-2">
              <span className="fw-semibold">Veterinarian:</span> Dr. John
            </p>

            <p className="mb-0">
              <span className="fw-semibold">Service:</span> General Checkup
            </p>

          </div>

          {/* Appointment Date and Time */}
          <div className="col-lg-3 col-md-6">

            <div
              className="rounded-4 p-3"
              style={{ backgroundColor: '#F2F7F0' }}
            >

              <p
                className="small fw-semibold mb-2"
                style={{ color: '#315A3D' }}
              >
                APPOINTMENT DATE
              </p>

              <h6 className="fw-bold mb-3">30 October 2026</h6>

              <p
                className="small fw-semibold mb-2"
                style={{ color: '#315A3D' }}
              >
                APPOINTMENT TIME
              </p>

              <h6 className="fw-bold mb-0">10:30 AM</h6>

            </div>

          </div>

          {/* Action Buttons */}
          <div className="col-lg-3 col-md-6">

            <div className="d-grid gap-2">

              <button
                className="btn rounded-3 py-2 fw-semibold"
                style={{
                  backgroundColor: '#315A3D',
                  color: 'white'
                }}
              >
                View Details
              </button>

              <button className="btn btn-outline-danger rounded-3 py-2">
                Cancel Appointment
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default AppointmentCard