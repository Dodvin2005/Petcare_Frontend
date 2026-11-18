import React, { useEffect, useState } from 'react'
import VetSidebar from '../Component/VetSidebar'

import { toast } from 'react-toastify'

import {
    FaUserMd,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaBriefcaseMedical,
    FaPaw,
    FaEdit,
    FaCheckCircle,
    FaCalendarCheck,
    FaClock,
    FaStethoscope,
    FaIdBadge,
    FaArrowRight,
    FaShieldAlt,
    FaHeart,
    FaUsers
} from 'react-icons/fa'

import {
    getUserProfileAPI,
    updateUserProfileAPI,
    getVetAppointmentsAPI
} from '../../../Services/AllApi'


function VetProfile() {

    // ========================================
    // STATES
    // ========================================

    const [loading, setLoading] = useState(true)

    const [saving, setSaving] = useState(false)

    const [isEditing, setIsEditing] = useState(false)

    const [profile, setProfile] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        location: '',
        specialization: '',
        qualification: '',
        experience: '',
        license: '',
        about: '',
        availability: 'Available'
    })

    const [editForm, setEditForm] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        location: '',
        specialization: '',
        qualification: '',
        experience: '',
        license: '',
        about: '',
        availability: 'Available'
    })

    const [stats, setStats] = useState({
        appointments: 0,
        patients: 0
    })


    // ========================================
    // MAP DATABASE PROFILE DATA
    // ========================================

    const mapProfileData = (user) => {

        return {
            name: user.name || '',
            username: user.username || '',
            email: user.email || '',
            phone: user.phone || '',
            location: user.address || '',
            specialization: user.specialization || '',
            qualification: user.qualification || '',
            experience: user.experience || '',
            license: user.license || '',
            about: user.about || '',
            availability: user.availability || 'Available'
        }

    }


    // ========================================
    // GET VETERINARIAN PROFILE
    // ========================================

    const getProfile = async () => {

        try {

            const response = await getUserProfileAPI()

            if (response.data.success) {

                const user = response.data.user

                const profileData = mapProfileData(user)

                setProfile(profileData)

                setEditForm(profileData)

            }
            else {

                toast.error(
                    response.data.message ||
                    'Unable to fetch profile'
                )

            }

        }
        catch (error) {

            console.log('Profile Fetch Error:', error)

            toast.error(
                error.response?.data?.message ||
                'Unable to load veterinarian profile'
            )

        }
        finally {

            setLoading(false)

        }

    }


    // ========================================
    // GET VETERINARIAN APPOINTMENT STATISTICS
    // ========================================

    const getVetStatistics = async () => {

        try {

            const response = await getVetAppointmentsAPI()

            if (response.data.success) {

                // Get appointments from API response

                const appointments =
                    response.data.appointments ||
                    response.data.data ||
                    []

                // Total assigned appointments

                const appointmentCount = appointments.length


                // Calculate unique pets

                const uniquePets = new Set(

                    appointments.map((item) => {

                        const pet = item.petId

                        if (typeof pet === 'object' && pet !== null) {

                            return pet._id

                        }

                        return pet

                    }).filter(Boolean).map(id => id.toString())

                )


                // Update statistics

                setStats({

                    appointments: appointmentCount,

                    patients: uniquePets.size

                })

            }
            else {

                console.log(
                    'Appointment statistics:',
                    response.data.message
                )

            }

        }
        catch (error) {

            console.log('Statistics Fetch Error:', error)

        }

    }


    // ========================================
    // LOAD PROFILE AND STATISTICS
    // ========================================

    useEffect(() => {

        getProfile()

        getVetStatistics()

    }, [])


    // ========================================
    // HANDLE INPUT CHANGES
    // ========================================

    const handleChange = (e) => {

        const { name, value } = e.target

        setEditForm(previous => ({

            ...previous,

            [name]: value

        }))

    }


    // ========================================
    // OPEN EDIT MODE
    // ========================================

    const handleEdit = () => {

        setEditForm({ ...profile })

        setIsEditing(true)

    }


    // ========================================
    // SAVE PROFILE
    // ========================================

    const handleSave = async (e) => {

        e.preventDefault()

        if (!editForm.name.trim()) {

            toast.warning('Please enter your name')

            return

        }

        if (!editForm.phone.trim()) {

            toast.warning('Please enter your phone number')

            return

        }

        try {

            setSaving(true)

            // Send updated details to backend

            const updatedData = {

                name: editForm.name.trim(),

                phone: editForm.phone.trim(),

                // Backend stores location as address

                address: editForm.location.trim(),

                specialization: editForm.specialization.trim(),

                qualification: editForm.qualification.trim(),

                experience: editForm.experience,

                license: editForm.license.trim(),

                about: editForm.about.trim(),

                availability: editForm.availability

            }


            const response = await updateUserProfileAPI(updatedData)


            if (response.data.success) {

                const user = response.data.user

                const profileData = mapProfileData(user)

                // Update profile state

                setProfile(profileData)

                setEditForm(profileData)

                setIsEditing(false)

                toast.success('Profile updated successfully!')

            }
            else {

                toast.error(
                    response.data.message ||
                    'Profile update failed'
                )

            }

        }
        catch (error) {

            console.log('Profile Update Error:', error)

            toast.error(

                error.response?.data?.message ||
                'Profile update failed'

            )

        }
        finally {

            setSaving(false)

        }

    }


    // ========================================
    // CANCEL EDITING
    // ========================================

    const handleCancel = () => {

        setEditForm({ ...profile })

        setIsEditing(false)

    }


    // ========================================
    // COMMON STYLES
    // ========================================

    const cardStyle = {

        background: '#FFFFFF',

        border: '1px solid #E9EEE7',

        borderRadius: '20px',

        boxShadow: '0 5px 24px rgba(43, 72, 46, 0.035)'

    }


    const labelStyle = {

        color: '#8B978B',

        fontSize: '12px',

        fontWeight: '600',

        marginBottom: '9px'

    }


    const valueStyle = {

        color: '#304B38',

        fontSize: '14px',

        fontWeight: '600',

        wordBreak: 'break-word'

    }


    const inputStyle = {

        border: '1px solid #DDE8DC',

        borderRadius: '10px',

        padding: '11px 13px',

        fontSize: '13px',

        background: '#FBFCFA'

    }


    // ========================================
    // STATISTICS
    // ========================================

    const statistics = [

        {
            title: 'Appointments',
            value: stats.appointments,
            subtitle: 'Total assigned appointments',
            icon: <FaCalendarCheck />,
            color: '#43845A',
            background: '#EAF5EB',
            trend: 'Appointments'
        },

        {
            title: 'Patients',
            value: stats.patients,
            subtitle: 'Unique pets in your appointments',
            icon: <FaPaw />,
            color: '#BD8A48',
            background: '#FFF4E4',
            trend: 'Pet records'
        },

        {
            title: 'Experience',
            value: profile.experience
                ? `${profile.experience} Years`
                : '—',
            subtitle: 'Professional experience',
            icon: <FaBriefcaseMedical />,
            color: '#6B79B7',
            background: '#EEF0FF',
            trend: 'Veterinary care'
        }

    ]


    // ========================================
    // INFORMATION ITEM
    // ========================================

    const informationItem = (icon, label, value) => (

        <div className="d-flex align-items-start gap-3">

            <div
                className="d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '13px',
                    background: '#F0F6EF',
                    color: '#54825B',
                    fontSize: '16px'
                }}
            >
                {icon}

            </div>

            <div className="flex-grow-1 pt-1">

                <div style={labelStyle}>
                    {label}
                </div>

                <div style={valueStyle}>
                    {value || 'Not provided'}
                </div>

            </div>

        </div>

    )


    // ========================================
    // FORM INPUT
    // ========================================

    const renderField = (label, name, type = 'text') => (

        <div className="mb-3">

            <label className="form-label" style={labelStyle}>
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={editForm[name] || ''}
                onChange={handleChange}
                className="form-control shadow-none"
                style={inputStyle}
                readOnly={name === 'email'}
                disabled={saving}
            />

            {name === 'email' && (

                <small className="text-muted">
                    Email address cannot be changed here.
                </small>

            )}

        </div>

    )


    // ========================================
    // LOADING SCREEN
    // ========================================

    if (loading) {

        return (

            <div
                className="d-flex align-items-center justify-content-center"
                style={{
                    minHeight: '100vh',
                    background: '#F6F8F4'
                }}
            >

                <div className="text-center">

                    <div
                        className="spinner-border mb-3"
                        style={{ color: '#315C3D' }}
                    />

                    <p style={{
                        color: '#54745A',
                        fontSize: '14px'
                    }}>
                        Loading veterinarian profile...
                    </p>

                </div>

            </div>

        )

    }


    // ========================================
    // MAIN PAGE
    // ========================================

    return (

        <div
            style={{
                background: '#F6F8F4',
                minHeight: '100vh',
                fontFamily: 'Arial, sans-serif'
            }}
        >

            <VetSidebar />

            <main
                className="p-3 p-md-4 p-xl-5"
                style={{
                    marginLeft: '320px',
                    minHeight: '100vh'
                }}
            >

                {/* PAGE HEADER */}

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                    <div>

                        <div
                            className="d-flex align-items-center gap-2 mb-2"
                            style={{
                                color: '#719477',
                                fontSize: '11px',
                                fontWeight: '700',
                                letterSpacing: '2px'
                            }}
                        >
                            <FaPaw />
                            PETCARE / VETERINARIAN
                        </div>

                        <h2
                            className="fw-bold mb-2"
                            style={{
                                color: '#294632',
                                fontSize: '30px',
                                letterSpacing: '-0.8px'
                            }}
                        >
                            My Profile
                        </h2>

                        <p
                            className="mb-0"
                            style={{
                                color: '#8B978B',
                                fontSize: '14px'
                            }}
                        >
                            Manage your professional identity and account information.
                        </p>

                    </div>

                    {!isEditing && (

                        <button
                            onClick={handleEdit}
                            className="btn d-flex align-items-center justify-content-center gap-2 px-4 py-3"
                            style={{
                                background: '#315C3D',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '13px',
                                fontWeight: '600',
                                boxShadow: '0 5px 14px rgba(49, 92, 61, 0.15)'
                            }}
                        >
                            <FaEdit />
                            Edit Profile
                        </button>

                    )}

                </div>


                {/* PROFILE HERO */}

                <div
                    className="position-relative overflow-hidden mb-4"
                    style={{
                        ...cardStyle,
                        background: 'linear-gradient(120deg, #E5F1E4 0%, #F7F8EE 60%, #EDF4E9 100%)',
                        border: '1px solid #E0EBDD'
                    }}
                >

                    <div
                        className="position-absolute rounded-circle"
                        style={{
                            width: '220px',
                            height: '220px',
                            right: '-65px',
                            top: '-100px',
                            background: 'rgba(102, 153, 105, 0.09)'
                        }}
                    />

                    <div
                        className="position-absolute rounded-circle"
                        style={{
                            width: '150px',
                            height: '150px',
                            right: '90px',
                            bottom: '-100px',
                            background: 'rgba(102, 153, 105, 0.07)'
                        }}
                    />

                    <div className="position-relative p-4 p-md-5">

                        <div className="row align-items-center g-4">

                            <div className="col-auto">

                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                        width: '112px',
                                        height: '112px',
                                        background: 'linear-gradient(145deg, #D6E8D3, #A8CDA7)',
                                        border: '5px solid #FFFFFF',
                                        color: '#3E7049',
                                        fontSize: '47px',
                                        boxShadow: '0 8px 25px rgba(45, 83, 49, 0.12)'
                                    }}
                                >
                                    <FaUserMd />
                                </div>

                            </div>


                            <div className="col">

                                <div className="d-flex flex-wrap align-items-center gap-2 mb-2">

                                    <h3
                                        className="fw-bold mb-0"
                                        style={{
                                            color: '#294632',
                                            fontSize: '26px'
                                        }}
                                    >
                                        {profile.name || 'Veterinarian'}
                                    </h3>

                                    <span
                                        className="d-inline-flex align-items-center gap-1 px-3 py-2 rounded-pill"
                                        style={{
                                            background: '#D9EEDB',
                                            color: '#367449',
                                            fontSize: '11px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        <FaUserMd />
                                        Veterinarian
                                    </span>

                                </div>

                                <p
                                    className="mb-3"
                                    style={{
                                        color: '#6E876F',
                                        fontSize: '14px'
                                    }}
                                >
                                    <FaStethoscope className="me-2" />
                                    {profile.specialization || 'Specialization not provided'}
                                </p>

                                <div className="d-flex flex-wrap gap-3">

                                    <span
                                        className="d-flex align-items-center gap-2"
                                        style={{
                                            color: '#627B65',
                                            fontSize: '13px'
                                        }}
                                    >
                                        <FaMapMarkerAlt />
                                        {profile.location || 'Location not provided'}
                                    </span>

                                    <span
                                        className="d-flex align-items-center gap-2"
                                        style={{
                                            color: '#627B65',
                                            fontSize: '13px'
                                        }}
                                    >
                                        <FaBriefcaseMedical />
                                        {profile.experience
                                            ? `${profile.experience} Years Experience`
                                            : 'Experience not provided'}
                                    </span>

                                </div>

                            </div>


                            <div className="col-12 col-xl-auto">

                                <div
                                    className="p-3"
                                    style={{
                                        background: 'rgba(255,255,255,0.75)',
                                        border: '1px solid rgba(218,231,214,0.9)',
                                        borderRadius: '15px',
                                        minWidth: '185px'
                                    }}
                                >

                                    <div
                                        className="d-flex align-items-center gap-2 mb-2"
                                        style={{
                                            color: '#829182',
                                            fontSize: '11px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        <FaShieldAlt />
                                        APPOINTMENT STATUS
                                    </div>

                                    <div className="d-flex align-items-center gap-2">

                                        <span
                                            className="rounded-circle"
                                            style={{
                                                width: '9px',
                                                height: '9px',
                                                background: profile.availability === 'Available'
                                                    ? '#49A666'
                                                    : '#D36A6A'
                                            }}
                                        />

                                        <span
                                            className="fw-bold"
                                            style={{
                                                color: profile.availability === 'Available'
                                                    ? '#367449'
                                                    : '#B65B5B',
                                                fontSize: '14px'
                                            }}
                                        >
                                            {profile.availability}
                                        </span>

                                    </div>

                                    <small
                                        className="d-block mt-2"
                                        style={{
                                            color: '#89968A',
                                            fontSize: '11px'
                                        }}
                                    >
                                        {profile.availability === 'Available'
                                            ? 'Ready for pet appointments'
                                            : 'Currently unavailable'}
                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* STATISTICS */}

                <div className="row g-3 mb-4">

                    {statistics.map((item, index) => (

                        <div className="col-12 col-md-6 col-xl-4" key={index}>

                            <div
                                className="h-100 p-4"
                                style={cardStyle}
                            >

                                <div className="d-flex justify-content-between align-items-start mb-4">

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '15px',
                                            background: item.background,
                                            color: item.color,
                                            fontSize: '19px'
                                        }}
                                    >
                                        {item.icon}
                                    </div>

                                    <span
                                        className="px-2 py-2 rounded-pill"
                                        style={{
                                            background: '#F5F8F3',
                                            color: '#819080',
                                            fontSize: '10px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {item.trend}
                                    </span>

                                </div>

                                <p
                                    className="mb-2"
                                    style={{
                                        color: '#8C978C',
                                        fontSize: '13px'
                                    }}
                                >
                                    {item.title}
                                </p>

                                <h3
                                    className="fw-bold mb-2"
                                    style={{
                                        color: '#304B38',
                                        fontSize: '28px',
                                        letterSpacing: '-0.5px'
                                    }}
                                >
                                    {item.value}
                                </h3>

                                <div
                                    style={{
                                        color: '#A0AAA0',
                                        fontSize: '12px'
                                    }}
                                >
                                    {item.subtitle}
                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {/* PROFILE CONTENT */}

                {isEditing ? (

                    <div className="p-4 p-md-5 mb-4" style={cardStyle}>

                        <div className="d-flex align-items-center gap-3 mb-4">

                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '14px',
                                    background: '#EAF4E9',
                                    color: '#4D8057',
                                    fontSize: '18px'
                                }}
                            >
                                <FaEdit />
                            </div>

                            <div>

                                <h5
                                    className="fw-bold mb-1"
                                    style={{ color: '#304B38' }}
                                >
                                    Edit Professional Profile
                                </h5>

                                <p
                                    className="mb-0"
                                    style={{
                                        color: '#8B978B',
                                        fontSize: '12px'
                                    }}
                                >
                                    Update your contact and professional details.
                                </p>

                            </div>

                        </div>


                        <form onSubmit={handleSave}>

                            <div className="row g-3">

                                <div className="col-12 col-md-6">
                                    {renderField('Full Name', 'name')}
                                </div>

                                <div className="col-12 col-md-6">
                                    {renderField('Email Address', 'email', 'email')}
                                </div>

                                <div className="col-12 col-md-6">
                                    {renderField('Phone Number', 'phone', 'tel')}
                                </div>

                                <div className="col-12 col-md-6">
                                    {renderField('Clinic Location', 'location')}
                                </div>

                                <div className="col-12 col-md-6">
                                    {renderField('Specialization', 'specialization')}
                                </div>

                                <div className="col-12 col-md-6">
                                    {renderField('Qualification', 'qualification')}
                                </div>

                                <div className="col-12 col-md-6">
                                    {renderField('Experience (Years)', 'experience', 'number')}
                                </div>

                                <div className="col-12 col-md-6">
                                    {renderField('License Number', 'license')}
                                </div>

                                <div className="col-12">

                                    <label className="form-label" style={labelStyle}>
                                        Professional Biography
                                    </label>

                                    <textarea
                                        name="about"
                                        value={editForm.about}
                                        onChange={handleChange}
                                        className="form-control shadow-none"
                                        rows="4"
                                        style={inputStyle}
                                        disabled={saving}
                                    />

                                </div>

                                <div className="col-12">

                                    <label className="form-label" style={labelStyle}>
                                        Appointment Availability
                                    </label>

                                    <select
                                        name="availability"
                                        value={editForm.availability}
                                        onChange={handleChange}
                                        className="form-select shadow-none"
                                        style={inputStyle}
                                        disabled={saving}
                                    >

                                        <option value="Available">
                                            Available
                                        </option>

                                        <option value="Unavailable">
                                            Unavailable
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div className="d-flex flex-wrap gap-2 justify-content-end mt-4">

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="btn px-4 py-2"
                                    style={{
                                        background: '#F3F5F1',
                                        color: '#687568',
                                        border: '1px solid #E5EAE2',
                                        borderRadius: '10px',
                                        fontSize: '13px'
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="btn px-4 py-2"
                                    style={{
                                        background: '#315C3D',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontSize: '13px',
                                        fontWeight: '600'
                                    }}
                                >
                                    <FaCheckCircle className="me-2" />
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>

                            </div>

                        </form>

                    </div>

                ) : (

                    <div className="row g-4 mb-4">

                        {/* PERSONAL INFORMATION */}

                        <div className="col-12 col-xl-7">

                            <div
                                className="p-4 h-100"
                                style={cardStyle}
                            >

                                <div className="d-flex align-items-center gap-3 mb-4">

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '43px',
                                            height: '43px',
                                            borderRadius: '14px',
                                            background: '#EAF4E9',
                                            color: '#4D8057',
                                            fontSize: '17px'
                                        }}
                                    >
                                        <FaUserMd />
                                    </div>

                                    <div>

                                        <h5
                                            className="fw-bold mb-1"
                                            style={{
                                                color: '#304B38',
                                                fontSize: '16px'
                                            }}
                                        >
                                            Personal Information
                                        </h5>

                                        <small
                                            style={{
                                                color: '#9AA49A',
                                                fontSize: '12px'
                                            }}
                                        >
                                            Your contact details
                                        </small>

                                    </div>

                                </div>


                                <div className="row g-4">

                                    <div className="col-12 col-md-6">
                                        {informationItem(
                                            <FaUserMd />,
                                            'Full Name',
                                            profile.name
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        {informationItem(
                                            <FaEnvelope />,
                                            'Email Address',
                                            profile.email
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        {informationItem(
                                            <FaPhoneAlt />,
                                            'Phone Number',
                                            profile.phone
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        {informationItem(
                                            <FaMapMarkerAlt />,
                                            'Clinic Location',
                                            profile.location
                                        )}
                                    </div>

                                </div>


                                <hr
                                    className="my-4"
                                    style={{ borderColor: '#EDF1EA' }}
                                />


                                <div className="d-flex align-items-start gap-3">

                                    <div
                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '13px',
                                            background: '#F1F0FC',
                                            color: '#8178B6',
                                            fontSize: '16px'
                                        }}
                                    >
                                        <FaHeart />
                                    </div>

                                    <div>

                                        <div style={labelStyle}>
                                            About Me
                                        </div>

                                        <p
                                            className="mb-0"
                                            style={{
                                                color: '#718071',
                                                fontSize: '13px',
                                                lineHeight: '1.9'
                                            }}
                                        >
                                            {profile.about || 'No biography added yet.'}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* PROFESSIONAL DETAILS */}

                        <div className="col-12 col-xl-5">

                            <div
                                className="p-4 h-100"
                                style={cardStyle}
                            >

                                <div className="d-flex align-items-center gap-3 mb-4">

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '43px',
                                            height: '43px',
                                            borderRadius: '14px',
                                            background: '#FFF2E1',
                                            color: '#B98545',
                                            fontSize: '17px'
                                        }}
                                    >
                                        <FaBriefcaseMedical />
                                    </div>

                                    <div>

                                        <h5
                                            className="fw-bold mb-1"
                                            style={{
                                                color: '#304B38',
                                                fontSize: '16px'
                                            }}
                                        >
                                            Professional Details
                                        </h5>

                                        <small
                                            style={{
                                                color: '#9AA49A',
                                                fontSize: '12px'
                                            }}
                                        >
                                            Qualifications and expertise
                                        </small>

                                    </div>

                                </div>


                                <div className="d-flex flex-column gap-4">

                                    {informationItem(
                                        <FaStethoscope />,
                                        'Specialization',
                                        profile.specialization
                                    )}

                                    {informationItem(
                                        <FaGraduationCap />,
                                        'Qualification',
                                        profile.qualification
                                    )}

                                    {informationItem(
                                        <FaClock />,
                                        'Experience',
                                        profile.experience
                                            ? `${profile.experience} Years`
                                            : ''
                                    )}

                                    {informationItem(
                                        <FaIdBadge />,
                                        'License Number',
                                        profile.license
                                    )}

                                </div>


                                <hr
                                    className="my-4"
                                    style={{ borderColor: '#EDF1EA' }}
                                />


                                <div
                                    className="p-3"
                                    style={{
                                        background: '#F0F7EF',
                                        borderRadius: '14px',
                                        border: '1px solid #E2EDE0'
                                    }}
                                >

                                    <div className="d-flex align-items-center gap-3">

                                        <div
                                            className="d-flex align-items-center justify-content-center flex-shrink-0"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '12px',
                                                background: '#FFFFFF',
                                                color: '#4D8B59',
                                                fontSize: '17px'
                                            }}
                                        >
                                            <FaCheckCircle />
                                        </div>

                                        <div className="flex-grow-1">

                                            <div
                                                className="fw-bold mb-1"
                                                style={{
                                                    color: '#3E7049',
                                                    fontSize: '13px'
                                                }}
                                            >
                                                Appointment Availability
                                            </div>

                                            <div
                                                style={{
                                                    color: '#829382',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                {profile.availability === 'Available'
                                                    ? 'Currently accepting appointments.'
                                                    : 'Currently not accepting appointments.'}
                                            </div>

                                        </div>

                                        <span
                                            className="rounded-circle flex-shrink-0"
                                            style={{
                                                width: '9px',
                                                height: '9px',
                                                background: profile.availability === 'Available'
                                                    ? '#4BA564'
                                                    : '#D36A6A'
                                            }}
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                )}


                {/* BOTTOM INFORMATION BANNER */}

                <div
                    className="d-flex flex-wrap align-items-center justify-content-between gap-3 p-4"
                    style={{
                        background: '#FFFFFF',
                        border: '1px solid #E9EEE7',
                        borderRadius: '18px'
                    }}
                >

                    <div className="d-flex align-items-center gap-3">

                        <div
                            className="d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '14px',
                                background: '#EAF4E9',
                                color: '#4D8057',
                                fontSize: '19px'
                            }}
                        >
                            <FaPaw />
                        </div>

                        <div>

                            <h6
                                className="fw-bold mb-1"
                                style={{
                                    color: '#304B38',
                                    fontSize: '14px'
                                }}
                            >
                                Your profile builds trust.
                            </h6>

                            <p
                                className="mb-0"
                                style={{
                                    color: '#929D91',
                                    fontSize: '12px',
                                    lineHeight: '1.7'
                                }}
                            >
                                Keep your professional information accurate and up to date.
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={isEditing ? handleCancel : handleEdit}
                        disabled={saving}
                        className="btn d-flex align-items-center gap-2"
                        style={{
                            background: '#F0F6EF',
                            color: '#477B50',
                            border: '1px solid #E1EBDD',
                            borderRadius: '10px',
                            padding: '11px 16px',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}
                    >
                        {isEditing ? 'Cancel Editing' : 'Update Information'}
                        <FaArrowRight />
                    </button>

                </div>


                {/* FOOTER */}

                <div className="text-center mt-4 pb-2">

                    <p
                        className="mb-1"
                        style={{
                            color: '#8C9B8B',
                            fontSize: '12px'
                        }}
                    >
                        <FaPaw className="me-2" />
                        PETCARE. — Better Care. Happier Pets.
                    </p>

                    <small
                        style={{
                            color: '#B0B9AE',
                            fontSize: '10px'
                        }}
                    >
                        Veterinarian Portal · Professional Profile
                    </small>

                </div>

            </main>

        </div>

    )

}

export default VetProfile