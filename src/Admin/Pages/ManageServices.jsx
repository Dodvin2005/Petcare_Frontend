import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'

import { toast, ToastContainer } from 'react-toastify'

import {
    addAdminServiceAPI,
    deleteAdminServiceAPI,
    getAllAdminServicesAPI,
    updateAdminServiceAPI,
    updateAdminServiceStatusAPI
} from '../../../Services/AllApi'


function ManageServices() {

    // ========================================
    // STATES
    // ========================================

    const [services, setServices] = useState([])

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All')

    const [showForm, setShowForm] = useState(false)
    const [showView, setShowView] = useState(false)

    const [editingId, setEditingId] = useState(null)

    const [selectedService, setSelectedService] = useState(null)

    const [newService, setNewService] = useState({
        name: '',
        category: '',
        icon: '🩺',
        price: '',
        duration: '',
        description: ''
    })


    // ========================================
    // STYLES
    // ========================================

    const inputStyle = {
        borderRadius: '10px',
        padding: '11px 14px',
        border: '1px solid #DEE7DF',
        boxShadow: 'none',
        fontSize: '14px'
    }

    const cardStyle = {
        backgroundColor: '#FFFFFF',
        border: '1px solid #E7EDE7',
        borderRadius: '16px',
        boxShadow: '0 3px 12px rgba(30,60,35,0.035)'
    }

    const greenColor = '#315A3D'


    // ========================================
    // FETCH SERVICES
    // ========================================

    const fetchServices = async () => {

        try {

            setLoading(true)

            const response = await getAllAdminServicesAPI()

            const data = response.data

            const serviceList = Array.isArray(data)
                ? data
                : data.services || []

            setServices(serviceList)

        }
        catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                'Failed to fetch services'
            )

        }
        finally {

            setLoading(false)

        }

    }


    useEffect(() => {

        fetchServices()

    }, [])


    // ========================================
    // STATISTICS
    // ========================================

    const totalServices = services.length

    const activeServices = services.filter(
        service => service.status === 'Active'
    ).length

    const inactiveServices = services.filter(
        service => service.status === 'Inactive'
    ).length


    // ========================================
    // FILTER SERVICES
    // ========================================

    const filteredServices = services.filter(service => {

        const searchMatch =
            (service.name || '').toLowerCase().includes(search.toLowerCase()) ||
            (service.category || '').toLowerCase().includes(search.toLowerCase()) ||
            (service.description || '').toLowerCase().includes(search.toLowerCase())

        const categoryMatch =
            categoryFilter === 'All' ||
            service.category === categoryFilter

        return searchMatch && categoryMatch

    })


    // ========================================
    // RESET FORM
    // ========================================

    const resetForm = () => {

        setNewService({
            name: '',
            category: '',
            icon: '🩺',
            price: '',
            duration: '',
            description: ''
        })

        setEditingId(null)

        setShowForm(false)

    }


    // ========================================
    // HANDLE INPUT
    // ========================================

    const handleChange = (e) => {

        const { name, value } = e.target

        setNewService(prev => ({
            ...prev,
            [name]: value
        }))

    }


    // ========================================
    // OPEN ADD FORM
    // ========================================

    const handleAdd = () => {

        resetForm()

        setShowForm(true)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }


    // ========================================
    // ADD / UPDATE SERVICE
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            setSaving(true)

            const serviceData = {

                name: newService.name.trim(),

                category: newService.category,

                icon: newService.icon,

                price: Number(newService.price),

                duration: newService.duration,

                description: newService.description.trim()

            }


            if (!serviceData.name || !serviceData.category ||
                !serviceData.duration || !serviceData.description) {

                toast.error('Please fill all service details')

                return

            }

            if (!Number.isFinite(serviceData.price) || serviceData.price < 0) {

                toast.error('Please enter a valid service price')

                return

            }


            // UPDATE

            if (editingId) {

                await updateAdminServiceAPI(
                    editingId,
                    serviceData
                )

                toast.success('Service updated successfully')

            }

            // ADD

            else {

                await addAdminServiceAPI(serviceData)

                toast.success('New service added successfully')

            }

            resetForm()

            await fetchServices()

        }
        catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                'Unable to save service'
            )

        }
        finally {

            setSaving(false)

        }

    }


    // ========================================
    // EDIT SERVICE
    // ========================================

    const handleEdit = (service) => {

        setNewService({

            name: service.name || '',

            category: service.category || '',

            icon: service.icon || '🐾',

            price: service.price ?? '',

            duration: service.duration || '',

            description: service.description || ''

        })

        setEditingId(service._id)

        setSelectedService(null)

        setShowView(false)

        setShowForm(true)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }


    // ========================================
    // VIEW SERVICE
    // ========================================

    const handleView = (service) => {

        setSelectedService(service)

        setShowView(true)

    }


    // ========================================
    // CHANGE SERVICE STATUS
    // ========================================

    const toggleStatus = async (service) => {

        try {

            const newStatus =
                service.status === 'Active'
                    ? 'Inactive'
                    : 'Active'

            await updateAdminServiceStatusAPI(
                service._id,
                newStatus
            )

            toast.success(
                `Service ${newStatus.toLowerCase()} successfully`
            )

            setSelectedService(prev =>
                prev?._id === service._id
                    ? { ...prev, status: newStatus }
                    : prev
            )

            await fetchServices()

        }
        catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                'Failed to update service status'
            )

        }

    }


    // ========================================
    // DELETE SERVICE
    // ========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this service?'
        )

        if (!confirmDelete) return

        try {

            await deleteAdminServiceAPI(id)

            toast.success('Service deleted successfully')

            setServices(prev =>
                prev.filter(service => service._id !== id)
            )

            if (selectedService?._id === id) {

                setSelectedService(null)

                setShowView(false)

            }

        }
        catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                'Failed to delete service'
            )

        }

    }


    // ========================================
    // CATEGORY LIST
    // ========================================

    const categories = [
        'Healthcare',
        'Vaccination',
        'Dental Care',
        'Grooming',
        'Surgery',
        'Emergency',
        'Consultation',
        'Nutrition'
    ]


    // ========================================
    // SERVICE ICONS
    // ========================================

    const serviceIcons = [
        { icon: '🩺', name: 'Medical Checkup' },
        { icon: '💉', name: 'Vaccination' },
        { icon: '🦷', name: 'Dental Care' },
        { icon: '✂️', name: 'Grooming' },
        { icon: '🏥', name: 'Surgery' },
        { icon: '🚑', name: 'Emergency' },
        { icon: '🐾', name: 'Pet Care' },
        { icon: '🥗', name: 'Nutrition' }
    ]


    // ========================================
    // JSX
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

            <ToastContainer
                position="top-right"
                autoClose={2500}
            />


            {/* ========================================
                SIDEBAR
            ======================================== */}

            <AdminSidebar />


            {/* ========================================
                MAIN CONTENT
            ======================================== */}

            <main
                style={{
                    marginLeft: '290px',
                    width: 'calc(100% - 290px)',
                    minWidth: 0,
                    padding: '28px 30px',
                    boxSizing: 'border-box'
                }}
            >


                {/* ========================================
                    PAGE HEADER
                ======================================== */}

                <div className="mb-4">

                    <small className="text-secondary">
                        Dashboard / Management / Services
                    </small>

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3">

                        <div>

                            <h3
                                className="fw-bold mb-1"
                                style={{ color: '#294B35' }}
                            >
                                Manage Services
                            </h3>

                            <p className="text-secondary mb-0 small">
                                Manage veterinary services, pricing and availability.
                            </p>

                        </div>


                        <button
                            className="btn text-white px-4 py-2"
                            style={{
                                backgroundColor: greenColor,
                                borderRadius: '10px'
                            }}
                            onClick={showForm ? resetForm : handleAdd}
                        >

                            <i className="bi bi-plus-lg me-2"></i>

                            {showForm ? 'Close Form' : 'Add New Service'}

                        </button>

                    </div>

                </div>



                {/* ========================================
                    STATISTICS
                ======================================== */}

                <div className="row g-3 mb-4">


                    {/* TOTAL */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 rounded-4 h-100 shadow-sm">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary small mb-2">
                                            Total Services
                                        </p>

                                        <h3 className="fw-bold mb-0" style={{ color: greenColor }}>
                                            {loading ? '...' : totalServices}
                                        </h3>

                                    </div>

                                    <div
                                        className="rounded-3 p-3"
                                        style={{
                                            backgroundColor: '#E8F1E9',
                                            color: greenColor
                                        }}
                                    >

                                        <i className="bi bi-grid-fill fs-4"></i>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ACTIVE */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 rounded-4 h-100 shadow-sm">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary small mb-2">
                                            Active Services
                                        </p>

                                        <h3 className="fw-bold text-success mb-0">
                                            {loading ? '...' : activeServices}
                                        </h3>

                                    </div>

                                    <div className="rounded-3 p-3 bg-success-subtle text-success">

                                        <i className="bi bi-check-circle-fill fs-4"></i>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* INACTIVE */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 rounded-4 h-100 shadow-sm">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary small mb-2">
                                            Inactive Services
                                        </p>

                                        <h3 className="fw-bold text-danger mb-0">
                                            {loading ? '...' : inactiveServices}
                                        </h3>

                                    </div>

                                    <div className="rounded-3 p-3 bg-danger-subtle text-danger">

                                        <i className="bi bi-pause-circle-fill fs-4"></i>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>



                {/* ========================================
                    ADD / EDIT FORM
                ======================================== */}

                {showForm && (

                    <div className="card border-0 shadow-sm rounded-4 mb-4">


                        {/* FORM HEADER */}

                        <div className="card-header bg-white border-0 p-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div className="d-flex align-items-center gap-3">

                                    <div
                                        className="rounded-3 d-flex justify-content-center align-items-center"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            backgroundColor: '#E8F1E9',
                                            color: greenColor
                                        }}
                                    >

                                        <i className="bi bi-clipboard2-plus fs-4"></i>

                                    </div>

                                    <div>

                                        <h5 className="fw-bold mb-1" style={{ color: '#294B35' }}>

                                            {editingId
                                                ? 'Edit Veterinary Service'
                                                : 'Add New Veterinary Service'
                                            }

                                        </h5>

                                        <small className="text-secondary">

                                            Enter the service details below.

                                        </small>

                                    </div>

                                </div>

                                <button
                                    className="btn btn-light rounded-circle"
                                    onClick={resetForm}
                                    disabled={saving}
                                >

                                    <i className="bi bi-x-lg"></i>

                                </button>

                            </div>

                        </div>


                        {/* FORM BODY */}

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>


                                {/* BASIC INFORMATION */}

                                <h6 className="fw-bold mb-3" style={{ color: greenColor }}>

                                    <i className="bi bi-info-circle me-2"></i>
                                    Basic Information

                                </h6>


                                <div className="row g-3">


                                    {/* NAME */}

                                    <div className="col-md-6">

                                        <label className="form-label small fw-semibold">
                                            Service Name *
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            style={inputStyle}
                                            name="name"
                                            value={newService.name}
                                            onChange={handleChange}
                                            placeholder="Eg: General Checkup"
                                            maxLength={100}
                                            required
                                        />

                                    </div>


                                    {/* CATEGORY */}

                                    <div className="col-md-6">

                                        <label className="form-label small fw-semibold">
                                            Service Category *
                                        </label>

                                        <select
                                            className="form-select"
                                            style={inputStyle}
                                            name="category"
                                            value={newService.category}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Category
                                            </option>

                                            {categories.map(category => (

                                                <option key={category} value={category}>
                                                    {category}
                                                </option>

                                            ))}

                                        </select>

                                    </div>


                                    {/* ICON */}

                                    <div className="col-md-6">

                                        <label className="form-label small fw-semibold">
                                            Service Icon
                                        </label>

                                        <select
                                            className="form-select"
                                            style={inputStyle}
                                            name="icon"
                                            value={newService.icon}
                                            onChange={handleChange}
                                        >

                                            {serviceIcons.map(item => (

                                                <option key={item.icon} value={item.icon}>
                                                    {item.icon} {item.name}
                                                </option>

                                            ))}

                                        </select>

                                    </div>


                                    {/* DESCRIPTION */}

                                    <div className="col-md-6">

                                        <label className="form-label small fw-semibold">
                                            Service Description *
                                        </label>

                                        <textarea
                                            className="form-control"
                                            style={{
                                                ...inputStyle,
                                                minHeight: '85px',
                                                resize: 'vertical'
                                            }}
                                            name="description"
                                            value={newService.description}
                                            onChange={handleChange}
                                            placeholder="Describe this veterinary service..."
                                            maxLength={500}
                                            required
                                        />

                                    </div>

                                </div>


                                <hr className="my-4" />


                                {/* PRICING */}

                                <h6 className="fw-bold mb-3" style={{ color: greenColor }}>

                                    <i className="bi bi-currency-rupee me-2"></i>
                                    Pricing & Duration

                                </h6>


                                <div className="row g-3">


                                    {/* PRICE */}

                                    <div className="col-md-6">

                                        <label className="form-label small fw-semibold">
                                            Service Price (₹) *
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-light">
                                                ₹
                                            </span>

                                            <input
                                                type="number"
                                                className="form-control"
                                                style={{
                                                    ...inputStyle,
                                                    borderRadius: '0 10px 10px 0'
                                                }}
                                                name="price"
                                                value={newService.price}
                                                onChange={handleChange}
                                                placeholder="Enter price"
                                                min="0"
                                                step="1"
                                                required
                                            />

                                        </div>

                                        <small className="text-secondary">
                                            Price in Indian Rupees.
                                        </small>

                                    </div>


                                    {/* DURATION */}

                                    <div className="col-md-6">

                                        <label className="form-label small fw-semibold">
                                            Estimated Duration *
                                        </label>

                                        <select
                                            className="form-select"
                                            style={inputStyle}
                                            name="duration"
                                            value={newService.duration}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Duration
                                            </option>

                                            <option value="15 Minutes">15 Minutes</option>

                                            <option value="30 Minutes">30 Minutes</option>

                                            <option value="45 Minutes">45 Minutes</option>

                                            <option value="1 Hour">1 Hour</option>

                                            <option value="1.5 Hours">1.5 Hours</option>

                                            <option value="2 Hours">2 Hours</option>

                                            <option value="3 Hours">3 Hours</option>

                                        </select>

                                    </div>

                                </div>



                                {/* LIVE PREVIEW */}

                                <div
                                    className="rounded-3 p-3 mt-4"
                                    style={{
                                        backgroundColor: '#F2F7F0',
                                        border: '1px solid #E2ECE2'
                                    }}
                                >

                                    <small className="fw-bold d-block mb-3" style={{ color: greenColor }}>
                                        SERVICE PREVIEW
                                    </small>

                                    <div className="d-flex align-items-center gap-3">

                                        <div
                                            className="rounded-3 d-flex justify-content-center align-items-center"
                                            style={{
                                                width: '55px',
                                                height: '55px',
                                                backgroundColor: '#FFFFFF',
                                                fontSize: '27px',
                                                flexShrink: 0
                                            }}
                                        >

                                            {newService.icon}

                                        </div>

                                        <div className="flex-grow-1">

                                            <h6 className="fw-bold mb-1">
                                                {newService.name || 'Service Name'}
                                            </h6>

                                            <small className="text-secondary">
                                                {newService.category || 'Category'}
                                                {' · '}
                                                {newService.duration || 'Duration'}
                                            </small>

                                        </div>

                                        <h5 className="fw-bold mb-0" style={{ color: greenColor }}>
                                            ₹{newService.price || '0'}
                                        </h5>

                                    </div>

                                </div>



                                {/* BUTTONS */}

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
                                            backgroundColor: greenColor,
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
                                                <i className={`bi ${editingId ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>

                                                {editingId ? 'Update Service' : 'Create Service'}

                                            </>

                                        )}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}



                {/* ========================================
                    SEARCH AND FILTER
                ======================================== */}

                <div className="card border-0 shadow-sm rounded-4 mb-4">

                    <div className="card-body p-3">

                        <div className="row g-3 align-items-center">

                            {/* SEARCH */}

                            <div className="col-lg-6">

                                <div className="input-group">

                                    <span className="input-group-text bg-white border-end-0">

                                        <i className="bi bi-search text-secondary"></i>

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control border-start-0"
                                        style={{ boxShadow: 'none' }}
                                        placeholder="Search service name, category..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />

                                </div>

                            </div>


                            {/* CATEGORY FILTER */}

                            <div className="col-lg-3">

                                <select
                                    className="form-select"
                                    value={categoryFilter}
                                    onChange={e => setCategoryFilter(e.target.value)}
                                >

                                    <option value="All">All Categories</option>

                                    {categories.map(category => (

                                        <option key={category} value={category}>
                                            {category}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* COUNT */}

                            <div className="col-lg-3 text-lg-end">

                                <small className="text-secondary">
                                    Showing <strong>{filteredServices.length}</strong> of {services.length} services
                                </small>

                            </div>

                        </div>

                    </div>

                </div>



                {/* ========================================
                    SERVICES TABLE
                ======================================== */}

                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">


                    {/* TABLE HEADER */}

                    <div className="card-header bg-white border-0 p-4">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h5 className="fw-bold mb-1" style={{ color: '#294B35' }}>
                                    Veterinary Services
                                </h5>

                                <small className="text-secondary">
                                    View and manage all available veterinary services.
                                </small>

                            </div>

                            <span className="badge rounded-pill px-3 py-2 bg-success-subtle text-success">
                                {filteredServices.length} Services
                            </span>

                        </div>

                    </div>



                    {/* TABLE */}

                    <div className="table-responsive">

                        <table className="table align-middle mb-0">


                            <thead style={{ backgroundColor: '#F0F5F1' }}>

                                <tr>

                                    <th className="px-4 py-3 small text-secondary">
                                        SERVICE
                                    </th>

                                    <th className="py-3 small text-secondary">
                                        CATEGORY
                                    </th>

                                    <th className="py-3 small text-secondary">
                                        PRICE
                                    </th>

                                    <th className="py-3 small text-secondary">
                                        DURATION
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


                                {/* LOADING */}

                                {loading && (

                                    <tr>

                                        <td colSpan="6" className="text-center py-5">

                                            <div className="spinner-border text-success"></div>

                                            <p className="text-secondary small mt-2">
                                                Loading services...
                                            </p>

                                        </td>

                                    </tr>

                                )}



                                {/* SERVICE LIST */}

                                {!loading && filteredServices.map(service => (

                                    <tr key={service._id}>


                                        {/* SERVICE */}

                                        <td className="px-4 py-3">

                                            <div className="d-flex align-items-center gap-3">

                                                <div
                                                    className="rounded-3 d-flex justify-content-center align-items-center"
                                                    style={{
                                                        width: '45px',
                                                        height: '45px',
                                                        backgroundColor: '#E8F1E9',
                                                        fontSize: '22px',
                                                        flexShrink: 0
                                                    }}
                                                >

                                                    {service.icon || '🐾'}

                                                </div>

                                                <div style={{ minWidth: 0 }}>

                                                    <div className="fw-semibold">
                                                        {service.name}
                                                    </div>

                                                    <small className="text-secondary">
                                                        {service.description?.length > 40
                                                            ? service.description.substring(0, 40) + '...'
                                                            : service.description
                                                        }
                                                    </small>

                                                </div>

                                            </div>

                                        </td>



                                        {/* CATEGORY */}

                                        <td>

                                            <span
                                                className="badge rounded-pill px-3 py-2"
                                                style={{
                                                    backgroundColor: '#EDF3ED',
                                                    color: '#526553'
                                                }}
                                            >
                                                {service.category}
                                            </span>

                                        </td>



                                        {/* PRICE */}

                                        <td className="fw-bold" style={{ color: greenColor }}>

                                            ₹{Number(service.price || 0).toLocaleString('en-IN')}

                                        </td>



                                        {/* DURATION */}

                                        <td className="text-secondary small">

                                            <i className="bi bi-clock me-1"></i>

                                            {service.duration}

                                        </td>



                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className="badge rounded-pill px-3 py-2"
                                                style={{
                                                    backgroundColor: service.status === 'Active'
                                                        ? '#E2F5E8'
                                                        : '#FCE8E8',

                                                    color: service.status === 'Active'
                                                        ? '#247443'
                                                        : '#B42318'
                                                }}
                                            >

                                                {service.status || 'Active'}

                                            </span>

                                        </td>



                                        {/* ACTIONS */}

                                        <td>

                                            <div className="d-flex justify-content-center gap-2">


                                                {/* VIEW */}

                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="View Details"
                                                    onClick={() => handleView(service)}
                                                >

                                                    <i className="bi bi-eye"></i>

                                                </button>


                                                {/* EDIT */}

                                                <button
                                                    className="btn btn-sm btn-outline-success"
                                                    title="Edit Service"
                                                    onClick={() => handleEdit(service)}
                                                >

                                                    <i className="bi bi-pencil"></i>

                                                </button>


                                                {/* STATUS */}

                                                <button
                                                    className="btn btn-sm btn-outline-warning"
                                                    title="Change Status"
                                                    onClick={() => toggleStatus(service)}
                                                >

                                                    <i className="bi bi-power"></i>

                                                </button>


                                                {/* DELETE */}

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete Service"
                                                    onClick={() => handleDelete(service._id)}
                                                >

                                                    <i className="bi bi-trash"></i>

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}



                                {/* EMPTY */}

                                {!loading && filteredServices.length === 0 && (

                                    <tr>

                                        <td colSpan="6" className="text-center py-5">

                                            <i className="bi bi-inbox fs-1 text-secondary"></i>

                                            <h6 className="fw-bold mt-3">
                                                No Services Found
                                            </h6>

                                            <p className="text-secondary small mb-0">
                                                Try another search or add a new service.
                                            </p>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>



                    {/* TABLE FOOTER */}

                    <div className="card-footer bg-white border-0 p-3">

                        <small className="text-secondary">
                            PetCare Admin Panel · Service Management
                        </small>

                    </div>

                </div>



                {/* ========================================
                    VIEW SERVICE MODAL
                ======================================== */}

                {showView && selectedService && (

                    <div
                        className="modal d-block"
                        tabIndex="-1"
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.45)',
                            zIndex: 1055
                        }}
                    >

                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content border-0 rounded-4 shadow">


                                {/* MODAL HEADER */}

                                <div className="modal-header border-0 p-4">

                                    <h5 className="fw-bold mb-0" style={{ color: '#294B35' }}>
                                        Service Details
                                    </h5>

                                    <button
                                        className="btn-close"
                                        onClick={() => setShowView(false)}
                                    ></button>

                                </div>



                                {/* MODAL BODY */}

                                <div className="modal-body px-4 pb-4">

                                    <div className="text-center mb-4">

                                        <div
                                            className="rounded-4 mx-auto d-flex justify-content-center align-items-center"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: '#E8F1E9',
                                                fontSize: '38px'
                                            }}
                                        >

                                            {selectedService.icon || '🐾'}

                                        </div>

                                        <h5 className="fw-bold mt-3 mb-1">
                                            {selectedService.name}
                                        </h5>

                                        <span className="text-secondary small">
                                            {selectedService.category}
                                        </span>

                                    </div>



                                    <div
                                        className="rounded-3 p-3"
                                        style={{ backgroundColor: '#F5F8F5' }}
                                    >

                                        <div className="mb-3">

                                            <small className="text-secondary">
                                                Service Description
                                            </small>

                                            <p className="fw-medium mb-0 mt-1">
                                                {selectedService.description}
                                            </p>

                                        </div>


                                        <hr />


                                        <div className="row g-3">

                                            <div className="col-6">

                                                <small className="text-secondary">
                                                    Service Price
                                                </small>

                                                <h5 className="fw-bold mt-1" style={{ color: greenColor }}>
                                                    ₹{Number(selectedService.price).toLocaleString('en-IN')}
                                                </h5>

                                            </div>


                                            <div className="col-6">

                                                <small className="text-secondary">
                                                    Duration
                                                </small>

                                                <h6 className="fw-semibold mt-2">
                                                    {selectedService.duration}
                                                </h6>

                                            </div>

                                        </div>


                                        <hr />


                                        <div>

                                            <small className="text-secondary">
                                                Service Status
                                            </small>

                                            <div className="mt-2">

                                                <span
                                                    className={`badge rounded-pill px-3 py-2 ${
                                                        selectedService.status === 'Active'
                                                            ? 'bg-success-subtle text-success'
                                                            : 'bg-danger-subtle text-danger'
                                                    }`}
                                                >
                                                    {selectedService.status || 'Active'}
                                                </span>

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
                                        style={{ backgroundColor: greenColor }}
                                        onClick={() => handleEdit(selectedService)}
                                    >

                                        <i className="bi bi-pencil me-2"></i>

                                        Edit Service

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}



                {/* ========================================
                    FOOTER
                ======================================== */}

                <div className="text-center mt-4 mb-2">

                    <small className="text-secondary">
                        © 2026 PetCare. All rights reserved.
                    </small>

                </div>


            </main>

        </div>

    )

}

export default ManageServices