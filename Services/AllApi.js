    import ApiService from '../API/ApiService'

    // REGISTER API
    export const registerAPI = async (userData) => {
    return await ApiService('POST', '/register', userData)
    }

    // LOGIN API
    export const loginAPI = async (userData) => {
    return await ApiService('POST', '/login', userData)
    }

    // GET USER PROFILE API
    export const getUserProfileAPI = async () => {
    return await ApiService('GET', '/profile')
    }

    // UPDATE USER PROFILE API
    export const updateUserProfileAPI = async (data) => {
    return await ApiService('PUT', '/profile', data)
    }


    // REGISTER PET API
    export const registerPetAPI = async (petData) => {
        return await ApiService('POST', '/pets/register', petData)
    }


    // GET MY PETS API
    export const getMyPetsAPI = async () => {
        return await ApiService('GET', '/pets/my-pets')
    }


    // GET SINGLE PET API
    export const getSinglePetAPI = async (id) => {
        return await ApiService('GET', `/pets/${id}`)
    }


    // UPDATE PET API
    export const updatePetAPI = async (id, petData) => {
        return await ApiService('PUT', `/pets/${id}`, petData)
    }


    // DELETE PET API
    export const deletePetAPI = async (id) => {
        return await ApiService('DELETE', `/pets/${id}`)
    }



    /// BOOK APPOINTMENT
    export const bookAppointmentAPI = async (appointmentData) => {
        return await ApiService('POST', '/book', appointmentData)
    }


    // GET MY APPOINTMENTS
    export const getMyAppointmentsAPI = async () => {
        return await ApiService('GET', '/my-appointments')
    }


    // GET SINGLE APPOINTMENT
export const getSingleAppointmentAPI = async (id) => {
    return await ApiService('GET', `/appointment/${id}`)
}

    // CANCEL APPOINTMENT
    export const cancelAppointmentAPI = async (id) => {
        return await ApiService('PUT', `/cancel/${id}`)
    }


    // DELETE CANCELLED APPOINTMENT
    export const deleteAppointmentAPI = async (id) => {
        return await ApiService('DELETE', `/delete/${id}`)
    }

    // ===============================
// VETERINARIAN MODULE APIs
// ===============================


// GET VETERINARIAN DASHBOARD
export const getVetDashboardAPI = async () => {
    return await ApiService('GET', '/vet/dashboard')
}


// GET VETERINARIAN APPOINTMENTS
export const getVetAppointmentsAPI = async () => {
    return await ApiService('GET', '/vet/appointments')
}


// ACCEPT APPOINTMENT
export const acceptAppointmentAPI = async (id) => {
    return await ApiService('PUT', `/vet/appointments/accept/${id}`)
}


// REJECT APPOINTMENT
export const rejectAppointmentAPI = async (id) => {
    return await ApiService('PUT', `/vet/appointments/reject/${id}`)
}


// COMPLETE APPOINTMENT
export const completeAppointmentAPI = async (id) => {
    return await ApiService('PUT', `/vet/appointments/complete/${id}`)
}


// GET VETERINARIAN PATIENTS
export const getVetPatientsAPI = async () => {
    return await ApiService('GET', '/vet/patients')
}


// CREATE MEDICAL RECORD
export const createMedicalRecordAPI = async (recordData) => {
    return await ApiService('POST', '/vet/medical-records', recordData)
}


// GET VETERINARIAN MEDICAL RECORDS
export const getVetMedicalRecordsAPI = async () => {
    return await ApiService('GET', '/vet/medical-records')
}


// CREATE VACCINATION RECORD
export const createVaccinationRecordAPI = async (vaccinationData) => {
    return await ApiService('POST', '/vet/vaccinations', vaccinationData)
}


// GET VETERINARIAN PROFILE
export const getVetProfileAPI = async () => {
    return await ApiService('GET', '/vet/profile')
}
// GET AVAILABLE VETERINARIANS

export const getAvailableVeterinariansAPI = async () => {
    return await ApiService('GET', '/veterinarians/available')
}

// GET OWNER'S MEDICAL RECORDS
export const getMyMedicalRecordsAPI = async () => {
    return await ApiService('GET', '/my-medical-records')
}

// ========================================
// ADMIN - MANAGE PETS APIs
// ========================================

// GET ALL PETS - ADMIN
export const getAllAdminPetsAPI = async (search = '', petType = 'All', status = 'All') => {

    const params = new URLSearchParams()

    if (search) params.append('search', search)
    if (petType !== 'All') params.append('petType', petType)
    if (status !== 'All') params.append('status', status)

    return await ApiService('GET', `/admin/pets?${params.toString()}`)
}


// GET SINGLE PET - ADMIN
export const getSingleAdminPetAPI = async (id) => {
    return await ApiService('GET', `/admin/pets/${id}`)
}


// UPDATE PET - ADMIN
export const updateAdminPetAPI = async (id, petData) => {
    return await ApiService('PUT', `/admin/pets/${id}`, petData)
}


// DELETE PET - ADMIN
export const deleteAdminPetAPI = async (id) => {
    return await ApiService('DELETE', `/admin/pets/${id}`)
}


// ========================================
// ADMIN - MANAGE APPOINTMENTS APIs
// ========================================

// GET ALL APPOINTMENTS - ADMIN
export const getAllAdminAppointmentsAPI = (params = {}) => {
    return ApiService(
        'GET',
        '/admin/appointments',
        '',
        {
            params
        }
    )
}

// GET SINGLE APPOINTMENT - ADMIN
export const getSingleAdminAppointmentAPI = (id) => {
    return ApiService(
        'GET',
        `/admin/appointments/${id}`
    )
}

