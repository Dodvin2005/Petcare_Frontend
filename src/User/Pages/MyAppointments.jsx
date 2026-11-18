import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cancelAppointmentAPI, deleteAppointmentAPI, getMyAppointmentsAPI } from '../../../Services/AllApi'
import Header from '../Component/Header'



function MyAppointments() {

    // ========================================
    // STATES
    // ========================================

    const [appointments, setAppointments] = useState([])

    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')

    const [activeFilter, setActiveFilter] = useState('All')

    const [actionLoading, setActionLoading] = useState('')

    const [message, setMessage] = useState({
        type: '',
        text: ''
    })


    // ========================================
    // GET MY APPOINTMENTS
    // ========================================

    const getAppointments = async () => {

        try {

            setLoading(true)

            const response = await getMyAppointmentsAPI()

            if (response.data?.success) {

                setAppointments(response.data.appointments || [])

            } else {

                setAppointments([])

            }

        }

        catch (error) {

            console.log('Get Appointments Error:', error)

            setMessage({
                type: 'danger',
                text: error.response?.data?.message ||
                    'Unable to load appointments.'
            })

        }

        finally {

            setLoading(false)

        }

    }


    // ========================================
    // USE EFFECT
    // ========================================

    useEffect(() => {

        getAppointments()

    }, [])



    // ========================================
    // DATE FORMAT
    // ========================================

    const formatDate = (date) => {

        if (!date) return 'Not available'

        return new Date(date).toLocaleDateString('en-IN', {

            day: '2-digit',

            month: 'short',

            year: 'numeric'

        })

    }



    // ========================================
    // CHECK UPCOMING APPOINTMENT
    // ========================================

    const isUpcoming = (appointment) => {

        const appointmentDate = new Date(appointment.appointmentDate)

        return (
            appointmentDate >= new Date() &&
            ['Pending', 'Confirmed'].includes(appointment.status)
        )

    }



    // ========================================
    // STATISTICS
    // ========================================

    const totalAppointments = appointments.length

    const upcomingAppointments = appointments.filter(
        (appointment) => isUpcoming(appointment)
    ).length

    const completedAppointments = appointments.filter(
        (appointment) => appointment.status === 'Completed'
    ).length



    // ========================================
    // SEARCH AND FILTER
    // ========================================

    const filteredAppointments = appointments.filter((appointment) => {

        const petName = appointment.petId?.name ||
            appointment.petId?.petName || ''

        const appointmentId = appointment._id || ''

        const searchValue = search.toLowerCase()

        const matchesSearch =
            petName.toLowerCase().includes(searchValue) ||
            appointmentId.toLowerCase().includes(searchValue)


        let matchesFilter = true


        if (activeFilter === 'Upcoming') {

            matchesFilter = isUpcoming(appointment)

        }

        else if (activeFilter === 'Pending') {

            matchesFilter = appointment.status === 'Pending'

        }

        else if (activeFilter === 'Completed') {

            matchesFilter = appointment.status === 'Completed'

        }


        return matchesSearch && matchesFilter

    })



    // ========================================
    // CANCEL APPOINTMENT
    // ========================================

    const handleCancel = async (id) => {

        const confirmCancel = window.confirm(
            'Are you sure you want to cancel this appointment?'
        )

        if (!confirmCancel) return


        try {

            setActionLoading(id)

            const response = await cancelAppointmentAPI(id)


            if (response.data?.success) {

                setMessage({

                    type: 'success',

                    text: response.data.message ||
                        'Appointment cancelled successfully.'

                })

                await getAppointments()

            }

        }

        catch (error) {

            console.log('Cancel Appointment Error:', error)

            setMessage({

                type: 'danger',

                text: error.response?.data?.message ||
                    'Unable to cancel appointment.'

            })

        }

        finally {

            setActionLoading('')

        }

    }



    // ========================================
    // DELETE CANCELLED APPOINTMENT
    // ========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to permanently delete this appointment?'
        )

        if (!confirmDelete) return


        try {

            setActionLoading(id)

            const response = await deleteAppointmentAPI(id)


            if (response.data?.success) {

                setMessage({

                    type: 'success',

                    text: response.data.message ||
                        'Appointment deleted successfully.'

                })

                await getAppointments()

            }

        }

        catch (error) {

            console.log('Delete Appointment Error:', error)

            setMessage({

                type: 'danger',

                text: error.response?.data?.message ||
                    'Unable to delete appointment.'

            })

        }

        finally {

            setActionLoading('')

        }

    }



    // ========================================
    // STATUS BADGE
    // ========================================

    const getStatusStyle = (status) => {

        switch (status) {

            case 'Confirmed':

                return {
                    backgroundColor: '#DDF3E4',
                    color: '#247443'
                }


            case 'Pending':

                return {
                    backgroundColor: '#FFF0CC',
                    color: '#946200'
                }


            case 'Completed':

                return {
                    backgroundColor: '#DCEBFA',
                    color: '#245A91'
                }


            case 'Cancelled':

                return {
                    backgroundColor: '#FCE4E4',
                    color: '#B42318'
                }


            case 'Rejected':

                return {
                    backgroundColor: '#FCE4E4',
                    color: '#B42318'
                }


            default:

                return {
                    backgroundColor: '#EAEAEA',
                    color: '#555'
                }

        }

    }



    // ========================================
    // FILTER BUTTONS
    // ========================================

    const filters = [
        'All',
        'Upcoming',
        'Pending',
        'Completed'
    ]



    // ========================================
    // DESIGN
    // ========================================

    return (

        <div style={{
            backgroundColor: '#F7F9F5',
            minHeight: '100vh'
        }}>


            {/* ========================================
                PAGE HEADER
            ======================================== */}

            <div
                className="py-2"
                style={{
                    backgroundColor: '#315A3D',
                    color: 'white'
                }}
            >
<Header/>
                <div className="container mb-5 p-5">

                    <p
                        className="small mb-2"
                        style={{ color: '#C8DFC6' }}
                    >

                        PETCARE / MY APPOINTMENTS

                    </p>


                    <div className="row align-items-center g-4">

                        <div className="col-lg-8">

                            <h1 className="fw-bold mb-3">

                                My Appointments

                            </h1>


                            <p
                                className="mb-0"
                                style={{ color: '#D5E4D5' }}
                            >

                                Manage your pet's healthcare visits,
                                check appointment schedules, and keep
                                track of upcoming veterinary appointments.

                            </p>

                        </div>


                        <div className="col-lg-4 text-lg-end">

                            <Link
                                to="/book-appointment"
                                className="btn rounded-3 px-4 py-3 fw-semibold"
                                style={{
                                    backgroundColor: '#E0EEDB',
                                    color: '#315A3D'
                                }}
                            >

                                + Book New Appointment

                            </Link>

                        </div>

                    </div>

                </div>

            </div>



            {/* ========================================
                MAIN CONTENT
            ======================================== */}

            <div className="container py-5">


                {/* ALERT MESSAGE */}

                {message.text && (

                    <div
                        className={`alert alert-${message.type} alert-dismissible fade show`}
                        role="alert"
                    >

                        {message.text}

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setMessage({
                                type: '',
                                text: ''
                            })}
                        />

                    </div>

                )}



                {/* ========================================
                    STATISTICS
                ======================================== */}

                <div className="row g-4 mb-5">


                    {/* TOTAL */}

                    <div className="col-lg-4 col-md-6">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-muted mb-2">

                                            Total Appointments

                                        </p>


                                        <h2
                                            className="fw-bold mb-0"
                                            style={{ color: '#315A3D' }}
                                        >

                                            {totalAppointments.toString().padStart(2, '0')}

                                        </h2>

                                    </div>


                                    <div
                                        className="rounded-4 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '55px',
                                            height: '55px',
                                            backgroundColor: '#E5EFE7',
                                            color: '#315A3D',
                                            fontSize: '24px'
                                        }}
                                    >

                                        <i className="fa-solid fa-calendar-check"></i>

                                    </div>

                                </div>


                                <p className="small text-muted mt-3 mb-0">

                                    All your scheduled visits

                                </p>

                            </div>

                        </div>

                    </div>



                    {/* UPCOMING */}

                    <div className="col-lg-4 col-md-6">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-muted mb-2">

                                            Upcoming Visits

                                        </p>


                                        <h2
                                            className="fw-bold mb-0"
                                            style={{ color: '#B58116' }}
                                        >

                                            {upcomingAppointments.toString().padStart(2, '0')}

                                        </h2>

                                    </div>


                                    <div
                                        className="rounded-4 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '55px',
                                            height: '55px',
                                            backgroundColor: '#FFF0CC',
                                            color: '#946200',
                                            fontSize: '24px'
                                        }}
                                    >

                                        <i className="fa-solid fa-clock"></i>

                                    </div>

                                </div>


                                <p className="small text-muted mt-3 mb-0">

                                    Visits scheduled for your pets

                                </p>

                            </div>

                        </div>

                    </div>



                    {/* COMPLETED */}

                    <div className="col-lg-4 col-md-6">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-muted mb-2">

                                            Completed Visits

                                        </p>


                                        <h2 className="fw-bold mb-0 text-success">

                                            {completedAppointments.toString().padStart(2, '0')}

                                        </h2>

                                    </div>


                                    <div
                                        className="rounded-4 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '55px',
                                            height: '55px',
                                            backgroundColor: '#DDF3E4',
                                            color: '#247443',
                                            fontSize: '24px'
                                        }}
                                    >

                                        <i className="fa-solid fa-check-circle"></i>

                                    </div>

                                </div>


                                <p className="small text-muted mt-3 mb-0">

                                    Successfully completed appointments

                                </p>

                            </div>

                        </div>

                    </div>

                </div>



                {/* ========================================
                    APPOINTMENT HEADER
                ======================================== */}

                <div className="row align-items-center g-3 mb-4">

                    <div className="col-lg-6">

                        <h3
                            className="fw-bold mb-2"
                            style={{ color: '#315A3D' }}
                        >

                            Your Appointments

                        </h3>


                        <p className="text-muted mb-0">

                            All your pet's veterinary visits in one place.

                        </p>

                    </div>


                    <div className="col-lg-6">

                        <input
                            type="text"
                            className="form-control rounded-3 p-3 border-0 shadow-sm"
                            placeholder="Search by pet name or appointment ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                </div>



                {/* ========================================
                    FILTER BUTTONS
                ======================================== */}

                <div className="d-flex flex-wrap gap-2 mb-4">

                    {filters.map((filter) => (

                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className="btn rounded-pill px-4"
                            style={activeFilter === filter ? {

                                backgroundColor: '#315A3D',
                                color: 'white',
                                borderColor: '#315A3D'

                            } : {

                                backgroundColor: 'white',
                                color: '#315A3D',
                                border: '1px solid #315A3D'

                            }}
                        >

                            {filter === 'All'
                                ? 'All Appointments'
                                : filter
                            }

                        </button>

                    ))}


                    <button
                        className="btn btn-light rounded-pill ms-auto"
                        onClick={getAppointments}
                        disabled={loading}
                    >

                        <i className="fa-solid fa-rotate me-2"></i>

                        Refresh

                    </button>

                </div>



                {/* ========================================
                    APPOINTMENT CARDS
                ======================================== */}


                {loading ? (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border"
                            style={{ color: '#315A3D' }}
                        />

                        <p className="text-muted mt-3">

                            Loading your appointments...

                        </p>

                    </div>

                ) : filteredAppointments.length === 0 ? (

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body text-center py-5">

                            <div
                                className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center"
                                style={{
                                    width: '85px',
                                    height: '85px',
                                    backgroundColor: '#EAF2E7',
                                    color: '#315A3D',
                                    fontSize: '35px'
                                }}
                            >

                                <i className="fa-solid fa-calendar-xmark"></i>

                            </div>


                            <h4
                                className="fw-bold"
                                style={{ color: '#315A3D' }}
                            >

                                No Appointments Found

                            </h4>


                            <p className="text-muted mb-4">

                                {search || activeFilter !== 'All'
                                    ? 'Try changing your search or filter.'
                                    : 'You have not booked any appointments yet.'
                                }

                            </p>


                            <Link
                                to="/book-appointment"
                                className="btn rounded-3 px-4 py-3 fw-semibold"
                                style={{
                                    backgroundColor: '#315A3D',
                                    color: 'white'
                                }}
                            >

                                Book Your First Appointment

                            </Link>

                        </div>

                    </div>

                ) : (

                    <div className="row g-4">

                        {filteredAppointments.map((appointment) => {

                            const pet = appointment.petId || {}

                            const veterinarian =
                                appointment.veterinarianId || {}


                            return (

                                <div
                                    className="col-12"
                                    key={appointment._id}
                                >

                                    <div className="card border-0 shadow-sm rounded-4">

                                        <div className="card-body p-4">


                                            {/* CARD HEADER */}

                                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                                                <div>

                                                    <h5
                                                        className="fw-bold mb-1"
                                                        style={{ color: '#315A3D' }}
                                                    >

                                                        {pet.name || pet.petName || 'Your Pet'}

                                                    </h5>


                                                    <small className="text-muted">

                                                        Appointment ID: {appointment._id}

                                                    </small>

                                                </div>


                                                <span
                                                    className="badge rounded-pill px-3 py-2"
                                                    style={getStatusStyle(appointment.status)}
                                                >

                                                    {appointment.status}

                                                </span>

                                            </div>



                                            {/* APPOINTMENT DETAILS */}

                                            <div className="row g-4">


                                                <div className="col-md-4">

                                                    <p className="text-muted small mb-1">

                                                        <i className="fa-solid fa-stethoscope me-2"></i>

                                                        Veterinary Service

                                                    </p>


                                                    <h6 className="fw-semibold mb-0">

                                                        {appointment.service}

                                                    </h6>

                                                </div>



                                                <div className="col-md-4">

                                                    <p className="text-muted small mb-1">

                                                        <i className="fa-solid fa-calendar me-2"></i>

                                                        Appointment Date

                                                    </p>


                                                    <h6 className="fw-semibold mb-0">

                                                        {formatDate(appointment.appointmentDate)}

                                                    </h6>

                                                </div>



                                                <div className="col-md-4">

                                                    <p className="text-muted small mb-1">

                                                        <i className="fa-solid fa-clock me-2"></i>

                                                        Appointment Time

                                                    </p>


                                                    <h6 className="fw-semibold mb-0">

                                                        {appointment.appointmentTime}

                                                    </h6>

                                                </div>



                                                <div className="col-md-4">

                                                    <p className="text-muted small mb-1">

                                                        <i className="fa-solid fa-user-doctor me-2"></i>

                                                        Veterinarian

                                                    </p>


                                                    <h6 className="fw-semibold mb-0">

                                                        {veterinarian.name || 'Not Assigned'}

                                                    </h6>

                                                </div>



                                                <div className="col-md-4">

                                                    <p className="text-muted small mb-1">

                                                        <i className="fa-solid fa-location-dot me-2"></i>

                                                        Appointment Type

                                                    </p>


                                                    <h6 className="fw-semibold mb-0">

                                                        {appointment.appointmentType}

                                                    </h6>

                                                </div>



                                                <div className="col-md-4">

                                                    <p className="text-muted small mb-1">

                                                        <i className="fa-solid fa-paw me-2"></i>

                                                        Pet

                                                    </p>


                                                    <h6 className="fw-semibold mb-0">

                                                        {pet.name || pet.petName || 'Pet'}

                                                    </h6>

                                                </div>

                                            </div>



                                            {/* CONCERN */}

                                            {appointment.concern && (

                                                <div
                                                    className="rounded-3 p-3 mt-4"
                                                    style={{ backgroundColor: '#F7F9F5' }}
                                                >

                                                    <p className="small fw-semibold mb-1">

                                                        Pet's Concern

                                                    </p>


                                                    <p className="text-muted small mb-0">

                                                        {appointment.concern}

                                                    </p>

                                                </div>

                                            )}



                                            {/* CARD FOOTER */}

                                            <hr className="my-4" />


                                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">


                                                <small className="text-muted">

                                                    Booked on {formatDate(appointment.createdAt)}

                                                </small>


                                                <div className="d-flex flex-wrap gap-2">


                                                    {/* CANCEL BUTTON */}

                                                    {['Pending', 'Confirmed'].includes(appointment.status) && (

                                                        <button
                                                            className="btn btn-outline-danger rounded-3 px-3"
                                                            onClick={() => handleCancel(appointment._id)}
                                                            disabled={actionLoading === appointment._id}
                                                        >

                                                            {actionLoading === appointment._id
                                                                ? 'Please wait...'
                                                                : 'Cancel Appointment'
                                                            }

                                                        </button>

                                                    )}



                                                    {/* DELETE BUTTON */}

                                                    {appointment.status === 'Cancelled' && (

                                                        <button
                                                            className="btn btn-danger rounded-3 px-3"
                                                            onClick={() => handleDelete(appointment._id)}
                                                            disabled={actionLoading === appointment._id}
                                                        >

                                                            {actionLoading === appointment._id
                                                                ? 'Deleting...'
                                                                : 'Delete Appointment'
                                                            }

                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )

                        })}

                    </div>

                )}



                {/* ========================================
                    BOTTOM BANNER
                ======================================== */}

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


                            <h4
                                className="fw-bold mb-3"
                                style={{ color: '#315A3D' }}
                            >

                                A Healthy Pet Is a Happy Pet

                            </h4>


                            <p className="text-secondary mb-0">

                                Regular health checkups and timely
                                vaccinations help your furry friend
                                stay healthy, active, and happy.

                            </p>

                        </div>


                        <div className="col-lg-4 text-lg-end">

                            <Link
                                to="/book-appointment"
                                className="btn rounded-3 px-4 py-3 fw-semibold"
                                style={{
                                    backgroundColor: '#315A3D',
                                    color: 'white'
                                }}
                            >

                                Schedule a Visit

                            </Link>

                        </div>

                    </div>

                </div>


            </div>

        </div>

    )

}

export default MyAppointments