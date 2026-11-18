import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import VetSidebar from '../Component/VetSidebar'


import {
    FaCalendarCheck,
    FaPaw,
    FaClock,
    FaCheckCircle,
    FaArrowRight,
    FaBell,
    FaDog,
    FaCat,
    FaUserMd,
    FaSearch,
    FaEye,
    FaTimes,
    FaCheck,
    FaFilter,
    FaStethoscope
} from 'react-icons/fa'
import { acceptAppointmentAPI, completeAppointmentAPI, getVetAppointmentsAPI, rejectAppointmentAPI } from '../../../Services/AllApi'


function VetDashboard() {

    const navigate = useNavigate()

    // LOGGED IN VETERINARIAN

    const loggedInUser = JSON.parse(
        localStorage.getItem('user') || '{}'
    )

    const vetName =
        loggedInUser?.name ||
        loggedInUser?.username ||
        'Veterinarian'


    // STATES

    const [appointments, setAppointments] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState('')

    const [updating, setUpdating] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')

    const [statusFilter, setStatusFilter] = useState('All')

    const [selectedAppointment, setSelectedAppointment] = useState(null)


    // GET VETERINARIAN APPOINTMENTS

    const getAppointments = async () => {

        try {

            setLoading(true)

            setError('')

            const response = await getVetAppointmentsAPI()

            console.log('Veterinarian Appointments:', response.data)

            const appointmentData =
                response.data.appointments ||
                response.data.data ||
                []

            setAppointments(appointmentData)

        }
        catch (err) {

            console.error('Appointment Fetch Error:', err)

            setError(
                err.response?.data?.message ||
                'Unable to load appointments.'
            )

        }
        finally {

            setLoading(false)

        }

    }


    // LOAD DATA

    useEffect(() => {

        getAppointments()

    }, [])


    // FORMAT BACKEND APPOINTMENT DATA

    const formattedAppointments = useMemo(() => {

        return appointments.map(appointment => {

            const pet = appointment.petId || {}

            const owner = appointment.userId || {}

            return {

                ...appointment,

                pet: pet.petName || 'Unknown Pet',

                owner: owner.name || owner.username || 'Unknown Owner',

                species: pet.petType || 'Other',

                breed: pet.breed || 'Not specified',

                type: appointment.service || 'General Checkup',

                date: appointment.appointmentDate,

                time: appointment.appointmentTime,

                status: appointment.status

            }

        })

    }, [appointments])


    // SEARCH AND FILTER

    const filteredAppointments = useMemo(() => {

        return formattedAppointments.filter(appointment => {

            const search = searchTerm.toLowerCase()

            const matchesSearch =

                appointment.pet.toLowerCase().includes(search) ||

                appointment.owner.toLowerCase().includes(search) ||

                appointment.type.toLowerCase().includes(search)

            const matchesStatus =

                statusFilter === 'All' ||

                appointment.status === statusFilter

            return matchesSearch && matchesStatus

        })

    }, [formattedAppointments, searchTerm, statusFilter])


    // DASHBOARD STATISTICS

    const statistics = [

        {
            title: 'My Appointments',

            value: appointments.length,

            description: 'Total assigned appointments',

            icon: <FaCalendarCheck />,

            bg: '#E5F2E7',

            color: '#679477'
        },

        {
            title: 'My Patients',

            value: new Set(
                appointments.map(item =>
                    item.petId?._id || item.petId
                ).filter(Boolean)
            ).size,

            description: 'Pets in my appointments',

            icon: <FaPaw />,

            bg: '#F5F0E2',

            color: '#B49A60'
        },

        {
            title: 'Pending Requests',

            value: appointments.filter(
                item => item.status === 'Pending'
            ).length,

            description: 'Awaiting confirmation',

            icon: <FaClock />,

            bg: '#FCEDE5',

            color: '#C78D6E'
        },

        {
            title: 'Completed Visits',

            value: appointments.filter(
                item => item.status === 'Completed'
            ).length,

            description: 'Successfully completed',

            icon: <FaCheckCircle />,

            bg: '#EAF0E3',

            color: '#82976B'
        }

    ]


    // UPDATE APPOINTMENT STATUS

    const updateStatus = async (appointmentId, action) => {

        try {

            setUpdating(true)

            let response

            if (action === 'Confirmed') {

                response = await acceptAppointmentAPI(appointmentId)

            }

            else if (action === 'Rejected') {

                response = await rejectAppointmentAPI(appointmentId)

            }

            else if (action === 'Completed') {

                response = await completeAppointmentAPI(appointmentId)

            }

            console.log('Appointment Updated:', response.data)

            alert(response.data.message || 'Appointment updated successfully')

            setSelectedAppointment(null)

            // GET UPDATED DATA

            await getAppointments()

        }
        catch (err) {

            console.error('Status Update Error:', err)

            alert(
                err.response?.data?.message ||
                'Unable to update appointment.'
            )

        }
        finally {

            setUpdating(false)

        }

    }


    // STATUS STYLE

    const getStatusStyle = status => {

        switch (status) {

            case 'Confirmed':

                return {
                    background: '#E5F2E7',
                    color: '#498568'
                }

            case 'Pending':

                return {
                    background: '#FFF1D9',
                    color: '#B58A3C'
                }

            case 'Completed':

                return {
                    background: '#E5EDFA',
                    color: '#5275A5'
                }

            case 'Cancelled':
            case 'Rejected':

                return {
                    background: '#FCE8E6',
                    color: '#C25D57'
                }

            default:

                return {
                    background: '#F1F1F1',
                    color: '#666'
                }

        }

    }


    // PET ICON

    const getPetIcon = species => {

        return species?.toLowerCase() === 'cat'
            ? <FaCat />
            : <FaDog />

    }


    return (

        <div
            style={{
                background: '#FAFBF8',
                minHeight: '100vh'
            }}
        >

            <VetSidebar />


            <main
                className="vet-dashboard-main"
                style={{
                    marginLeft: '320px',
                    padding: '30px 35px',
                    minHeight: '100vh'
                }}
            >


                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                    <div>

                        <p
                            className="mb-2"
                            style={{
                                color: '#83A18A',
                                fontSize: '12px',
                                fontWeight: '600',
                                letterSpacing: '1.5px'
                            }}
                        >
                            VETERINARIAN WORKSPACE
                        </p>

                        <h2
                            className="fw-bold mb-2"
                            style={{
                                color: '#414D43',
                                fontSize: '28px'
                            }}
                        >
                            Welcome Back, {vetName}! 👋
                        </h2>

                        <p
                            className="mb-0"
                            style={{
                                color: '#929A8C',
                                fontSize: '14px'
                            }}
                        >
                            Manage your appointments and care for your patients.
                        </p>

                    </div>


                    <div className="d-flex align-items-center gap-3">

                        <button
                            type="button"
                            className="btn bg-white"
                            onClick={() => navigate('/vet/appointment-requests')}
                            style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '12px',
                                border: '1px solid #E8EBE2',
                                color: '#718573'
                            }}
                        >
                            <FaBell />
                        </button>


                        <div
                            className="d-flex align-items-center gap-2 bg-white p-2 pe-3"
                            style={{
                                border: '1px solid #E8EBE2',
                                borderRadius: '12px'
                            }}
                        >

                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    background: '#DDF1E4',
                                    color: '#579675'
                                }}
                            >
                                <FaUserMd />
                            </div>

                            <div>

                                <div
                                    style={{
                                        color: '#465348',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}
                                >
                                    {vetName}
                                </div>

                                <small
                                    style={{
                                        color: '#929A8C',
                                        fontSize: '10px'
                                    }}
                                >
                                    Veterinarian
                                </small>

                            </div>

                        </div>

                    </div>

                </div>



                {/* WELCOME BANNER */}

                <div
                    className="rounded-4 p-4 p-lg-5 mb-4"
                    style={{
                        background: 'linear-gradient(110deg, #E6F2E5, #F5F4E9)',
                        border: '1px solid #E1EBDD'
                    }}
                >

                    <div className="row align-items-center">

                        <div className="col-lg-8">

                            <span
                                className="badge rounded-pill px-3 py-2 mb-3"
                                style={{
                                    background: '#D4E8D3',
                                    color: '#527A5D',
                                    fontWeight: '500'
                                }}
                            >
                                Your Daily Overview
                            </span>

                            <h3
                                className="fw-bold mb-3"
                                style={{ color: '#414D43' }}
                            >
                                Making Every Paw Healthier
                            </h3>

                            <p
                                className="mb-4"
                                style={{
                                    color: '#788578',
                                    fontSize: '14px',
                                    lineHeight: '1.8',
                                    maxWidth: '520px'
                                }}
                            >
                                Review your assigned appointments, manage requests,
                                and keep track of your patients from one place.
                            </p>

                            <button
                                type="button"
                                className="btn d-inline-flex align-items-center gap-2 px-4 py-2"
                                onClick={() => navigate('/vet/appointments')}
                                style={{
                                    background: '#78A98A',
                                    color: '#FFFFFF',
                                    borderRadius: '10px',
                                    border: 'none',
                                    fontSize: '13px',
                                    fontWeight: '500'
                                }}
                            >
                                <FaCalendarCheck />
                                View My Appointments
                                <FaArrowRight />
                            </button>

                        </div>


                        <div className="col-lg-4 text-center d-none d-lg-block">

                            <div
                                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    background: 'rgba(255,255,255,0.65)',
                                    color: '#83B99A',
                                    fontSize: '75px'
                                }}
                            >
                                <FaPaw />
                            </div>

                        </div>

                    </div>

                </div>



                {/* STATISTICS */}

                <div className="row g-3 mb-4">

                    {statistics.map((item, index) => (

                        <div
                            className="col-12 col-sm-6 col-xl-3"
                            key={index}
                        >

                            <div
                                className="bg-white rounded-4 p-4 h-100"
                                style={{
                                    border: '1px solid #ECEFE6'
                                }}
                            >

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3"
                                        style={{
                                            width: '46px',
                                            height: '46px',
                                            background: item.bg,
                                            color: item.color,
                                            fontSize: '19px'
                                        }}
                                    >
                                        {item.icon}
                                    </div>

                                    <span
                                        style={{
                                            color: '#A0A797',
                                            fontSize: '11px'
                                        }}
                                    >
                                        My Overview
                                    </span>

                                </div>


                                <h3
                                    className="fw-bold mb-1"
                                    style={{
                                        color: '#414D43',
                                        fontSize: '28px'
                                    }}
                                >
                                    {loading ? '...' : item.value}
                                </h3>

                                <p
                                    className="fw-semibold mb-2"
                                    style={{
                                        color: '#687568',
                                        fontSize: '13px'
                                    }}
                                >
                                    {item.title}
                                </p>

                                <small
                                    style={{
                                        color: '#A0A797',
                                        fontSize: '11px'
                                    }}
                                >
                                    {item.description}
                                </small>

                            </div>

                        </div>

                    ))}

                </div>



                {/* APPOINTMENTS */}

                <div
                    className="bg-white rounded-4 p-4"
                    style={{
                        border: '1px solid #ECEFE6'
                    }}
                >

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                        <div>

                            <h5
                                className="fw-bold mb-1"
                                style={{ color: '#414D43' }}
                            >
                                My Appointments
                            </h5>

                            <small
                                style={{
                                    color: '#929A8C',
                                    fontSize: '12px'
                                }}
                            >
                                Appointments assigned to your account
                            </small>

                        </div>


                        <button
                            type="button"
                            className="btn d-flex align-items-center gap-2"
                            onClick={() => navigate('/vet/appointments')}
                            style={{
                                background: '#F0F6EC',
                                color: '#66836B',
                                borderRadius: '9px',
                                fontSize: '12px'
                            }}
                        >
                            View All <FaArrowRight />
                        </button>

                    </div>



                    {/* SEARCH AND FILTER */}

                    <div className="row g-3 mb-4">

                        <div className="col-md-8">

                            <div className="input-group">

                                <span className="input-group-text bg-white">
                                    <FaSearch style={{ color: '#83A18A' }} />
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search pet, owner or appointment type..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="input-group">

                                <span className="input-group-text bg-white">
                                    <FaFilter style={{ color: '#83A18A' }} />
                                </span>

                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={e => setStatusFilter(e.target.value)}
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>

                            </div>

                        </div>

                    </div>



                    {/* APPOINTMENT LIST */}

                    <div className="d-flex flex-column gap-3">


                        {loading ? (

                            <div className="text-center py-5">

                                <div className="spinner-border text-success"></div>

                                <p className="mt-3 text-secondary">
                                    Loading your appointments...
                                </p>

                            </div>

                        ) : error ? (

                            <div className="alert alert-danger">

                                {error}

                                <button
                                    className="btn btn-sm btn-outline-danger ms-3"
                                    onClick={getAppointments}
                                >
                                    Retry
                                </button>

                            </div>

                        ) : filteredAppointments.length > 0 ? (

                            filteredAppointments.map(appointment => (

                                <div
                                    key={appointment._id}
                                    className="d-flex align-items-center gap-3 p-3 rounded-4 flex-wrap"
                                    style={{
                                        background: '#FDFDFB',
                                        border: '1px solid #F0F0E9'
                                    }}
                                >

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            flexShrink: 0,
                                            background:
                                                appointment.species === 'Cat'
                                                    ? '#F5F0E2'
                                                    : '#E5F2E7',
                                            color:
                                                appointment.species === 'Cat'
                                                    ? '#B49A60'
                                                    : '#679477',
                                            fontSize: '20px'
                                        }}
                                    >
                                        {getPetIcon(appointment.species)}
                                    </div>


                                    <div className="flex-grow-1">

                                        <h6
                                            className="fw-semibold mb-1"
                                            style={{
                                                color: '#465348',
                                                fontSize: '14px'
                                            }}
                                        >
                                            {appointment.pet}
                                        </h6>

                                        <p
                                            className="mb-1"
                                            style={{
                                                color: '#929A8C',
                                                fontSize: '12px'
                                            }}
                                        >
                                            Owner: {appointment.owner}
                                        </p>

                                        <small
                                            style={{
                                                color: '#819080',
                                                fontSize: '11px'
                                            }}
                                        >
                                            <FaStethoscope className="me-1" />
                                            {appointment.type}
                                        </small>

                                    </div>


                                    <div className="text-md-end">

                                        <div
                                            className="fw-semibold mb-2"
                                            style={{
                                                color: '#596658',
                                                fontSize: '12px'
                                            }}
                                        >
                                            {appointment.time}
                                        </div>

                                        <span
                                            className="badge rounded-pill px-3 py-2"
                                            style={{
                                                ...getStatusStyle(appointment.status),
                                                fontSize: '10px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {appointment.status}
                                        </span>

                                    </div>


                                    <div className="d-flex gap-2">

                                        <button
                                            type="button"
                                            className="btn btn-sm"
                                            title="View details"
                                            onClick={() => setSelectedAppointment(appointment)}
                                            style={{
                                                background: '#EDF4E9',
                                                color: '#66836B'
                                            }}
                                        >
                                            <FaEye />
                                        </button>


                                        {appointment.status === 'Pending' && (

                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm"
                                                    title="Accept appointment"
                                                    disabled={updating}
                                                    onClick={() =>
                                                        updateStatus(
                                                            appointment._id,
                                                            'Confirmed'
                                                        )
                                                    }
                                                    style={{
                                                        background: '#E5F2E7',
                                                        color: '#498568'
                                                    }}
                                                >
                                                    <FaCheck />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm"
                                                    title="Reject appointment"
                                                    disabled={updating}
                                                    onClick={() =>
                                                        updateStatus(
                                                            appointment._id,
                                                            'Rejected'
                                                        )
                                                    }
                                                    style={{
                                                        background: '#FCE8E6',
                                                        color: '#C25D57'
                                                    }}
                                                >
                                                    <FaTimes />
                                                </button>

                                            </>

                                        )}


                                        {appointment.status === 'Confirmed' && (

                                            <button
                                                type="button"
                                                className="btn btn-sm"
                                                title="Complete appointment"
                                                disabled={updating}
                                                onClick={() =>
                                                    updateStatus(
                                                        appointment._id,
                                                        'Completed'
                                                    )
                                                }
                                                style={{
                                                    background: '#E5EDFA',
                                                    color: '#5275A5'
                                                }}
                                            >
                                                <FaCheckCircle />
                                            </button>

                                        )}

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="text-center py-5">

                                <FaCalendarCheck
                                    size={35}
                                    style={{ color: '#A9C5A9' }}
                                />

                                <h6
                                    className="fw-semibold mt-3"
                                    style={{ color: '#465348' }}
                                >
                                    No appointments found
                                </h6>

                                <p
                                    className="mb-0"
                                    style={{
                                        color: '#929A8C',
                                        fontSize: '13px'
                                    }}
                                >
                                    No appointments match your search or filter.
                                </p>

                            </div>

                        )}

                    </div>

                </div>



                {/* APPOINTMENT DETAILS MODAL */}

                {selectedAppointment && (

                    <div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
                        style={{
                            background: 'rgba(30, 45, 32, 0.45)',
                            zIndex: 2000
                        }}
                        onClick={() => setSelectedAppointment(null)}
                    >

                        <div
                            className="bg-white rounded-4 p-4"
                            style={{
                                width: '100%',
                                maxWidth: '480px',
                                boxShadow: '0 15px 50px rgba(0,0,0,0.12)'
                            }}
                            onClick={e => e.stopPropagation()}
                        >

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h5
                                    className="fw-bold mb-0"
                                    style={{ color: '#414D43' }}
                                >
                                    Appointment Details
                                </h5>

                                <button
                                    type="button"
                                    className="btn btn-light rounded-circle"
                                    onClick={() => setSelectedAppointment(null)}
                                >
                                    <FaTimes />
                                </button>

                            </div>


                            <div
                                className="rounded-3 p-3 mb-3"
                                style={{ background: '#F4F8F1' }}
                            >

                                <h5
                                    className="fw-bold mb-1"
                                    style={{ color: '#465348' }}
                                >
                                    {selectedAppointment.pet}
                                </h5>

                                <p
                                    className="mb-0"
                                    style={{
                                        color: '#819080',
                                        fontSize: '13px'
                                    }}
                                >
                                    {selectedAppointment.breed}
                                </p>

                            </div>


                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <span className="text-secondary">Owner</span>
                                <strong>{selectedAppointment.owner}</strong>
                            </div>

                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <span className="text-secondary">Appointment</span>
                                <strong>{selectedAppointment.type}</strong>
                            </div>

                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <span className="text-secondary">Date</span>
                                <strong>{selectedAppointment.date}</strong>
                            </div>

                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <span className="text-secondary">Time</span>
                                <strong>{selectedAppointment.time}</strong>
                            </div>

                            <div className="d-flex justify-content-between align-items-center py-3">

                                <span className="text-secondary">Status</span>

                                <span
                                    className="badge rounded-pill px-3 py-2"
                                    style={getStatusStyle(selectedAppointment.status)}
                                >
                                    {selectedAppointment.status}
                                </span>

                            </div>


                            <div className="d-flex gap-2 mt-3">

                                {selectedAppointment.status === 'Pending' && (

                                    <>
                                        <button
                                            type="button"
                                            disabled={updating}
                                            className="btn flex-grow-1"
                                            onClick={() =>
                                                updateStatus(
                                                    selectedAppointment._id,
                                                    'Confirmed'
                                                )
                                            }
                                            style={{
                                                background: '#78A98A',
                                                color: '#FFFFFF'
                                            }}
                                        >
                                            <FaCheck className="me-2" />
                                            Confirm
                                        </button>

                                        <button
                                            type="button"
                                            disabled={updating}
                                            className="btn flex-grow-1"
                                            onClick={() =>
                                                updateStatus(
                                                    selectedAppointment._id,
                                                    'Rejected'
                                                )
                                            }
                                            style={{
                                                background: '#FCE8E6',
                                                color: '#C25D57'
                                            }}
                                        >
                                            Reject
                                        </button>

                                    </>

                                )}


                                {selectedAppointment.status === 'Confirmed' && (

                                    <button
                                        type="button"
                                        disabled={updating}
                                        className="btn flex-grow-1"
                                        onClick={() =>
                                            updateStatus(
                                                selectedAppointment._id,
                                                'Completed'
                                            )
                                        }
                                        style={{
                                            background: '#78A98A',
                                            color: '#FFFFFF'
                                        }}
                                    >
                                        <FaCheckCircle className="me-2" />
                                        Complete Visit
                                    </button>

                                )}


                                <button
                                    type="button"
                                    className="btn btn-light flex-grow-1"
                                    onClick={() => setSelectedAppointment(null)}
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                )}



                {/* FOOTER */}

                <div
                    className="text-center mt-4 pb-2"
                    style={{
                        color: '#A0A797',
                        fontSize: '11px'
                    }}
                >
                    PETCARE © 2026 · Caring for every paw.
                </div>

            </main>


            {/* RESPONSIVE */}

            <style>
                {`
                    @media (max-width: 768px) {

                        .vet-dashboard-main {
                            margin-left: 0 !important;
                            padding: 20px 15px !important;
                        }

                    }
                `}
            </style>

        </div>

    )

}

export default VetDashboard