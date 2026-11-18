import React, { useEffect, useState } from 'react'
import VetSidebar from '../Component/VetSidebar'

import { toast } from 'react-toastify'

import {
    FaSearch,
    FaDog,
    FaCat,
    FaEye,
    FaCalendarCheck,
    FaUser,
    FaPaw,
    FaFilter,
    FaEnvelope,
    FaPhone,
    FaSyncAlt,
    FaVenusMars,
    FaBirthdayCake,
    FaTimes
} from 'react-icons/fa'

import {
    getVetPatientsAPI
} from '../../../Services/AllApi'


function PatientPets() {

    const [patients, setPatients] = useState([])

    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')

    const [selectedPet, setSelectedPet] = useState(null)


    // ===============================
    // FETCH VETERINARIAN PATIENTS
    // ===============================

    const fetchPatients = async () => {

        setLoading(true)

        try {

            const result = await getVetPatientsAPI()

            console.log('Veterinarian Patients:', result)

            if (result.status >= 200 && result.status < 300) {

                const responseData = result.data

                const patientList = Array.isArray(responseData)
                    ? responseData
                    : responseData?.patients ||
                      responseData?.data?.patients ||
                      responseData?.data ||
                      []

                if (Array.isArray(patientList)) {

                    // Normalize patient information
                    const formattedPatients = patientList.map((item) => {

                        // Pet details
                        const pet =
                            item.petId && typeof item.petId === 'object'
                                ? item.petId
                                : item.pet && typeof item.pet === 'object'
                                    ? item.pet
                                    : item

                        // Owner details
                        const owner =
                            item.userId && typeof item.userId === 'object'
                                ? item.userId
                                : item.ownerId && typeof item.ownerId === 'object'
                                    ? item.ownerId
                                    : item.owner && typeof item.owner === 'object'
                                        ? item.owner
                                        : pet.ownerId && typeof pet.ownerId === 'object'
                                            ? pet.ownerId
                                            : {}

                        // Appointment information
                        const appointment =
                            item.appointmentId && typeof item.appointmentId === 'object'
                                ? item.appointmentId
                                : item.appointment && typeof item.appointment === 'object'
                                    ? item.appointment
                                    : item

                        const petId = pet._id || item.petId || item._id

                        const dob = pet.dob || pet.dateOfBirth || pet.DOB

                        // Calculate pet age
                        let age = 'Not available'

                        if (dob) {

                            const birthDate = new Date(dob)

                            if (!isNaN(birthDate.getTime())) {

                                const today = new Date()

                                let years = today.getFullYear() - birthDate.getFullYear()

                                let months = today.getMonth() - birthDate.getMonth()

                                if (today.getDate() < birthDate.getDate()) {
                                    months--
                                }

                                if (months < 0) {
                                    years--
                                    months += 12
                                }

                                if (years > 0) {
                                    age = `${years} ${years === 1 ? 'Year' : 'Years'}`
                                } else {
                                    age = `${Math.max(months, 0)} ${months === 1 ? 'Month' : 'Months'}`
                                }

                            }

                        }

                        // Appointment date
                        const appointmentDate =
                            appointment.appointmentDate ||
                            appointment.date ||
                            item.appointmentDate

                        // Appointment status
                        let status = appointment.status || item.status || 'Not Available'

                        if (String(status).toLowerCase() === 'accepted') {
                            status = 'Accepted'
                        } else if (String(status).toLowerCase() === 'confirmed') {
                            status = 'Accepted'
                        } else if (String(status).toLowerCase() === 'pending') {
                            status = 'Pending'
                        } else if (String(status).toLowerCase() === 'completed') {
                            status = 'Completed'
                        } else if (String(status).toLowerCase() === 'rejected') {
                            status = 'Rejected'
                        }

                        return {

                            id: String(petId || Math.random()),

                            name: pet.petName || pet.name || 'Unknown Pet',

                            type: pet.petType || pet.type || 'Other',

                            breed: pet.breed || 'Not specified',

                            age,

                            dob,

                            gender: pet.gender || 'Not specified',

                            weight: pet.weight || 'Not specified',

                            colour: pet.colour || pet.color || 'Not specified',

                            owner: owner.name || owner.username || 'Not available',

                            phone: owner.phone || 'Not available',

                            email: owner.email || 'Not available',

                            appointment: appointmentDate || null,

                            appointmentTime: appointment.appointmentTime || '',

                            reason: appointment.service || item.service || 'Not specified',

                            appointmentType: appointment.appointmentType || '',

                            status,

                            lastVisit: item.lastVisit || pet.lastVisit || null,

                            medicalHistory: pet.medicalHistory || pet.medicalConditions || 'Not available',

                            vaccinationStatus: pet.vaccinationStatus || 'Not available',

                            lastVaccinationDate: pet.lastVaccinationDate || null,

                            notes: pet.notes || 'No additional notes',

                            petImage: pet.petImage || ''

                        }

                    })


                    // Remove duplicate pets
                    const uniquePatients = formattedPatients.filter(
                        (patient, index, self) =>
                            index === self.findIndex(
                                p => p.id === patient.id
                            )
                    )

                    setPatients(uniquePatients)

                } else {

                    setPatients([])

                }

            } else {

                toast.error('Unable to fetch patients')

            }

        } catch (error) {

            console.log('Patient Fetch Error:', error)

            toast.error(
                error.response?.data?.message ||
                'Failed to load patients'
            )

        } finally {

            setLoading(false)

        }

    }


    // ===============================
    // LOAD PATIENTS
    // ===============================

    useEffect(() => {

        fetchPatients()

    }, [])


    // ===============================
    // FORMAT DATE
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
    // PET ICON
    // ===============================

    const getPetIcon = (type) => {

        const petType = String(type || '').toLowerCase()

        if (petType.includes('dog')) {
            return <FaDog />
        }

        if (petType.includes('cat')) {
            return <FaCat />
        }

        return <FaPaw />

    }


    // ===============================
    // STATUS STYLE
    // ===============================

    const getStatusStyle = (status) => {

        switch (status) {

            case 'Accepted':
            case 'Confirmed':

                return {
                    backgroundColor: '#E5F2E7',
                    color: '#39734D'
                }

            case 'Pending':

                return {
                    backgroundColor: '#FFF0D9',
                    color: '#A56B18'
                }

            case 'Completed':

                return {
                    backgroundColor: '#E6EBF8',
                    color: '#4D6399'
                }

            case 'Rejected':
            case 'Cancelled':

                return {
                    backgroundColor: '#FCE7E7',
                    color: '#B94B4B'
                }

            default:

                return {
                    backgroundColor: '#F0F0F0',
                    color: '#666666'
                }

        }

    }


    // ===============================
    // SEARCH PATIENTS
    // ===============================

    const filteredPatients = patients.filter((pet) => {

        const searchValue = search.toLowerCase()

        return (

            pet.name.toLowerCase().includes(searchValue) ||

            pet.owner.toLowerCase().includes(searchValue) ||

            pet.breed.toLowerCase().includes(searchValue) ||

            pet.type.toLowerCase().includes(searchValue)

        )

    })


    // ===============================
    // STATISTICS
    // ===============================

    const totalPatients = patients.length

    const totalDogs = patients.filter(
        pet => pet.type.toLowerCase().includes('dog')
    ).length

    const totalCats = patients.filter(
        pet => pet.type.toLowerCase().includes('cat')
    ).length

    const upcomingVisits = patients.filter(pet => {

        const appointmentDate = pet.appointment
            ? new Date(pet.appointment)
            : null

        return (

            appointmentDate &&
            !isNaN(appointmentDate.getTime()) &&
            appointmentDate >= new Date(new Date().setHours(0, 0, 0, 0)) &&
            ['Pending', 'Accepted'].includes(pet.status)

        )

    }).length


    // ===============================
    // CARD STYLE
    // ===============================

    const cardStyle = {

        backgroundColor: '#FFFFFF',

        border: '1px solid #E8EEE7',

        borderRadius: '18px'

    }


    // ===============================
    // MAIN COMPONENT
    // ===============================

    return (

        <div style={{
            backgroundColor: '#F5F8F3',
            minHeight: '100vh'
        }}>

            <VetSidebar />


            {/* MAIN CONTENT */}

            <div
                className="p-4 p-lg-5"
                style={{
                    marginLeft: '320px',
                    minHeight: '100vh'
                }}
            >


                {/* HEADER */}

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                    <div>

                        <p
                            className="mb-2"
                            style={{
                                color: '#83A98B',
                                fontSize: '12px',
                                fontWeight: '700',
                                letterSpacing: '2px'
                            }}
                        >
                            VETERINARIAN PORTAL
                        </p>

                        <h2
                            className="fw-bold mb-2"
                            style={{ color: '#304B38' }}
                        >
                            My Patients
                        </h2>

                        <p className="text-secondary mb-0">
                            Manage the pets assigned to your appointments.
                        </p>

                    </div>


                    {/* PATIENT COUNT */}

                    <div
                        className="d-flex align-items-center gap-3 p-3"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '14px',
                            border: '1px solid #E8EEE7'
                        }}
                    >

                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '13px',
                                backgroundColor: '#E5F2E7',
                                color: '#477A54',
                                fontSize: '20px'
                            }}
                        >
                            <FaPaw />
                        </div>

                        <div>

                            <small className="text-secondary d-block">
                                My Patients
                            </small>

                            <h5
                                className="fw-bold mb-0"
                                style={{ color: '#304B38' }}
                            >
                                {totalPatients} Pets
                            </h5>

                        </div>

                    </div>

                </div>


                {/* WELCOME BANNER */}

                <div
                    className="p-4 p-lg-5 mb-4"
                    style={{
                        background: 'linear-gradient(115deg, #DDEEDF, #F0F7EC)',
                        borderRadius: '22px',
                        border: '1px solid #DCEBDD'
                    }}
                >

                    <div className="row align-items-center">

                        <div className="col-md-8">

                            <span
                                className="badge px-3 py-2 mb-3"
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    color: '#477A54',
                                    borderRadius: '20px'
                                }}
                            >

                                <FaCalendarCheck className="me-2" />

                                Your Appointment Patients

                            </span>

                            <h3
                                className="fw-bold mb-2"
                                style={{ color: '#304B38' }}
                            >
                                Every Pet Deserves the Best Care
                            </h3>

                            <p
                                className="mb-0"
                                style={{
                                    color: '#607363',
                                    lineHeight: '1.8'
                                }}
                            >
                                View your patients, check their details, and stay
                                informed about their scheduled appointments and
                                healthcare needs.
                            </p>

                        </div>


                        <div className="col-md-4 text-center d-none d-md-block">

                            <FaPaw
                                style={{
                                    fontSize: '100px',
                                    color: '#83B99A',
                                    opacity: 0.7
                                }}
                            />

                        </div>

                    </div>

                </div>


                {/* STATISTICS */}

                <div className="row g-3 mb-4">


                    {/* TOTAL PATIENTS */}

                    <div className="col-sm-6 col-xl-3">

                        <div className="p-4 h-100" style={cardStyle}>

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <span className="text-secondary small">
                                    Total Patients
                                </span>

                                <span
                                    className="p-2 rounded-3"
                                    style={{
                                        backgroundColor: '#E5F2E7',
                                        color: '#477A54'
                                    }}
                                >
                                    <FaPaw />
                                </span>

                            </div>

                            <h3
                                className="fw-bold mb-1"
                                style={{ color: '#304B38' }}
                            >
                                {totalPatients}
                            </h3>

                            <small className="text-secondary">
                                Pets in your patient list
                            </small>

                        </div>

                    </div>


                    {/* DOGS */}

                    <div className="col-sm-6 col-xl-3">

                        <div className="p-4 h-100" style={cardStyle}>

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <span className="text-secondary small">
                                    Dogs
                                </span>

                                <span
                                    className="p-2 rounded-3"
                                    style={{
                                        backgroundColor: '#E5EAF8',
                                        color: '#4D6399'
                                    }}
                                >
                                    <FaDog />
                                </span>

                            </div>

                            <h3
                                className="fw-bold mb-1"
                                style={{ color: '#304B38' }}
                            >
                                {totalDogs}
                            </h3>

                            <small className="text-secondary">
                                Registered dog patients
                            </small>

                        </div>

                    </div>


                    {/* CATS */}

                    <div className="col-sm-6 col-xl-3">

                        <div className="p-4 h-100" style={cardStyle}>

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <span className="text-secondary small">
                                    Cats
                                </span>

                                <span
                                    className="p-2 rounded-3"
                                    style={{
                                        backgroundColor: '#FCEBDD',
                                        color: '#B17A42'
                                    }}
                                >
                                    <FaCat />
                                </span>

                            </div>

                            <h3
                                className="fw-bold mb-1"
                                style={{ color: '#304B38' }}
                            >
                                {totalCats}
                            </h3>

                            <small className="text-secondary">
                                Registered cat patients
                            </small>

                        </div>

                    </div>


                    {/* UPCOMING VISITS */}

                    <div className="col-sm-6 col-xl-3">

                        <div className="p-4 h-100" style={cardStyle}>

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <span className="text-secondary small">
                                    Upcoming Visits
                                </span>

                                <span
                                    className="p-2 rounded-3"
                                    style={{
                                        backgroundColor: '#FFF0D9',
                                        color: '#A56B18'
                                    }}
                                >
                                    <FaCalendarCheck />
                                </span>

                            </div>

                            <h3
                                className="fw-bold mb-1"
                                style={{ color: '#304B38' }}
                            >
                                {upcomingVisits}
                            </h3>

                            <small className="text-secondary">
                                Pending or accepted visits
                            </small>

                        </div>

                    </div>

                </div>


                {/* PATIENT DIRECTORY */}

                <div className="p-4" style={cardStyle}>


                    {/* DIRECTORY HEADER */}

                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                        <div>

                            <h5
                                className="fw-bold mb-1"
                                style={{ color: '#304B38' }}
                            >
                                Patient Directory
                            </h5>

                            <p className="text-secondary small mb-0">
                                Pets associated with your appointments
                            </p>

                        </div>


                        <div className="d-flex align-items-center gap-2">

                            <span
                                className="badge px-3 py-2"
                                style={{
                                    backgroundColor: '#E5F2E7',
                                    color: '#477A54',
                                    borderRadius: '20px'
                                }}
                            >
                                {filteredPatients.length} Results
                            </span>

                            <button
                                className="btn btn-sm"
                                onClick={fetchPatients}
                                disabled={loading}
                                style={{
                                    backgroundColor: '#E5F2E7',
                                    color: '#39734D',
                                    borderRadius: '9px'
                                }}
                            >
                                <FaSyncAlt />
                            </button>

                        </div>

                    </div>


                    {/* SEARCH */}

                    <div className="row g-3 mb-4">

                        <div className="col-md-8">

                            <div className="input-group">

                                <span
                                    className="input-group-text border-end-0"
                                    style={{
                                        backgroundColor: '#F8FAF7',
                                        borderColor: '#E4EAE2',
                                        borderRadius: '10px 0 0 10px'
                                    }}
                                >
                                    <FaSearch style={{ color: '#83A98B' }} />
                                </span>

                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    placeholder="Search by pet name, owner, breed..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{
                                        backgroundColor: '#F8FAF7',
                                        borderColor: '#E4EAE2',
                                        borderRadius: '0 10px 10px 0',
                                        padding: '12px'
                                    }}
                                />

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div
                                className="d-flex align-items-center gap-2 p-3"
                                style={{
                                    backgroundColor: '#F8FAF7',
                                    border: '1px solid #E4EAE2',
                                    borderRadius: '10px',
                                    color: '#68776B'
                                }}
                            >
                                <FaFilter />

                                <span className="small">
                                    Showing your patients
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* PATIENT CARDS */}

                    <div className="row g-4">


                        {loading ? (

                            <div className="col-12 text-center py-5">

                                <div
                                    className="spinner-border"
                                    style={{ color: '#477A54' }}
                                ></div>

                                <p className="text-secondary mt-3">
                                    Loading your patients...
                                </p>

                            </div>

                        ) : filteredPatients.length > 0 ? (

                            filteredPatients.map((pet) => (

                                <div
                                    className="col-md-6 col-xl-4"
                                    key={pet.id}
                                >

                                    <div
                                        className="h-100 p-4"
                                        style={{
                                            border: '1px solid #E8EEE7',
                                            borderRadius: '17px',
                                            backgroundColor: '#FFFFFF'
                                        }}
                                    >


                                        {/* PET INFO */}

                                        <div className="d-flex align-items-center gap-3 mb-3">

                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: '65px',
                                                    height: '65px',
                                                    flexShrink: 0,
                                                    borderRadius: '18px',
                                                    backgroundColor: '#E5F2E7',
                                                    color: '#477A54',
                                                    fontSize: '28px'
                                                }}
                                            >
                                                {getPetIcon(pet.type)}
                                            </div>


                                            <div className="flex-grow-1">

                                                <h5
                                                    className="fw-bold mb-1"
                                                    style={{ color: '#304B38' }}
                                                >
                                                    {pet.name}
                                                </h5>

                                                <p className="small text-secondary mb-1">
                                                    {pet.breed}
                                                </p>

                                                <span
                                                    className="badge"
                                                    style={{
                                                        ...getStatusStyle(pet.status),
                                                        borderRadius: '20px'
                                                    }}
                                                >
                                                    {pet.status}
                                                </span>

                                            </div>

                                        </div>


                                        <hr style={{ borderColor: '#E8EEE7' }} />


                                        {/* PET DETAILS */}

                                        <div className="d-flex justify-content-between mb-3">

                                            <span className="text-secondary small">
                                                Pet Type
                                            </span>

                                            <span className="fw-semibold small">
                                                {pet.type}
                                            </span>

                                        </div>


                                        <div className="d-flex justify-content-between mb-3">

                                            <span className="text-secondary small">
                                                Age / Gender
                                            </span>

                                            <span className="fw-semibold small">
                                                {pet.age} / {pet.gender}
                                            </span>

                                        </div>


                                        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">

                                            <span className="text-secondary small">
                                                Pet Owner
                                            </span>

                                            <span className="fw-semibold small text-end">

                                                <FaUser
                                                    className="me-1"
                                                    style={{ color: '#83A98B' }}
                                                />

                                                {pet.owner}

                                            </span>

                                        </div>


                                        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">

                                            <span className="text-secondary small">
                                                Appointment
                                            </span>

                                            <span className="fw-semibold small text-end">
                                                {formatDate(pet.appointment)}
                                            </span>

                                        </div>


                                        {/* APPOINTMENT REASON */}

                                        <div
                                            className="p-3 mb-3"
                                            style={{
                                                backgroundColor: '#F6F9F4',
                                                borderRadius: '10px'
                                            }}
                                        >

                                            <small className="text-secondary d-block mb-1">
                                                Appointment Reason
                                            </small>

                                            <span
                                                className="small fw-semibold"
                                                style={{ color: '#45644B' }}
                                            >
                                                {pet.reason}
                                            </span>

                                        </div>


                                        {/* VIEW DETAILS */}

                                        <button
                                            className="btn w-100 fw-semibold"
                                            onClick={() => setSelectedPet(pet)}
                                            style={{
                                                backgroundColor: '#E5F2E7',
                                                color: '#39734D',
                                                border: '1px solid #D3E8D6',
                                                borderRadius: '10px',
                                                padding: '11px'
                                            }}
                                        >

                                            <FaEye className="me-2" />

                                            View Patient Details

                                        </button>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="col-12 text-center py-5">

                                <FaPaw
                                    style={{
                                        fontSize: '45px',
                                        color: '#A9C9AE',
                                        marginBottom: '15px'
                                    }}
                                />

                                <h5 style={{ color: '#304B38' }}>
                                    No patients found
                                </h5>

                                <p className="text-secondary mb-0">
                                    {patients.length === 0
                                        ? 'Patients assigned to your appointments will appear here.'
                                        : 'Try searching with a different pet name or owner name.'
                                    }
                                </p>

                            </div>

                        )}

                    </div>

                </div>


                <p className="text-center text-secondary small mt-4 mb-0">
                    PETCARE Veterinarian Portal · Caring for every paw
                </p>

            </div>


            {/* ===============================
                PATIENT DETAILS MODAL
            =============================== */}

            {selectedPet && (

                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
                    style={{
                        backgroundColor: 'rgba(27, 43, 31, 0.5)',
                        zIndex: 2000
                    }}
                    onClick={() => setSelectedPet(null)}
                >

                    <div
                        className="p-4"
                        style={{
                            width: '100%',
                            maxWidth: '520px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '22px'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >


                        {/* MODAL HEADER */}

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h5
                                className="fw-bold mb-0"
                                style={{ color: '#304B38' }}
                            >
                                Patient Details
                            </h5>

                            <button
                                className="btn btn-light"
                                onClick={() => setSelectedPet(null)}
                                aria-label="Close"
                            >
                                <FaTimes />
                            </button>

                        </div>


                        {/* PET IMAGE / ICON */}

                        <div className="text-center mb-4">

                            <div
                                className="mx-auto d-flex align-items-center justify-content-center mb-3"
                                style={{
                                    width: '85px',
                                    height: '85px',
                                    borderRadius: '25px',
                                    backgroundColor: '#E5F2E7',
                                    color: '#477A54',
                                    fontSize: '38px'
                                }}
                            >

                                {getPetIcon(selectedPet.type)}

                            </div>

                            <h4
                                className="fw-bold mb-1"
                                style={{ color: '#304B38' }}
                            >
                                {selectedPet.name}
                            </h4>

                            <p className="text-secondary mb-2">
                                {selectedPet.breed}
                            </p>

                            <span
                                className="badge px-3 py-2"
                                style={{
                                    ...getStatusStyle(selectedPet.status),
                                    borderRadius: '20px'
                                }}
                            >
                                {selectedPet.status}
                            </span>

                        </div>


                        {/* PET INFORMATION */}

                        <h6
                            className="fw-bold mb-3"
                            style={{ color: '#477A54' }}
                        >
                            <FaPaw className="me-2" />
                            Pet Information
                        </h6>


                        <div className="row g-3 mb-4">

                            <div className="col-6">

                                <small className="text-secondary d-block">
                                    Pet Type
                                </small>

                                <strong>{selectedPet.type}</strong>

                            </div>


                            <div className="col-6">

                                <small className="text-secondary d-block">
                                    Breed
                                </small>

                                <strong>{selectedPet.breed}</strong>

                            </div>


                            <div className="col-6">

                                <small className="text-secondary d-block">
                                    Age
                                </small>

                                <strong>{selectedPet.age}</strong>

                            </div>


                            <div className="col-6">

                                <small className="text-secondary d-block">
                                    Gender
                                </small>

                                <strong>{selectedPet.gender}</strong>

                            </div>


                            <div className="col-6">

                                <small className="text-secondary d-block">
                                    Date of Birth
                                </small>

                                <strong>{formatDate(selectedPet.dob)}</strong>

                            </div>


                            <div className="col-6">

                                <small className="text-secondary d-block">
                                    Weight
                                </small>

                                <strong>{selectedPet.weight}</strong>

                            </div>


                            <div className="col-6">

                                <small className="text-secondary d-block">
                                    Colour
                                </small>

                                <strong>{selectedPet.colour}</strong>

                            </div>

                        </div>


                        <hr />


                        {/* OWNER INFORMATION */}

                        <h6
                            className="fw-bold mb-3"
                            style={{ color: '#477A54' }}
                        >
                            <FaUser className="me-2" />
                            Owner Information
                        </h6>


                        <div className="mb-3">

                            <small className="text-secondary d-block">
                                Owner Name
                            </small>

                            <strong>{selectedPet.owner}</strong>

                        </div>


                        <div className="mb-3">

                            <small className="text-secondary d-block">
                                Phone Number
                            </small>

                            <strong>
                                <FaPhone className="me-2 text-secondary" />
                                {selectedPet.phone}
                            </strong>

                        </div>


                        <div className="mb-3">

                            <small className="text-secondary d-block">
                                Email Address
                            </small>

                            <strong>
                                <FaEnvelope className="me-2 text-secondary" />
                                {selectedPet.email}
                            </strong>

                        </div>


                        <hr />


                        {/* VACCINATION INFORMATION */}

                        <h6
                            className="fw-bold mb-3"
                            style={{ color: '#477A54' }}
                        >
                            Vaccination Information
                        </h6>


                        <div className="mb-3">

                            <small className="text-secondary d-block">
                                Vaccination Status
                            </small>

                            <strong>{selectedPet.vaccinationStatus}</strong>

                        </div>


                        <div className="mb-3">

                            <small className="text-secondary d-block">
                                Last Vaccination Date
                            </small>

                            <strong>
                                {formatDate(selectedPet.lastVaccinationDate)}
                            </strong>

                        </div>


                        <hr />


                        {/* MEDICAL INFORMATION */}

                        <h6
                            className="fw-bold mb-3"
                            style={{ color: '#477A54' }}
                        >
                            Medical Information
                        </h6>


                        <div
                            className="p-3 mb-3"
                            style={{
                                backgroundColor: '#F6F9F4',
                                borderRadius: '10px'
                            }}
                        >

                            <small className="text-secondary d-block mb-1">
                                Medical History / Conditions
                            </small>

                            <span className="small">
                                {selectedPet.medicalHistory}
                            </span>

                        </div>


                        <div
                            className="p-3 mb-4"
                            style={{
                                backgroundColor: '#F6F9F4',
                                borderRadius: '10px'
                            }}
                        >

                            <small className="text-secondary d-block mb-1">
                                Additional Notes
                            </small>

                            <span className="small">
                                {selectedPet.notes}
                            </span>

                        </div>


                        {/* APPOINTMENT INFORMATION */}

                        <h6
                            className="fw-bold mb-3"
                            style={{ color: '#477A54' }}
                        >
                            <FaCalendarCheck className="me-2" />
                            Appointment Information
                        </h6>


                        <div className="mb-3">

                            <small className="text-secondary d-block">
                                Appointment Date
                            </small>

                            <strong>
                                {formatDate(selectedPet.appointment)}
                            </strong>

                        </div>


                        <div className="mb-3">

                            <small className="text-secondary d-block">
                                Appointment Time
                            </small>

                            <strong>
                                {selectedPet.appointmentTime || 'Not available'}
                            </strong>

                        </div>


                        <div className="mb-3">

                            <small className="text-secondary d-block">
                                Service
                            </small>

                            <strong>{selectedPet.reason}</strong>

                        </div>


                        <div className="mb-4">

                            <small className="text-secondary d-block">
                                Last Visit
                            </small>

                            <strong>
                                {formatDate(selectedPet.lastVisit)}
                            </strong>

                        </div>


                        {/* CLOSE BUTTON */}

                        <button
                            className="btn w-100 fw-semibold"
                            onClick={() => setSelectedPet(null)}
                            style={{
                                backgroundColor: '#477A54',
                                color: '#FFFFFF',
                                borderRadius: '10px',
                                padding: '12px'
                            }}
                        >
                            Close Details
                        </button>

                    </div>

                </div>

            )}

        </div>

    )

}

export default PatientPets