// SEARCH APPOINTMENTS - ADMIN
export const searchAdminAppointmentsAPI = (search) => {
    return ApiService(
        'GET',
        `/admin/appointments/search?search=${encodeURIComponent(search)}`
    )
}

// UPDATE APPOINTMENT STATUS - ADMIN
export const updateAdminAppointmentStatusAPI = (id, status) => {
    return ApiService(
        'PUT',
        `/admin/appointments/${id}/status`,
        { status }
    )
}

// DELETE APPOINTMENT - ADMIN
export const deleteAdminAppointmentAPI = (id) => {
    return ApiService(
        'DELETE',
        `/admin/appointments/${id}`
    )
}

// ========================================
// ADMIN - MANAGE SERVICES APIs
// ========================================


// GET ALL SERVICES - ADMIN
export const getAllAdminServicesAPI = (params = {}) => {
    return ApiService(
        'GET',
        '/admin/services',
        '',
        {
            params
        }
    )
}


// GET SINGLE SERVICE - ADMIN
export const getSingleAdminServiceAPI = (id) => {
    return ApiService(
        'GET',
        `/admin/services/${id}`
    )
}


// ADD NEW SERVICE - ADMIN
export const addAdminServiceAPI = (serviceData) => {
    return ApiService(
        'POST',
        '/admin/services',
        serviceData
    )
}


// UPDATE SERVICE - ADMIN
export const updateAdminServiceAPI = (id, serviceData) => {
    return ApiService(
        'PUT',
        `/admin/services/${id}`,
        serviceData
    )
}


// DELETE SERVICE - ADMIN
export const deleteAdminServiceAPI = (id) => {
    return ApiService(
        'DELETE',
        `/admin/services/${id}`
    )
}


// UPDATE SERVICE STATUS - ADMIN
export const updateAdminServiceStatusAPI = (id, status) => {
    return ApiService(
        'PUT',
        `/admin/services/${id}/status`,
        { status }
    )
}

// ========================================
// ADMIN SETTINGS APIs
// ========================================

// GET ADMIN SETTINGS
export const getAdminSettingsAPI = async () => {
    return await ApiService('GET', '/admin/settings')
}


// UPDATE ADMIN SETTINGS
export const updateAdminSettingsAPI = async (settingsData) => {
    return await ApiService('PUT', '/admin/settings', settingsData)
}


// CHANGE ADMIN PASSWORD
export const changeAdminPasswordAPI = async (passwordData) => {
    return await ApiService('PUT', '/admin/change-password', passwordData)
}

// ========================================
// ADMIN - MANAGE USERS APIs
// ========================================

// GET ALL USERS
export const getAllAdminUsersAPI = async (search = '') => {
    return await ApiService(
        'GET',
        `/admin/users?search=${encodeURIComponent(search)}`
    )
}

// GET SINGLE USER
export const getSingleAdminUserAPI = async (id) => {
    return await ApiService('GET', `/admin/users/${id}`)
}

// UPDATE USER
export const updateAdminUserAPI = async (id, userData) => {
    return await ApiService('PUT', `/admin/users/${id}`, userData)
}

// DELETE USER
export const deleteAdminUserAPI = async (id) => {
    return await ApiService('DELETE', `/admin/users/${id}`)
}


// ========================================
// ADMIN - MANAGE VETERINARIANS APIs
// ========================================

// GET ALL VETERINARIANS
export const getAllAdminVeterinariansAPI = async (search = '') => {
    return await ApiService(
        'GET',
        `/admin/veterinarians?search=${encodeURIComponent(search)}`
    )
}

// GET SINGLE VETERINARIAN
export const getSingleAdminVeterinarianAPI = async (id) => {
    return await ApiService(
        'GET',
        `/admin/veterinarians/${id}`
    )
}

// ADD VETERINARIAN
export const addAdminVeterinarianAPI = async (vetData) => {
    return await ApiService(
        'POST',
        '/admin/add-veterinarian',
        vetData
    )
}

// UPDATE VETERINARIAN
export const updateAdminVeterinarianAPI = async (id, vetData) => {
    return await ApiService(
        'PUT',
        `/admin/veterinarians/${id}`,
        vetData
    )
}

// DELETE VETERINARIAN
export const deleteAdminVeterinarianAPI = async (id) => {
    return await ApiService(
        'DELETE',
        `/admin/veterinarians/${id}`
    )
}

// UPDATE VETERINARIAN STATUS
export const updateAdminVeterinarianStatusAPI = async (id, status) => {
    return await ApiService(
        'PUT',
        `/admin/veterinarians/${id}`,
        { status }
    )
}


// GET ALL SERVICES
export const getAllServicesAPI = async () => {
    return await ApiService('GET', '/admin/services')
}

// ========================================
// PUBLIC - GET ACTIVE PETCARE SERVICES
// ========================================

export const getPublicServicesAPI = async () => {
    return await ApiService('GET', '/services')
}


// ========================================
// USER - GET ACTIVE SERVICES
// ========================================

export const getActiveServicesAPI = async () => {
    return await ApiService('GET', '/services/active')
}


/// ========================================
// PAYMENT APIs
// ========================================

// CREATE PAYMENT
export const createPaymentAPI = async (paymentData) => {
    return await ApiService(
        'POST',
        '/payment/create',
        paymentData
    )
}


// GET MY PAYMENT HISTORY
export const getMyPaymentsAPI = async () => {
    return await ApiService(
        'GET',
        '/my-payments'
    )
}


// GET SINGLE PAYMENT
export const getSinglePaymentAPI = async (id) => {
    return await ApiService(
        'GET',
        `/payment/${id}`
    )
}