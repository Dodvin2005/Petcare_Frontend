import './App.css'

import { useEffect, useState } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'


// ==========================================
// USER PAGES
// ==========================================

import Home from './User/Pages/Home'
import About from './User/Pages/About'
import Services from './User/Pages/Services'
import Veterinarians from './User/Pages/Veterinarians'
import Contact from './User/Pages/Contact'

import Profile from './User/Pages/Profile'
import PetRegister from './User/Pages/PetRegister'
import MyPets from './User/Pages/MyPets'

import BookAppointment from './User/Pages/BookAppointment'
import MyAppointments from './User/Pages/MyAppointments'
import AppointmentDetails from './User/Pages/AppointmentDetails'


// ==========================================
// ADMIN PAGES
// ==========================================

import AdminDashboard from './Admin/Pages/AdminDashboard'
import AdminSettings from './Admin/Pages/AdminSettings'

import ManageUsers from './Admin/Pages/ManageUsers'
import ManageVeterinarians from './Admin/Pages/ManageVeterinarians'
import ManagePets from './Admin/Pages/ManagePets'
import ManageAppointments from './Admin/Pages/ManageAppointments'
import ManageServices from './Admin/Pages/ManageServices'


// ==========================================
// VETERINARIAN PAGES
// ==========================================

import VetDashboard from './Veterinarian/Pages/VetDashboard'
import VetProfile from './Veterinarian/Pages/VetProfile'

import VetAppointments from './Veterinarian/Pages/VetAppointments'
import AppointmentRequests from './Veterinarian/Pages/AppointmentRequests'

import PatientPets from './Veterinarian/Pages/PatientPets'
import MedicalRecords from './Veterinarian/Pages/MedicalRecords'


// ==========================================
// AUTHENTICATION PAGES
// ==========================================

import Auth from './Auth/Auth'
import Pnf from './Auth/Pnf'


// ==========================================
// COMMON COMPONENTS
// ==========================================

import Preloader from './Components/Preloader'


// ==========================================
// GET LOGGED-IN USER
// ==========================================

const getLoggedInUser = () => {

    try {

        const userData =
            localStorage.getItem('user') ||
            sessionStorage.getItem('user')

        if (!userData) return null

        return JSON.parse(userData)

    }
    catch (error) {

        console.error('Invalid user data:', error)

        return null

    }

}


// ==========================================
// ROLE BASED REDIRECT
// ==========================================

const getRoleRedirect = (role) => {

    switch (role?.toLowerCase()) {

        case 'admin':
            return '/admin'

        case 'veterinarian':
            return '/vet'

        case 'user':
            return '/'

        default:
            return '/login'

    }

}


// ==========================================
// PROTECTED ROUTE
// ==========================================

const RoleRoute = ({ allowedRole, children }) => {

    const token =
        localStorage.getItem('token') ||
        sessionStorage.getItem('token')

    const user = getLoggedInUser()

    // Check authentication
    if (!token || !user) {

        return <Navigate to="/login" replace />

    }

    // Check authorization
    const userRole = user.role?.toLowerCase()

    if (userRole !== allowedRole) {

        return (
            <Navigate
                to={getRoleRedirect(userRole)}
                replace
            />
        )

    }

    return children

}


// ==========================================
// MAIN APPLICATION
// ==========================================

function App() {

    const [isLoading, setIsLoading] = useState(true)


    // ======================================
    // PRELOADER
    // ======================================

    useEffect(() => {

        const timer = setTimeout(() => {

            setIsLoading(false)

        }, 2000)

        return () => clearTimeout(timer)

    }, [])


    if (isLoading) {

        return <Preloader />

    }


    return (

        <Routes>


            {/* ==================================
                PUBLIC ROUTES
            ================================== */}

            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/services" element={<Services />} />

            <Route path="/veterinarians" element={<Veterinarians />} />

            <Route path="/contact" element={<Contact />} />


            {/* ==================================
                AUTHENTICATION ROUTES
            ================================== */}

            <Route path="/login" element={<Auth />} />

            <Route
                path="/register"
                element={<Auth insideRegister />}
            />


            {/* ==================================
                USER MODULE
            ================================== */}

            <Route
                path="/profile"
                element={
                    <RoleRoute allowedRole="user">
                        <Profile />
                    </RoleRoute>
                }
            />

            <Route
                path="/pet-register"
                element={
                    <RoleRoute allowedRole="user">
                        <PetRegister />
                    </RoleRoute>
                }
            />

            <Route
                path="/my-pets"
                element={
                    <RoleRoute allowedRole="user">
                        <MyPets />
                    </RoleRoute>
                }
            />

            <Route
                path="/book-appointment"
                element={
                    <RoleRoute allowedRole="user">
                        <BookAppointment />
                    </RoleRoute>
                }
            />

            <Route
                path="/my-appointments"
                element={
                    <RoleRoute allowedRole="user">
                        <MyAppointments />
                    </RoleRoute>
                }
            />

            <Route
                path="/appointment-details/:id"
                element={
                    <RoleRoute allowedRole="user">
                        <AppointmentDetails />
                    </RoleRoute>
                }
            />


            {/* ==================================
                ADMIN MODULE
            ================================== */}

            <Route
                path="/admin"
                element={
                    <RoleRoute allowedRole="admin">
                        <AdminDashboard />
                    </RoleRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <RoleRoute allowedRole="admin">
                        <ManageUsers />
                    </RoleRoute>
                }
            />

            <Route
                path="/admin/veterinarians"
                element={
                    <RoleRoute allowedRole="admin">
                        <ManageVeterinarians />
                    </RoleRoute>
                }
            />

            <Route
                path="/admin/pets"
                element={
                    <RoleRoute allowedRole="admin">
                        <ManagePets />
                    </RoleRoute>
                }
            />

            <Route
                path="/admin/appointments"
                element={
                    <RoleRoute allowedRole="admin">
                        <ManageAppointments />
                    </RoleRoute>
                }
            />

            <Route
                path="/admin/services"
                element={
                    <RoleRoute allowedRole="admin">
                        <ManageServices />
                    </RoleRoute>
                }
            />

            <Route
                path="/admin/settings"
                element={
                    <RoleRoute allowedRole="admin">
                        <AdminSettings />
                    </RoleRoute>
                }
            />


            {/* ==================================
                VETERINARIAN MODULE
            ================================== */}

            <Route
                path="/vet"
                element={
                    <RoleRoute allowedRole="veterinarian">
                        <VetDashboard />
                    </RoleRoute>
                }
            />

            <Route
                path="/vet/profile"
                element={
                    <RoleRoute allowedRole="veterinarian">
                        <VetProfile />
                    </RoleRoute>
                }
            />

            <Route
                path="/vet/appointments"
                element={
                    <RoleRoute allowedRole="veterinarian">
                        <VetAppointments />
                    </RoleRoute>
                }
            />

            <Route
                path="/vet/appointment-requests"
                element={
                    <RoleRoute allowedRole="veterinarian">
                        <AppointmentRequests />
                    </RoleRoute>
                }
            />

            <Route path="/vet/patient-pets" element={<RoleRoute allowedRole="veterinarian"><PatientPets /></RoleRoute>}/>

            <Route path="/vet/medical-records" element={<RoleRoute allowedRole="veterinarian">  <MedicalRecords /> </RoleRoute>}/>

            <Route path="*" element={<Pnf />} />

        </Routes>

    )

}


export default App