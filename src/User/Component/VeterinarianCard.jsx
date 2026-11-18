import React from 'react'
import { Link } from 'react-router-dom'

function VeterinarianCard({ veterinarian }) {

    const vet = veterinarian

    return (

        <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">

            {/* Doctor Image */}

            <div
                className="text-center pt-4"
                style={{ backgroundColor: '#EAF4E9' }}
            >

                <img
                    src={
                        vet.profileImage
                            ? `http://localhost:3000/uploads/${vet.profileImage}`
                            : 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png'
                    }
                    alt={vet.name}
                    className="rounded-circle border border-4 border-white shadow-sm"
                    style={{
                        width: '125px',
                        height: '125px',
                        objectFit: 'cover'
                    }}
                />

                <div className="mt-3 pb-3">

                    <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                            backgroundColor: '#D5EED8',
                            color: '#28633B'
                        }}
                    >
                        Available for Appointments
                    </span>

                </div>

            </div>


            {/* Doctor Details */}

            <div className="card-body p-4 text-center">

                <h5 className="fw-bold mb-1" style={{ color: '#244B35' }}>
                    Dr. {vet.name}
                </h5>

                <p
                    className="fw-semibold mb-3"
                    style={{ color: '#4B875A' }}
                >
                    {vet.specialization || 'Veterinary Specialist'}
                </p>

                <p className="text-secondary small mb-3">
                    {vet.about || 'Dedicated to providing quality healthcare and compassionate treatment for your beloved pets.'}
                </p>


                {/* Doctor Information */}

                <div
                    className="rounded-3 p-3 mb-3 text-start"
                    style={{ backgroundColor: '#F6F8F4' }}
                >

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <span className="text-secondary small">
                            Experience
                        </span>

                        <span className="fw-semibold small">
                            {vet.experience || 'Not specified'}
                            {vet.experience ? ' Years' : ''}
                        </span>

                    </div>


                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <span className="text-secondary small">
                            Qualification
                        </span>

                        <span className="fw-semibold small">
                            {vet.qualification || 'Not specified'}
                        </span>

                    </div>


                    <div className="d-flex justify-content-between align-items-center">

                        <span className="text-secondary small">
                            Specialization
                        </span>

                        <span className="fw-semibold small">
                            {vet.specialization || 'General'}
                        </span>

                    </div>

                </div>


                {/* Contact Information */}

                <div className="text-start mb-3">

                    {vet.email && (
                        <p className="small text-secondary mb-2">
                            <i className="fa-solid fa-envelope me-2"></i>
                            {vet.email}
                        </p>
                    )}

                    {vet.phone && (
                        <p className="small text-secondary mb-0">
                            <i className="fa-solid fa-phone me-2"></i>
                            {vet.phone}
                        </p>
                    )}

                </div>


                {/* Buttons */}

                <div className="d-flex gap-2">

                    <Link
                        to="/book-appointment"
                        className="btn flex-grow-1 rounded-pill py-2 fw-semibold text-white"
                        style={{ backgroundColor: '#326B43' }}
                    >
                        Book Appointment
                    </Link>

                </div>

            </div>

        </div>

    )
}

export default VeterinarianCard