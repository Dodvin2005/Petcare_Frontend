import React, { useEffect, useState } from 'react'

import AdminSidebar from '../Components/AdminSidebar'

import { ToastContainer, toast } from 'react-toastify'

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaLock,
    FaSave,
    FaUndo,
    FaShieldAlt,
    FaUserCog,
    FaCheckCircle,
    FaEdit
} from 'react-icons/fa'

import {
    getUserProfileAPI,
    updateUserProfileAPI
} from '../../../Services/AllApi'


function AdminSettings() {

    // =========================================
    // STATES
    // =========================================

    const [admin, setAdmin] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        profileImage: '',
        role: ''
    })

    const [originalAdmin, setOriginalAdmin] = useState({})

    const [loading, setLoading] = useState(true)

    const [saving, setSaving] = useState(false)

    const [error, setError] = useState('')

    const [editMode, setEditMode] = useState(false)


    // =========================================
    // SIDEBAR WIDTH
    // Match existing AdminSidebar width
    // =========================================

    const SIDEBAR_WIDTH = '280px'


    // =========================================
    // GET ADMIN DETAILS
    // =========================================

    const getAdminDetails = async () => {

        try {

            setLoading(true)

            setError('')

            const result = await getUserProfileAPI()

            if (result.status === 200 && result.data.user) {

                const user = result.data.user

                const adminData = {
                    name: user.name || '',
                    username: user.username || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    address: user.address || '',
                    profileImage: user.profileImage || '',
                    role: user.role || 'Admin'
                }

                setAdmin(adminData)

                setOriginalAdmin(adminData)

            }

        }

        catch (err) {

            console.log('Admin Profile Error:', err)

            setError(
                err.response?.data?.message ||
                'Unable to load administrator information.'
            )

        }

        finally {

            setLoading(false)

        }

    }


    useEffect(() => {

        getAdminDetails()

    }, [])



    // =========================================
    // HANDLE INPUT CHANGE
    // =========================================

    const handleChange = (e) => {

        const { name, value } = e.target

        setAdmin(prev => ({
            ...prev,
            [name]: value
        }))

    }



    // =========================================
    // UPDATE ADMIN PROFILE
    // =========================================

    const handleSave = async (e) => {

        e.preventDefault()

        if (!admin.name.trim()) {
            return toast.error('Please enter your name.')
        }

        if (!admin.email.trim()) {
            return toast.error('Please enter your email.')
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(admin.email)) {
            return toast.error('Please enter a valid email address.')
        }

        try {

            setSaving(true)

            const reqBody = {
                name: admin.name.trim(),
                email: admin.email.trim(),
                username: admin.username,
                phone: admin.phone,
                address: admin.address
            }

            const result = await updateUserProfileAPI(reqBody)

            if (result.status === 200) {

                const updatedAdmin = {
                    ...admin,
                    ...(result.data.user || {})
                }

                setAdmin(updatedAdmin)

                setOriginalAdmin(updatedAdmin)

                setEditMode(false)

                toast.success(
                    result.data.message || 'Profile updated successfully!'
                )

            }

        }

        catch (err) {

            console.log('Update Profile Error:', err)

            toast.error(
                err.response?.data?.message ||
                'Unable to update profile.'
            )

        }

        finally {

            setSaving(false)

        }

    }



    // =========================================
    // CANCEL EDIT
    // =========================================

    const handleReset = () => {

        setAdmin(originalAdmin)

        setEditMode(false)

        toast.info('Changes discarded.')

    }



    // =========================================
    // CARD STYLE
    // =========================================

    const cardStyle = {

        backgroundColor: '#FFFFFF',

        border: '1px solid #E7EEE7',

        borderRadius: '16px',

        boxShadow: '0 3px 15px rgba(35,70,43,0.04)'

    }



    // =========================================
    // INPUT STYLE
    // =========================================

    const inputStyle = {

        borderRadius: '9px',

        padding: '11px 13px',

        fontSize: '13px',

        border: '1px solid #E1E9E1',

        backgroundColor: editMode ? '#FFFFFF' : '#F8FAF8',

        boxShadow: 'none'

    }



    // =========================================
    // MAIN LAYOUT
    // =========================================

    const pageLayout = {

        display: 'flex',

        minHeight: '100vh',

        width: '100%',

        backgroundColor: '#F5F8F5',

        overflowX: 'hidden'

    }



    // =========================================
    // SIDEBAR CONTAINER
    // =========================================

    const sidebarStyle = {

        width: SIDEBAR_WIDTH,

        minWidth: SIDEBAR_WIDTH,

        flexShrink: 0

    }



    // =========================================
    // MAIN CONTENT STYLE
    // =========================================

    const mainStyle = {

        flex: '1 1 auto',

        minWidth: 0,

        width: `calc(100% - ${SIDEBAR_WIDTH})`,

        overflowX: 'hidden'

    }



    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div style={pageLayout}>

                <aside style={sidebarStyle}>

                    <AdminSidebar />

                </aside>


                <main
                    className="d-flex justify-content-center align-items-center"
                    style={mainStyle}
                >

                    <div className="text-center">

                        <div
                            className="spinner-border mb-3"
                            style={{ color: '#315A3D' }}
                        ></div>

                        <h6
                            className="fw-semibold"
                            style={{ color: '#315A3D' }}
                        >
                            Loading Admin Settings...
                        </h6>

                        <small className="text-secondary">
                            Please wait
                        </small>

                    </div>

                </main>

            </div>

        )

    }



    // =========================================
    // MAIN PAGE
    // =========================================

    return (

        <div style={pageLayout}>

            <ToastContainer
                position="top-right"
                autoClose={2500}
            />


            {/* =====================================
                EXISTING ADMIN SIDEBAR
                NO CHANGES TO SIDEBAR COMPONENT
            ===================================== */}

            <aside style={sidebarStyle}>

                <AdminSidebar />

            </aside>



            {/* =====================================
                MAIN CONTENT
            ===================================== */}

            <main style={mainStyle}>


                {/* =====================================
                    TOP HEADER
                ===================================== */}

                <header
                    className="d-flex justify-content-between align-items-center flex-wrap gap-3 px-4 px-lg-5"
                    style={{
                        minHeight: '82px',
                        backgroundColor: '#FFFFFF',
                        borderBottom: '1px solid #E8EEE8'
                    }}
                >

                    <div>

                        <h5
                            className="fw-bold mb-1"
                            style={{ color: '#294B35' }}
                        >
                            Admin Settings
                        </h5>

                        <small className="text-secondary">
                            Manage your administrator account
                        </small>

                    </div>


                    <div
                        className="d-flex align-items-center gap-2"
                        style={{
                            backgroundColor: '#EAF4EA',
                            padding: '9px 16px',
                            borderRadius: '30px'
                        }}
                    >

                        <FaShieldAlt style={{ color: '#347A49' }} />

                        <small
                            className="fw-semibold"
                            style={{ color: '#347A49' }}
                        >
                            Administrator Account
                        </small>

                    </div>

                </header>



                {/* =====================================
                    PAGE BODY
                ===================================== */}

                <div
                    style={{
                        width: '100%',
                        maxWidth: '1550px',
                        margin: '0 auto',
                        padding: '28px 30px',
                        boxSizing: 'border-box'
                    }}
                >


                    {/* PAGE TITLE */}

                    <div className="mb-4">

                        <small className="text-secondary">
                            Dashboard / Settings
                        </small>

                        <h3
                            className="fw-bold mt-2 mb-1"
                            style={{
                                color: '#294B35',
                                fontSize: '25px'
                            }}
                        >
                            Account Settings
                        </h3>

                        <p
                            className="text-secondary mb-0"
                            style={{ fontSize: '13px' }}
                        >
                            Manage your personal information and account security.
                        </p>

                    </div>



                    {/* ERROR MESSAGE */}

                    {error && (

                        <div className="alert alert-danger d-flex justify-content-between align-items-center">

                            <span>{error}</span>

                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={getAdminDetails}
                            >
                                Retry
                            </button>

                        </div>

                    )}



                    {/* =====================================
                        ADMIN PROFILE BANNER
                    ===================================== */}

                    <div
                        className="p-4 mb-4"
                        style={{
                            background: 'linear-gradient(120deg, #315A3D, #438455)',
                            borderRadius: '16px',
                            color: '#FFFFFF'
                        }}
                    >

                        <div className="d-flex align-items-center flex-wrap gap-4">


                            {/* PROFILE IMAGE */}

                            <div
                                className="d-flex justify-content-center align-items-center rounded-circle"
                                style={{
                                    width: '90px',
                                    height: '90px',
                                    minWidth: '90px',
                                    backgroundColor: '#E5F2E7',
                                    color: '#315A3D',
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    border: '4px solid rgba(255,255,255,0.4)',
                                    overflow: 'hidden'
                                }}
                            >

                                {admin.profileImage ? (

                                    <img
                                        src={
                                            admin.profileImage.startsWith('http')
                                                ? admin.profileImage
                                                : `http://localhost:3000/uploads/${admin.profileImage}`
                                        }
                                        alt="Admin"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />

                                ) : (

                                    admin.name?.charAt(0).toUpperCase() || 'A'

                                )}

                            </div>



                            {/* ADMIN DETAILS */}

                            <div className="flex-grow-1">

                                <div className="d-flex align-items-center gap-2 flex-wrap">

                                    <h4 className="fw-bold mb-1">
                                        {admin.name || 'Administrator'}
                                    </h4>

                                    <span
                                        className="badge rounded-pill"
                                        style={{
                                            backgroundColor: '#DFF2E3',
                                            color: '#28663A',
                                            fontSize: '10px'
                                        }}
                                    >

                                        <FaCheckCircle className="me-1" />

                                        Verified Account

                                    </span>

                                </div>

                                <p className="mb-2 opacity-75">
                                    {admin.email}
                                </p>

                                <small className="opacity-75">

                                    <FaShieldAlt className="me-2" />

                                    PetCare System Administrator

                                </small>

                            </div>



                            {/* EDIT BUTTON */}

                            {!editMode && (

                                <button
                                    className="btn px-4 py-2"
                                    onClick={() => setEditMode(true)}
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        color: '#315A3D',
                                        borderRadius: '9px',
                                        fontWeight: '600',
                                        fontSize: '12px'
                                    }}
                                >

                                    <FaEdit className="me-2" />

                                    Edit Profile

                                </button>

                            )}

                        </div>

                    </div>



                    {/* =====================================
                        PROFILE AND ACCOUNT INFORMATION
                    ===================================== */}

                    <div className="row g-4">


                        {/* PERSONAL INFORMATION */}

                        <div className="col-12 col-xl-8">

                            <div
                                style={{
                                    ...cardStyle,
                                    overflow: 'hidden'
                                }}
                            >


                                {/* CARD HEADER */}

                                <div
                                    className="p-4 border-bottom"
                                    style={{ borderColor: '#EDF1ED' }}
                                >

                                    <div className="d-flex align-items-center gap-3">

                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                width: '45px',
                                                height: '45px',
                                                backgroundColor: '#E8F3E9',
                                                color: '#347A49',
                                                borderRadius: '11px'
                                            }}
                                        >

                                            <FaUserCog size={20} />

                                        </div>

                                        <div>

                                            <h5
                                                className="fw-bold mb-1"
                                                style={{ color: '#294B35' }}
                                            >
                                                Personal Information
                                            </h5>

                                            <small className="text-secondary">
                                                Your registered administrator details.
                                            </small>

                                        </div>

                                    </div>

                                </div>



                                {/* FORM BODY */}

                                <div className="p-4">

                                    <form onSubmit={handleSave}>

                                        <div className="row g-4">


                                            {/* FULL NAME */}

                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold small">
                                                    Full Name
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-light">
                                                        <FaUser className="text-secondary" />
                                                    </span>

                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="form-control"
                                                        style={inputStyle}
                                                        value={admin.name}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                        placeholder="Enter your name"
                                                        required
                                                    />

                                                </div>

                                            </div>



                                            {/* USERNAME */}

                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold small">
                                                    Username
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-light">
                                                        <FaUser className="text-secondary" />
                                                    </span>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        style={inputStyle}
                                                        value={admin.username}
                                                        disabled
                                                        placeholder="Username"
                                                    />

                                                </div>

                                                <small className="text-secondary">
                                                    Username is read-only.
                                                </small>

                                            </div>



                                            {/* EMAIL */}

                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold small">
                                                    Email Address
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-light">
                                                        <FaEnvelope className="text-secondary" />
                                                    </span>

                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        style={inputStyle}
                                                        value={admin.email}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                        placeholder="Enter email"
                                                        required
                                                    />

                                                </div>

                                            </div>



                                            {/* PHONE */}

                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold small">
                                                    Phone Number
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-light">
                                                        <FaPhone className="text-secondary" />
                                                    </span>

                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        className="form-control"
                                                        style={inputStyle}
                                                        value={admin.phone}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                        placeholder="Enter phone number"
                                                    />

                                                </div>

                                            </div>



                                            {/* ADDRESS */}

                                            <div className="col-12">

                                                <label className="form-label fw-semibold small">
                                                    Address
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-light">
                                                        <FaMapMarkerAlt className="text-secondary" />
                                                    </span>

                                                    <textarea
                                                        name="address"
                                                        className="form-control"
                                                        style={{
                                                            ...inputStyle,
                                                            resize: 'none'
                                                        }}
                                                        rows="3"
                                                        value={admin.address}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                        placeholder="Enter your address"
                                                    ></textarea>

                                                </div>

                                            </div>

                                        </div>



                                        {/* FORM BUTTONS */}

                                        {editMode && (

                                            <div className="d-flex justify-content-end gap-2 flex-wrap mt-4 pt-3 border-top">

                                                <button
                                                    type="button"
                                                    className="btn btn-light border px-4"
                                                    onClick={handleReset}
                                                    disabled={saving}
                                                >

                                                    <FaUndo className="me-2" />

                                                    Cancel

                                                </button>


                                                <button
                                                    type="submit"
                                                    className="btn text-white px-4"
                                                    disabled={saving}
                                                    style={{
                                                        backgroundColor: '#315A3D',
                                                        borderRadius: '9px'
                                                    }}
                                                >

                                                    {saving ? (

                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                                            Saving...
                                                        </>

                                                    ) : (

                                                        <>
                                                            <FaSave className="me-2" />
                                                            Save Changes
                                                        </>

                                                    )}

                                                </button>

                                            </div>

                                        )}

                                    </form>

                                </div>

                            </div>

                        </div>



                        {/* =====================================
                            ACCOUNT INFORMATION
                        ===================================== */}

                        <div className="col-12 col-xl-4">

                            <div
                                className="p-4 h-100"
                                style={cardStyle}
                            >

                                <h5
                                    className="fw-bold mb-1"
                                    style={{ color: '#294B35' }}
                                >
                                    Account Information
                                </h5>

                                <small className="text-secondary">
                                    Your PetCare administrator account.
                                </small>

                                <hr className="my-4" />


                                {/* ROLE */}

                                <div className="d-flex align-items-center gap-3 mb-4">

                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            width: '43px',
                                            height: '43px',
                                            borderRadius: '10px',
                                            backgroundColor: '#E8F3E9',
                                            color: '#347A49',
                                            flexShrink: 0
                                        }}
                                    >
                                        <FaShieldAlt />
                                    </div>

                                    <div>

                                        <small className="text-secondary">
                                            Account Role
                                        </small>

                                        <h6 className="fw-bold mb-0">
                                            {admin.role || 'Admin'}
                                        </h6>

                                    </div>

                                </div>



                                {/* EMAIL */}

                                <div className="d-flex align-items-center gap-3 mb-4">

                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            width: '43px',
                                            height: '43px',
                                            borderRadius: '10px',
                                            backgroundColor: '#EAF1FF',
                                            color: '#5479B9',
                                            flexShrink: 0
                                        }}
                                    >
                                        <FaEnvelope />
                                    </div>

                                    <div style={{ minWidth: 0 }}>

                                        <small className="text-secondary">
                                            Registered Email
                                        </small>

                                        <p
                                            className="fw-semibold mb-0"
                                            style={{
                                                fontSize: '12px',
                                                wordBreak: 'break-word'
                                            }}
                                        >
                                            {admin.email || 'Not available'}
                                        </p>

                                    </div>

                                </div>



                                {/* PHONE */}

                                <div className="d-flex align-items-center gap-3 mb-4">

                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            width: '43px',
                                            height: '43px',
                                            borderRadius: '10px',
                                            backgroundColor: '#FFF1DF',
                                            color: '#C58A37',
                                            flexShrink: 0
                                        }}
                                    >
                                        <FaPhone />
                                    </div>

                                    <div>

                                        <small className="text-secondary">
                                            Phone Number
                                        </small>

                                        <h6 className="fw-semibold mb-0">
                                            {admin.phone || 'Not provided'}
                                        </h6>

                                    </div>

                                </div>



                                {/* SECURITY */}

                                <div
                                    className="p-3 mt-4"
                                    style={{
                                        backgroundColor: '#EDF6EE',
                                        borderRadius: '11px'
                                    }}
                                >

                                    <div className="d-flex align-items-center gap-2 mb-2">

                                        <FaLock style={{ color: '#347A49' }} />

                                        <span
                                            className="fw-bold"
                                            style={{
                                                color: '#315A3D',
                                                fontSize: '13px'
                                            }}
                                        >
                                            Account Security
                                        </span>

                                    </div>

                                    <p
                                        className="mb-0 text-secondary"
                                        style={{
                                            fontSize: '11px',
                                            lineHeight: '1.7'
                                        }}
                                    >
                                        Your administrator account is protected
                                        using JWT authentication and secure
                                        server-side authorization.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>



                    {/* =====================================
                        PASSWORD SECURITY
                    ===================================== */}

                    <div
                        className="mt-4 p-4"
                        style={cardStyle}
                    >

                        <div className="d-flex align-items-center gap-3 flex-wrap">

                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    backgroundColor: '#E8F3E9',
                                    color: '#347A49',
                                    borderRadius: '12px',
                                    flexShrink: 0
                                }}
                            >

                                <FaLock size={20} />

                            </div>

                            <div className="flex-grow-1">

                                <h6
                                    className="fw-bold mb-1"
                                    style={{ color: '#294B35' }}
                                >
                                    Password & Security
                                </h6>

                                <small className="text-secondary">
                                    Your password is managed securely by the PetCare authentication system.
                                </small>

                            </div>

                            <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                    backgroundColor: '#E4F4E7',
                                    color: '#347A49'
                                }}
                            >

                                <FaCheckCircle className="me-1" />

                                Protected

                            </span>

                        </div>

                    </div>



                    {/* =====================================
                        FOOTER
                    ===================================== */}

                    <div
                        className="text-center py-4 mt-4"
                        style={{
                            borderTop: '1px solid #E5ECE5'
                        }}
                    >

                        <small
                            className="text-secondary"
                            style={{ fontSize: '11px' }}
                        >
                            © 2026 PETCARE – Pet Health & Appointment Management System.
                        </small>

                        <div
                            className="mt-1"
                            style={{
                                color: '#78917C',
                                fontSize: '11px'
                            }}
                        >
                            Better Care. Happier Pets.
                        </div>

                    </div>

                </div>

            </main>

        </div>

    )

}

export default AdminSettings