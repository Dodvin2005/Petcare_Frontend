import React from 'react'

function PetCard() {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">

      {/* Pet Image */}
      <div className="position-relative">
        <img
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=600"
          className="card-img-top"
          alt="Pet"
          style={{ height: '230px', objectFit: 'cover' }}
        />

        <span className="badge bg-success position-absolute top-0 end-0 m-3 rounded-pill px-3 py-2">
          Healthy
        </span>
      </div>

      {/* Pet Details */}
      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold mb-0">Max</h5>
          <span className="badge bg-light text-success border rounded-pill">
            Dog
          </span>
        </div>

        <p className="text-muted mb-3">
          Golden Retriever
        </p>

        <div className="row g-3 mb-4">

          <div className="col-6">
            <div className="bg-light rounded-3 p-3">
              <small className="text-muted d-block mb-1">Age</small>
              <span className="fw-semibold">3 Years</span>
            </div>
          </div>

          <div className="col-6">
            <div className="bg-light rounded-3 p-3">
              <small className="text-muted d-block mb-1">Gender</small>
              <span className="fw-semibold">Male</span>
            </div>
          </div>

        </div>

        {/* Vaccination Status */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <small className="text-muted d-block">Vaccination</small>
            <span className="text-success fw-semibold">
              Up to Date
            </span>
          </div>

          <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
            Vaccinated
          </span>
        </div>

        {/* Button */}
        <button className="btn btn-success w-100 rounded-pill py-2 fw-semibold">
          View Details
        </button>

      </div>

    </div>
  )
}

export default PetCard