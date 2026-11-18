import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'

import {
    addAdminVeterinarianAPI,
    deleteAdminVeterinarianAPI,
    getAllAdminVeterinariansAPI,
    updateAdminVeterinarianAPI,
    updateAdminVeterinarianStatusAPI
} from '../../../Services/AllApi'


function ManageVeterinarians() {

    // ========================================
    // STATES
    // ========================================

    const initialForm = {
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        profileImage: '',
        specialization: '',
        qualification: '',
        experience: '',
        license: '',
        about: '',
        availability: 'Available',
        status: 'Active'
    }

    const [veterinarians, setVeterinarians] = useState([])

    const [vetDetails, setVetDetails] = useState(initialForm)

    const [searchKey, setSearchKey] = useState('')

    const [showForm, setShowForm] = useState(false)
    const [showView, setShowView] = useState(false)

    const [selectedVet, setSelectedVet] = useState(null)

    const [editId, setEditId] = useState(null)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [error, setError] = useState('')

    const [availabilityFilter, setAvailabilityFilter] = useState('All')
    const [statusFilter, setStatusFilter] = useState('All')


    // ========================================
    // STYLES
    // ========================================

    const inputStyle = {
        borderRadius: '10px',
        padding: '11px 14px',
        border: '1px solid #DEE7DF',
        boxShadow: 'none'
    }

    const labelStyle = {
        fontSize: '13px',
        fontWeight: '600',
        color: '#344B3A',
        marginBottom: '7px'
    }

    const sectionStyle = {
        color: '#287443',
        fontWeight: '700',
        fontSize: '15px'
    }

    const actionButtonStyle = {
        width: '35px',
        height: '35px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px'
    }


    // ========================================
    // STATUS HANDLERS
    // ========================================

    const getVetStatus = (vet) => {

        return vet.status || 'Active'

    }


    const getAvailability = (vet) => {

        return vet.availability || 'Available'

    }


    // ========================================
    // FETCH VETERINARIANS
    // ========================================

    const fetchVeterinarians = async (search = '') => {

        try {

            setLoading(true)
            setError('')

            const response = await getAllAdminVeterinariansAPI(search)

            const data = response.data

            const vetList = Array.isArray(data)
                ? data
                : data.veterinarians ||
                data.users ||
                data.vets ||
                []

            setVeterinarians(vetList)

        }
        catch (err) {

            console.log('Fetch Veterinarians Error:', err)

            setError(
                err.response?.data?.message ||
                'Failed to load veterinarians.'
            )

        }
        finally {

            setLoading(false)

        }

    }


    // ========================================
    // SEARCH
    // ========================================

    useEffect(() => {

        const timer = setTimeout(() => {

            fetchVeterinarians(searchKey)

        }, 400)

        return () => clearTimeout(timer)

    }, [searchKey])


    // ========================================
    // HANDLE INPUT CHANGE
    // ========================================

    const handleChange = (e) => {

        const { name, value } = e.target

        setVetDetails(prev => ({

            ...prev,

            [name]: value

        }))

    }


    // ========================================
    // RESET FORM
    // ========================================

    const resetForm = () => {

        setVetDetails({ ...initialForm })

        setEditId(null)

        setShowForm(false)

        setError('')

    }


    // ========================================
    // OPEN ADD FORM
    // ========================================

    const handleAdd = () => {

        setVetDetails({ ...initialForm })

        setEditId(null)

        setShowView(false)

        setShowForm(true)

        setError('')

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }


    // ========================================
    // OPEN EDIT FORM
    // ========================================

    const handleEdit = (vet) => {

        setVetDetails({

            name: vet.name || '',

            username: vet.username || '',

            email: vet.email || '',

            password: '',

            phone: vet.phone || '',

            address: vet.address || '',

            profileImage: vet.profileImage || '',

            specialization: vet.specialization || '',

            qualification: vet.qualification || '',

            experience: vet.experience || '',

            license: vet.license || '',

            about: vet.about || '',

            availability: vet.availability || 'Available',

            status: vet.status || 'Active'

        })

        setEditId(vet._id)

        setSelectedVet(null)

        setShowView(false)

        setShowForm(true)

        setError('')

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }


    // ========================================
    // ADD / UPDATE VETERINARIAN
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            setSaving(true)

            setError('')

            // ADD VETERINARIAN

            if (!editId) {

                await addAdminVeterinarianAPI(vetDetails)

                alert('Veterinarian added successfully!')

            }

            // UPDATE VETERINARIAN

            else {

                const { password, ...updateData } = vetDetails

                await updateAdminVeterinarianAPI(
                    editId,
                    updateData
                )

                alert('Veterinarian updated successfully!')

            }

            resetForm()

            await fetchVeterinarians(searchKey)

        }

        catch (err) {

            console.log('Save Veterinarian Error:', err)

            setError(
                err.response?.data?.message ||
                'Unable to save veterinarian details.'
            )

        }

        finally {

            setSaving(false)

        }

    }


    // ========================================
    // VIEW VETERINARIAN
    // ========================================

    const handleView = (vet) => {

        setSelectedVet(vet)

        setShowView(true)

        setShowForm(false)

    }


    // ========================================
    // DELETE VETERINARIAN
    // ========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this veterinarian? This action cannot be undone.'
        )

        if (!confirmDelete) return

        try {

            await deleteAdminVeterinarianAPI(id)

            alert('Veterinarian deleted successfully!')

            setShowView(false)

            setSelectedVet(null)

            await fetchVeterinarians(searchKey)

        }

        catch (err) {

            console.log('Delete Veterinarian Error:', err)

            alert(
                err.response?.data?.message ||
                'Failed to delete veterinarian.'
            )

        }

    }


    // ========================================
    // ACTIVATE / DEACTIVATE
    // ========================================

    const handleStatus = async (vet) => {

        const currentStatus = getVetStatus(vet)

        const newStatus = currentStatus === 'Active'
            ? 'Inactive'
            : 'Active'

        const confirmStatus = window.confirm(

            `Are you sure you want to ${newStatus.toLowerCase()} ${vet.name}?`

        )

        if (!confirmStatus) return

        try {

            await updateAdminVeterinarianStatusAPI(
                vet._id,
                newStatus
            )

            await fetchVeterinarians(searchKey)

            if (selectedVet?._id === vet._id) {

                setSelectedVet(prev => ({

                    ...prev,

                    status: newStatus

                }))

            }

            alert(`Veterinarian ${newStatus.toLowerCase()} successfully!`)

        }

        catch (err) {

            console.log('Status Update Error:', err)

            alert(
                err.response?.data?.message ||
                'Unable to update veterinarian status.'
            )

        }

    }


    // ========================================
    // AVAILABILITY UPDATE
    // ========================================

    const handleAvailability = async (vet) => {

        const newAvailability = getAvailability(vet) === 'Available'
            ? 'Unavailable'
            : 'Available'

        try {

            await updateAdminVeterinarianAPI(

                vet._id,

                {
                    availability: newAvailability
                }

            )

            await fetchVeterinarians(searchKey)

            if (selectedVet?._id === vet._id) {

                setSelectedVet(prev => ({

                    ...prev,

                    availability: newAvailability

                }))

            }

            alert(
                `Availability changed to ${newAvailability}`
            )

        }

        catch (err) {

            console.log(err)

            alert(
                err.response?.data?.message ||
                'Unable to update availability.'
            )

        }

    }


    // ========================================
    // FILTER VETERINARIANS
    // ========================================

    const filteredVeterinarians = veterinarians.filter(vet => {

        const statusMatch =
            statusFilter === 'All' ||
            getVetStatus(vet) === statusFilter

        const availabilityMatch =
            availabilityFilter === 'All' ||
            getAvailability(vet) === availabilityFilter

        return statusMatch && availabilityMatch

    })


    // ========================================
    // STATISTICS
    // ========================================

    const totalVets = veterinarians.length

    const activeVets = veterinarians.filter(
        vet => getVetStatus(vet) === 'Active'
    ).length

    const inactiveVets = veterinarians.filter(
        vet => getVetStatus(vet) === 'Inactive'
    ).length

    const availableVets = veterinarians.filter(
        vet => getAvailability(vet) === 'Available'
    ).length


    // ========================================
    // IMAGE URL
    // ========================================

    const getImageUrl = (image) => {

        if (!image) return ''

        if (
            image.startsWith('http://') ||
            image.startsWith('https://')
        ) {

            return image

        }

        return `http://localhost:3000/${image.replace(/^\/+/, '')}`

    }


    // ========================================
    // REUSABLE PROFILE IMAGE
    // ========================================

    const VetAvatar = ({ vet, size = 45 }) => {

        return (

            <div
                className="rounded-circle d-flex justify-content-center align-items-center fw-bold overflow-hidden"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    minWidth: `${size}px`,
                    backgroundColor: '#E1F0E5',
                    color: '#287443',
                    fontSize: size > 55 ? '25px' : '17px'
                }}
            >

                {vet.profileImage ? (

                    <img
                        src={getImageUrl(vet.profileImage)}
                        alt={vet.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />

                ) : (

                    vet.name?.charAt(0)?.toUpperCase() || 'V'

                )}

            </div>

        )

    }


    // ========================================
    // REUSABLE FORM FIELD
    // ========================================

    const FormInput = ({
        label,
        name,
        type = 'text',
        placeholder,
        required = false,
        disabled = false
    }) => (

        <div>

            <label style={labelStyle}>
                {label} {required && <span className="text-danger">*</span>}
            </label>

            <input
                type={type}
                className="form-control"
                style={inputStyle}
                name={name}
                value={vetDetails[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
            />

        </div>

    )


    // ========================================
    // MAIN RETURN
    // ========================================

    return (

        <div
            className="d-flex"
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#F5F8F5',
                overflowX: 'hidden'
            }}
        >

            {/* SIDEBAR */}

            <AdminSidebar />


            {/* MAIN CONTENT */}

            <main
                style={{
                    marginLeft: '290px',
                    width: 'calc(100% - 290px)',
                    minWidth: 0,
                    minHeight: '100vh',
                    padding: '28px 30px',
                    boxSizing: 'border-box'
                }}
            >

                {/* ================================= */}
                {/* PAGE HEADER */}
                {/* ================================= */}

                <div className="mb-4">

                    <small className="text-secondary">
                        Dashboard / Management / Veterinarians
                    </small>

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3">

                        <div>

                            <h3
                                className="fw-bold mb-1"
                                style={{ color: '#234B32' }}
                            >
                                Manage Veterinarians
                            </h3>

                            <p className="text-secondary mb-0">
                                Manage veterinarian profiles, professional details and account settings.
                            </p>

                        </div>

                        <button
                            className="btn text-white px-4 py-2"
                            style={{
                                backgroundColor: '#287443',
                                borderRadius: '10px'
                            }}
                            onClick={handleAdd}
                        >

                            <i className="bi bi-plus-lg me-2"></i>

                            Add Veterinarian

                        </button>

                    </div>

                </div>


                {/* ================================= */}
                {/* ERROR MESSAGE */}
                {/* ================================= */}

                {error && (

                    <div className="alert alert-danger rounded-3">

                        <i className="bi bi-exclamation-circle me-2"></i>

                        {error}

                    </div>

                )}


                {/* ================================= */}
                {/* ADD / EDIT FORM */}
                {/* ================================= */}

                {showForm && (

                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        {/* FORM HEADER */}

                        <div className="card-header bg-white border-0 p-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h5
                                        className="fw-bold mb-1"
                                        style={{ color: '#234B32' }}
                                    >

                                        {editId
                                            ? 'Edit Veterinarian'
                                            : 'Add New Veterinarian'}

                                    </h5>

                                    <small className="text-secondary">

                                        {editId
                                            ? 'Update personal and professional information.'
                                            : 'Enter all the required information to register a veterinarian.'}

                                    </small>

                                </div>

                                <button
                                    type="button"
                                    className="btn btn-light rounded-circle"
                                    onClick={resetForm}
                                >

                                    <i className="bi bi-x-lg"></i>

                                </button>

                            </div>

                        </div>


                        {/* FORM BODY */}

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">


                                    {/* PERSONAL INFORMATION */}

                                    <div className="col-12">

                                        <h6 style={sectionStyle}>
                                            <i className="bi bi-person me-2"></i>
                                            Personal Information
                                        </h6>

                                        <hr />

                                    </div>


                                    <div className="col-md-6">

                                        <FormInput
                                            label="Full Name"
                                            name="name"
                                            placeholder="Dr. John Smith"
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <FormInput
                                            label="Username"
                                            name="username"
                                            placeholder="johnsmith"
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <FormInput
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            placeholder="doctor@example.com"
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <FormInput
                                            label="Phone Number"
                                            name="phone"
                                            type="tel"
                                            placeholder="9876543210"
                                        />

                                    </div>


                                    {!editId && (

                                        <div className="col-md-6">

                                            <FormInput
                                                label="Login Password"
                                                name="password"
                                                type="password"
                                                placeholder="Create login password"
                                                required
                                            />

                                            <small className="text-secondary">
                                                Minimum 8 characters.
                                            </small>

                                        </div>

                                    )}


                                    <div className="col-12">

                                        <label style={labelStyle}>
                                            Address
                                        </label>

                                        <textarea
                                            className="form-control"
                                            style={inputStyle}
                                            name="address"
                                            value={vetDetails.address}
                                            onChange={handleChange}
                                            rows="2"
                                            placeholder="Enter residential or clinic address"
                                        />

                                    </div>


                                    <div className="col-12">

                                        <label style={labelStyle}>
                                            Profile Image URL / Path
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            style={inputStyle}
                                            name="profileImage"
                                            value={vetDetails.profileImage}
                                            onChange={handleChange}
                                            placeholder="Enter image URL or uploads/image.jpg"
                                        />

                                        <small className="text-secondary">
                                            Enter an existing image URL or server image path.
                                        </small>

                                    </div>


                                    {/* PROFESSIONAL INFORMATION */}

                                    <div className="col-12 mt-4">

                                        <h6 style={sectionStyle}>
                                            <i className="bi bi-award me-2"></i>
                                            Professional Information
                                        </h6>

                                        <hr />

                                    </div>


                                    {/* SPECIALIZATION */}

                                    <div className="col-md-6">

                                        <label style={labelStyle}>
                                            Specialization
                                        </label>

                                        <select
                                            className="form-select"
                                            style={inputStyle}
                                            name="specialization"
                                            value={vetDetails.specialization}
                                            onChange={handleChange}
                                        >

                                            <option value="">
                                                Select Specialization
                                            </option>

                                            <option value="General Veterinary">
                                                General Veterinary
                                            </option>

                                            <option value="Pet Surgery">
                                                Pet Surgery
                                            </option>

                                            <option value="Dermatology">
                                                Dermatology
                                            </option>

                                            <option value="Pet Dentistry">
                                                Pet Dentistry
                                            </option>

                                            <option value="Animal Nutrition">
                                                Animal Nutrition
                                            </option>

                                            <option value="Orthopedics">
                                                Orthopedics
                                            </option>

                                            <option value="Cardiology">
                                                Cardiology
                                            </option>

                                            <option value="Ophthalmology">
                                                Ophthalmology
                                            </option>

                                            <option value="Internal Medicine">
                                                Internal Medicine
                                            </option>

                                            <option value="Emergency Care">
                                                Emergency Care
                                            </option>

                                        </select>

                                    </div>


                                    {/* QUALIFICATION */}

                                    <div className="col-md-6">

                                        <FormInput
                                            label="Qualification"
                                            name="qualification"
                                            placeholder="BVSc / MVSc / PhD"
                                        />

                                    </div>


                                    {/* EXPERIENCE */}

                                    <div className="col-md-6">

                                        <FormInput
                                            label="Experience"
                                            name="experience"
                                            placeholder="3 Years"
                                        />

                                    </div>


                                    {/* LICENSE */}

                                    <div className="col-md-6">

                                        <FormInput
                                            label="Veterinary License Number"
                                            name="license"
                                            placeholder="Enter license number"
                                        />

                                    </div>


                                    {/* ABOUT */}

                                    <div className="col-12">

                                        <label style={labelStyle}>
                                            About Veterinarian
                                        </label>

                                        <textarea
                                            className="form-control"
                                            style={inputStyle}
                                            name="about"
                                            value={vetDetails.about}
                                            onChange={handleChange}
                                            rows="4"
                                            placeholder="Write a professional description about the veterinarian..."
                                        />

                                    </div>


                                    {/* ACCOUNT SETTINGS */}

                                    <div className="col-12 mt-4">

                                        <h6 style={sectionStyle}>
                                            <i className="bi bi-gear me-2"></i>
                                            Account Settings
                                        </h6>

                                        <hr />

                                    </div>


                                    {/* AVAILABILITY */}

                                    <div className="col-md-6">

                                        <label style={labelStyle}>
                                            Availability
                                        </label>

                                        <select
                                            className="form-select"
                                            style={inputStyle}
                                            name="availability"
                                            value={vetDetails.availability}
                                            onChange={handleChange}
                                        >

                                            <option value="Available">
                                                Available
                                            </option>

                                            <option value="Unavailable">
                                                Unavailable
                                            </option>

                                        </select>

                                    </div>


                                    {/* STATUS */}

                                    <div className="col-md-6">

                                        <label style={labelStyle}>
                                            Account Status
                                        </label>

                                        <select
                                            className="form-select"
                                            style={inputStyle}
                                            name="status"
                                            value={vetDetails.status}
                                            onChange={handleChange}
                                        >

                                            <option value="Active">
                                                Active
                                            </option>

                                            <option value="Inactive">
                                                Inactive
                                            </option>

                                        </select>

                                    </div>


                                </div>


                                {/* FORM BUTTONS */}

                                <div className="d-flex justify-content-end gap-2 mt-4">

                                    <button
                                        type="button"
                                        className="btn btn-light border px-4"
                                        onClick={resetForm}
                                        disabled={saving}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn text-white px-4"
                                        style={{
                                            backgroundColor: '#287443',
                                            borderRadius: '9px'
                                        }}
                                        disabled={saving}
                                    >

                                        {saving ? (

                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Saving...
                                            </>

                                        ) : (

                                            <>
                                                <i className="bi bi-check-circle me-2"></i>

                                                {editId
                                                    ? 'Update Veterinarian'
                                                    : 'Add Veterinarian'}
                                            </>

                                        )}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}


                {/* ================================= */}
                {/* STATISTICS */}
                {/* ================================= */}

                <div className="row g-3 mb-4">


                    {/* TOTAL */}

                    <div className="col-12 col-sm-6 col-xl-3">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary small mb-2">
                                            Total Veterinarians
                                        </p>

                                        <h3
                                            className="fw-bold mb-0"
                                            style={{ color: '#234B32' }}
                                        >
                                            {loading ? '...' : totalVets}
                                        </h3>

                                    </div>

                                    <div
                                        className="rounded-3 p-3"
                                        style={{
                                            backgroundColor: '#E4F0E6',
                                            color: '#287443'
                                        }}
                                    >
                                        <i className="bi bi-people-fill fs-4"></i>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ACTIVE */}

                    <div className="col-12 col-sm-6 col-xl-3">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary small mb-2">
                                            Active Veterinarians
                                        </p>

                                        <h3 className="fw-bold text-success mb-0">
                                            {loading ? '...' : activeVets}
                                        </h3>

                                    </div>

                                    <div className="rounded-3 p-3 bg-success-subtle text-success">
                                        <i className="bi bi-person-check-fill fs-4"></i>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* INACTIVE */}

                    <div className="col-12 col-sm-6 col-xl-3">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary small mb-2">
                                            Inactive Veterinarians
                                        </p>

                                        <h3 className="fw-bold text-danger mb-0">
                                            {loading ? '...' : inactiveVets}
                                        </h3>

                                    </div>

                                    <div className="rounded-3 p-3 bg-danger-subtle text-danger">
                                        <i className="bi bi-person-x-fill fs-4"></i>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* AVAILABLE */}

                    <div className="col-12 col-sm-6 col-xl-3">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary small mb-2">
                                            Available Veterinarians
                                        </p>

                                        <h3 className="fw-bold mb-0" style={{ color: '#287443' }}>
                                            {loading ? '...' : availableVets}
                                        </h3>

                                    </div>

                                    <div
                                        className="rounded-3 p-3"
                                        style={{
                                            backgroundColor: '#E4F0E6',
                                            color: '#287443'
                                        }}
                                    >
                                        <i className="bi bi-calendar-check fs-4"></i>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* VETERINARIAN TABLE */}
                {/* ================================= */}

                <div className="card border-0 shadow-sm rounded-4">

                    {/* TABLE HEADER */}

                    <div className="card-header bg-white border-0 p-4">

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                            <div>

                                <h5
                                    className="fw-bold mb-1"
                                    style={{ color: '#234B32' }}
                                >
                                    Registered Veterinarians
                                </h5>

                                <small className="text-secondary">
                                    View and manage all veterinarian accounts.
                                </small>

                            </div>


                            {/* SEARCH */}

                            <div style={{ width: '270px', maxWidth: '100%' }}>

                                <div className="input-group">

                                    <span className="input-group-text bg-white border-end-0">

                                        <i className="bi bi-search text-secondary"></i>

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control border-start-0"
                                        style={{
                                            boxShadow: 'none',
                                            padding: '10px'
                                        }}
                                        placeholder="Search veterinarians..."
                                        value={searchKey}
                                        onChange={(e) => setSearchKey(e.target.value)}
                                    />

                                </div>

                            </div>

                        </div>


                        {/* FILTERS */}

                        <div className="d-flex flex-wrap gap-2 mt-3">

                            <select
                                className="form-select"
                                style={{
                                    width: '170px',
                                    ...inputStyle
                                }}
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >

                                <option value="All">All Accounts</option>

                                <option value="Active">Active</option>

                                <option value="Inactive">Inactive</option>

                            </select>


                            <select
                                className="form-select"
                                style={{
                                    width: '190px',
                                    ...inputStyle
                                }}
                                value={availabilityFilter}
                                onChange={(e) => setAvailabilityFilter(e.target.value)}
                            >

                                <option value="All">All Availability</option>

                                <option value="Available">Available</option>

                                <option value="Unavailable">Unavailable</option>

                            </select>

                        </div>

                    </div>


                    {/* TABLE BODY */}

                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table className="table align-middle mb-0">

                                <thead style={{ backgroundColor: '#F0F5F1' }}>

                                    <tr>

                                        <th className="px-4 py-3 small text-secondary">
                                            VETERINARIAN
                                        </th>

                                        <th className="py-3 small text-secondary">
                                            PHONE
                                        </th>

                                        <th className="py-3 small text-secondary">
                                            SPECIALIZATION
                                        </th>

                                        <th className="py-3 small text-secondary">
                                            AVAILABILITY
                                        </th>

                                        <th className="py-3 small text-secondary">
                                            STATUS
                                        </th>

                                        <th className="py-3 small text-secondary text-center">
                                            ACTIONS
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {loading ? (

                                        <tr>

                                            <td colSpan="6" className="text-center py-5">

                                                <div className="spinner-border text-success"></div>

                                                <p className="text-secondary mt-2 mb-0">
                                                    Loading veterinarians...
                                                </p>

                                            </td>

                                        </tr>

                                    ) : filteredVeterinarians.length > 0 ? (

                                        filteredVeterinarians.map(vet => (

                                            <tr key={vet._id}>


                                                {/* VETERINARIAN */}

                                                <td className="px-4 py-3">

                                                    <div className="d-flex align-items-center gap-3">

                                                        <VetAvatar vet={vet} />

                                                        <div style={{ minWidth: 0 }}>

                                                            <div className="fw-semibold">
                                                                {vet.name}
                                                            </div>

                                                            <small className="text-secondary">
                                                                {vet.email}
                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* PHONE */}

                                                <td className="py-3">

                                                    <span className="text-secondary">
                                                        {vet.phone || 'Not provided'}
                                                    </span>

                                                </td>


                                                {/* SPECIALIZATION */}

                                                <td className="py-3">

                                                    <span
                                                        className="badge rounded-pill px-3 py-2"
                                                        style={{
                                                            backgroundColor: '#E8F1E9',
                                                            color: '#287443'
                                                        }}
                                                    >
                                                        {vet.specialization || 'Not specified'}
                                                    </span>

                                                </td>


                                                {/* AVAILABILITY */}

                                                <td className="py-3">

                                                    <span
                                                        className={`badge rounded-pill px-3 py-2 ${
                                                            getAvailability(vet) === 'Available'
                                                                ? 'bg-success-subtle text-success'
                                                                : 'bg-warning-subtle text-dark'
                                                        }`}
                                                    >
                                                        {getAvailability(vet)}
                                                    </span>

                                                </td>


                                                {/* STATUS */}

                                                <td className="py-3">

                                                    <span
                                                        className={`badge rounded-pill px-3 py-2 ${
                                                            getVetStatus(vet) === 'Active'
                                                                ? 'bg-success-subtle text-success'
                                                                : 'bg-danger-subtle text-danger'
                                                        }`}
                                                    >
                                                        {getVetStatus(vet)}
                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td className="py-3">

                                                    <div className="d-flex justify-content-center gap-2">


                                                        {/* VIEW */}

                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            style={actionButtonStyle}
                                                            title="View"
                                                            onClick={() => handleView(vet)}
                                                        >

                                                            <i className="bi bi-eye"></i>

                                                        </button>


                                                        {/* EDIT */}

                                                        <button
                                                            className="btn btn-sm btn-outline-success"
                                                            style={actionButtonStyle}
                                                            title="Edit"
                                                            onClick={() => handleEdit(vet)}
                                                        >

                                                            <i className="bi bi-pencil"></i>

                                                        </button>


                                                        {/* AVAILABILITY */}

                                                        <button
                                                            className="btn btn-sm btn-outline-info"
                                                            style={actionButtonStyle}
                                                            title="Change Availability"
                                                            onClick={() => handleAvailability(vet)}
                                                        >

                                                            <i className="bi bi-calendar-check"></i>

                                                        </button>


                                                        {/* STATUS */}

                                                        <button
                                                            className={`btn btn-sm ${
                                                                getVetStatus(vet) === 'Active'
                                                                    ? 'btn-outline-warning'
                                                                    : 'btn-outline-success'
                                                            }`}
                                                            style={actionButtonStyle}
                                                            title="Change Status"
                                                            onClick={() => handleStatus(vet)}
                                                        >

                                                            <i className="bi bi-power"></i>

                                                        </button>


                                                        {/* DELETE */}

                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            style={actionButtonStyle}
                                                            title="Delete"
                                                            onClick={() => handleDelete(vet._id)}
                                                        >

                                                            <i className="bi bi-trash"></i>

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td colSpan="6" className="text-center py-5">

                                                <i className="bi bi-person-x fs-1 text-secondary"></i>

                                                <h6 className="fw-semibold text-secondary mt-3">
                                                    No Veterinarians Found
                                                </h6>

                                                <small className="text-secondary">
                                                    Try another search or add a new veterinarian.
                                                </small>

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>


                    {/* TABLE FOOTER */}

                    <div className="card-footer bg-white border-0 p-3">

                        <small className="text-secondary">

                            Showing {filteredVeterinarians.length} of {veterinarians.length} veterinarians

                        </small>

                    </div>

                </div>


                {/* ================================= */}
                {/* VIEW DETAILS MODAL */}
                {/* ================================= */}

                {showView && selectedVet && (

                    <div
                        className="modal d-block"
                        tabIndex="-1"
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.45)',
                            zIndex: 1055
                        }}
                        onClick={() => setShowView(false)}
                    >

                        <div
                            className="modal-dialog modal-dialog-centered modal-lg"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="modal-content border-0 rounded-4 shadow">


                                {/* MODAL HEADER */}

                                <div className="modal-header border-0 p-4">

                                    <div>

                                        <h5
                                            className="fw-bold mb-1"
                                            style={{ color: '#234B32' }}
                                        >
                                            Veterinarian Profile
                                        </h5>

                                        <small className="text-secondary">
                                            Complete professional and account information.
                                        </small>

                                    </div>

                                    <button
                                        className="btn-close"
                                        onClick={() => setShowView(false)}
                                    ></button>

                                </div>


                                {/* MODAL BODY */}

                                <div className="modal-body px-4 pb-4">


                                    {/* PROFILE HEADER */}

                                    <div
                                        className="rounded-4 p-4 mb-4"
                                        style={{
                                            backgroundColor: '#EFF6EF'
                                        }}
                                    >

                                        <div className="d-flex align-items-center gap-3 flex-wrap">

                                            <VetAvatar
                                                vet={selectedVet}
                                                size={85}
                                            />

                                            <div>

                                                <h5
                                                    className="fw-bold mb-1"
                                                    style={{ color: '#234B32' }}
                                                >
                                                    {selectedVet.name}
                                                </h5>

                                                <p className="text-secondary mb-2">
                                                    {selectedVet.specialization || 'Veterinarian'}
                                                </p>

                                                <span
                                                    className={`badge rounded-pill me-2 ${
                                                        getVetStatus(selectedVet) === 'Active'
                                                            ? 'bg-success'
                                                            : 'bg-danger'
                                                    }`}
                                                >
                                                    {getVetStatus(selectedVet)}
                                                </span>

                                                <span
                                                    className={`badge rounded-pill ${
                                                        getAvailability(selectedVet) === 'Available'
                                                            ? 'bg-success-subtle text-success'
                                                            : 'bg-warning-subtle text-dark'
                                                    }`}
                                                >
                                                    {getAvailability(selectedVet)}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* PERSONAL DETAILS */}

                                    <h6 style={sectionStyle}>
                                        <i className="bi bi-person me-2"></i>
                                        Personal Information
                                    </h6>

                                    <div className="row g-3 mb-4">

                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Username
                                            </small>

                                            <div className="fw-semibold">
                                                {selectedVet.username || 'Not provided'}
                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Email Address
                                            </small>

                                            <div className="fw-semibold">
                                                {selectedVet.email || 'Not provided'}
                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Phone Number
                                            </small>

                                            <div className="fw-semibold">
                                                {selectedVet.phone || 'Not provided'}
                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Address
                                            </small>

                                            <div className="fw-semibold">
                                                {selectedVet.address || 'Not provided'}
                                            </div>

                                        </div>

                                    </div>


                                    <hr />


                                    {/* PROFESSIONAL DETAILS */}

                                    <h6 style={sectionStyle}>
                                        <i className="bi bi-award me-2"></i>
                                        Professional Information
                                    </h6>

                                    <div className="row g-3 mb-4">

                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Specialization
                                            </small>

                                            <div className="fw-semibold">
                                                {selectedVet.specialization || 'Not provided'}
                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Qualification
                                            </small>

                                            <div className="fw-semibold">
                                                {selectedVet.qualification || 'Not provided'}
                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Experience
                                            </small>

                                            <div className="fw-semibold">
                                                {selectedVet.experience || 'Not provided'}
                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                License Number
                                            </small>

                                            <div className="fw-semibold">
                                                {selectedVet.license || 'Not provided'}
                                            </div>

                                        </div>


                                        <div className="col-12">

                                            <small className="text-secondary">
                                                About Veterinarian
                                            </small>

                                            <p className="fw-medium mb-0 mt-1">
                                                {selectedVet.about || 'No description available.'}
                                            </p>

                                        </div>

                                    </div>


                                    <hr />


                                    {/* ACCOUNT DETAILS */}

                                    <h6 style={sectionStyle}>
                                        <i className="bi bi-gear me-2"></i>
                                        Account Information
                                    </h6>

                                    <div className="row g-3">

                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Role
                                            </small>

                                            <div className="fw-semibold">
                                                {selectedVet.role || 'veterinarian'}
                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Account Status
                                            </small>

                                            <div className="fw-semibold">
                                                {getVetStatus(selectedVet)}
                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Availability
                                            </small>

                                            <div className="fw-semibold">
                                                {getAvailability(selectedVet)}
                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <small className="text-secondary">
                                                Registered Date
                                            </small>

                                            <div className="fw-semibold">

                                                {selectedVet.createdAt
                                                    ? new Date(selectedVet.createdAt).toLocaleDateString()
                                                    : 'Not available'}

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* MODAL FOOTER */}

                                <div className="modal-footer border-0 px-4 pb-4">

                                    <button
                                        className="btn btn-light border px-4"
                                        onClick={() => setShowView(false)}
                                    >
                                        Close
                                    </button>

                                    <button
                                        className="btn text-white px-4"
                                        style={{
                                            backgroundColor: '#287443'
                                        }}
                                        onClick={() => handleEdit(selectedVet)}
                                    >

                                        <i className="bi bi-pencil me-2"></i>

                                        Edit Details

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}


                {/* ================================= */}
                {/* FOOTER */}
                {/* ================================= */}

                <div className="text-center mt-4 mb-2">

                    <small className="text-secondary">
                        PetCare Admin Panel © 2026
                    </small>

                </div>

            </main>

        </div>

    )

}

export default ManageVeterinarians