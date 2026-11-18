import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'

import {
    getAllAdminUsersAPI,
    getSingleAdminUserAPI,
    updateAdminUserAPI,
    deleteAdminUserAPI
} from '../../../Services/AllApi'

function ManageUsers() {

    const [users, setUsers] = useState([])
    const [searchKey, setSearchKey] = useState('')

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [selectedUser, setSelectedUser] = useState(null)

    const [showView, setShowView] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const [editData, setEditData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        address: ''
    })


    // ========================================
    // GET ALL USERS
    // ========================================

    const getAllUsers = async () => {

        try {

            setLoading(true)

            const result = await getAllAdminUsersAPI(searchKey)

            if (result.status === 200) {
                setUsers(result.data.users || [])
            }

        } catch (error) {

            console.log(error)
            alert('Unable to fetch users')

        } finally {

            setLoading(false)

        }
    }


    useEffect(() => {
        getAllUsers()
    }, [searchKey])


    // ========================================
    // VIEW USER
    // ========================================

    const handleView = async (id) => {

        try {

            const result = await getSingleAdminUserAPI(id)

            if (result.status === 200) {

                setSelectedUser(result.data.user)
                setShowView(true)

            }

        } catch (error) {

            console.log(error)
            alert('Unable to fetch user details')

        }
    }


    // ========================================
    // EDIT USER
    // ========================================

    const handleEdit = (user) => {

        setSelectedUser(user)

        setEditData({
            name: user.name || '',
            username: user.username || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || ''
        })

        setShowEdit(true)

    }


    // ========================================
    // UPDATE USER
    // ========================================

    const handleUpdate = async (e) => {

        e.preventDefault()

        try {

            setSaving(true)

            const result = await updateAdminUserAPI(
                selectedUser._id,
                editData
            )

            if (result.status === 200) {

                alert('User updated successfully')

                setShowEdit(false)
                getAllUsers()

            }

        } catch (error) {

            console.log(error)

            alert(
                error.response?.data?.message ||
                'Unable to update user'
            )

        } finally {

            setSaving(false)

        }
    }


    // ========================================
    // DELETE USER
    // ========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this user? This action cannot be undone.'
        )

        if (!confirmDelete) return

        try {

            const result = await deleteAdminUserAPI(id)

            if (result.status === 200) {

                alert('User deleted successfully')

                getAllUsers()

            }

        } catch (error) {

            console.log(error)

            alert(
                error.response?.data?.message ||
                'Unable to delete user'
            )

        }

    }


    // ========================================
    // INPUT HANDLER
    // ========================================

    const handleInputChange = (e) => {

        const { name, value } = e.target

        setEditData({
            ...editData,
            [name]: value
        })

    }


    // ========================================
    // STATISTICS
    // ========================================

    const usersWithPhone = users.filter(user => user.phone).length

    const usersWithAddress = users.filter(user => user.address).length


    // ========================================
    // MAIN UI
    // ========================================

    return (

        <div
            className="d-flex"
            style={{
                minHeight: '100vh',
                backgroundColor: '#F5F8F3',
                overflowX: 'hidden'
            }}
        >

            {/* SIDEBAR */}

            <AdminSidebar />


            {/* MAIN CONTENT */}

            <main
                style={{
                    marginLeft: '280px',
                    width: 'calc(100% - 280px)',
                    minWidth: 0,
                    padding: '35px 40px',
                    boxSizing: 'border-box'
                }}
            >

                {/* PAGE HEADER */}

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                    <div>

                        <h3
                            className="fw-bold mb-2"
                            style={{ color: '#294B35' }}
                        >
                            Manage Users
                        </h3>

                        <p className="text-muted mb-0">
                            View and manage registered pet owner accounts.
                        </p>

                    </div>

                    <div
                        className="px-3 py-2 rounded-3"
                        style={{
                            backgroundColor: '#E7F3E8',
                            color: '#315A3D',
                            fontSize: '13px',
                            fontWeight: '600'
                        }}
                    >
                        USER MANAGEMENT
                    </div>

                </div>


                {/* STATISTICS CARDS */}

                <div className="row g-4 mb-4">

                    <div className="col-xl-4 col-md-6">

                        <div
                            className="bg-white rounded-4 p-4 h-100"
                            style={{
                                boxShadow: '0 3px 12px rgba(0,0,0,0.04)',
                                border: '1px solid #EDF1EB'
                            }}
                        >

                            <p className="text-muted mb-2">
                                Total Users
                            </p>

                            <h2
                                className="fw-bold mb-1"
                                style={{ color: '#315A3D' }}
                            >
                                {users.length}
                            </h2>

                            <small className="text-muted">
                                Registered pet owners
                            </small>

                        </div>

                    </div>


                    <div className="col-xl-4 col-md-6">

                        <div
                            className="bg-white rounded-4 p-4 h-100"
                            style={{
                                boxShadow: '0 3px 12px rgba(0,0,0,0.04)',
                                border: '1px solid #EDF1EB'
                            }}
                        >

                            <p className="text-muted mb-2">
                                Phone Available
                            </p>

                            <h2
                                className="fw-bold mb-1"
                                style={{ color: '#315A3D' }}
                            >
                                {usersWithPhone}
                            </h2>

                            <small className="text-muted">
                                Users with phone numbers
                            </small>

                        </div>

                    </div>


                    <div className="col-xl-4 col-md-6">

                        <div
                            className="bg-white rounded-4 p-4 h-100"
                            style={{
                                boxShadow: '0 3px 12px rgba(0,0,0,0.04)',
                                border: '1px solid #EDF1EB'
                            }}
                        >

                            <p className="text-muted mb-2">
                                Address Available
                            </p>

                            <h2
                                className="fw-bold mb-1"
                                style={{ color: '#315A3D' }}
                            >
                                {usersWithAddress}
                            </h2>

                            <small className="text-muted">
                                Users with saved addresses
                            </small>

                        </div>

                    </div>

                </div>


                {/* USERS TABLE CONTAINER */}

                <div
                    className="bg-white rounded-4"
                    style={{
                        border: '1px solid #EDF1EB',
                        boxShadow: '0 3px 15px rgba(0,0,0,0.04)',
                        overflow: 'hidden'
                    }}
                >

                    {/* TABLE HEADER */}

                    <div className="p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">

                        <div>

                            <h5
                                className="fw-bold mb-1"
                                style={{ color: '#294B35' }}
                            >
                                Registered Users
                            </h5>

                            <p className="text-muted small mb-0">
                                Manage all registered pet owner accounts.
                            </p>

                        </div>


                        {/* SEARCH */}

                        <div style={{ width: '280px', maxWidth: '100%' }}>

                            <input
                                type="text"
                                className="form-control rounded-3"
                                placeholder="Search by name, username or email..."
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                style={{
                                    padding: '11px 14px',
                                    border: '1px solid #E1E8DE',
                                    fontSize: '13px'
                                }}
                            />

                        </div>

                    </div>


                    {/* TABLE */}

                    <div className="table-responsive">

                        <table className="table align-middle mb-0">

                            <thead
                                style={{
                                    backgroundColor: '#F4F7F2'
                                }}
                            >

                                <tr>

                                    <th className="py-3 ps-4">
                                        USER
                                    </th>

                                    <th className="py-3">
                                        USERNAME
                                    </th>

                                    <th className="py-3">
                                        PHONE
                                    </th>

                                    <th className="py-3">
                                        EMAIL
                                    </th>

                                    <th className="py-3">
                                        ACCOUNT
                                    </th>

                                    <th className="py-3 text-center pe-4">
                                        ACTIONS
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-5 text-muted"
                                        >
                                            Loading users...
                                        </td>

                                    </tr>

                                ) : users.length > 0 ? (

                                    users.map((user) => (

                                        <tr key={user._id}>

                                            <td className="ps-4">

                                                <div className="fw-semibold">
                                                    {user.name || '—'}
                                                </div>

                                            </td>


                                            <td>
                                                {user.username || '—'}
                                            </td>


                                            <td>
                                                {user.phone || '—'}
                                            </td>


                                            <td>
                                                {user.email || '—'}
                                            </td>


                                            <td>

                                                <span
                                                    className="badge rounded-pill px-3 py-2"
                                                    style={{
                                                        backgroundColor: '#E7F3E8',
                                                        color: '#315A3D',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    Registered
                                                </span>

                                            </td>


                                            <td className="pe-4">

                                                <div className="d-flex justify-content-center gap-2">

                                                    <button
                                                        className="btn btn-sm btn-outline-success"
                                                        onClick={() => handleView(user._id)}
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleEdit(user)}
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-5 text-muted"
                                        >
                                            No users found.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* TABLE FOOTER */}

                    <div
                        className="px-4 py-3 d-flex justify-content-between align-items-center"
                        style={{
                            borderTop: '1px solid #EDF1EB'
                        }}
                    >

                        <small className="text-muted">
                            Showing {users.length} users
                        </small>

                        <small className="text-muted">
                            PetCare User Management
                        </small>

                    </div>

                </div>

            </main>


            {/* ========================================
                VIEW USER MODAL
            ======================================== */}

            {showView && selectedUser && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: 'rgba(20,35,25,0.45)',
                        zIndex: 2000
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content border-0 rounded-4 shadow">

                            <div className="modal-header px-4">

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        User Details
                                    </h5>

                                    <small className="text-muted">
                                        Registered account information
                                    </small>

                                </div>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowView(false)}
                                />

                            </div>


                            <div className="modal-body p-4">

                                {[
                                    ['Full Name', selectedUser.name],
                                    ['Username', selectedUser.username],
                                    ['Email Address', selectedUser.email],
                                    ['Phone Number', selectedUser.phone],
                                    ['Address', selectedUser.address],
                                    [
                                        'Registered On',
                                        selectedUser.createdAt
                                            ? new Date(selectedUser.createdAt).toLocaleDateString()
                                            : '—'
                                    ]
                                ].map(([label, value]) => (

                                    <div
                                        className="mb-3"
                                        key={label}
                                    >

                                        <small className="text-muted">
                                            {label}
                                        </small>

                                        <div className="fw-semibold mt-1">
                                            {value || 'Not provided'}
                                        </div>

                                    </div>

                                ))}

                            </div>


                            <div className="modal-footer">

                                <button
                                    className="btn btn-light px-4 rounded-3"
                                    onClick={() => setShowView(false)}
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}


            {/* ========================================
                EDIT USER MODAL
            ======================================== */}

            {showEdit && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: 'rgba(20,35,25,0.45)',
                        zIndex: 2000
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content border-0 rounded-4 shadow">

                            <form onSubmit={handleUpdate}>

                                <div className="modal-header px-4">

                                    <div>

                                        <h5 className="fw-bold mb-1">
                                            Edit User
                                        </h5>

                                        <small className="text-muted">
                                            Update user account information
                                        </small>

                                    </div>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowEdit(false)}
                                    />

                                </div>


                                <div className="modal-body p-4">

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control rounded-3"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleInputChange}
                                            required
                                        />

                                    </div>


                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Username
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control rounded-3"
                                            name="username"
                                            value={editData.username}
                                            onChange={handleInputChange}
                                            required
                                        />

                                    </div>


                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control rounded-3"
                                            name="email"
                                            value={editData.email}
                                            onChange={handleInputChange}
                                            required
                                        />

                                    </div>


                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Phone Number
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control rounded-3"
                                            name="phone"
                                            value={editData.phone}
                                            onChange={handleInputChange}
                                        />

                                    </div>


                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Address
                                        </label>

                                        <textarea
                                            className="form-control rounded-3"
                                            rows="3"
                                            name="address"
                                            value={editData.address}
                                            onChange={handleInputChange}
                                        />

                                    </div>

                                </div>


                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-light rounded-3 px-4"
                                        onClick={() => setShowEdit(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn text-white rounded-3 px-4"
                                        style={{
                                            backgroundColor: '#315A3D'
                                        }}
                                        disabled={saving}
                                    >
                                        {saving ? 'Updating...' : 'Save Changes'}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            )}

        </div>

    )

}

export default ManageUsers