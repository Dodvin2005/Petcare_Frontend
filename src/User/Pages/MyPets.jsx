import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { ToastContainer, toast } from 'react-toastify'


import {
  getMyPetsAPI,
  updatePetAPI,
  deletePetAPI
} from '../../../Services/AllApi'

function MyPets() {

  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Pets')
  const [error, setError] = useState('')

  // Edit states
  const [editPet, setEditPet] = useState(null)
  const [updating, setUpdating] = useState(false)

  // Delete state
  const [deletingId, setDeletingId] = useState(null)

  // Edit form data
  const [editData, setEditData] = useState({
    petName: '',
    petType: '',
    breed: '',
    gender: '',
    dateOfBirth: '',
    weight: '',
    colour: '',
    identificationNumber: '',
    vaccinationStatus: '',
    lastVaccinationDate: '',
    existingMedicalConditions: '',
    medicalHistory: '',
    neuteredOrSpayed: '',
    status: '',
    additionalNotes: ''
  })


  // Get token
  const getToken = () => {

    return (
      localStorage.getItem('token') ||
      sessionStorage.getItem('token')
    )

  }


  // Fetch logged-in user's pets
  const getMyPets = async () => {

    try {

      setLoading(true)
      setError('')

      const token = getToken()

      if (!token) {

        setError('Please login to view your pets')
        setPets([])
        return

      }

      const result = await getMyPetsAPI(token)

      if (result.status === 200 && result.data.success) {

        setPets(result.data.pets || [])

      } else {

        setPets([])

        setError(
          result.data.message || 'Unable to fetch pets'
        )

      }

    } catch (error) {

      console.log('Get My Pets Error:', error)

      setError(
        error.response?.data?.message ||
        'Something went wrong while fetching pets'
      )

    } finally {

      setLoading(false)

    }

  }


  useEffect(() => {

    getMyPets()

  }, [])


  // Search and category filter
  const filteredPets = pets.filter((pet) => {

    const searchValue = search.toLowerCase()

    const matchesSearch =
      pet.petName?.toLowerCase().includes(searchValue) ||
      pet.breed?.toLowerCase().includes(searchValue) ||
      pet.petType?.toLowerCase().includes(searchValue)

    const matchesCategory =
      category === 'All Pets' ||
      pet.petType?.toLowerCase() === category.toLowerCase()

    return matchesSearch && matchesCategory

  })


  // Dashboard statistics
  const totalPets = pets.length

  const vaccinatedPets = pets.filter(
    pet => pet.vaccinationStatus === 'Fully Vaccinated'
  ).length

  const healthRecords = pets.filter(
    pet => pet.medicalHistory || pet.existingMedicalConditions
  ).length


  // Format date
  const formatDate = (date) => {

    if (!date) return 'Not provided'

    const formattedDate = new Date(date)

    if (isNaN(formattedDate.getTime())) {
      return 'Not provided'
    }

    return formattedDate.toLocaleDateString('en-IN')

  }


  // Convert date for input field
  const getInputDate = (date) => {

    if (!date) return ''

    const formattedDate = new Date(date)

    if (isNaN(formattedDate.getTime())) {
      return ''
    }

    return formattedDate.toISOString().split('T')[0]

  }


  // Open edit form
  const handleEdit = (pet) => {

    setEditPet(pet)

    setEditData({

      petName: pet.petName || '',
      petType: pet.petType || '',
      breed: pet.breed || '',
      gender: pet.gender || '',

      dateOfBirth: getInputDate(pet.dateOfBirth),

      weight: pet.weight || '',
      colour: pet.colour || '',
      identificationNumber: pet.identificationNumber || '',

      vaccinationStatus: pet.vaccinationStatus || '',

      lastVaccinationDate: getInputDate(
        pet.lastVaccinationDate
      ),

      existingMedicalConditions:
        pet.existingMedicalConditions || '',

      medicalHistory: pet.medicalHistory || '',

      neuteredOrSpayed: pet.neuteredOrSpayed || '',

      status: pet.status || 'Active',

      additionalNotes: pet.additionalNotes || ''

    })

  }


  // Handle edit input changes
  const handleEditChange = (e) => {

    const { name, value } = e.target

    setEditData({

      ...editData,

      [name]: value

    })

  }


  // Update pet
  const handleUpdate = async (e) => {

    e.preventDefault()

    try {

      setUpdating(true)

      const token = getToken()

      if (!token) {

        alert('Please login to update pet details')
        return

      }

      const result = await updatePetAPI(
        editPet._id,
        editData,
        token
      )

      if (
        result.status === 200 ||
        result.status === 201
      ) {

        if (result.data.success) {

          alert('Pet details updated successfully!')

          setEditPet(null)

          getMyPets()

        } else {

          alert(
            result.data.message || 'Unable to update pet'
          )

        }

      } else {

        alert('Unable to update pet details')

      }

    } catch (error) {

      console.log('Update Pet Error:', error)

      alert(
        error.response?.data?.message ||
        'Something went wrong while updating pet'
      )

    } finally {

      setUpdating(false)

    }

  }


  // Delete pet
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this pet? This action cannot be undone.'
    )

    if (!confirmDelete) {
      return
    }

    try {

      setDeletingId(id)

      const token = getToken()

      if (!token) {

        alert('Please login to delete pet')
        return

      }

      const result = await deletePetAPI(id, token)

      if (
        result.status === 200 ||
        result.status === 204
      ) {

        if (
          result.status === 204 ||
          result.data.success
        ) {

          setPets(prevPets =>
            prevPets.filter(pet => pet._id !== id)
          )

          alert('Pet deleted successfully!')

        } else {

          alert(
            result.data.message || 'Unable to delete pet'
          )

        }

      } else {

        alert('Unable to delete pet')

      }

    } catch (error) {

      console.log('Delete Pet Error:', error)

      alert(
        error.response?.data?.message ||
        'Something went wrong while deleting pet'
      )

    } finally {

      setDeletingId(null)

    }

  }


  return (

    <div
      style={{
        backgroundColor: '#F5F8F3',
        minHeight: '100vh',
        color: '#263D2B'
      }}
    >

      <Header />

      <div className="container py-4 py-md-5">


        {/* WELCOME SECTION */}

        <div
          className="rounded-5 p-4 p-md-5 mb-5"
          style={{
            background: 'linear-gradient(135deg, #E1F0E2, #F5F8F3)',
            border: '1px solid #DCEBDD'
          }}
        >

          <div className="row align-items-center">

            <div className="col-lg-8">

              <span
                className="badge rounded-pill px-3 py-2 mb-3"
                style={{
                  backgroundColor: '#D0E8D1',
                  color: '#285D36'
                }}
              >
                YOUR PETCARE DASHBOARD
              </span>

              <h1
                className="fw-bold mb-3"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)'
                }}
              >

                Every Pet Deserves
                <br />

                <span style={{ color: '#438653' }}>
                  a Little More Love.
                </span>

              </h1>

              <p className="text-secondary mb-4">

                Manage your pets, vaccination details and
                medical information in one place.

              </p>

              <Link
                to="/pet-register"
                className="btn btn-success rounded-pill px-4 py-3 me-2"
                style={{
                  backgroundColor: '#397747',
                  border: 'none'
                }}
              >
                + Add Your Pet
              </Link>

              <Link
                to="/book-appointment"
                className="btn btn-outline-success rounded-pill px-4 py-3"
              >
                Book Appointment
              </Link>

            </div>

            <div className="col-lg-4 text-center mt-4 mt-lg-0">

              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{
                  width: '170px',
                  height: '170px',
                  backgroundColor: 'white',
                  fontSize: '75px'
                }}
              >
                🐕

              </div>

              <p className="text-success fw-semibold mt-3">
                Healthy Pets, Happy Hearts!
              </p>

            </div>

          </div>

        </div>


        {/* STATISTICS */}

        <div className="row g-4 mb-5">

          <div className="col-md-4">

            <div className="bg-white rounded-4 shadow-sm p-4">

              <p className="text-secondary mb-2">
                Total Pets
              </p>

              <h2 className="fw-bold">
                {totalPets.toString().padStart(2, '0')}
              </h2>

              <small className="text-secondary">
                Registered companions
              </small>

            </div>

          </div>

          <div className="col-md-4">

            <div className="bg-white rounded-4 shadow-sm p-4">

              <p className="text-secondary mb-2">
                Vaccinated Pets
              </p>

              <h2 className="fw-bold">
                {vaccinatedPets.toString().padStart(2, '0')}
              </h2>

              <small className="text-secondary">
                Fully vaccinated pets
              </small>

            </div>

          </div>

          <div className="col-md-4">

            <div className="bg-white rounded-4 shadow-sm p-4">

              <p className="text-secondary mb-2">
                Health Records
              </p>

              <h2 className="fw-bold">
                {healthRecords.toString().padStart(2, '0')}
              </h2>

              <small className="text-secondary">
                Pets with medical information
              </small>

            </div>

          </div>

        </div>


        {/* SEARCH AND FILTER */}

        <div className="bg-white rounded-4 shadow-sm p-4 mb-5">

          <h5 className="fw-bold mb-3">
            Find Your Pet
          </h5>

          <div className="row g-3">

            <div className="col-md-7">

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by pet name or breed..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <div className="col-md-3">

              <select
                className="form-select form-select-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >

                <option value="All Pets">All Pets</option>
                <option value="Dog">Dogs</option>
                <option value="Cat">Cats</option>
                <option value="Bird">Birds</option>
                <option value="Rabbit">Rabbits</option>
                <option value="Other">Other Pets</option>

              </select>

            </div>

            <div className="col-md-2">

              <button
                className="btn btn-outline-success btn-lg w-100"
                onClick={() => {
                  setSearch('')
                  setCategory('All Pets')
                }}
              >
                Clear
              </button>

            </div>

          </div>

        </div>


        {/* PET DETAILS HEADER */}

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

          <div>

            <span className="text-success fw-semibold small">
              YOUR COMPANIONS
            </span>

            <h3 className="fw-bold mt-2">
              Registered Pets
            </h3>

            <p className="text-secondary">
              Complete information about your registered pets.
            </p>

          </div>

          <div className="d-flex gap-2">

            <button
              className="btn btn-outline-success rounded-pill px-3"
              onClick={getMyPets}
              disabled={loading}
            >
              ↻ Refresh
            </button>

            <Link
              to="/pet-register"
              className="btn btn-success rounded-pill px-4"
              style={{
                backgroundColor: '#397747',
                border: 'none'
              }}
            >
              + Register Pet
            </Link>

          </div>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="text-center py-5">

            <div className="spinner-border text-success"></div>

            <p className="text-secondary mt-3">
              Fetching your pet details...
            </p>

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="alert alert-danger rounded-4">

            {error}

            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={getMyPets}
            >
              Retry
            </button>

          </div>

        )}


        {/* EMPTY DATA */}

        {!loading && !error && pets.length === 0 && (

          <div className="bg-white rounded-4 shadow-sm p-5 text-center">

            <h4 className="fw-bold">
              No Pets Registered
            </h4>

            <p className="text-secondary">
              Register your first pet to view its details here.
            </p>

            <Link
              to="/pet-register"
              className="btn btn-success rounded-pill px-4"
            >
              Register Your Pet
            </Link>

          </div>

        )}


        {/* PET TABLE */}

        {!loading && !error && pets.length > 0 && (

          <div className="bg-white rounded-4 shadow-sm overflow-hidden">

            {filteredPets.length > 0 ? (

              <>

                <div className="p-4 border-bottom">

                  <h5 className="fw-bold mb-1">
                    My Pet Information
                  </h5>

                  <small className="text-secondary">
                    Showing {filteredPets.length} of {pets.length} registered pets
                  </small>

                </div>

                <div className="table-responsive">

                  <table className="table table-hover align-middle mb-0">

                    <thead style={{ backgroundColor: '#EAF3E8' }}>

                      <tr>

                        <th className="p-3">Pet</th>
                        <th>Type</th>
                        <th>Breed</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Weight</th>
                        <th>Vaccination</th>
                        <th>Status</th>
                        <th>Actions</th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredPets.map((pet) => (

                        <tr key={pet._id}>

                          <td className="p-3">

                            <div className="d-flex align-items-center gap-3">

                              <img
                                src={
                                  pet.petImage
                                    ? pet.petImage.startsWith('http')
                                      ? pet.petImage
                                      : `http://localhost:3000/uploads/${pet.petImage}`
                                    : 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100'
                                }
                                alt={pet.petName}
                                className="rounded-circle"
                                style={{
                                  width: '48px',
                                  height: '48px',
                                  objectFit: 'cover'
                                }}
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100'
                                }}
                              />

                              <div>

                                <span className="fw-bold">
                                  {pet.petName}
                                </span>

                                <small className="d-block text-secondary">
                                  ID: {pet._id?.slice(-6)}
                                </small>

                              </div>

                            </div>

                          </td>

                          <td>{pet.petType || '-'}</td>

                          <td>{pet.breed || '-'}</td>

                          <td>{pet.gender || '-'}</td>

                          <td>{formatDate(pet.dateOfBirth)}</td>

                          <td>
                            {pet.weight ? `${pet.weight} kg` : '-'}
                          </td>

                          <td>

                            <span
                              className={`badge ${pet.vaccinationStatus === 'Fully Vaccinated'
                                  ? 'bg-success'
                                  : 'bg-warning text-dark'
                                }`}
                            >
                              {pet.vaccinationStatus || 'Not updated'}
                            </span>

                          </td>

                          <td>

                            <span
                              className={`badge ${pet.status === 'Active'
                                  ? 'bg-success'
                                  : 'bg-secondary'
                                }`}
                            >
                              {pet.status || 'Active'}
                            </span>

                          </td>

                          {/* EDIT AND DELETE BUTTONS */}

                          <td>

                            <div className="d-flex gap-2">

                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(pet)}  >
                                Edit
                              </button>

                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(pet._id)}
                                disabled={deletingId === pet._id}  >
                                {deletingId === pet._id
                                  ? 'Deleting...'
                                  : 'Delete'
                                }
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </>

            ) : (

              <div className="text-center p-5">

                <h5 className="fw-bold">
                  No Matching Pets Found
                </h5>

                <p className="text-secondary mb-0">
                  Try changing your search or category.
                </p>

              </div>

            )}

          </div>

        )}


        {/* ADDITIONAL PET HEALTH DETAILS */}

        {!loading && !error && filteredPets.length > 0 && (

          <div className="mt-5">

            <h4 className="fw-bold mb-4">
              Pet Health Information
            </h4>

            {filteredPets.map((pet) => (

              <div
                key={pet._id}
                className="bg-white rounded-4 shadow-sm p-4 mb-3" >

                <h5 className="fw-bold mb-3">
                  {pet.petName}
                </h5>

                <div className="row g-3">

                  <div className="col-md-6">

                    <p className="text-secondary mb-1">
                      Identification Number
                    </p>

                    <p className="fw-semibold">
                      {pet.identificationNumber || 'Not provided'}
                    </p>

                  </div>

                  <div className="col-md-6">

                    <p className="text-secondary mb-1">
                      Colour
                    </p>

                    <p className="fw-semibold">
                      {pet.colour || 'Not provided'}
                    </p>

                  </div>

                  <div className="col-md-6">

                    <p className="text-secondary mb-1">
                      Last Vaccination Date
                    </p>

                    <p className="fw-semibold">
                      {formatDate(pet.lastVaccinationDate)}
                    </p>

                  </div>

                  <div className="col-md-6">

                    <p className="text-secondary mb-1">
                      Neutered / Spayed
                    </p>

                    <p className="fw-semibold">
                      {pet.neuteredOrSpayed || 'Not provided'}
                    </p>

                  </div>

                  <div className="col-12">

                    <p className="text-secondary mb-1">
                      Existing Medical Conditions
                    </p>

                    <p className="fw-semibold">
                      {pet.existingMedicalConditions || 'No information provided'}
                    </p>

                  </div>

                  <div className="col-12">

                    <p className="text-secondary mb-1">
                      Medical History
                    </p>

                    <p className="fw-semibold">
                      {pet.medicalHistory || 'No medical history provided'}
                    </p>

                  </div>

                  <div className="col-12">

                    <p className="text-secondary mb-1">
                      Additional Notes
                    </p>

                    <p className="fw-semibold mb-0">
                      {pet.additionalNotes || 'No additional notes'}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}


        {/* HEALTH REMINDER */}

        <div
          className="rounded-4 p-4 p-md-5 mt-5"
          style={{
            background: 'linear-gradient(120deg, #E0EFDF, #F0F7EB)',
            border: '1px solid #D6E7D3'
          }} >

          <h4 className="fw-bold mb-3">
            Their Health Is in Your Hands.
          </h4>

          <p className="text-secondary mb-4">

            Regular veterinary checkups, timely vaccinations,
            and proper medical care help your companions live
            longer, healthier, and happier lives.

          </p>

          <Link
            to="/book-appointment"
            className="btn btn-success rounded-pill px-4 py-3"
            style={{
              backgroundColor: '#397747',
              border: 'none'
            }}  >
            Schedule a Checkup
          </Link>

        </div>

      </div>


      {/* EDIT PET MODAL */}

      {editPet && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: 'rgba(0,0,0,0.55)',
            zIndex: 1050,
            padding: '15px'
          }}  >

          <div
            className="bg-white rounded-4 shadow p-4"
            style={{
              width: '100%',
              maxWidth: '700px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}  >

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <span className="text-success small fw-semibold">
                  PETCARE MANAGEMENT
                </span>

                <h4 className="fw-bold mb-0 mt-1">
                  Update Pet Details
                </h4>

              </div>

              <button
                className="btn-close"
                onClick={() => setEditPet(null)}
                disabled={updating}
              ></button>

            </div>


            <form onSubmit={handleUpdate}>

              <div className="row g-3">


                {/* PET NAME */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Pet Name
                  </label>

                  <input
                    type="text"
                    name="petName"
                    className="form-control"
                    value={editData.petName}
                    onChange={handleEditChange}
                    required />

                </div>


                {/* PET TYPE */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Pet Type
                  </label>

                  <select
                    name="petType"
                    className="form-select"
                    value={editData.petType}
                    onChange={handleEditChange}
                    required >

                    <option value="">
                      Select Pet Type
                    </option>

                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>

                  </select>

                </div>


                {/* BREED */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Breed
                  </label>

                  <input
                    type="text"
                    name="breed"
                    className="form-control"
                    value={editData.breed}
                    onChange={handleEditChange} />

                </div>


                {/* GENDER */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Gender
                  </label>

                  <select
                    name="gender"
                    className="form-select"
                    value={editData.gender}
                    onChange={handleEditChange}
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>

                  </select>

                </div>


                {/* DATE OF BIRTH */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-control"
                    value={editData.dateOfBirth}
                    onChange={handleEditChange} />

                </div>


                {/* WEIGHT */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Weight (kg)
                  </label>

                  <input
                    type="number"
                    name="weight"
                    className="form-control"
                    min="0"
                    step="0.1"
                    value={editData.weight}
                    onChange={handleEditChange} />

                </div>


                {/* COLOUR */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Colour
                  </label>

                  <input
                    type="text"
                    name="colour"
                    className="form-control"
                    value={editData.colour}
                    onChange={handleEditChange} />

                </div>


                {/* IDENTIFICATION NUMBER */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Identification Number
                  </label>

                  <input
                    type="text"
                    name="identificationNumber"
                    className="form-control"
                    value={editData.identificationNumber}
                    onChange={handleEditChange} />

                </div>


                {/* VACCINATION STATUS */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Vaccination Status
                  </label>

                  <select
                    name="vaccinationStatus"
                    className="form-select"
                    value={editData.vaccinationStatus}
                    onChange={handleEditChange}  >

                    <option value="">
                      Select Status
                    </option>

                    <option value="Fully Vaccinated">
                      Fully Vaccinated
                    </option>

                    <option value="Partially Vaccinated">
                      Partially Vaccinated
                    </option>

                    <option value="Not Vaccinated">
                      Not Vaccinated
                    </option>

                  </select>

                </div>


                {/* LAST VACCINATION DATE */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Last Vaccination Date
                  </label>

                  <input
                    type="date"
                    name="lastVaccinationDate"
                    className="form-control"
                    value={editData.lastVaccinationDate}
                    onChange={handleEditChange}
                  />

                </div>


                {/* NEUTERED OR SPAYED */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Neutered / Spayed
                  </label>

                  <select
                    name="neuteredOrSpayed"
                    className="form-select"
                    value={editData.neuteredOrSpayed}
                    onChange={handleEditChange} >

                    <option value="">
                      Select Option
                    </option>

                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Not Sure">Not Sure</option>

                  </select>

                </div>


                {/* STATUS */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Pet Status
                  </label>

                  <select
                    name="status"
                    className="form-select"
                    value={editData.status}
                    onChange={handleEditChange} >

                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>

                  </select>

                </div>


                {/* MEDICAL CONDITIONS */}

                <div className="col-12">

                  <label className="form-label fw-semibold">
                    Existing Medical Conditions
                  </label>

                  <textarea
                    name="existingMedicalConditions"
                    className="form-control"
                    rows="2"
                    value={editData.existingMedicalConditions}
                    onChange={handleEditChange}
                  ></textarea>

                </div>


                {/* MEDICAL HISTORY */}

                <div className="col-12">

                  <label className="form-label fw-semibold">
                    Medical History
                  </label>

                  <textarea
                    name="medicalHistory"
                    className="form-control"
                    rows="2"
                    value={editData.medicalHistory}
                    onChange={handleEditChange}
                  ></textarea>

                </div>


                {/* ADDITIONAL NOTES */}

                <div className="col-12">

                  <label className="form-label fw-semibold">
                    Additional Notes
                  </label>

                  <textarea
                    name="additionalNotes"
                    className="form-control"
                    rows="3"
                    value={editData.additionalNotes}
                    onChange={handleEditChange}
                  ></textarea>

                </div>

              </div>


              {/* MODAL BUTTONS */}

              <div className="d-flex justify-content-end gap-2 mt-4">

                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => setEditPet(null)}
                  disabled={updating} >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-success rounded-pill px-4"
                  disabled={updating}
                  style={{
                    backgroundColor: '#397747',
                    border: 'none'
                  }} >

                  {updating
                    ? 'Updating...'
                    : 'Save Changes'
                  }

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      <Footer />

    </div>

  )

}

export default MyPets