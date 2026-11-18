import React, { useEffect, useState } from 'react'

import AdminSidebar from '../Components/AdminSidebar'

import {
    getAllAdminAppointmentsAPI,
    getSingleAdminAppointmentAPI,
    updateAdminAppointmentStatusAPI,
    deleteAdminAppointmentAPI
} from '../../../Services/AllApi'

import {
    FaSearch,
    FaCalendarAlt,
    FaClock,
    FaPaw,
    FaUser,
    FaStethoscope,
    FaCheckCircle,
    FaHourglassHalf,
    FaTimesCircle,
    FaEye,
    FaTrash,
    FaSyncAlt
} from 'react-icons/fa'

import { toast, ToastContainer } from 'react-toastify'


function ManageAppointments() {

    const [appointments, setAppointments] = useState([])

    const [loading, setLoading] = useState(true)

    const [searchKey, setSearchKey] = useState('')

    const [statusFilter, setStatusFilter] = useState('All')

    const [serviceFilter, setServiceFilter] = useState('All')

    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const [showDetails, setShowDetails] = useState(false)

    const [updating, setUpdating] = useState(false)


    // ========================================
    // GET ALL APPOINTMENTS
    // ========================================

    const getAppointments = async () => {

        try {

            setLoading(true)

            const response = await getAllAdminAppointmentsAPI(
                searchKey,
                statusFilter,
                serviceFilter
            )

            const result = response.data || response

            if (result.success) {

                setAppointments(result.appointments || [])

            } else {

                toast.error(result.message || 'Failed to fetch appointments')

            }

        }

        catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                'Unable to fetch appointments'
            )

        }

        finally {

            setLoading(false)

        }

    }


    // Load appointments and apply filters
    useEffect(() => {

        const delay = setTimeout(() => {

            getAppointments()

        }, 400)

        return () => clearTimeout(delay)

    }, [searchKey, statusFilter, serviceFilter])


    // ========================================
    // GET SINGLE APPOINTMENT
    // ========================================

    const handleViewAppointment = async (id) => {

        try {

            const response = await getSingleAdminAppointmentAPI(id)

            const result = response.data || response

            if (result.success) {

                setSelectedAppointment(result.appointment)

                setShowDetails(true)

            } else {

                toast.error(result.message)

            }

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                'Failed to fetch appointment details'
            )

        }

    }


    // ========================================
    // UPDATE APPOINTMENT STATUS
    // ========================================

    const handleStatus = async (id, status) => {

        try {

            setUpdating(true)

            const response = await updateAdminAppointmentStatusAPI(
                id,
                status
            )

            const result = response.data || response

            if (result.success) {

                toast.success('Appointment status updated successfully')

                await getAppointments()

                if (
                    selectedAppointment &&
                    selectedAppointment._id === id
                ) {

                    setSelectedAppointment(result.appointment)

                }

            } else {

                toast.error(result.message)

            }

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                'Failed to update appointment status'
            )

        }

        finally {

            setUpdating(false)

        }

    }


    // ========================================
    // DELETE APPOINTMENT
    // ========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this appointment?'
        )

        if (!confirmDelete) return

        try {

            const response = await deleteAdminAppointmentAPI(id)

            const result = response.data || response

            if (result.success) {

                toast.success('Appointment deleted successfully')

                setAppointments(prev =>
                    prev.filter(item => item._id !== id)
                )

                setShowDetails(false)

                setSelectedAppointment(null)

            } else {

                toast.error(result.message)

            }

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                'Failed to delete appointment'
            )

        }

    }


    // ========================================
    // STATUS BADGE
    // ========================================

    const getStatusClass = (status) => {

        switch (status) {

            case 'Pending':
                return 'bg-warning-subtle text-warning-emphasis'

            case 'Confirmed':
                return 'bg-primary-subtle text-primary'

            case 'Completed':
                return 'bg-success-subtle text-success'

            case 'Cancelled':
                return 'bg-danger-subtle text-danger'

            case 'Rejected':
                return 'bg-danger-subtle text-danger'

            default:
                return 'bg-secondary-subtle text-secondary'

        }

    }


    // ========================================
    // FORMAT DATE
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
    // STATISTICS
    // ========================================

    const totalAppointments = appointments.length

    const pendingAppointments = appointments.filter(
        a => a.status === 'Pending'
    ).length

    const confirmedAppointments = appointments.filter(
        a => a.status === 'Confirmed'
    ).length

    const completedAppointments = appointments.filter(
        a => a.status === 'Completed'
    ).length


    // ========================================
    // UI
    // ========================================

    return (

        <div
            className="d-flex"
            style={{
                minHeight: '100vh',
                backgroundColor: '#F5F8F5',
                overflowX: 'hidden'
            }}
        >

            <ToastContainer position="top-right" />

            {/* SIDEBAR */}

            <div
                style={{
                    width: '250px',
                    minWidth: '250px',
                    flexShrink: 0
                }}
            >

                <AdminSidebar />

            </div>


            {/* MAIN CONTENT */}

            <div
                className="p-3 p-md-4"
                style={{
                    flex: 1,
                    minWidth: 0,
                    marginLeft: '20px'
                }}
            >


                {/* PAGE HEADER */}

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                    <div>

                        <small className="text-secondary">
                            Dashboard / Manage Appointments
                        </small>

                        <h3
                            className="fw-bold mt-2 mb-1"
                            style={{ color: '#234B32' }}
                        >
                            Manage Appointments
                        </h3>

                        <p className="text-secondary mb-0">
                            Monitor bookings and manage appointment schedules.
                        </p>

                    </div>


                    <button
                        className="btn rounded-3 px-3"
                        style={{
                            backgroundColor: '#315A3D',
                            color: 'white'
                        }}
                        onClick={getAppointments}
                    >

                        <FaSyncAlt className="me-2" />

                        Refresh

                    </button>

                </div>


                {/* STATISTICS */}

                <div className="row g-3 mb-4">


                    {/* TOTAL */}

                    <div className="col-xl-3 col-md-6">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary mb-2">
                                            Total Appointments
                                        </p>

                                        <h3 className="fw-bold mb-0">
                                            {totalAppointments}
                                        </h3>

                                    </div>

                                    <div
                                        className="rounded-3 p-3"
                                        style={{
                                            backgroundColor: '#E8F1E9',
                                            color: '#315A3D'
                                        }}
                                    >

                                        <FaCalendarAlt size={22} />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* PENDING */}

                    <div className="col-xl-3 col-md-6">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary mb-2">
                                            Pending
                                        </p>

                                        <h3 className="fw-bold text-warning mb-0">
                                            {pendingAppointments}
                                        </h3>

                                    </div>

                                    <div className="bg-warning-subtle text-warning rounded-3 p-3">

                                        <FaHourglassHalf size={22} />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* CONFIRMED */}

                    <div className="col-xl-3 col-md-6">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary mb-2">
                                            Confirmed
                                        </p>

                                        <h3 className="fw-bold text-primary mb-0">
                                            {confirmedAppointments}
                                        </h3>

                                    </div>

                                    <div className="bg-primary-subtle text-primary rounded-3 p-3">

                                        <FaCheckCircle size={22} />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* COMPLETED */}

                    <div className="col-xl-3 col-md-6">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary mb-2">
                                            Completed
                                        </p>

                                        <h3 className="fw-bold text-success mb-0">
                                            {completedAppointments}
                                        </h3>

                                    </div>

                                    <div className="bg-success-subtle text-success rounded-3 p-3">

                                        <FaPaw size={22} />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>



                {/* APPOINTMENT TABLE */}

                <div className="card border-0 shadow-sm rounded-4">


                    {/* TABLE HEADER */}

                    <div className="card-header bg-white border-0 p-4">

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                            <div>

                                <h5 className="fw-bold mb-1">
                                    All Appointments
                                </h5>

                                <p className="text-secondary small mb-0">
                                    Review and manage all pet bookings.
                                </p>

                            </div>


                            {/* SEARCH */}

                            <div style={{ width: '270px', maxWidth: '100%' }}>

                                <div className="input-group">

                                    <span className="input-group-text bg-white">

                                        <FaSearch className="text-secondary" />

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search appointments..."
                                        value={searchKey}
                                        onChange={(e) => setSearchKey(e.target.value)}
                                    />

                                </div>

                            </div>

                        </div>


                        {/* FILTERS */}

                        <div className="row g-3 mt-2">

                            <div className="col-md-3">

                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >

                                    <option value="All">All Status</option>

                                    <option value="Pending">Pending</option>

                                    <option value="Confirmed">Confirmed</option>

                                    <option value="Completed">Completed</option>

                                    <option value="Cancelled">Cancelled</option>

                                    <option value="Rejected">Rejected</option>

                                </select>

                            </div>


                            <div className="col-md-3">

                                <select
                                    className="form-select"
                                    value={serviceFilter}
                                    onChange={(e) => setServiceFilter(e.target.value)}
                                >

                                    <option value="All">All Services</option>

                                    <option value="General Checkup">
                                        General Checkup
                                    </option>

                                    <option value="Vaccination">
                                        Vaccination
                                    </option>

                                    <option value="Dental Care">
                                        Dental Care
                                    </option>

                                    <option value="Grooming">
                                        Grooming
                                    </option>

                                    <option value="Emergency Consultation">
                                        Emergency Consultation
                                    </option>

                                </select>

                            </div>


                            <div className="col-md-3">

                                <button
                                    className="btn btn-outline-secondary w-100"
                                    onClick={() => {

                                        setSearchKey('')

                                        setStatusFilter('All')

                                        setServiceFilter('All')

                                    }}
                                >

                                    Clear Filters

                                </button>

                            </div>

                        </div>

                    </div>



                    {/* TABLE BODY */}

                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table className="table align-middle mb-0">

                                <thead style={{ backgroundColor: '#F0F5F1' }}>

                                    <tr>

                                        <th className="px-4 py-3 text-secondary small">
                                            PET / OWNER
                                        </th>

                                        <th className="py-3 text-secondary small">
                                            VETERINARIAN
                                        </th>

                                        <th className="py-3 text-secondary small">
                                            DATE & TIME
                                        </th>

                                        <th className="py-3 text-secondary small">
                                            SERVICE
                                        </th>

                                        <th className="py-3 text-secondary small">
                                            STATUS
                                        </th>

                                        <th className="py-3 text-secondary small text-center">
                                            ACTIONS
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>


                                    {loading ? (

                                        <tr>

                                            <td colSpan="6" className="text-center py-5">

                                                <div className="spinner-border text-success">

                                                </div>

                                                <p className="text-secondary mt-2 mb-0">
                                                    Loading appointments...
                                                </p>

                                            </td>

                                        </tr>

                                    ) : appointments.length > 0 ? (

                                        appointments.map((appointment) => (

                                            <tr key={appointment._id}>


                                                {/* PET / OWNER */}

                                                <td className="px-4 py-3">

                                                    <div className="fw-semibold">

                                                        {appointment.petId?.petName || 'Unknown Pet'}

                                                    </div>

                                                    <small className="text-secondary">

                                                        Owner: {appointment.userId?.name || 'Unknown'}

                                                    </small>

                                                </td>


                                                {/* VETERINARIAN */}

                                                <td className="py-3">

                                                    <span className="fw-medium">

                                                        {appointment.veterinarianId?.name || 'Not Assigned'}

                                                    </span>

                                                </td>


                                                {/* DATE & TIME */}

                                                <td className="py-3">

                                                    <div className="fw-semibold">

                                                        {formatDate(appointment.appointmentDate)}

                                                    </div>

                                                    <small className="text-secondary">

                                                        <FaClock className="me-1" />

                                                        {appointment.appointmentTime || 'N/A'}

                                                    </small>

                                                </td>


                                                {/* SERVICE */}

                                                <td className="py-3">

                                                    <span
                                                        className="badge rounded-pill px-3 py-2"
                                                        style={{
                                                            backgroundColor: '#E8F1E9',
                                                            color: '#287443'
                                                        }}
                                                    >

                                                        {appointment.service}

                                                    </span>

                                                </td>


                                                {/* STATUS */}

                                                <td className="py-3">

                                                    <span
                                                        className={`badge rounded-pill px-3 py-2 ${getStatusClass(appointment.status)}`}
                                                    >

                                                        {appointment.status}

                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td className="py-3 text-center">

                                                    <div className="d-flex justify-content-center gap-2">

                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            title="View Details"
                                                            onClick={() =>
                                                                handleViewAppointment(appointment._id)
                                                            }
                                                        >

                                                            <FaEye />

                                                        </button>


                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            title="Delete Appointment"
                                                            onClick={() =>
                                                                handleDelete(appointment._id)
                                                            }
                                                        >

                                                            <FaTrash />

                                                        </button>

                                                    </div>

                                                </td>


                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center py-5 text-secondary"
                                            >

                                                No appointments found.

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="card-footer bg-white border-0 p-3">

                        <small className="text-secondary">

                            Showing {appointments.length} appointments

                        </small>

                    </div>

                </div>


                {/* FOOTER */}

                <div className="text-center mt-4">

                    <small className="text-secondary">

                        PetCare Admin Panel © 2026

                    </small>

                </div>

            </div>



            {/* ========================================
                APPOINTMENT DETAILS MODAL
            ======================================== */}

            {showDetails && selectedAppointment && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.45)',
                        zIndex: 1050
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered modal-lg">

                        <div className="modal-content border-0 rounded-4 shadow">


                            {/* MODAL HEADER */}

                            <div className="modal-header border-0 p-4">

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        Appointment Details
                                    </h5>

                                    <small className="text-secondary">
                                        Complete booking information
                                    </small>

                                </div>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowDetails(false)}
                                />

                            </div>


                            {/* MODAL BODY */}

                            <div className="modal-body px-4 pb-4">

                                <div className="row g-3">


                                    <div className="col-md-6">

                                        <div className="bg-light rounded-3 p-3 h-100">

                                            <small className="text-secondary">
                                                Pet Name
                                            </small>

                                            <h6 className="fw-bold mt-2 mb-0">

                                                {selectedAppointment.petId?.petName || 'N/A'}

                                            </h6>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="bg-light rounded-3 p-3 h-100">

                                            <small className="text-secondary">
                                                Pet Type / Breed
                                            </small>

                                            <h6 className="fw-bold mt-2 mb-0">

                                                {selectedAppointment.petId?.petType || 'N/A'}
                                                {' / '}
                                                {selectedAppointment.petId?.breed || 'N/A'}

                                            </h6>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="bg-light rounded-3 p-3 h-100">

                                            <small className="text-secondary">
                                                Owner
                                            </small>

                                            <h6 className="fw-bold mt-2 mb-0">

                                                {selectedAppointment.userId?.name || 'N/A'}

                                            </h6>

                                            <small className="text-secondary">

                                                {selectedAppointment.userId?.email}

                                            </small>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="bg-light rounded-3 p-3 h-100">

                                            <small className="text-secondary">
                                                Veterinarian
                                            </small>

                                            <h6 className="fw-bold mt-2 mb-0">

                                                {selectedAppointment.veterinarianId?.name || 'Not Assigned'}

                                            </h6>

                                            <small className="text-secondary">

                                                {selectedAppointment.veterinarianId?.specialization}

                                            </small>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="bg-light rounded-3 p-3 h-100">

                                            <small className="text-secondary">
                                                Service
                                            </small>

                                            <h6 className="fw-bold mt-2 mb-0">

                                                {selectedAppointment.service}

                                            </h6>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="bg-light rounded-3 p-3 h-100">

                                            <small className="text-secondary">
                                                Appointment Type
                                            </small>

                                            <h6 className="fw-bold mt-2 mb-0">

                                                {selectedAppointment.appointmentType || 'N/A'}

                                            </h6>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="bg-light rounded-3 p-3 h-100">

                                            <small className="text-secondary">
                                                Appointment Date
                                            </small>

                                            <h6 className="fw-bold mt-2 mb-0">

                                                {formatDate(selectedAppointment.appointmentDate)}

                                            </h6>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="bg-light rounded-3 p-3 h-100">

                                            <small className="text-secondary">
                                                Appointment Time
                                            </small>

                                            <h6 className="fw-bold mt-2 mb-0">

                                                {selectedAppointment.appointmentTime || 'N/A'}

                                            </h6>

                                        </div>

                                    </div>


                                    <div className="col-12">

                                        <div className="bg-light rounded-3 p-3">

                                            <small className="text-secondary">
                                                Concern / Description
                                            </small>

                                            <p className="mt-2 mb-0">

                                                {selectedAppointment.concern || 'No concern provided'}

                                            </p>

                                        </div>

                                    </div>


                                    {/* STATUS UPDATE */}

                                    <div className="col-12">

                                        <label className="form-label fw-semibold">

                                            Update Appointment Status

                                        </label>

                                        <select
                                            className="form-select"
                                            value={selectedAppointment.status}
                                            disabled={updating}
                                            onChange={(e) =>
                                                handleStatus(
                                                    selectedAppointment._id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="Pending">Pending</option>

                                            <option value="Confirmed">Confirmed</option>

                                            <option value="Completed">Completed</option>

                                            <option value="Cancelled">Cancelled</option>

                                            <option value="Rejected">Rejected</option>

                                        </select>

                                    </div>


                                </div>

                            </div>


                            {/* MODAL FOOTER */}

                            <div className="modal-footer border-0 px-4 pb-4">

                                <button
                                    className="btn btn-light rounded-3 px-4"
                                    onClick={() => setShowDetails(false)}
                                >

                                    Close

                                </button>

                                <button
                                    className="btn btn-danger rounded-3 px-4"
                                    onClick={() =>
                                        handleDelete(selectedAppointment._id)
                                    }
                                >

                                    <FaTrash className="me-2" />

                                    Delete Appointment

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    )

}

export default ManageAppointments