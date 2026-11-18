import React, { useEffect, useState } from 'react'
import VetSidebar from '../Component/VetSidebar'

import { toast } from 'react-toastify'

import {
    FaCalendarCheck,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch,
    FaPaw,
    FaDog,
    FaCat,
    FaEye,
    FaCheck,
    FaTimes,
    FaCalendarAlt,
    FaSyncAlt,
    FaEnvelope,
    FaPhone,
    FaUser,
    FaStethoscope
} from 'react-icons/fa'

import {
    getVetAppointmentsAPI,
    acceptAppointmentAPI,
    rejectAppointmentAPI,
    completeAppointmentAPI
} from '../../../Services/AllApi'


function VetAppointments() {

    const [appointments, setAppointments] = useState([])

    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')

    const [filterStatus, setFilterStatus] = useState('All')

    const [actionLoading, setActionLoading] = useState('')

    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const [showDetails, setShowDetails] = useState(false)


    // ===============================
    // GET APPOINTMENTS
    // ===============================

    const fetchAppointments = async () => {

        setLoading(true)

        try {

            const result = await getVetAppointmentsAPI()

            console.log('Veterinarian Appointments:', result)

            if (result.status >= 200 && result.status < 300) {

                const responseData = result.data

                const appointmentList =
                    Array.isArray(responseData)
                        ? responseData
                        : responseData?.appointments ||
                          responseData?.data?.appointments ||
                          responseData?.data ||
                          []

                setAppointments(
                    Array.isArray(appointmentList)
                        ? appointmentList
                        : []
                )

            } else {

                toast.error('Unable to fetch appointments')

            }

        } catch (error) {

            console.log('Appointment Fetch Error:', error)

            toast.error(
                error.response?.data?.message ||
                'Failed to load appointments'
            )

        } finally {

            setLoading(false)

        }

    }


    useEffect(() => {

        fetchAppointments()

    }, [])


    // ===============================
    // GET APPOINTMENT ID
    // ===============================

    const getAppointmentId = (appointment) => {

        return appointment?._id || appointment?.id

    }


    // ===============================
    // FORMAT STATUS
    // ===============================

    const getStatus = (status) => {

        const value = String(status || '').toLowerCase()

        if (value === 'accepted' || value === 'confirmed') {
            return 'Accepted'
        }

        if (value === 'rejected') {
            return 'Rejected'
        }

        if (value === 'cancelled' || value === 'canceled') {
            return 'Cancelled'
        }

        if (value === 'completed') {
            return 'Completed'
        }

        if (value === 'pending') {
            return 'Pending'
        }

        return status || 'Pending'

    }


    // ===============================
    // ACCEPT APPOINTMENT
    // ===============================

    const handleAccept = async (id) => {

        setActionLoading(id)

        try {

            const result = await acceptAppointmentAPI(id)

            if (result.status >= 200 && result.status < 300) {

                toast.success('Appointment accepted successfully')

                await fetchAppointments()

            } else {

                toast.error('Unable to accept appointment')

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                'Failed to accept appointment'
            )

        } finally {

            setActionLoading('')

        }

    }


    // ===============================
    // REJECT APPOINTMENT
    // ===============================

    const handleReject = async (id) => {

        const confirmReject = window.confirm(
            'Are you sure you want to reject this appointment?'
        )

        if (!confirmReject) return

        setActionLoading(id)

        try {

            const result = await rejectAppointmentAPI(id)

            if (result.status >= 200 && result.status < 300) {

                toast.success('Appointment rejected successfully')

                await fetchAppointments()

            } else {

                toast.error('Unable to reject appointment')

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                'Failed to reject appointment'
            )

        } finally {

            setActionLoading('')

        }

    }


    // ===============================
    // COMPLETE APPOINTMENT
    // ===============================

    const handleComplete = async (id) => {

        const confirmComplete = window.confirm(
            'Mark this appointment as completed?'
        )

        if (!confirmComplete) return

        setActionLoading(id)

        try {

            const result = await completeAppointmentAPI(id)

            if (result.status >= 200 && result.status < 300) {

                toast.success('Appointment completed successfully')

                await fetchAppointments()

            } else {

                toast.error('Unable to complete appointment')

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                'Failed to complete appointment'
            )

        } finally {

            setActionLoading('')

        }

    }


    // ===============================
    // DATE FORMAT
    // ===============================

    const formatDate = (date) => {

        if (!date) return 'Not available'

        const formattedDate = new Date(date)

        if (isNaN(formattedDate.getTime())) {
            return date
        }

        return formattedDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })

    }


    // ===============================
    // GET PET DETAILS
    // ===============================

    const getPetName = (appointment) => {

        const pet = appointment.petId || appointment.pet

        if (typeof pet === 'object' && pet !== null) {
            return pet.petName || pet.name || 'Pet'
        }

        return appointment.petName || 'Pet'

    }


    const getPetType = (appointment) => {

        const pet = appointment.petId || appointment.pet

        if (typeof pet === 'object' && pet !== null) {
            return pet.petType || pet.type || ''
        }

        return appointment.petType || ''

    }


    // ===============================
    // GET OWNER DETAILS
    // ===============================

    const getOwner = (appointment) => {

        const owner =
            appointment.userId ||
            appointment.ownerId ||
            appointment.owner

        return typeof owner === 'object' && owner !== null
            ? owner
            : {}

    }


    // ===============================
    // SEARCH AND FILTER
    // ===============================

    const filteredAppointments = appointments.filter((appointment) => {

        const owner = getOwner(appointment)

        const petName = getPetName(appointment)

        const service = appointment.service || ''

        const searchValue = search.toLowerCase()

        const matchesSearch =
            petName.toLowerCase().includes(searchValue) ||
            (owner.name || '').toLowerCase().includes(searchValue) ||
            (owner.email || '').toLowerCase().includes(searchValue) ||
            service.toLowerCase().includes(searchValue)

        const status = getStatus(appointment.status)

        const matchesStatus =
            filterStatus === 'All' ||
            status === filterStatus

        return matchesSearch && matchesStatus

    })


    // ===============================
    // STATISTICS
    // ===============================

    const totalAppointments = appointments.length

    const pendingAppointments = appointments.filter(
        appointment => getStatus(appointment.status) === 'Pending'
    ).length

    const acceptedAppointments = appointments.filter(
        appointment => getStatus(appointment.status) === 'Accepted'
    ).length

    const completedAppointments = appointments.filter(
        appointment => getStatus(appointment.status) === 'Completed'
    ).length


    // ===============================
    // STATUS DESIGN
    // ===============================

    const getStatusStyle = (status) => {

        switch (getStatus(status)) {

            case 'Accepted':
                return {
                    background: '#E2F5E8',
                    color: '#287A43'
                }

            case 'Completed':
                return {
                    background: '#E4F0FA',
                    color: '#2872A8'
                }

            case 'Rejected':
            case 'Cancelled':
                return {
                    background: '#FCE8E8',
                    color: '#C0392B'
                }

            default:
                return {
                    background: '#FFF3D9',
                    color: '#A66A00'
                }

        }

    }


    // ===============================
    // PET ICON
    // ===============================

    const getPetIcon = (type) => {

        const petType = String(type || '').toLowerCase()

        if (petType.includes('cat')) {
            return <FaCat />
        }

        if (petType.includes('dog')) {
            return <FaDog />
        }

        return <FaPaw />

    }


    // ===============================
    // OPEN DETAILS
    // ===============================

    const openDetails = (appointment) => {

        setSelectedAppointment(appointment)

        setShowDetails(true)

    }


    const closeDetails = () => {

        setShowDetails(false)

        setSelectedAppointment(null)

    }


    // ===============================
    // COMPONENT
    // ===============================

    return (

        <div style={{ background: '#F2F7F0', minHeight: '100vh' }}>

            <VetSidebar />

            <div
                style={{
                    marginLeft: '320px',
                    padding: '35px',
                    minHeight: '100vh'
                }}
            >

                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

                    <div>

                        <h3
                            className="fw-bold mb-1"
                            style={{ color: '#294B35' }}
                        >
                            Appointments
                        </h3>

                        <p className="text-muted mb-0">
                            Manage your assigned pet appointments
                        </p>

                    </div>

                    <button
                        className="btn"
                        onClick={fetchAppointments}
                        disabled={loading}
                        style={{
                            background: '#315A3D',
                            color: 'white',
                            borderRadius: '10px',
                            padding: '10px 18px'
                        }}
                    >

                        <FaSyncAlt className="me-2" />

                        Refresh

                    </button>

                </div>


                {/* STATISTICS */}

                <div className="row g-3 mb-4">

                    <div className="col-xl-3 col-md-6">

                        <div className="card border-0 shadow-sm p-3 rounded-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <p className="text-muted mb-1">
                                        Total Appointments
                                    </p>

                                    <h3 className="fw-bold mb-0">
                                        {totalAppointments}
                                    </h3>

                                </div>

                                <div
                                    className="rounded-3 p-3"
                                    style={{
                                        background: '#E4F0E5',
                                        color: '#315A3D'
                                    }}
                                >
                                    <FaCalendarCheck size={22} />
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-xl-3 col-md-6">

                        <div className="card border-0 shadow-sm p-3 rounded-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <p className="text-muted mb-1">
                                        Pending
                                    </p>

                                    <h3 className="fw-bold mb-0">
                                        {pendingAppointments}
                                    </h3>

                                </div>

                                <div
                                    className="rounded-3 p-3"
                                    style={{
                                        background: '#FFF3D9',
                                        color: '#C58B20'
                                    }}
                                >
                                    <FaClock size={22} />
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-xl-3 col-md-6">

                        <div className="card border-0 shadow-sm p-3 rounded-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <p className="text-muted mb-1">
                                        Accepted
                                    </p>

                                    <h3 className="fw-bold mb-0">
                                        {acceptedAppointments}
                                    </h3>

                                </div>

                                <div
                                    className="rounded-3 p-3"
                                    style={{
                                        background: '#E2F5E8',
                                        color: '#287A43'
                                    }}
                                >
                                    <FaCheckCircle size={22} />
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-xl-3 col-md-6">

                        <div className="card border-0 shadow-sm p-3 rounded-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <p className="text-muted mb-1">
                                        Completed
                                    </p>

                                    <h3 className="fw-bold mb-0">
                                        {completedAppointments}
                                    </h3>

                                </div>

                                <div
                                    className="rounded-3 p-3"
                                    style={{
                                        background: '#E4F0FA',
                                        color: '#2872A8'
                                    }}
                                >
                                    <FaCheckCircle size={22} />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* APPOINTMENT TABLE */}

                <div className="card border-0 shadow-sm rounded-4">

                    <div className="card-body p-4">

                        {/* SEARCH AND FILTER */}

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                            <div>

                                <h5
                                    className="fw-bold mb-1"
                                    style={{ color: '#294B35' }}
                                >
                                    Appointment List
                                </h5>

                                <small className="text-muted">
                                    View and manage your appointments
                                </small>

                            </div>


                            <div className="d-flex gap-2 flex-wrap">

                                <div
                                    className="input-group"
                                    style={{ width: '260px' }}
                                >

                                    <span className="input-group-text bg-white">
                                        <FaSearch className="text-muted" />
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search appointments..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />

                                </div>


                                <select
                                    className="form-select"
                                    style={{ width: '150px' }}
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >

                                    <option value="All">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Cancelled">Cancelled</option>

                                </select>

                            </div>

                        </div>


                        {/* TABLE */}

                        <div className="table-responsive">

                            <table className="table align-middle">

                                <thead>

                                    <tr style={{ background: '#F7F9F5' }}>

                                        <th className="py-3">Pet & Owner</th>

                                        <th>Service</th>

                                        <th>Date & Time</th>

                                        <th>Status</th>

                                        <th className="text-center">Actions</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {loading ? (

                                        <tr>

                                            <td colSpan="5" className="text-center py-5">

                                                <div
                                                    className="spinner-border"
                                                    style={{ color: '#315A3D' }}
                                                ></div>

                                                <p className="text-muted mt-2 mb-0">
                                                    Loading appointments...
                                                </p>

                                            </td>

                                        </tr>

                                    ) : filteredAppointments.length === 0 ? (

                                        <tr>

                                            <td colSpan="5" className="text-center py-5">

                                                <FaCalendarAlt
                                                    size={35}
                                                    className="text-muted mb-3"
                                                />

                                                <h6 className="fw-bold">
                                                    No appointments found
                                                </h6>

                                                <p className="text-muted mb-0">
                                                    Appointments assigned to you will appear here.
                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredAppointments.map((appointment) => {

                                            const id = getAppointmentId(appointment)

                                            const owner = getOwner(appointment)

                                            const petName = getPetName(appointment)

                                            const petType = getPetType(appointment)

                                            const status = getStatus(appointment.status)

                                            const date =
                                                appointment.appointmentDate ||
                                                appointment.date

                                            const time =
                                                appointment.appointmentTime ||
                                                appointment.time

                                            return (

                                                <tr key={id}>

                                                    {/* PET AND OWNER */}

                                                    <td>

                                                        <div className="d-flex align-items-center gap-3">

                                                            <div
                                                                className="rounded-circle d-flex align-items-center justify-content-center"
                                                                style={{
                                                                    width: '45px',
                                                                    height: '45px',
                                                                    background: '#E4F0E5',
                                                                    color: '#315A3D',
                                                                    fontSize: '19px'
                                                                }}
                                                            >

                                                                {getPetIcon(petType)}

                                                            </div>


                                                            <div>

                                                                <h6 className="fw-bold mb-1">
                                                                    {petName}
                                                                </h6>

                                                                <small className="text-muted">
                                                                    Owner: {owner.name || 'Not available'}
                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* SERVICE */}

                                                    <td>

                                                        <span className="fw-semibold">
                                                            {appointment.service || 'General Checkup'}
                                                        </span>

                                                        <br />

                                                        <small className="text-muted">
                                                            {appointment.appointmentType || 'Clinic Visit'}
                                                        </small>

                                                    </td>


                                                    {/* DATE AND TIME */}

                                                    <td>

                                                        <div className="fw-semibold">

                                                            <FaCalendarAlt
                                                                className="me-2"
                                                                style={{ color: '#63866A' }}
                                                            />

                                                            {formatDate(date)}

                                                        </div>

                                                        <small className="text-muted">

                                                            <FaClock className="me-2" />

                                                            {time || 'Not available'}

                                                        </small>

                                                    </td>


                                                    {/* STATUS */}

                                                    <td>

                                                        <span
                                                            className="badge rounded-pill px-3 py-2"
                                                            style={getStatusStyle(status)}
                                                        >

                                                            {status}

                                                        </span>

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td>

                                                        <div className="d-flex justify-content-center gap-2 flex-wrap">

                                                            <button
                                                                className="btn btn-sm"
                                                                title="View Details"
                                                                onClick={() => openDetails(appointment)}
                                                                style={{
                                                                    background: '#E4F0E5',
                                                                    color: '#315A3D'
                                                                }}
                                                            >

                                                                <FaEye />

                                                            </button>


                                                            {status === 'Pending' && (

                                                                <>

                                                                    <button
                                                                        className="btn btn-sm"
                                                                        title="Accept"
                                                                        disabled={actionLoading === id}
                                                                        onClick={() => handleAccept(id)}
                                                                        style={{
                                                                            background: '#DDF3E3',
                                                                            color: '#287A43'
                                                                        }}
                                                                    >

                                                                        {actionLoading === id
                                                                            ? '...'
                                                                            : <FaCheck />
                                                                        }

                                                                    </button>


                                                                    <button
                                                                        className="btn btn-sm"
                                                                        title="Reject"
                                                                        disabled={actionLoading === id}
                                                                        onClick={() => handleReject(id)}
                                                                        style={{
                                                                            background: '#FCE8E8',
                                                                            color: '#C0392B'
                                                                        }}
                                                                    >

                                                                        <FaTimes />

                                                                    </button>

                                                                </>

                                                            )}


                                                            {status === 'Accepted' && (

                                                                <button
                                                                    className="btn btn-sm"
                                                                    title="Complete Appointment"
                                                                    disabled={actionLoading === id}
                                                                    onClick={() => handleComplete(id)}
                                                                    style={{
                                                                        background: '#E4F0FA',
                                                                        color: '#2872A8'
                                                                    }}
                                                                >

                                                                    {actionLoading === id
                                                                        ? '...'
                                                                        : <FaCheckCircle />
                                                                    }

                                                                </button>

                                                            )}

                                                        </div>

                                                    </td>

                                                </tr>

                                            )

                                        })

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>


                {/* APPOINTMENT DETAILS MODAL */}

                {showDetails && selectedAppointment && (

                    <div
                        className="modal d-block"
                        tabIndex="-1"
                        style={{
                            background: 'rgba(0,0,0,0.5)'
                        }}
                    >

                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content border-0 rounded-4">

                                <div
                                    className="modal-header"
                                    style={{
                                        background: '#315A3D',
                                        color: 'white'
                                    }}
                                >

                                    <h5 className="modal-title fw-bold">

                                        <FaCalendarCheck className="me-2" />

                                        Appointment Details

                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={closeDetails}
                                    ></button>

                                </div>


                                <div className="modal-body p-4">

                                    {(() => {

                                        const appointment = selectedAppointment

                                        const owner = getOwner(appointment)

                                        const pet = appointment.petId || appointment.pet

                                        const petDetails =
                                            typeof pet === 'object' && pet !== null
                                                ? pet
                                                : {}

                                        return (

                                            <>

                                                <div className="row g-3">

                                                    <div className="col-md-6">

                                                        <div className="p-3 rounded-3 h-100"
                                                            style={{ background: '#F2F7F0' }}
                                                        >

                                                            <h6 className="fw-bold mb-3"
                                                                style={{ color: '#315A3D' }}
                                                            >
                                                                <FaPaw className="me-2" />
                                                                Pet Information
                                                            </h6>

                                                            <p>
                                                                <strong>Name:</strong> {getPetName(appointment)}
                                                            </p>

                                                            <p>
                                                                <strong>Type:</strong> {getPetType(appointment) || 'Not available'}
                                                            </p>

                                                            <p>
                                                                <strong>Breed:</strong> {petDetails.breed || 'Not available'}
                                                            </p>

                                                            <p className="mb-0">
                                                                <strong>Gender:</strong> {petDetails.gender || 'Not available'}
                                                            </p>

                                                        </div>

                                                    </div>


                                                    <div className="col-md-6">

                                                        <div className="p-3 rounded-3 h-100"
                                                            style={{ background: '#F2F7F0' }}
                                                        >

                                                            <h6 className="fw-bold mb-3"
                                                                style={{ color: '#315A3D' }}
                                                            >
                                                                <FaUser className="me-2" />
                                                                Owner Information
                                                            </h6>

                                                            <p>
                                                                <strong>Name:</strong> {owner.name || 'Not available'}
                                                            </p>

                                                            <p>
                                                                <FaEnvelope className="me-2 text-muted" />
                                                                {owner.email || 'Not available'}
                                                            </p>

                                                            <p className="mb-0">
                                                                <FaPhone className="me-2 text-muted" />
                                                                {owner.phone || 'Not available'}
                                                            </p>

                                                        </div>

                                                    </div>


                                                    <div className="col-12">

                                                        <div className="p-3 rounded-3"
                                                            style={{ background: '#F2F7F0' }}
                                                        >

                                                            <h6 className="fw-bold mb-3"
                                                                style={{ color: '#315A3D' }}
                                                            >
                                                                <FaStethoscope className="me-2" />
                                                                Appointment Information
                                                            </h6>

                                                            <div className="row">

                                                                <div className="col-md-6">

                                                                    <p>
                                                                        <strong>Service:</strong> {appointment.service || 'Not available'}
                                                                    </p>

                                                                    <p>
                                                                        <strong>Appointment Type:</strong> {appointment.appointmentType || 'Not available'}
                                                                    </p>

                                                                </div>

                                                                <div className="col-md-6">

                                                                    <p>
                                                                        <strong>Date:</strong> {formatDate(appointment.appointmentDate)}
                                                                    </p>

                                                                    <p>
                                                                        <strong>Time:</strong> {appointment.appointmentTime || 'Not available'}
                                                                    </p>

                                                                </div>

                                                            </div>

                                                            <p className="mb-0">

                                                                <strong>Status:</strong>{' '}

                                                                <span
                                                                    className="badge rounded-pill px-3 py-2"
                                                                    style={getStatusStyle(appointment.status)}
                                                                >
                                                                    {getStatus(appointment.status)}
                                                                </span>

                                                            </p>

                                                        </div>

                                                    </div>


                                                    <div className="col-12">

                                                        <h6 className="fw-bold"
                                                            style={{ color: '#315A3D' }}
                                                        >
                                                            Owner's Concern
                                                        </h6>

                                                        <div className="p-3 rounded-3"
                                                            style={{ background: '#F7F9F5' }}
                                                        >

                                                            {appointment.concern || 'No concern provided.'}

                                                        </div>

                                                    </div>

                                                </div>

                                            </>

                                        )

                                    })()}

                                </div>


                                <div className="modal-footer">

                                    <button
                                        className="btn"
                                        onClick={closeDetails}
                                        style={{
                                            background: '#315A3D',
                                            color: 'white',
                                            borderRadius: '9px'
                                        }}
                                    >

                                        Close

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    )

}

export default VetAppointments