import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Footer from '../Component/Footer'
import Header from '../Component/Header'

import { ToastContainer, toast } from 'react-toastify'

import {
    getUserProfileAPI,
    updateUserProfileAPI,
    getMyPetsAPI,
    getMyAppointmentsAPI,
    getMyMedicalRecordsAPI
} from '../../../Services/AllApi'


function Profile() {

    const navigate = useNavigate()

    // =====================================
    // STATES
    // =====================================

    const [editProfile, setEditProfile] = useState(false)

    const [loading, setLoading] = useState(true)

    const [saving, setSaving] = useState(false)

    const [pets, setPets] = useState([])

    const [appointments, setAppointments] = useState([])

    const [medicalRecords, setMedicalRecords] = useState([])


    // USER DATA

    const [user, setUser] = useState({

        name: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        profileImage: '',
        createdAt: ''

    })


    // EDIT FORM DATA

    const [formData, setFormData] = useState({

        name: '',
        username: '',
        phone: '',
        address: ''

    })


    // =====================================
    // FETCH PROFILE
    // =====================================

    const fetchProfile = async () => {

        try {

            const response = await getUserProfileAPI()

            if (response.data.success) {

                const userData = response.data.user

                setUser(userData)

                setFormData({

                    name: userData.name || '',
                    username: userData.username || '',
                    phone: userData.phone || '',
                    address: userData.address || ''

                })

            }

        } catch (error) {

            console.log('Profile fetching error:', error)

            toast.error(
                error.response?.data?.message || 'Unable to load profile'
            )

        }

    }


    // =====================================
    // FETCH PETS
    // =====================================

    const fetchPets = async () => {

        try {

            const response = await getMyPetsAPI()

            const petList =
                response.data?.pets ||
                response.data?.myPets ||
                response.data?.allPets ||
                []

            setPets(Array.isArray(petList) ? petList : [])

        } catch (error) {

            console.log('Pets fetching error:', error)

        }

    }


    // =====================================
    // FETCH APPOINTMENTS
    // =====================================

    const fetchAppointments = async () => {

        try {

            const response = await getMyAppointmentsAPI()

            const appointmentList =
                response.data?.appointments ||
                response.data?.myAppointments ||
                response.data?.allAppointments ||
                []

            setAppointments(
                Array.isArray(appointmentList) ? appointmentList : []
            )

        } catch (error) {

            console.log('Appointments fetching error:', error)

        }

    }


    // =====================================
    // FETCH MEDICAL RECORDS
    // =====================================

    const fetchMedicalRecords = async () => {

        try {

            const response = await getMyMedicalRecordsAPI()

            const recordList =
                response.data?.records ||
                response.data?.medicalRecords ||
                []

            setMedicalRecords(
                Array.isArray(recordList) ? recordList : []
            )

        } catch (error) {

            console.log('Medical records fetching error:', error)

        }

    }


    // =====================================
    // LOAD ALL PROFILE DATA
    // =====================================

    const loadProfileData = async () => {

        try {

            setLoading(true)

            await Promise.all([

                fetchProfile(),
                fetchPets(),
                fetchAppointments(),
                fetchMedicalRecords()

            ])

        } finally {

            setLoading(false)

        }

    }


    useEffect(() => {

        loadProfileData()

    }, [])


    // =====================================
    // HANDLE INPUT CHANGES
    // =====================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        })

    }


    // =====================================
    // OPEN EDIT MODAL
    // =====================================

    const handleEdit = () => {

        setFormData({

            name: user.name || '',
            username: user.username || '',
            phone: user.phone || '',
            address: user.address || ''

        })

        setEditProfile(true)

    }


    // =====================================
    // SAVE PROFILE
    // =====================================

    const handleSave = async (e) => {

        e.preventDefault()

        try {

            setSaving(true)

            const response = await updateUserProfileAPI(formData)

            if (response.data.success) {

                // Update user details

                const updatedUser = response.data.user

                setUser(updatedUser)

                setFormData({

                    name: updatedUser.name || '',
                    username: updatedUser.username || '',
                    phone: updatedUser.phone || '',
                    address: updatedUser.address || ''

                })

                setEditProfile(false)

                toast.success('Profile updated successfully!')

            }

        } catch (error) {

            console.log('Profile update error:', error)

            toast.error(

                error.response?.data?.message ||
                'Profile update failed'

            )

        } finally {

            setSaving(false)

        }

    }


    // =====================================
    // PROFILE INITIALS
    // =====================================

    const getInitials = () => {

        return user.name

            ? user.name
                .split(' ')
                .filter(Boolean)
                .map(word => word[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()

            : 'U'

    }


    // =====================================
    // MEMBER SINCE
    // =====================================

    const memberSince = user.createdAt

        ? new Date(user.createdAt).getFullYear()

        : 'N/A'


    // =====================================
    // LOADING SCREEN
    // =====================================

    if (loading) {

        return (

            <div
                style={{
                    backgroundColor: '#F6F8F4',
                    minHeight: '100vh'
                }}
            >

                <Header />

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: '70vh' }}
                >

                    <div className="text-center">

                        <div
                            className="spinner-border mb-3"
                            style={{ color: '#326B43' }}
                        ></div>

                        <h6 style={{ color: '#326B43' }}>
                            Loading your profile...
                        </h6>

                    </div>

                </div>

                <Footer />

            </div>

        )

    }


    // =====================================
    // MAIN UI
    // =====================================

    return (

        <div style={{ backgroundColor: '#F6F8F4', minHeight: '100vh' }}>

            <Header />

            <ToastContainer position="top-right" autoClose={2500} />


            <div className="container py-4 py-lg-5">


                {/* PAGE HEADING */}

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                    <div>

                        <span
                            className="small fw-semibold text-uppercase"
                            style={{
                                color: '#53845F',
                                letterSpacing: '2px'
                            }}
                        >
                            MY ACCOUNT
                        </span>

                        <h2
                            className="fw-bold mt-2 mb-2"
                            style={{ color: '#203D2A' }}
                        >
                            My Profile
                        </h2>

                        <p className="text-secondary mb-0">
                            Manage your account and keep your pet's information up to date.
                        </p>

                    </div>


                    <button
                        className="btn rounded-pill px-4 py-3 fw-semibold text-white shadow-sm"
                        style={{ backgroundColor: '#326B43' }}
                        onClick={handleEdit}
                    >

                        Edit Profile <span className="ms-2">↗</span>

                    </button>

                </div>



                {/* PROFILE BANNER */}

                <div className="card border-0 rounded-4 shadow-sm overflow-hidden mb-4">

                    <div
                        style={{
                            height: '125px',
                            background: 'linear-gradient(115deg, #214D31, #559765, #B4D6B4)'
                        }}
                    ></div>


                    <div className="card-body px-4 px-lg-5 pb-4">

                        <div className="d-flex flex-column flex-md-row align-items-md-end gap-3">


                            {/* PROFILE IMAGE */}

                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow overflow-hidden"
                                style={{
                                    width: '112px',
                                    height: '112px',
                                    minWidth: '112px',
                                    fontSize: '35px',
                                    backgroundColor: '#326B43',
                                    border: '5px solid white',
                                    marginTop: '-65px'
                                }}
                            >

                                {user.profileImage ? (

                                    <img
                                        src={user.profileImage}
                                        alt="Profile"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />

                                ) : (

                                    getInitials()

                                )}

                            </div>



                            {/* USER DETAILS */}

                            <div className="flex-grow-1 pb-1">

                                <div className="d-flex align-items-center flex-wrap gap-2 mb-2">

                                    <h3
                                        className="fw-bold mb-0"
                                        style={{ color: '#203D2A' }}
                                    >
                                        {user.name}
                                    </h3>

                                    <span
                                        className="badge rounded-pill px-3 py-2 text-capitalize"
                                        style={{
                                            backgroundColor: '#E4F3E7',
                                            color: '#326B43'
                                        }}
                                    >
                                        {user.role || 'User'}
                                    </span>

                                </div>


                                <p className="text-secondary mb-2 text-break">
                                    {user.email}
                                </p>


                                <div className="d-flex align-items-center flex-wrap gap-3 small text-secondary">

                                    <span>
                                        📍 {user.address || 'Address not added'}
                                    </span>

                                    <span>•</span>

                                    <span>
                                        Member since {memberSince}
                                    </span>

                                </div>

                            </div>



                            {/* ACCOUNT STATUS */}

                            <div
                                className="rounded-4 p-3 mb-1"
                                style={{
                                    backgroundColor: '#F1F8F1',
                                    minWidth: '155px'
                                }}
                            >

                                <div className="d-flex align-items-center gap-2 mb-2">

                                    <span
                                        className="rounded-circle"
                                        style={{
                                            width: '9px',
                                            height: '9px',
                                            backgroundColor: '#29934A'
                                        }}
                                    ></span>

                                    <span
                                        className="small fw-semibold"
                                        style={{ color: '#326B43' }}
                                    >
                                        Account Active
                                    </span>

                                </div>

                                <p className="text-secondary small mb-0">
                                    Your account is in good standing.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>



                {/* OVERVIEW CARDS */}

                <div className="row g-3 mb-4">


                    {/* PETS */}

                    <div className="col-12 col-sm-6 col-lg-4">

                        <div className="card border-0 rounded-4 h-100 shadow-sm">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-secondary mb-2">
                                            Registered Pets
                                        </p>

                                        <h2
                                            className="fw-bold mb-1"
                                            style={{ color: '#203D2A' }}
                                        >
                                            {pets.length.toString().padStart(2, '0')}
                                        </h2>

                                    </div>

                                    <div
                                        className="rounded-4 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '55px',
                                            height: '55px',
                                            backgroundColor: '#E5F3E7',
                                            fontSize: '27px'
                                        }}
                                    >
                                        🐾
                                    </div>

                                </div>

                                <p className="small text-secondary mt-3 mb-0">
                                    Your beloved companions
                                </p>

                            </div>

                        </div>

                    </div>



                    {/* APPOINTMENTS */}

                    <div className="col-12 col-sm-6 col-lg-4">

                        <div className="card border-0 rounded-4 h-100 shadow-sm">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-secondary mb-2">
                                            Appointments
                                        </p>

                                        <h2
                                            className="fw-bold mb-1"
                                            style={{ color: '#203D2A' }}
                                        >
                                            {appointments.length.toString().padStart(2, '0')}
                                        </h2>

                                    </div>

                                    <div
                                        className="rounded-4 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '55px',
                                            height: '55px',
                                            backgroundColor: '#E9EEFC',
                                            fontSize: '27px'
                                        }}
                                    >
                                        📅
                                    </div>

                                </div>

                                <p className="small text-secondary mt-3 mb-0">
                                    Your veterinary visits
                                </p>

                            </div>

                        </div>

                    </div>



                    {/* MEDICAL RECORDS */}

                    <div className="col-12 col-sm-6 col-lg-4">

                        <div className="card border-0 rounded-4 h-100 shadow-sm">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-secondary mb-2">
                                            Medical Records
                                        </p>

                                        <h2
                                            className="fw-bold mb-1"
                                            style={{ color: '#203D2A' }}
                                        >
                                            {medicalRecords.length.toString().padStart(2, '0')}
                                        </h2>

                                    </div>

                                    <div
                                        className="rounded-4 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '55px',
                                            height: '55px',
                                            backgroundColor: '#FFF0DB',
                                            fontSize: '27px'
                                        }}
                                    >
                                        📋
                                    </div>

                                </div>

                                <p className="small text-secondary mt-3 mb-0">
                                    Health history and treatment details
                                </p>

                            </div>

                        </div>

                    </div>

                </div>



                {/* MAIN CONTENT */}

                <div className="row g-4">


                    {/* PERSONAL INFORMATION */}

                    <div className="col-12 col-lg-7">

                        <div className="card border-0 rounded-4 shadow-sm h-100">

                            <div className="card-body p-4 p-lg-5">

                                <div className="d-flex align-items-center gap-3 mb-4">

                                    <div
                                        className="rounded-3 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            backgroundColor: '#E5F3E7',
                                            fontSize: '23px'
                                        }}
                                    >
                                        👤
                                    </div>

                                    <div>

                                        <h5
                                            className="fw-bold mb-1"
                                            style={{ color: '#203D2A' }}
                                        >
                                            Personal Information
                                        </h5>

                                        <p className="text-secondary small mb-0">
                                            Your personal and contact details
                                        </p>

                                    </div>

                                </div>


                                <hr className="mb-4" style={{ opacity: '0.08' }} />


                                <div className="row g-4">


                                    <div className="col-12 col-md-6">

                                        <p className="small text-secondary mb-2">
                                            Full Name
                                        </p>

                                        <h6 className="fw-semibold mb-0">
                                            {user.name || 'Not added'}
                                        </h6>

                                    </div>


                                    <div className="col-12 col-md-6">

                                        <p className="small text-secondary mb-2">
                                            Username
                                        </p>

                                        <h6 className="fw-semibold mb-0">
                                            {user.username || 'Not added'}
                                        </h6>

                                    </div>


                                    <div className="col-12 col-md-6">

                                        <p className="small text-secondary mb-2">
                                            Email Address
                                        </p>

                                        <h6 className="fw-semibold mb-0 text-break">
                                            {user.email}
                                        </h6>

                                    </div>


                                    <div className="col-12 col-md-6">

                                        <p className="small text-secondary mb-2">
                                            Phone Number
                                        </p>

                                        <h6 className="fw-semibold mb-0">
                                            {user.phone || 'Not added'}
                                        </h6>

                                    </div>


                                    <div className="col-12">

                                        <p className="small text-secondary mb-2">
                                            Address
                                        </p>

                                        <h6 className="fw-semibold mb-0">
                                            {user.address || 'Not added'}
                                        </h6>

                                    </div>

                                </div>


                                <hr className="my-4" style={{ opacity: '0.08' }} />


                                <button
                                    className="btn rounded-pill px-4 py-2 fw-semibold"
                                    style={{
                                        backgroundColor: '#E5F3E7',
                                        color: '#326B43'
                                    }}
                                    onClick={handleEdit}
                                >
                                    Update Information →
                                </button>

                            </div>

                        </div>

                    </div>



                    {/* SIDE SECTION */}

                    <div className="col-12 col-lg-5">


                        {/* PET CARE LINKS */}

                        <div className="card border-0 rounded-4 shadow-sm mb-4">

                            <div className="card-body p-4">

                                <h5
                                    className="fw-bold mb-1"
                                    style={{ color: '#203D2A' }}
                                >
                                    Your Pet Care
                                </h5>

                                <p className="text-secondary small mb-4">
                                    Everything your companions need, in one place.
                                </p>


                                {/* MY PETS */}

                                <button
                                    className="btn w-100 text-start p-3 rounded-4 mb-3"
                                    style={{ backgroundColor: '#F5F8F3' }}
                                    onClick={() => navigate('/my-pets')}
                                >

                                    <div className="d-flex align-items-center gap-3">

                                        <div
                                            className="rounded-3 d-flex align-items-center justify-content-center"
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                backgroundColor: '#E3F1E4',
                                                fontSize: '23px'
                                            }}
                                        >
                                            🐕
                                        </div>

                                        <div className="flex-grow-1">

                                            <h6
                                                className="fw-bold mb-1"
                                                style={{ color: '#203D2A' }}
                                            >
                                                My Pets
                                            </h6>

                                            <small className="text-secondary">
                                                Manage your pet profiles
                                            </small>

                                        </div>

                                        <span className="fs-5 text-secondary">›</span>

                                    </div>

                                </button>



                                {/* APPOINTMENTS */}

                                <button
                                    className="btn w-100 text-start p-3 rounded-4 mb-3"
                                    style={{ backgroundColor: '#F5F8F3' }}
                                    onClick={() => navigate('/my-appointments')}
                                >

                                    <div className="d-flex align-items-center gap-3">

                                        <div
                                            className="rounded-3 d-flex align-items-center justify-content-center"
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                backgroundColor: '#E8EDFC',
                                                fontSize: '23px'
                                            }}
                                        >
                                            📅
                                        </div>

                                        <div className="flex-grow-1">

                                            <h6
                                                className="fw-bold mb-1"
                                                style={{ color: '#203D2A' }}
                                            >
                                                My Appointments
                                            </h6>

                                            <small className="text-secondary">
                                                View upcoming vet visits
                                            </small>

                                        </div>

                                        <span className="fs-5 text-secondary">›</span>

                                    </div>

                                </button>



                                {/* MEDICAL RECORDS */}

                                <button
                                    className="btn w-100 text-start p-3 rounded-4"
                                    style={{ backgroundColor: '#F5F8F3' }}
                                    onClick={() => navigate('/my-medical-records')}
                                >

                                    <div className="d-flex align-items-center gap-3">

                                        <div
                                            className="rounded-3 d-flex align-items-center justify-content-center"
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                backgroundColor: '#FFF0DB',
                                                fontSize: '23px'
                                            }}
                                        >
                                            💉
                                        </div>

                                        <div className="flex-grow-1">

                                            <h6
                                                className="fw-bold mb-1"
                                                style={{ color: '#203D2A' }}
                                            >
                                                Medical Records
                                            </h6>

                                            <small className="text-secondary">
                                                View health and vaccination records
                                            </small>

                                        </div>

                                        <span className="fs-5 text-secondary">›</span>

                                    </div>

                                </button>

                            </div>

                        </div>



                        {/* SUPPORT CARD */}

                        <div
                            className="card border-0 rounded-4 shadow-sm overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #234C32, #477B50)'
                            }}
                        >

                            <div className="card-body p-4 p-lg-5 text-white">

                                <span
                                    className="badge rounded-pill px-3 py-2 mb-3"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                        color: 'white'
                                    }}
                                >
                                    WE ARE HERE FOR YOU
                                </span>

                                <h4 className="fw-bold mb-3">
                                    Because they deserve the best care.
                                </h4>

                                <p
                                    className="mb-4"
                                    style={{
                                        color: '#DCEBDD',
                                        lineHeight: '1.8'
                                    }}
                                >
                                    Need assistance with your account or your pet's health?
                                    Our team is ready to help you.
                                </p>

                                <button
                                    className="btn rounded-pill px-4 py-2 fw-semibold"
                                    style={{
                                        backgroundColor: 'white',
                                        color: '#326B43'
                                    }}
                                    onClick={() => navigate('/contact')}
                                >
                                    Contact Support →
                                </button>

                            </div>

                        </div>

                    </div>

                </div>



                {/* FOOTER MESSAGE */}

                <div className="text-center mt-5 pt-3 pb-2">

                    <p
                        className="fw-bold mb-2"
                        style={{
                            color: '#326B43',
                            fontSize: '18px'
                        }}
                    >
                        Every paw deserves a healthy life. 🐾
                    </p>

                    <p className="text-secondary small mb-0">
                        PETCARE — Your trusted partner in pet health and happiness.
                    </p>

                </div>

            </div>



            {/* EDIT PROFILE MODAL */}

            {editProfile && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: 'rgba(20,35,24,0.55)'
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered modal-lg">

                        <div className="modal-content border-0 rounded-4 shadow-lg">

                            <form onSubmit={handleSave}>


                                {/* MODAL HEADER */}

                                <div className="modal-header border-0 px-4 px-md-5 pt-4">

                                    <div>

                                        <h4
                                            className="modal-title fw-bold"
                                            style={{ color: '#203D2A' }}
                                        >
                                            Edit Your Profile
                                        </h4>

                                        <p className="text-secondary small mb-0 mt-2">
                                            Update your personal information below.
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setEditProfile(false)}
                                        disabled={saving}
                                    ></button>

                                </div>



                                {/* MODAL BODY */}

                                <div className="modal-body px-4 px-md-5 py-4">

                                    <div className="row g-3">


                                        <div className="col-12 col-md-6">

                                            <label className="form-label fw-semibold small">
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control rounded-3 py-2"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>



                                        <div className="col-12 col-md-6">

                                            <label className="form-label fw-semibold small">
                                                Username
                                            </label>

                                            <input
                                                type="text"
                                                name="username"
                                                className="form-control rounded-3 py-2"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>



                                        <div className="col-12 col-md-6">

                                            <label className="form-label fw-semibold small">
                                                Email Address
                                            </label>

                                            <input
                                                type="email"
                                                className="form-control rounded-3 py-2"
                                                value={user.email || ''}
                                                disabled
                                            />

                                            <small className="text-secondary">
                                                Email address cannot be changed.
                                            </small>

                                        </div>



                                        <div className="col-12 col-md-6">

                                            <label className="form-label fw-semibold small">
                                                Phone Number
                                            </label>

                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control rounded-3 py-2"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>



                                        <div className="col-12">

                                            <label className="form-label fw-semibold small">
                                                Address
                                            </label>

                                            <textarea
                                                name="address"
                                                className="form-control rounded-3"
                                                rows="3"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                            ></textarea>

                                        </div>

                                    </div>

                                </div>



                                {/* MODAL FOOTER */}

                                <div className="modal-footer border-0 px-4 px-md-5 pb-4">

                                    <button
                                        type="button"
                                        className="btn btn-light rounded-pill px-4 py-2"
                                        onClick={() => setEditProfile(false)}
                                        disabled={saving}
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        className="btn text-white rounded-pill px-4 py-2 fw-semibold"
                                        style={{ backgroundColor: '#326B43' }}
                                        disabled={saving}
                                    >

                                        {saving ? (

                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Saving...
                                            </>

                                        ) : (

                                            'Save Changes'

                                        )}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            )}


            <Footer />

        </div>

    )

}

export default Profile