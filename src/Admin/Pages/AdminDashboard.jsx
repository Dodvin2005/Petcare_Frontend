import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../Components/AdminSidebar'

import {
    getAllAdminUsersAPI,
    getAllAdminPetsAPI,
    getAllAdminVeterinariansAPI,
    getAllAdminAppointmentsAPI,
    getAllAdminServicesAPI
} from '../../../Services/AllApi'

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell
} from 'recharts'


// =============================================
// GET LOGGED-IN ADMIN DETAILS
// =============================================

const getLoggedInAdmin = () => {

    try {

        const storedUser =
            localStorage.getItem('user') ||
            sessionStorage.getItem('user')

        if (storedUser) {

            const userData = JSON.parse(storedUser)

            return userData

        }

        // Fallback for older login implementation

        const username =
            localStorage.getItem('username') ||
            sessionStorage.getItem('username')

        if (username) {

            return {
                name: username
            }

        }

        return null

    }

    catch (error) {

        console.log('Admin Details Error:', error)

        return null

    }

}



function AdminDashboard() {


    // =========================================
    // STATES
    // =========================================

    const [users, setUsers] = useState([])
    const [pets, setPets] = useState([])
    const [veterinarians, setVeterinarians] = useState([])
    const [appointments, setAppointments] = useState([])
    const [services, setServices] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    // =========================================
    // LOGGED-IN ADMIN
    // =========================================

    const admin = getLoggedInAdmin()

    const adminName =
        admin?.name ||
        admin?.username ||
        'Admin'


    // =========================================
    // FETCH DASHBOARD DATA
    // =========================================

    const getDashboardData = async () => {

        try {

            setLoading(true)
            setError('')

            const [
                userResult,
                petResult,
                vetResult,
                appointmentResult,
                serviceResult
            ] = await Promise.all([

                getAllAdminUsersAPI(),

                getAllAdminPetsAPI(),

                getAllAdminVeterinariansAPI(),

                getAllAdminAppointmentsAPI(),

                getAllAdminServicesAPI()

            ])


            // USERS

            setUsers(userResult.data.users || [])


            // PETS

            setPets(petResult.data.pets || [])


            // VETERINARIANS

            setVeterinarians(
                vetResult.data.veterinarians || []
            )


            // APPOINTMENTS

            setAppointments(
                appointmentResult.data.appointments || []
            )


            // SERVICES

            setServices(
                serviceResult.data.services || []
            )

        }

        catch (err) {

            console.log('Dashboard Error:', err)

            setError(
                err.response?.data?.message ||
                'Unable to load dashboard information.'
            )

        }

        finally {

            setLoading(false)

        }

    }


    useEffect(() => {

        getDashboardData()

    }, [])



    // =========================================
    // DATE FORMAT
    // =========================================

    const formatDate = (date) => {

        if (!date) return 'N/A'

        const parsedDate = new Date(date)

        if (isNaN(parsedDate.getTime())) return 'N/A'

        return parsedDate.toLocaleDateString('en-IN', {

            day: '2-digit',

            month: 'short',

            year: 'numeric'

        })

    }



    // =========================================
    // PET ICON
    // =========================================

    const getPetIcon = (type) => {

        const icons = {

            Dog: '🐕',

            Cat: '🐈',

            Bird: '🐦',

            Rabbit: '🐇'

        }

        return icons[type] || '🐾'

    }



    // =========================================
    // STATISTICS
    // =========================================

    const stats = [

        {
            title: 'Total Users',
            value: users.length,
            subtitle: 'Registered pet owners',
            icon: '👥',
            bg: '#EAF1FF',
            color: '#5479B9',
            path: '/admin/users'
        },

        {
            title: 'Registered Pets',
            value: pets.length,
            subtitle: 'Pets in the system',
            icon: '🐾',
            bg: '#E8F5EA',
            color: '#398052',
            path: '/admin/pets'
        },

        {
            title: 'Veterinarians',
            value: veterinarians.length,
            subtitle: 'Registered doctors',
            icon: '🩺',
            bg: '#F2EBFF',
            color: '#8062B7',
            path: '/admin/veterinarians'
        },

        {
            title: 'Appointments',
            value: appointments.length,
            subtitle: 'Total bookings',
            icon: '📅',
            bg: '#FFF1DF',
            color: '#C58A37',
            path: '/admin/appointments'
        },

        {
            title: 'Pet Services',
            value: services.length,
            subtitle: 'Available services',
            icon: '🏥',
            bg: '#E5F3F2',
            color: '#39847B',
            path: '/admin/services'
        }

    ]



    // =========================================
    // APPOINTMENT STATUS
    // =========================================

    const statusColors = {

        Completed: '#398052',

        Pending: '#F3B847',

        Confirmed: '#6495D0',

        Cancelled: '#E47777'

    }


    const statusData = [

        'Completed',

        'Pending',

        'Confirmed',

        'Cancelled'

    ].map(status => ({

        name: status,

        value: appointments.filter(
            appointment =>
                appointment.status?.toLowerCase() === status.toLowerCase()
        ).length,

        color: statusColors[status]

    }))



    // =========================================
    // WEEKLY APPOINTMENTS
    // =========================================

    const getWeeklyData = () => {

        const today = new Date()

        const weeklyData = []

        for (let i = 6; i >= 0; i--) {

            const date = new Date(today)

            date.setDate(today.getDate() - i)

            const count = appointments.filter(appointment => {

                if (!appointment.appointmentDate) return false

                const appointmentDate = new Date(
                    appointment.appointmentDate
                )

                return (

                    appointmentDate.getDate() === date.getDate() &&

                    appointmentDate.getMonth() === date.getMonth() &&

                    appointmentDate.getFullYear() === date.getFullYear()

                )

            }).length


            weeklyData.push({

                day: date.toLocaleDateString('en-IN', {

                    weekday: 'short'

                }),

                appointments: count

            })

        }

        return weeklyData

    }


    const appointmentData = getWeeklyData()



    // =========================================
    // RECENT APPOINTMENTS
    // =========================================

    const recentAppointments = [...appointments]

        .sort((a, b) => {

            const dateA = new Date(
                a.createdAt || a.appointmentDate || 0
            )

            const dateB = new Date(
                b.createdAt || b.appointmentDate || 0
            )

            return dateB - dateA

        })

        .slice(0, 5)



    // =========================================
    // STATUS BADGE
    // =========================================

    const statusStyle = (status) => {

        const styles = {

            Pending: {

                backgroundColor: '#FFF3D6',

                color: '#A56B00'

            },

            Confirmed: {

                backgroundColor: '#E4EFFF',

                color: '#3467B2'

            },

            Completed: {

                backgroundColor: '#E1F4E6',

                color: '#287642'

            },

            Cancelled: {

                backgroundColor: '#FCE8E8',

                color: '#C03939'

            }

        }

        return styles[status] || {

            backgroundColor: '#F1F3F2',

            color: '#647067'

        }

    }



    // =========================================
    // COMMON CARD STYLE
    // =========================================

    const cardStyle = {

        backgroundColor: '#FFFFFF',

        border: '1px solid #E7EEE7',

        borderRadius: '15px',

        boxShadow: '0 3px 12px rgba(35,70,43,0.035)'

    }



    // =========================================
    // QUICK ACTIONS
    // =========================================

    const quickActions = [

        {
            title: 'Manage Users',
            description: 'View and manage registered pet owners.',
            icon: '👥',
            path: '/admin/users',
            bg: '#EAF1FF'
        },

        {
            title: 'Veterinarians',
            description: 'Manage veterinary profiles and doctors.',
            icon: '🩺',
            path: '/admin/veterinarians',
            bg: '#F2EBFF'
        },

        {
            title: 'Manage Pets',
            description: 'View and manage registered pets.',
            icon: '🐾',
            path: '/admin/pets',
            bg: '#E8F5EA'
        },

        {
            title: 'Appointments',
            description: 'Monitor and manage bookings.',
            icon: '📅',
            path: '/admin/appointments',
            bg: '#FFF1DF'
        },

        {
            title: 'Pet Services',
            description: 'Manage available veterinary services.',
            icon: '🏥',
            path: '/admin/services',
            bg: '#E5F3F2'
        }

    ]



    // =========================================
    // LOADING SCREEN
    // =========================================

    if (loading) {

        return (

            <div
                className="d-flex justify-content-center align-items-center"
                style={{

                    minHeight: '100vh',

                    backgroundColor: '#F5F8F5'

                }}
            >

                <div className="text-center">

                    <div
                        className="spinner-border mb-3"
                        style={{

                            color: '#315A3D',

                            width: '38px',

                            height: '38px'

                        }}
                    ></div>


                    <h6
                        className="fw-semibold"
                        style={{ color: '#315A3D' }}
                    >
                        Loading PetCare Dashboard...
                    </h6>


                    <small className="text-secondary">
                        Please wait
                    </small>

                </div>

            </div>

        )

    }



    // =========================================
    // MAIN DASHBOARD
    // =========================================

    return (

        <div
            className="d-flex"
            style={{

                minHeight: '100vh',

                backgroundColor: '#F5F8F5',

                overflowX: 'hidden'

            }}
        >


            {/* =====================================
                ADMIN SIDEBAR
            ===================================== */}

            <aside
                style={{

                    width: '280px',

                    minWidth: '280px',

                    flexShrink: 0

                }}
            >

                <AdminSidebar />

            </aside>



            {/* =====================================
                MAIN CONTENT
            ===================================== */}

            <main
                className="flex-grow-1"
                style={{

                    minWidth: 0,

                    width: 'calc(100% - 280px)'

                }}
            >


                {/* =====================================
                    DASHBOARD HEADER
                ===================================== */}

                <div
                    className="d-flex justify-content-between align-items-center px-4 px-lg-5"
                    style={{

                        minHeight: '80px',

                        backgroundColor: '#FFFFFF',

                        borderBottom: '1px solid #E9EEE9',

                        boxShadow: '0 2px 8px rgba(0,0,0,0.025)'

                    }}
                >

                    <div>

                        <h5
                            className="fw-bold mb-1"
                            style={{

                                color: '#294B35',

                                fontSize: '20px'

                            }}
                        >
                            Admin Dashboard
                        </h5>


                        <small className="text-secondary">
                            Welcome to PetCare Management System
                        </small>

                    </div>


                    <button
                        onClick={getDashboardData}
                        className="btn d-flex align-items-center gap-2 px-3 py-2"
                        style={{

                            backgroundColor: '#EAF4EA',

                            color: '#315A3D',

                            border: 'none',

                            borderRadius: '9px',

                            fontSize: '12px',

                            fontWeight: '600'

                        }}
                    >

                        <span style={{ fontSize: '16px' }}>
                            ↻
                        </span>

                        Refresh

                    </button>

                </div>



                {/* =====================================
                    DASHBOARD BODY
                ===================================== */}

                <div
                    className="p-3 p-lg-4"
                    style={{

                        maxWidth: '1800px',

                        margin: '0 auto'

                    }}
                >


                    {/* =====================================
                        WELCOME SECTION
                    ===================================== */}

                    <div className="mb-4">

                        <small
                            style={{

                                color: '#89978C',

                                fontSize: '12px'

                            }}
                        >
                            Dashboard / Overview
                        </small>


                        {/* DYNAMIC ADMIN NAME */}

                        <h3
                            className="fw-bold mt-2 mb-2"
                            style={{

                                color: '#294B35',

                                fontSize: '26px'

                            }}
                        >

                            Welcome Back, {adminName}!

                        </h3>


                        <p
                            className="text-secondary mb-0"
                            style={{ fontSize: '13px' }}
                        >
                            Manage your entire veterinary platform
                            and monitor PetCare activities from here.
                        </p>

                    </div>



                    {/* =====================================
                        ERROR MESSAGE
                    ===================================== */}

                    {error && (

                        <div className="alert alert-danger d-flex justify-content-between align-items-center">

                            <span>{error}</span>

                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={getDashboardData}
                            >
                                Retry
                            </button>

                        </div>

                    )}



                    {/* =====================================
                        STATISTICS CARDS
                    ===================================== */}

                    <div className="row g-3 mb-4">

                        {stats.map((item, index) => (

                            <div
                                className="col-12 col-sm-6 col-lg-4 col-xxl"
                                key={index}
                            >

                                <Link
                                    to={item.path}
                                    className="text-decoration-none"
                                >

                                    <div
                                        className="p-3 h-100"
                                        style={{

                                            ...cardStyle,

                                            minHeight: '130px',

                                            transition: '0.2s'

                                        }}

                                        onMouseEnter={(e) => {

                                            e.currentTarget.style.transform =
                                                'translateY(-3px)'

                                        }}

                                        onMouseLeave={(e) => {

                                            e.currentTarget.style.transform =
                                                'translateY(0)'

                                        }}
                                    >

                                        <div className="d-flex justify-content-between align-items-start mb-3">

                                            <div>

                                                <p
                                                    className="text-secondary mb-2"
                                                    style={{ fontSize: '12px' }}
                                                >
                                                    {item.title}
                                                </p>


                                                <h3
                                                    className="fw-bold mb-0"
                                                    style={{

                                                        color: '#294B35',

                                                        fontSize: '28px'

                                                    }}
                                                >
                                                    {item.value}
                                                </h3>

                                            </div>


                                            <div
                                                className="d-flex justify-content-center align-items-center"
                                                style={{

                                                    width: '45px',

                                                    height: '45px',

                                                    backgroundColor: item.bg,

                                                    borderRadius: '12px',

                                                    fontSize: '22px'

                                                }}
                                            >
                                                {item.icon}
                                            </div>

                                        </div>


                                        <small className="text-secondary">
                                            {item.subtitle}
                                        </small>

                                    </div>

                                </Link>

                            </div>

                        ))}

                    </div>



                    {/* =====================================
                        APPOINTMENT CHARTS
                    ===================================== */}

                    <div className="row g-3 mb-4">


                        {/* WEEKLY APPOINTMENTS */}

                        <div className="col-12 col-xl-8">

                            <div
                                className="p-3 p-lg-4 h-100"
                                style={cardStyle}
                            >

                                <h5
                                    className="fw-bold mb-1"
                                    style={{ color: '#294B35' }}
                                >
                                    Appointment Overview
                                </h5>


                                <small className="text-secondary">
                                    Daily appointment bookings - Last 7 days
                                </small>


                                <div
                                    style={{

                                        width: '100%',

                                        height: '280px',

                                        marginTop: '15px'

                                    }}
                                >

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <AreaChart data={appointmentData}>

                                            <defs>

                                                <linearGradient
                                                    id="appointmentGradient"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >

                                                    <stop
                                                        offset="0%"
                                                        stopColor="#5C996A"
                                                        stopOpacity={0.3}
                                                    />

                                                    <stop
                                                        offset="95%"
                                                        stopColor="#5C996A"
                                                        stopOpacity={0.02}
                                                    />

                                                </linearGradient>

                                            </defs>


                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                                stroke="#E9EFE9"
                                            />


                                            <XAxis
                                                dataKey="day"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{
                                                    fill: '#7A897D',
                                                    fontSize: 12
                                                }}
                                            />


                                            <YAxis
                                                allowDecimals={false}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{
                                                    fill: '#7A897D',
                                                    fontSize: 12
                                                }}
                                            />


                                            <Tooltip />


                                            <Area
                                                type="monotone"
                                                dataKey="appointments"
                                                name="Appointments"
                                                stroke="#3B8052"
                                                strokeWidth={3}
                                                fill="url(#appointmentGradient)"
                                                activeDot={{ r: 6 }}
                                            />

                                        </AreaChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>



                        {/* APPOINTMENT STATUS */}

                        <div className="col-12 col-xl-4">

                            <div
                                className="p-3 p-lg-4 h-100"
                                style={cardStyle}
                            >

                                <h5
                                    className="fw-bold mb-1"
                                    style={{ color: '#294B35' }}
                                >
                                    Appointment Status
                                </h5>


                                <small className="text-secondary">
                                    Actual booking distribution
                                </small>


                                <div
                                    style={{

                                        width: '100%',

                                        height: '220px'

                                    }}
                                >

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <PieChart>

                                            <Pie
                                                data={statusData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={58}
                                                outerRadius={85}
                                                paddingAngle={4}
                                            >

                                                {statusData.map((item, index) => (

                                                    <Cell
                                                        key={index}
                                                        fill={item.color}
                                                    />

                                                ))}

                                            </Pie>


                                            <Tooltip />

                                        </PieChart>

                                    </ResponsiveContainer>

                                </div>



                                <div className="row g-3">

                                    {statusData.map((item, index) => (

                                        <div
                                            className="col-6"
                                            key={index}
                                        >

                                            <div className="d-flex align-items-center gap-2">

                                                <span
                                                    style={{

                                                        width: '10px',

                                                        height: '10px',

                                                        borderRadius: '50%',

                                                        backgroundColor: item.color,

                                                        flexShrink: 0

                                                    }}
                                                ></span>


                                                <div>

                                                    <small className="text-secondary">
                                                        {item.name}
                                                    </small>

                                                    <h6 className="fw-bold mb-0">
                                                        {item.value}
                                                    </h6>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>



                    {/* =====================================
                        RECENT APPOINTMENTS
                    ===================================== */}

                    <div
                        className="mb-4"
                        style={{

                            ...cardStyle,

                            overflow: 'hidden'

                        }}
                    >

                        <div className="p-3 p-lg-4 d-flex justify-content-between align-items-center flex-wrap gap-3">

                            <div>

                                <h5
                                    className="fw-bold mb-1"
                                    style={{ color: '#294B35' }}
                                >
                                    Recent Appointments
                                </h5>


                                <small className="text-secondary">
                                    Latest bookings from PetCare users
                                </small>

                            </div>


                            <Link
                                to="/admin/appointments"
                                className="btn px-3 py-2"
                                style={{

                                    backgroundColor: '#315A3D',

                                    color: '#FFFFFF',

                                    borderRadius: '8px',

                                    fontSize: '12px',

                                    fontWeight: '600'

                                }}
                            >
                                View All →
                            </Link>

                        </div>



                        <div className="table-responsive">

                            <table className="table align-middle mb-0">

                                <thead
                                    style={{
                                        backgroundColor: '#F2F7F2'
                                    }}
                                >

                                    <tr>

                                        {[
                                            'PET',
                                            'OWNER',
                                            'VETERINARIAN',
                                            'DATE & TIME',
                                            'SERVICE',
                                            'STATUS'
                                        ].map((heading, index) => (

                                            <th
                                                key={index}
                                                className="px-3 py-3 text-secondary"
                                                style={{

                                                    fontSize: '11px',

                                                    fontWeight: '600',

                                                    whiteSpace: 'nowrap'

                                                }}
                                            >
                                                {heading}
                                            </th>

                                        ))}

                                    </tr>

                                </thead>



                                <tbody>

                                    {recentAppointments.length > 0 ? (

                                        recentAppointments.map((appointment) => (

                                            <tr key={appointment._id}>


                                                {/* PET */}

                                                <td className="px-3 py-3">

                                                    <div className="d-flex align-items-center gap-2">

                                                        <div
                                                            className="d-flex justify-content-center align-items-center"
                                                            style={{

                                                                width: '40px',

                                                                height: '40px',

                                                                backgroundColor: '#EDF5ED',

                                                                borderRadius: '10px',

                                                                fontSize: '20px',

                                                                flexShrink: 0

                                                            }}
                                                        >
                                                            {getPetIcon(
                                                                appointment.petId?.petType
                                                            )}
                                                        </div>


                                                        <span
                                                            className="fw-semibold"
                                                            style={{

                                                                fontSize: '12px',

                                                                color: '#294B35'

                                                            }}
                                                        >
                                                            {appointment.petId?.petName || 'Unknown Pet'}
                                                        </span>

                                                    </div>

                                                </td>



                                                {/* OWNER */}

                                                <td
                                                    style={{

                                                        fontSize: '12px',

                                                        whiteSpace: 'nowrap'

                                                    }}
                                                >
                                                    {appointment.userId?.name || 'N/A'}
                                                </td>



                                                {/* VETERINARIAN */}

                                                <td
                                                    style={{

                                                        fontSize: '12px',

                                                        whiteSpace: 'nowrap'

                                                    }}>
                                                    {appointment.veterinarianId?.name || 'Not Assigned'}
                                                </td>



                                                {/* DATE & TIME */}

                                                <td
                                                    style={{

                                                        fontSize: '12px',

                                                        whiteSpace: 'nowrap'

                                                    }}>

                                                    {formatDate(
                                                        appointment.appointmentDate
                                                    )}

                                                    <div>

                                                        <small className="text-secondary">
                                                            {appointment.appointmentTime || 'N/A'}
                                                        </small>

                                                    </div>

                                                </td>
                                                {/* SERVICE */}

                                                <td
                                                    style={{
                                                        fontSize: '12px',
                                                        whiteSpace: 'nowrap'

                                                    }}>
                                                    {appointment.service || 'N/A'}
                                                </td>



                                                {/* STATUS */}

                                                <td>

                                                    <span
                                                        className="badge rounded-pill px-3 py-2"
                                                        style={{

                                                            ...statusStyle(appointment.status),

                                                            fontSize: '10px',

                                                            fontWeight: '600',

                                                            whiteSpace: 'nowrap'

                                                        }}>
                                                        {appointment.status || 'Pending'}
                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center py-5">
                                                <div style={{ fontSize: '32px' }}>
                                                    📅
                                                </div>
                                                <h6
                                                    className="fw-semibold mt-2"
                                                    style={{ color: '#294B35' }}>
                                                    No Appointments Yet
                                                </h6>
                                                <small className="text-secondary">
                                                    New appointment bookings will appear here.
                                                </small>

                                            </td>

                                        </tr>

                                    )}

                                </tbody>
                            </table>
                        </div>
                        <div className="px-3 py-3 border-top">
                            <small className="text-secondary">
                                Showing {recentAppointments.length} of {appointments.length} appointments
                            </small>

                        </div>

                    </div>



                    {/* management section */}

                    <div className="mb-4">

                        <div className="mb-3">

                            <h5
                                className="fw-bold mb-1"
                                style={{ color: '#294B35' }}
                            >
                                Management Modules
                            </h5>


                            <small className="text-secondary">
                                Access and manage your PetCare platform.
                            </small>

                        </div>



                        <div className="row g-3">

                            {quickActions.map((item, index) => (

                                <div
                                    className="col-12 col-sm-6 col-lg-4 col-xxl"
                                    key={index}
                                >
                                    <Link
                                        to={item.path}
                                        className="text-decoration-none">
                                        <div
                                            className="p-3 h-100"
                                            style={{
                                                ...cardStyle,
                                                minHeight: '175px',
                                                transition: '0.2s'
                                            }}
                                            onMouseEnter={(e) => {

                                                e.currentTarget.style.transform =
                                                    'translateY(-4px)'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform =
                                                    'translateY(0)'
                                            }}                                      >
                                            <div
                                                className="d-flex justify-content-center align-items-center mb-3"
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    backgroundColor: item.bg,
                                                    borderRadius: '12px',
                                                    fontSize: '22px'
                                                }}   >
                                                {item.icon}
                                            </div>
                                            <h6
                                                className="fw-bold mb-2"
                                                style={{
                                                    color: '#294B35',
                                                    fontSize: '13px'
                                                }}>
                                                {item.title}
                                            </h6>
                                            <p
                                                className="text-secondary mb-3"
                                                style={{
                                                    fontSize: '11px',
                                                    lineHeight: '1.6'
                                                }}>
                                                {item.description}
                                            </p>


                                            <span
                                                className="fw-semibold"
                                                style={{
                                                    color: '#398052',
                                                    fontSize: '11px'
                                                }}>
                                                Manage Now →
                                            </span>

                                        </div>

                                    </Link>

                                </div>

                            ))}

                        </div>

                    </div>



                    {/* footer */}

                    <div
                        className="text-center py-3 mt-4"
                        style={{
                            borderTop: '1px solid #E5ECE5'
                        }}>
                        <small
                            className="text-secondary"
                            style={{ fontSize: '11px' }}>
                            © 2026 PETCARE – Pet Health & Appointment Management System.
                            All rights reserved.
                        </small>
                        <div
                            className="mt-1"
                            style={{
                                color: '#78917C',
                                fontSize: '10px'
                            }}>
                            Better Care. Happier Pets.
                        </div>

                    </div>


                </div>

            </main>

        </div>

    )

}

export default AdminDashboard