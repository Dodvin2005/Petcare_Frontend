import React, { useEffect, useState } from 'react'
import VetSidebar from '../Component/VetSidebar'

import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaPaw,
  FaCheck,
  FaTimes,
  FaUser,
  FaPhoneAlt,
  FaStethoscope,
  FaClipboardList,
  FaSyncAlt
} from 'react-icons/fa'

import { toast } from 'react-toastify'

import {
  getVetAppointmentsAPI,
  acceptAppointmentAPI,
  rejectAppointmentAPI
} from '../../../Services/AllApi'


function AppointmentRequests() {

  const [requests, setRequests] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)


  // Get appointments assigned to logged-in veterinarian
  const fetchAppointments = async () => {

    try {

      setLoading(true)

      const response = await getVetAppointmentsAPI()

      console.log('Veterinarian Appointments:', response)

      const data = response.data

      const appointments = Array.isArray(data)
        ? data
        : data?.appointments ||
          data?.requests ||
          data?.data ||
          []

      setRequests(Array.isArray(appointments) ? appointments : [])

    } catch (error) {

      console.error('Appointment fetching error:', error)

      toast.error(
        error.response?.data?.message ||
        'Unable to load appointment requests'
      )

      setRequests([])

    } finally {

      setLoading(false)

    }

  }


  // Load appointments when page opens
  useEffect(() => {

    fetchAppointments()

  }, [])


  // Get pet information
  const getPet = (request) => {

    return request.petId && typeof request.petId === 'object'
      ? request.petId
      : request.pet || {}

  }


  // Get owner information
  const getOwner = (request) => {

    return request.userId && typeof request.userId === 'object'
      ? request.userId
      : request.ownerId && typeof request.ownerId === 'object'
        ? request.ownerId
        : request.owner || {}

  }


  // Format date
  const formatDate = (date) => {

    if (!date) return 'Not available'

    const formattedDate = new Date(date)

    if (isNaN(formattedDate.getTime())) {
      return date
    }

    return formattedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })

  }


  // Get appointment date and time
  const formatTime = (time) => {

    if (!time) return 'Not available'

    // Handle time values such as 10:30 or 10:30 AM
    if (typeof time === 'string' && time.includes(':')) {

      const [hours, minutes] = time.split(':')
      const hour = parseInt(hours)

      if (!isNaN(hour) && hour >= 0 && hour <= 23) {

        const period = hour >= 12 ? 'PM' : 'AM'
        const formattedHour = hour % 12 || 12

        return `${formattedHour}:${minutes.slice(0, 2)} ${period}`

      }

    }

    return time

  }


  // Accept appointment
  const handleAccept = async (id) => {

    try {

      setActionLoading(id)

      const response = await acceptAppointmentAPI(id)

      toast.success(
        response.data?.message || 'Appointment accepted successfully'
      )

      await fetchAppointments()

    } catch (error) {

      console.error('Accept appointment error:', error)

      toast.error(
        error.response?.data?.message ||
        'Unable to accept appointment'
      )

    } finally {

      setActionLoading(null)

    }

  }


  // Reject appointment
  const handleReject = async (id) => {

    try {

      setActionLoading(id)

      const response = await rejectAppointmentAPI(id)

      toast.success(
        response.data?.message || 'Appointment rejected successfully'
      )

      await fetchAppointments()

    } catch (error) {

      console.error('Reject appointment error:', error)

      toast.error(
        error.response?.data?.message ||
        'Unable to reject appointment'
      )

    } finally {

      setActionLoading(null)

    }

  }


  // Search and filter appointments
  const filteredRequests = requests.filter(request => {

    const pet = getPet(request)
    const owner = getOwner(request)

    const petName = pet.petName || pet.name || request.petName || ''
    const ownerName = owner.name || owner.username || request.ownerName || ''
    const reason = request.concern || request.reason || request.service || ''
    const breed = pet.breed || request.breed || ''

    const searchText = search.toLowerCase()

    const matchesSearch =
      petName.toLowerCase().includes(searchText) ||
      ownerName.toLowerCase().includes(searchText) ||
      reason.toLowerCase().includes(searchText) ||
      breed.toLowerCase().includes(searchText)

    const matchesFilter =
      filter === 'All' ||
      (request.status || '').toLowerCase() === filter.toLowerCase()

    return matchesSearch && matchesFilter

  })


  // Statistics
  const pendingCount = requests.filter(
    request => request.status?.toLowerCase() === 'pending'
  ).length

  const acceptedCount = requests.filter(
    request => request.status?.toLowerCase() === 'accepted'
  ).length

  const rejectedCount = requests.filter(
    request => request.status?.toLowerCase() === 'rejected'
  ).length


  const cardStyle = {
    background: '#FFFFFF',
    border: '1px solid #E7EEE5',
    borderRadius: '18px'
  }


  const statCards = [
    {
      title: 'Total Requests',
      value: requests.length,
      icon: <FaClipboardList />,
      color: '#477A54',
      bg: '#E7F2E8'
    },
    {
      title: 'Pending Requests',
      value: pendingCount,
      icon: <FaClock />,
      color: '#C28A32',
      bg: '#FFF3D9'
    },
    {
      title: 'Accepted',
      value: acceptedCount,
      icon: <FaCheck />,
      color: '#39845B',
      bg: '#E4F4E8'
    },
    {
      title: 'Rejected',
      value: rejectedCount,
      icon: <FaTimes />,
      color: '#C65D5D',
      bg: '#FCEAEA'
    }
  ]


  return (

    <div style={{ background: '#F5F8F3', minHeight: '100vh' }}>

      <VetSidebar />

      <main
        className="p-3 p-md-4 p-xl-5"
        style={{
          marginLeft: '320px',
          minHeight: '100vh'
        }}
      >

        {/* Page Heading */}

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

          <div>

            <p
              className="mb-2"
              style={{
                color: '#709078',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '2px'
              }}
            >
              VETERINARIAN PORTAL
            </p>

            <h2
              className="fw-bold mb-2"
              style={{ color: '#304B38', fontSize: '30px' }}
            >
              Appointment Requests
            </h2>

            <p className="mb-0" style={{ color: '#859187' }}>
              Review and manage appointment requests from pet owners.
            </p>

          </div>


          <button
            onClick={fetchAppointments}
            disabled={loading}
            className="btn d-flex align-items-center gap-2"
            style={{
              background: '#E7F2E8',
              color: '#477A54',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '600',
              padding: '12px 18px'
            }}
          >
            <FaSyncAlt />
            Refresh
          </button>

        </div>


        {/* Statistics */}

        <div className="row g-3 mb-4">

          {statCards.map((card, index) => (

            <div className="col-12 col-sm-6 col-xl-3" key={index}>

              <div
                className="p-4 h-100"
                style={cardStyle}
              >

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p
                      className="mb-2"
                      style={{
                        color: '#879187',
                        fontSize: '13px'
                      }}
                    >
                      {card.title}
                    </p>

                    <h3
                      className="fw-bold mb-0"
                      style={{ color: '#304B38' }}
                    >
                      {card.value}
                    </h3>

                  </div>

                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '15px',
                      background: card.bg,
                      color: card.color,
                      fontSize: '19px'
                    }}
                  >
                    {card.icon}
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* Requests Section */}

        <div className="p-3 p-md-4" style={cardStyle}>

          {/* Search and Filter */}

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

            <div>

              <h5
                className="fw-bold mb-1"
                style={{ color: '#304B38' }}
              >
                Recent Requests
              </h5>

              <small style={{ color: '#89958B' }}>
                Review the details before confirming an appointment.
              </small>

            </div>


            <div className="d-flex flex-wrap gap-2">

              <div
                className="d-flex align-items-center px-3"
                style={{
                  background: '#F8FAF7',
                  border: '1px solid #E4EBE1',
                  borderRadius: '10px',
                  minWidth: '220px'
                }}
              >

                <FaSearch style={{ color: '#91A093' }} />

                <input
                  type="text"
                  className="form-control border-0 shadow-none"
                  placeholder="Search pet or owner..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    background: 'transparent',
                    fontSize: '13px',
                    padding: '12px'
                  }}
                />

              </div>


              <select
                className="form-select shadow-none"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{
                  width: '150px',
                  borderRadius: '10px',
                  borderColor: '#E4EBE1',
                  fontSize: '13px',
                  color: '#526253'
                }}
              >

                <option value="All">All Requests</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>

              </select>

            </div>

          </div>


          {/* Loading */}

          {loading ? (

            <div className="text-center py-5">

              <div
                className="spinner-border"
                style={{ color: '#477A54' }}
              />

              <p className="mt-3 mb-0" style={{ color: '#89958B' }}>
                Loading appointment requests...
              </p>

            </div>

          ) : (


            /* Appointment Cards */

            <div className="row g-3">

              {filteredRequests.length > 0 ? (

                filteredRequests.map(request => {

                  const pet = getPet(request)
                  const owner = getOwner(request)

                  const petName =
                    pet.petName ||
                    pet.name ||
                    request.petName ||
                    'Unknown Pet'

                  const breed =
                    pet.breed ||
                    request.breed ||
                    'Breed not available'

                  const ownerName =
                    owner.name ||
                    owner.username ||
                    request.ownerName ||
                    'Unknown Owner'

                  const phone =
                    owner.phone ||
                    owner.phoneNumber ||
                    request.phone ||
                    'Not available'

                  const appointmentDate =
                    request.appointmentDate ||
                    request.date

                  const appointmentTime =
                    request.appointmentTime ||
                    request.time

                  const reason =
                    request.concern ||
                    request.reason ||
                    request.service ||
                    'Not specified'

                  const status = request.status || 'Pending'

                  const appointmentId = request._id || request.id

                  return (

                    <div
                      className="col-12 col-xl-6"
                      key={appointmentId}
                    >

                      <div
                        className="p-3 p-md-4 h-100"
                        style={{
                          border: '1px solid #E7EEE5',
                          borderRadius: '16px',
                          background: '#FFFFFF'
                        }}
                      >

                        {/* Pet Information */}

                        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">

                          <div className="d-flex align-items-center gap-3">

                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{
                                width: '55px',
                                height: '55px',
                                flexShrink: 0,
                                borderRadius: '16px',
                                background: '#E7F2E8',
                                color: '#477A54',
                                fontSize: '23px'
                              }}
                            >
                              <FaPaw />
                            </div>

                            <div>

                              <h5
                                className="fw-bold mb-1"
                                style={{ color: '#304B38' }}
                              >
                                {petName}
                              </h5>

                              <p
                                className="mb-0"
                                style={{
                                  color: '#89958B',
                                  fontSize: '13px'
                                }}
                              >
                                {breed}
                              </p>

                            </div>

                          </div>


                          <span
                            className="badge px-3 py-2"
                            style={{
                              background:
                                status.toLowerCase() === 'pending'
                                  ? '#FFF3D9'
                                  : status.toLowerCase() === 'accepted'
                                    ? '#E4F4E8'
                                    : '#FCEAEA',

                              color:
                                status.toLowerCase() === 'pending'
                                  ? '#B78029'
                                  : status.toLowerCase() === 'accepted'
                                    ? '#39845B'
                                    : '#C65D5D',

                              borderRadius: '8px',
                              fontSize: '11px'
                            }}
                          >
                            {status}
                          </span>

                        </div>


                        <hr style={{ borderColor: '#EDF1EA' }} />


                        {/* Owner and Appointment Details */}

                        <div className="row g-3 mb-3">

                          <div className="col-12 col-sm-6">

                            <div className="d-flex gap-2 align-items-start">

                              <FaUser
                                className="mt-1"
                                style={{ color: '#83B99A' }}
                              />

                              <div>

                                <small
                                  className="d-block"
                                  style={{ color: '#929C93' }}
                                >
                                  Pet Owner
                                </small>

                                <span
                                  className="fw-semibold"
                                  style={{
                                    color: '#455448',
                                    fontSize: '13px'
                                  }}
                                >
                                  {ownerName}
                                </span>

                              </div>

                            </div>

                          </div>


                          <div className="col-12 col-sm-6">

                            <div className="d-flex gap-2 align-items-start">

                              <FaPhoneAlt
                                className="mt-1"
                                style={{ color: '#83B99A' }}
                              />

                              <div>

                                <small
                                  className="d-block"
                                  style={{ color: '#929C93' }}
                                >
                                  Contact
                                </small>

                                <span
                                  className="fw-semibold"
                                  style={{
                                    color: '#455448',
                                    fontSize: '13px'
                                  }}
                                >
                                  {phone}
                                </span>

                              </div>

                            </div>

                          </div>


                          <div className="col-12 col-sm-6">

                            <div className="d-flex gap-2 align-items-start">

                              <FaCalendarAlt
                                className="mt-1"
                                style={{ color: '#83B99A' }}
                              />

                              <div>

                                <small
                                  className="d-block"
                                  style={{ color: '#929C93' }}
                                >
                                  Appointment Date
                                </small>

                                <span
                                  className="fw-semibold"
                                  style={{
                                    color: '#455448',
                                    fontSize: '13px'
                                  }}
                                >
                                  {formatDate(appointmentDate)}
                                </span>

                              </div>

                            </div>

                          </div>


                          <div className="col-12 col-sm-6">

                            <div className="d-flex gap-2 align-items-start">

                              <FaClock
                                className="mt-1"
                                style={{ color: '#83B99A' }}
                              />

                              <div>

                                <small
                                  className="d-block"
                                  style={{ color: '#929C93' }}
                                >
                                  Appointment Time
                                </small>

                                <span
                                  className="fw-semibold"
                                  style={{
                                    color: '#455448',
                                    fontSize: '13px'
                                  }}
                                >
                                  {formatTime(appointmentTime)}
                                </span>

                              </div>

                            </div>

                          </div>

                        </div>


                        {/* Appointment Reason */}

                        <div
                          className="p-3 mb-3"
                          style={{
                            background: '#F7FAF6',
                            borderRadius: '11px'
                          }}
                        >

                          <div className="d-flex align-items-center gap-2 mb-1">

                            <FaStethoscope style={{ color: '#477A54' }} />

                            <small
                              className="fw-semibold"
                              style={{ color: '#7E8A7F' }}
                            >
                              Reason for Visit
                            </small>

                          </div>

                          <p
                            className="mb-0 fw-semibold"
                            style={{
                              color: '#405443',
                              fontSize: '14px'
                            }}
                          >
                            {reason}
                          </p>

                        </div>


                        {/* Appointment Type */}

                        {request.appointmentType && (

                          <p
                            className="mb-3"
                            style={{
                              color: '#89958B',
                              fontSize: '12px'
                            }}
                          >
                            Appointment Type:{' '}
                            <strong style={{ color: '#455448' }}>
                              {request.appointmentType}
                            </strong>
                          </p>

                        )}


                        {/* Action Buttons */}

                        {status.toLowerCase() === 'pending' ? (

                          <div className="d-flex gap-2">

                            <button
                              className="btn flex-grow-1 d-flex justify-content-center align-items-center gap-2"
                              onClick={() => handleAccept(appointmentId)}
                              disabled={actionLoading === appointmentId}
                              style={{
                                background: '#477A54',
                                color: '#FFFFFF',
                                borderRadius: '10px',
                                padding: '11px',
                                fontSize: '13px',
                                fontWeight: '600'
                              }}
                            >

                              {actionLoading === appointmentId
                                ? 'Please wait...'
                                : <><FaCheck /> Accept Request</>
                              }

                            </button>


                            <button
                              className="btn d-flex justify-content-center align-items-center gap-2"
                              onClick={() => handleReject(appointmentId)}
                              disabled={actionLoading === appointmentId}
                              style={{
                                background: '#FFF1F0',
                                color: '#C65D5D',
                                border: '1px solid #F5DDDA',
                                borderRadius: '10px',
                                padding: '11px 18px',
                                fontSize: '13px',
                                fontWeight: '600'
                              }}
                            >

                              <FaTimes />
                              Reject

                            </button>

                          </div>

                        ) : (

                          <div
                            className="text-center py-2"
                            style={{
                              background:
                                status.toLowerCase() === 'accepted'
                                  ? '#EAF5EC'
                                  : '#FFF0EF',

                              color:
                                status.toLowerCase() === 'accepted'
                                  ? '#39845B'
                                  : '#C65D5D',

                              borderRadius: '10px',
                              fontSize: '13px',
                              fontWeight: '600'
                            }}
                          >

                            {status.toLowerCase() === 'accepted'
                              ? '✓ Appointment request accepted'
                              : status.toLowerCase() === 'rejected'
                                ? '✕ Appointment request rejected'
                                : `Appointment status: ${status}`
                            }

                          </div>

                        )}

                      </div>

                    </div>

                  )

                })

              ) : (

                <div className="col-12 text-center py-5">

                  <div
                    className="d-inline-flex justify-content-center align-items-center mb-3"
                    style={{
                      width: '65px',
                      height: '65px',
                      borderRadius: '20px',
                      background: '#E7F2E8',
                      color: '#477A54',
                      fontSize: '25px'
                    }}
                  >
                    <FaPaw />
                  </div>

                  <h5
                    className="fw-bold"
                    style={{ color: '#304B38' }}
                  >
                    No appointment requests found
                  </h5>

                  <p
                    className="mb-0"
                    style={{ color: '#89958B' }}
                  >
                    Try changing your search or status filter.
                  </p>

                </div>

              )}

            </div>

          )}

        </div>


        {/* Footer */}

        <div className="text-center mt-4">

          <small style={{ color: '#9AA59A' }}>
            PETCARE. — Making pet care simple, organized and reliable.
          </small>

        </div>

      </main>

    </div>

  )

}

export default AppointmentRequests