import React, { useEffect, useRef, useState } from 'react'

import Header from '../Component/Header'
import Footer from '../Component/Footer'

import {
    bookAppointmentAPI,
    getMyPetsAPI,
    getAvailableVeterinariansAPI,
    getActiveServicesAPI,
    createPaymentAPI
} from '../../../Services/AllApi'


function BookAppointment() {

    // ========================================
    // STATES
    // ========================================

    const [pets, setPets] = useState([])
    const [veterinarians, setVeterinarians] = useState([])
    const [services, setServices] = useState([])

    const [loadingPets, setLoadingPets] = useState(true)
    const [loadingVets, setLoadingVets] = useState(true)
    const [loadingServices, setLoadingServices] = useState(true)

    const [bookingLoading, setBookingLoading] = useState(false)
    const [paymentLoading, setPaymentLoading] = useState(false)

    const [message, setMessage] = useState({
        type: '',
        text: ''
    })


    // ========================================
    // PAYMENT STATES
    // ========================================

    const [appointmentId, setAppointmentId] = useState('')

    const [paymentMethod, setPaymentMethod] = useState('UPI')

    const [paymentCompleted, setPaymentCompleted] = useState(false)

    const [paymentDetails, setPaymentDetails] = useState(null)

    const paymentSectionRef = useRef(null)


    // ========================================
    // FORM DATA
    // ========================================

    const [appointmentData, setAppointmentData] = useState({

        petId: '',
        service: '',
        veterinarianId: '',
        appointmentType: 'Clinic Visit',
        appointmentDate: '',
        appointmentTime: '',
        concern: ''

    })


    // ========================================
    // APPOINTMENT TYPES
    // ========================================

    const appointmentTypes = [
        'Clinic Visit',
        'Online Consultation',
        'Home Visit'
    ]


    // ========================================
    // TIME SLOTS
    // ========================================

    const timeSlots = [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM'
    ]


    // ========================================
    // MINIMUM DATE
    // ========================================

    const today = new Date()
    const tomorrow = new Date(today)

    tomorrow.setDate(today.getDate() + 1)

    const minDate = [
        tomorrow.getFullYear(),
        String(tomorrow.getMonth() + 1).padStart(2, '0'),
        String(tomorrow.getDate()).padStart(2, '0')
    ].join('-')


    // ========================================
    // SELECTED SERVICE
    // ========================================

    const selectedService = services.find(
        service => service.name === appointmentData.service
    )


    // ========================================
    // EXTRACT APPOINTMENT ID
    // ========================================

    const extractAppointmentId = (data) => {

        const appointmentId =
            data?.appointment?._id ||
            data?.newAppointment?._id ||
            data?.appointmentId ||
            data?.data?.appointment?._id ||
            data?.data?.newAppointment?._id ||
            data?.data?.appointmentId ||
            data?.data?._id ||
            data?.result?.appointment?._id ||
            data?.result?._id ||
            data?.createdAppointment?._id

        return appointmentId || ''

    }


    // ========================================
    // FETCH PETS
    // ========================================

    const getPets = async () => {

        try {

            setLoadingPets(true)

            const response = await getMyPetsAPI()

            const petList =
                response.data?.pets ||
                response.data?.allPets ||
                response.data?.myPets ||
                []

            setPets(petList)

        }

        catch (error) {

            console.log('Get Pets Error:', error)

            setMessage({
                type: 'danger',
                text: error.response?.data?.message ||
                    'Unable to load your pets.'
            })

        }

        finally {

            setLoadingPets(false)

        }

    }


    // ========================================
    // FETCH VETERINARIANS
    // ========================================

    const getVeterinarians = async () => {

        try {

            setLoadingVets(true)

            const response = await getAvailableVeterinariansAPI()

            const vetList =
                response.data?.veterinarians ||
                response.data?.vets ||
                []

            setVeterinarians(vetList)

        }

        catch (error) {

            console.log('Get Veterinarians Error:', error)

            setVeterinarians([])

        }

        finally {

            setLoadingVets(false)

        }

    }


    // ========================================
    // FETCH SERVICES
    // ========================================

    const getServices = async () => {

        try {

            setLoadingServices(true)

            const response = await getActiveServicesAPI()

            const serviceList =
                response.data?.services || []

            setServices(serviceList)

        }

        catch (error) {

            console.log('Get Services Error:', error)

            setServices([])

        }

        finally {

            setLoadingServices(false)

        }

    }


    // ========================================
    // USE EFFECT
    // ========================================

    useEffect(() => {

        getPets()
        getVeterinarians()
        getServices()

    }, [])


    // ========================================
    // SCROLL TO PAYMENT SECTION
    // ========================================

    useEffect(() => {

        if (appointmentId && !paymentCompleted) {

            setTimeout(() => {

                paymentSectionRef.current?.scrollIntoView({

                    behavior: 'smooth',
                    block: 'center'

                })

            }, 300)

        }

    }, [appointmentId, paymentCompleted])


    // ========================================
    // HANDLE INPUT
    // ========================================

    const handleChange = (e) => {

        const { name, value } = e.target

        setAppointmentData({

            ...appointmentData,

            [name]: value

        })

        setMessage({
            type: '',
            text: ''
        })

    }


    // ========================================
    // BOOK APPOINTMENT
    // ========================================

    const handleBooking = async (e) => {

        e.preventDefault()

        setMessage({
            type: '',
            text: ''
        })


        if (!appointmentData.petId) {

            setMessage({
                type: 'danger',
                text: 'Please select your pet.'
            })

            return

        }


        if (!appointmentData.service) {

            setMessage({
                type: 'danger',
                text: 'Please select a veterinary service.'
            })

            return

        }


        if (!selectedService) {

            setMessage({
                type: 'danger',
                text: 'Selected service is unavailable.'
            })

            return

        }


        if (!appointmentData.appointmentDate) {

            setMessage({
                type: 'danger',
                text: 'Please select an appointment date.'
            })

            return

        }


        if (appointmentData.appointmentDate < minDate) {

            setMessage({
                type: 'danger',
                text: 'Please select a future date.'
            })

            return

        }


        if (!appointmentData.appointmentTime) {

            setMessage({
                type: 'danger',
                text: 'Please select an appointment time.'
            })

            return

        }


        try {

            setBookingLoading(true)

            const reqBody = {

                petId: appointmentData.petId,

                service: appointmentData.service,

                veterinarianId:
                    appointmentData.veterinarianId || null,

                appointmentType:
                    appointmentData.appointmentType,

                appointmentDate:
                    appointmentData.appointmentDate,

                appointmentTime:
                    appointmentData.appointmentTime,

                concern:
                    appointmentData.concern

            }


            // CALL BOOKING API

            const response = await bookAppointmentAPI(reqBody)


            console.log('BOOKING RESPONSE:', response.data)


            if (
                response.status === 200 ||
                response.status === 201 ||
                response.data?.success
            ) {

                // EXTRACT APPOINTMENT ID

                const newAppointmentId =
                    extractAppointmentId(response.data)


                if (!newAppointmentId) {

                    setMessage({

                        type: 'danger',

                        text: 'Appointment response received, but appointment ID is missing. Please check the backend response.'

                    })

                    return

                }


                // SAVE APPOINTMENT ID

                setAppointmentId(newAppointmentId)

                setPaymentCompleted(false)

                setPaymentDetails(null)


                setMessage({

                    type: 'success',

                    text: 'Appointment created successfully! Please complete your payment below.'

                })

            }

            else {

                setMessage({

                    type: 'danger',

                    text: response.data?.message ||
                        'Appointment booking failed.'

                })

            }

        }

        catch (error) {

            console.log('Appointment Booking Error:', error)

            setMessage({

                type: 'danger',

                text: error.response?.data?.message ||
                    'Something went wrong. Please try again.'

            })

        }

        finally {

            setBookingLoading(false)

        }

    }


    // ========================================
    // HANDLE PAYMENT
    // ========================================

    const handlePayment = async () => {

        if (!appointmentId) {

            setMessage({

                type: 'danger',

                text: 'Appointment ID not found.'

            })

            return

        }


        try {

            setPaymentLoading(true)

            setMessage({
                type: '',
                text: ''
            })


            const reqBody = {

                appointmentId: appointmentId,

                paymentMethod: paymentMethod

            }


            // CALL PAYMENT API

            const response = await createPaymentAPI(reqBody)


            console.log('PAYMENT RESPONSE:', response.data)


            if (
                response.data?.success ||
                response.data?.payment?.paymentStatus === 'Success'
            ) {

                setPaymentCompleted(true)

                setPaymentDetails(response.data?.payment || null)


                setMessage({

                    type: 'success',

                    text: 'Payment completed successfully! Your appointment is waiting for veterinarian approval.'

                })


                // RESET FORM

                setAppointmentData({

                    petId: '',
                    service: '',
                    veterinarianId: '',
                    appointmentType: 'Clinic Visit',
                    appointmentDate: '',
                    appointmentTime: '',
                    concern: ''

                })

            }

            else {

                setMessage({

                    type: 'danger',

                    text: response.data?.message ||
                        'Payment failed. Please try again.'

                })

            }

        }

        catch (error) {

            console.log('Payment Error:', error)

            setMessage({

                type: 'danger',

                text: error.response?.data?.message ||
                    'Payment processing failed. Please try again.'

            })

        }

        finally {

            setPaymentLoading(false)

        }

    }


    // ========================================
    // RESET FOR ANOTHER BOOKING
    // ========================================

    const handleNewBooking = () => {

        setAppointmentId('')

        setPaymentCompleted(false)

        setPaymentDetails(null)

        setPaymentMethod('UPI')

        setAppointmentData({

            petId: '',
            service: '',
            veterinarianId: '',
            appointmentType: 'Clinic Visit',
            appointmentDate: '',
            appointmentTime: '',
            concern: ''

        })

        setMessage({
            type: '',
            text: ''
        })

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }


    // ========================================
    // DESIGN
    // ========================================

    return (

        <div style={{
            backgroundColor: '#F7F9F5',
            minHeight: '100vh'
        }}>


            {/* HEADER AND HERO */}

            <div
                className="py-2"
                style={{
                    backgroundColor: '#315A3D',
                    color: 'white'
                }}
            >

                <Header />

                <div className="container py-5">

                    <span className="badge rounded-pill px-3 py-2 mb-3"
                        style={{
                            backgroundColor: '#456D4D',
                            color: '#E1F0DC'
                        }}
                    >
                        PETCARE APPOINTMENTS
                    </span>

                    <h1 className="fw-bold mb-3">
                        Book a Visit for Your Furry Friend
                    </h1>

                    <p style={{
                        color: '#D5E4D5',
                        lineHeight: '1.8',
                        maxWidth: '600px'
                    }}>
                        Your pet deserves the best care.
                        Schedule an appointment with our veterinary team
                        and keep your companion healthy and happy.
                    </p>

                </div>

            </div>


            {/* MAIN SECTION */}

            <div className="container py-5">

                <div className="row g-4">


                    {/* LEFT SIDE */}

                    <div className="col-lg-8">

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body p-4 p-md-5">

                                <h3 className="fw-bold mb-2"
                                    style={{ color: '#315A3D' }}
                                >
                                    Book an Appointment
                                </h3>

                                <p className="text-muted mb-4">
                                    Fill in the details below to schedule your visit.
                                </p>


                                {/* MESSAGE */}

                                {message.text && (

                                    <div className={`alert alert-${message.type} alert-dismissible fade show`}>

                                        {message.text}

                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setMessage({
                                                type: '',
                                                text: ''
                                            })}
                                        />

                                    </div>

                                )}


                                {/* APPOINTMENT FORM */}

                                <form onSubmit={handleBooking}>


                                    {/* PET AND SERVICE */}

                                    <h6 className="fw-bold mb-3">
                                        Pet & Service Details
                                    </h6>

                                    <div className="row g-3 mb-4">

                                        <div className="col-md-6">

                                            <label className="form-label fw-semibold">
                                                Select Your Pet
                                            </label>

                                            <select
                                                className="form-select py-2"
                                                name="petId"
                                                value={appointmentData.petId}
                                                onChange={handleChange}
                                                disabled={loadingPets || !!appointmentId}
                                            >

                                                <option value="">
                                                    {loadingPets ? 'Loading pets...' : 'Choose your pet'}
                                                </option>

                                                {pets.map(pet => (

                                                    <option key={pet._id} value={pet._id}>
                                                        {pet.name || pet.petName}
                                                    </option>

                                                ))}

                                            </select>

                                            {!loadingPets && pets.length === 0 && (
                                                <small className="text-danger">
                                                    No registered pets found.
                                                </small>
                                            )}

                                        </div>


                                        <div className="col-md-6">

                                            <label className="form-label fw-semibold">
                                                Select Service
                                            </label>

                                            <select
                                                className="form-select py-2"
                                                name="service"
                                                value={appointmentData.service}
                                                onChange={handleChange}
                                                disabled={loadingServices || !!appointmentId}
                                            >

                                                <option value="">
                                                    {loadingServices ? 'Loading services...' : 'Choose a service'}
                                                </option>

                                                {services.map(service => (

                                                    <option key={service._id} value={service.name}>
                                                        {service.name} - ₹{service.price}
                                                    </option>

                                                ))}

                                            </select>

                                        </div>

                                    </div>


                                    {/* SERVICE DETAILS */}

                                    {selectedService && (

                                        <div className="rounded-3 p-3 mb-4"
                                            style={{
                                                backgroundColor: '#EAF2E7',
                                                border: '1px solid #C8DDC2'
                                            }}
                                        >

                                            <h6 className="fw-bold"
                                                style={{ color: '#315A3D' }}
                                            >
                                                Selected Service
                                            </h6>

                                            <div className="d-flex justify-content-between align-items-center">

                                                <span className="fw-semibold">
                                                    {selectedService.name}
                                                </span>

                                                <h5 className="fw-bold mb-0"
                                                    style={{ color: '#315A3D' }}
                                                >
                                                    ₹{selectedService.price}
                                                </h5>

                                            </div>

                                            <p className="small text-muted mt-2 mb-0">
                                                {selectedService.description}
                                            </p>

                                        </div>

                                    )}


                                    {/* VETERINARIAN */}

                                    <h6 className="fw-bold mb-3">
                                        Veterinarian Details
                                    </h6>

                                    <div className="row g-3 mb-4">

                                        <div className="col-md-6">

                                            <label className="form-label fw-semibold">
                                                Choose Veterinarian
                                            </label>

                                            <select
                                                className="form-select py-2"
                                                name="veterinarianId"
                                                value={appointmentData.veterinarianId}
                                                onChange={handleChange}
                                                disabled={loadingVets || !!appointmentId}
                                            >

                                                <option value="">
                                                    Any Available Veterinarian
                                                </option>

                                                {veterinarians.map(vet => (

                                                    <option key={vet._id} value={vet._id}>
                                                        {vet.name}
                                                    </option>

                                                ))}

                                            </select>

                                        </div>


                                        <div className="col-md-6">

                                            <label className="form-label fw-semibold">
                                                Appointment Type
                                            </label>

                                            <select
                                                className="form-select py-2"
                                                name="appointmentType"
                                                value={appointmentData.appointmentType}
                                                onChange={handleChange}
                                                disabled={!!appointmentId}
                                            >

                                                {appointmentTypes.map(type => (

                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>

                                                ))}

                                            </select>

                                        </div>

                                    </div>


                                    {/* DATE AND TIME */}

                                    <h6 className="fw-bold mb-3">
                                        Date & Time
                                    </h6>

                                    <div className="row g-3 mb-4">

                                        <div className="col-md-6">

                                            <label className="form-label fw-semibold">
                                                Appointment Date
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control py-2"
                                                name="appointmentDate"
                                                value={appointmentData.appointmentDate}
                                                min={minDate}
                                                onChange={handleChange}
                                                disabled={!!appointmentId}
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label className="form-label fw-semibold">
                                                Preferred Time
                                            </label>

                                            <select
                                                className="form-select py-2"
                                                name="appointmentTime"
                                                value={appointmentData.appointmentTime}
                                                onChange={handleChange}
                                                disabled={!!appointmentId}
                                            >

                                                <option value="">
                                                    Choose a time slot
                                                </option>

                                                {timeSlots.map(time => (

                                                    <option key={time} value={time}>
                                                        {time}
                                                    </option>

                                                ))}

                                            </select>

                                        </div>

                                    </div>


                                    {/* CONCERN */}

                                    <h6 className="fw-bold mb-3">
                                        Additional Information
                                    </h6>

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Describe Your Pet's Concern
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            name="concern"
                                            value={appointmentData.concern}
                                            onChange={handleChange}
                                            disabled={!!appointmentId}
                                            placeholder="Describe your pet's symptoms or requirements..."
                                        />

                                    </div>


                                    {/* CONFIRMATION */}

                                    <div className="form-check mb-4">

                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="confirm"
                                            required
                                            disabled={!!appointmentId}
                                        />

                                        <label className="form-check-label small text-muted"
                                            htmlFor="confirm"
                                        >
                                            I confirm that the information provided is correct.
                                        </label>

                                    </div>


                                    {/* BOOK BUTTON */}

                                    <button
                                        type="submit"
                                        className="btn w-100 py-3 rounded-3 fw-bold"
                                        style={{
                                            backgroundColor: '#315A3D',
                                            color: 'white'
                                        }}
                                        disabled={
                                            bookingLoading ||
                                            !!appointmentId ||
                                            loadingPets ||
                                            loadingServices ||
                                            pets.length === 0 ||
                                            services.length === 0
                                        }
                                    >

                                        {bookingLoading ? 'Booking Appointment...' : 'Book Appointment'}

                                    </button>

                                </form>


                                {/* ========================================
                                    PAYMENT SECTION
                                ======================================== */}

                                {appointmentId && !paymentCompleted && (

                                    <div
                                        ref={paymentSectionRef}
                                        className="rounded-4 p-4 mt-4"
                                        style={{
                                            backgroundColor: '#EAF2E7',
                                            border: '2px solid #A8D5A2'
                                        }}
                                    >

                                        <div className="d-flex align-items-center gap-2 mb-3">

                                            <span style={{ fontSize: '25px' }}>
                                                💳
                                            </span>

                                            <h4 className="fw-bold mb-0"
                                                style={{ color: '#315A3D' }}
                                            >
                                                Complete Your Payment
                                            </h4>

                                        </div>


                                        <div className="alert alert-success">

                                            Appointment successfully created!

                                            <br />

                                            Please complete your payment to proceed.

                                        </div>


                                        <label className="form-label fw-semibold">
                                            Select Payment Method
                                        </label>

                                        <select
                                            className="form-select py-3 mb-4"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >

                                            <option value="UPI">
                                                UPI
                                            </option>

                                            <option value="Credit Card">
                                                Credit Card
                                            </option>

                                            <option value="Debit Card">
                                                Debit Card
                                            </option>

                                        </select>


                                        <div className="bg-white rounded-3 p-3 mb-4">

                                            <div className="d-flex justify-content-between">

                                                <span className="fw-semibold">
                                                    Service
                                                </span>

                                                <span>
                                                    {appointmentData.service}
                                                </span>

                                            </div>

                                            <hr />

                                            <div className="d-flex justify-content-between align-items-center">

                                                <h5 className="fw-bold mb-0">
                                                    Total Amount
                                                </h5>

                                                <h4 className="fw-bold mb-0"
                                                    style={{ color: '#315A3D' }}
                                                >
                                                    ₹{selectedService?.price ?? '---'}
                                                </h4>

                                            </div>

                                        </div>


                                        <button
                                            type="button"
                                            className="btn w-100 py-3 fw-bold rounded-3"
                                            style={{
                                                backgroundColor: '#315A3D',
                                                color: 'white'
                                            }}
                                            onClick={handlePayment}
                                            disabled={paymentLoading}
                                        >

                                            {paymentLoading ? (

                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" />
                                                    Processing Payment...
                                                </>

                                            ) : (

                                                `Pay ₹${selectedService?.price ?? ''} Now`

                                            )}

                                        </button>


                                        <p className="text-muted text-center small mt-3 mb-0">
                                            Demo payment only. No real money will be deducted.
                                        </p>

                                    </div>

                                )}


                                {/* ========================================
                                    PAYMENT SUCCESS
                                ======================================== */}

                                {paymentCompleted && (

                                    <div className="rounded-4 p-4 mt-4 text-center"
                                        style={{
                                            backgroundColor: '#EAF2E7',
                                            border: '1px solid #C8DDC2'
                                        }}
                                    >

                                        <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                            style={{
                                                width: '70px',
                                                height: '70px',
                                                backgroundColor: '#315A3D',
                                                color: 'white',
                                                fontSize: '35px'
                                            }}
                                        >
                                            ✓
                                        </div>


                                        <h3 className="fw-bold"
                                            style={{ color: '#315A3D' }}
                                        >
                                            Payment Successful!
                                        </h3>


                                        <p className="text-muted">
                                            Your payment has been completed successfully.
                                        </p>


                                        {paymentDetails && (

                                            <div className="bg-white rounded-3 p-3 text-start mb-3">

                                                <p>
                                                    <strong>Transaction ID:</strong>
                                                    <br />
                                                    {paymentDetails.transactionId}
                                                </p>

                                                <p>
                                                    <strong>Payment Method:</strong>
                                                    <br />
                                                    {paymentDetails.paymentMethod}
                                                </p>

                                                <p className="mb-0">
                                                    <strong>Amount:</strong>
                                                    <br />
                                                    ₹{paymentDetails.amount}
                                                </p>

                                            </div>

                                        )}


                                        <span className="badge rounded-pill px-3 py-2"
                                            style={{
                                                backgroundColor: '#315A3D',
                                                color: 'white'
                                            }}
                                        >
                                            Appointment Status: Pending
                                        </span>


                                        <p className="text-muted small mt-3">
                                            Your appointment is waiting for veterinarian approval.
                                        </p>


                                        <button
                                            type="button"
                                            className="btn btn-outline-success w-100 mt-3 py-2"
                                            onClick={handleNewBooking}
                                        >
                                            Book Another Appointment
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* RIGHT SIDE */}

                    <div className="col-lg-4">

                        <div className="card border-0 shadow-sm rounded-4 mb-4"
                            style={{ backgroundColor: '#EAF2E7' }}
                        >

                            <div className="card-body p-4">

                                <h5 className="fw-bold mb-4"
                                    style={{ color: '#315A3D' }}
                                >
                                    Why Choose PETCARE?
                                </h5>

                                <h6 className="fw-bold">
                                    Trusted Veterinary Care
                                </h6>

                                <p className="text-muted small mb-4">
                                    Professional attention for your pet's health and wellness.
                                </p>

                                <h6 className="fw-bold">
                                    Easy Scheduling
                                </h6>

                                <p className="text-muted small mb-4">
                                    Choose a convenient date and time for your pet's visit.
                                </p>

                                <h6 className="fw-bold">
                                    Organized Health Records
                                </h6>

                                <p className="text-muted small mb-0">
                                    Keep your pet's appointments and medical information organized.
                                </p>

                            </div>

                        </div>


                        <div className="card border-0 shadow-sm rounded-4 mb-4">

                            <div className="card-body p-4">

                                <h5 className="fw-bold mb-4"
                                    style={{ color: '#315A3D' }}
                                >
                                    How It Works
                                </h5>

                                {[
                                    'Choose Your Pet',
                                    'Select a Veterinary Service',
                                    'Pick a Date and Time',
                                    'Complete Payment'
                                ].map((step, index) => (

                                    <div className="d-flex gap-3 mb-4" key={index}>

                                        <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                                            style={{
                                                width: '38px',
                                                height: '38px',
                                                backgroundColor: '#E4F0E0',
                                                color: '#315A3D'
                                            }}
                                        >
                                            {index + 1}
                                        </div>

                                        <div className="fw-semibold pt-2">
                                            {step}
                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>


                        <div className="rounded-4 p-4 text-white"
                            style={{ backgroundColor: '#315A3D' }}
                        >

                            <h5 className="fw-bold mb-2">
                                Need Assistance?
                            </h5>

                            <p className="small mb-3"
                                style={{ color: '#D5E4D5' }}
                            >
                                Have questions before booking? Contact our team.
                            </p>

                            <button
                                type="button"
                                className="btn btn-light rounded-3 fw-semibold"
                                style={{ color: '#315A3D' }}
                                onClick={() => window.location.href = '/contact'}
                            >
                                Contact Us
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* FOOTER */}

            <Footer />

        </div>

    )

}

export default BookAppointment