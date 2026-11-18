import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerPetAPI } from '../../../Services/AllApi'

function PetRegister() {

  const navigate = useNavigate()

  // Form state
  const [petData, setPetData] = useState({

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
    status: 'Active',
    additionalNotes: ''

  })

  // Image state
  const [petImage, setPetImage] = useState(null)
  const [preview, setPreview] = useState('')

  // Loading state
  const [loading, setLoading] = useState(false)

  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target

    setPetData({
      ...petData,
      [name]: value
    })

  }

  // Handle image upload
  const handleImageChange = (e) => {

    const file = e.target.files[0]

    if (file) {

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image')
        return
      }

      setPetImage(file)
      setPreview(URL.createObjectURL(file))

    }

  }

  // Reset form
  const resetForm = () => {

    setPetData({

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
      status: 'Active',
      additionalNotes: ''

    })

    setPetImage(null)
    setPreview('')

  }

  // Register pet
  const handleRegisterPet = async (e) => {

    e.preventDefault()

    if (!petData.petName.trim() || !petData.petType || !petData.gender) {

      alert('Please fill in all required fields')
      return

    }

    try {

      setLoading(true)

      // Get logged-in user token
      const token =
        localStorage.getItem('token') ||
        sessionStorage.getItem('token')

      if (!token) {

        alert('Please login to register your pet')
        navigate('/login')
        return

      }

      // Create FormData
      const reqBody = new FormData()

      Object.entries(petData).forEach(([key, value]) => {

        if (value !== '') {
          reqBody.append(key, value)
        }

      })

      // Append pet image
      if (petImage) {
        reqBody.append('petImage', petImage)
      }

      // API call
      const result = await registerPetAPI(reqBody, token)

      if (result.status === 201 && result.data.success) {

        alert('Pet registered successfully!')

        resetForm()

        navigate('/my-pets')

      } else {

        alert(result.data.message || 'Pet registration failed')

      }

    }

    catch (error) {

      console.log('Pet Registration Error:', error)

      alert(
        error.response?.data?.message ||
        'Something went wrong while registering your pet'
      )

    }

    finally {

      setLoading(false)

    }

  }

  return (

    <div style={{ backgroundColor: '#F7F9F6' }}>

      {/* HERO SECTION */}

      <section
        className="py-5"
        style={{ backgroundColor: '#EAF3E8' }}
      >

        <div className="container py-4">

          <div className="row align-items-center g-4">

            <div className="col-lg-7">

              <span
                className="badge rounded-pill px-3 py-2 mb-3"
                style={{
                  backgroundColor: '#D4E7D1',
                  color: '#426B4F'
                }}
              >
                PETCARE / REGISTER YOUR PET
              </span>

              <h1
                className="display-5 fw-bold mb-3"
                style={{ color: '#263D2C' }}
              >
                Every Little Paw Has a Story.
              </h1>

              <p className="fs-5 text-secondary mb-4">
                Let's get to know your furry family member!
                Create a pet profile to keep their health
                information, vaccination details, and
                medical records organized in one place.
              </p>

              <div className="d-flex flex-wrap gap-3">

                <div className="bg-white rounded-4 px-3 py-3 shadow-sm">

                  <h6 className="fw-bold mb-1"
                    style={{ color: '#426B4F' }}>
                    Health Records
                  </h6>

                  <small className="text-secondary">
                    Keep information organized
                  </small>

                </div>

                <div className="bg-white rounded-4 px-3 py-3 shadow-sm">

                  <h6 className="fw-bold mb-1"
                    style={{ color: '#426B4F' }}>
                    Easy Tracking
                  </h6>

                  <small className="text-secondary">
                    Manage pet health details
                  </small>

                </div>

              </div>

            </div>

            <div className="col-lg-5">

              <div className="p-3 bg-white rounded-5 shadow-sm">

                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=85"
                  alt="Happy pet"
                  className="img-fluid rounded-5 w-100"
                  style={{
                    height: '300px',
                    objectFit: 'cover'
                  }}
                />

                <div className="p-3 text-center">

                  <h5 className="fw-bold"
                    style={{ color: '#263D2C' }}>
                    Welcome to the Family!
                  </h5>

                  <p className="text-secondary mb-0">
                    Better care begins with knowing your pet.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* REGISTRATION FORM */}

      <section className="py-5">

        <div className="container py-3">

          <div className="row justify-content-center">

            <div className="col-lg-10 col-xl-9">

              <div className="bg-white rounded-5 shadow-sm p-4 p-md-5">

                <div className="mb-5">

                  <span
                    className="badge rounded-pill px-3 py-2 mb-3"
                    style={{
                      backgroundColor: '#E7F0E5',
                      color: '#426B4F'
                    }}
                  >
                    PET PROFILE
                  </span>

                  <h2
                    className="fw-bold mb-2"
                    style={{ color: '#263D2C' }}
                  >
                    Register Your Pet
                  </h2>

                  <p className="text-secondary">
                    Fill in the details below to create
                    your pet's profile.
                  </p>

                </div>

                <form onSubmit={handleRegisterPet} encType="multipart/form-data">

                  {/* PET IMAGE */}

                  <div className="mb-5">

                    <h5 className="fw-bold mb-3"
                      style={{ color: '#263D2C' }}>
                      Pet Profile Picture
                    </h5>

                    <div className="row align-items-center g-4">

                      <div className="col-auto">

                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: '120px',
                            height: '120px',
                            backgroundColor: '#EAF3E8',
                            border: '2px dashed #A5C6A5',
                            overflow: 'hidden'
                          }}
                        >

                          <img
                            src={preview || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80'}
                            alt="Pet preview"
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                          />

                        </div>

                      </div>

                      <div className="col">

                        <h6 className="fw-semibold">
                          Upload your pet's photo
                        </h6>

                        <p className="text-secondary small">
                          Add a photo to identify your pet.
                        </p>

                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleImageChange}
                        />

                        <small className="text-secondary">
                          JPG or PNG image.
                        </small>

                      </div>

                    </div>

                  </div>

                  <hr className="mb-5" />

                  {/* BASIC INFORMATION */}

                  <div className="mb-5">

                    <h5 className="fw-bold mb-1"
                      style={{ color: '#263D2C' }}>
                      Basic Information
                    </h5>

                    <p className="text-secondary small mb-4">
                      Tell us about your companion.
                    </p>

                    <div className="row g-4">

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Pet Name <span className="text-danger">*</span>
                        </label>

                        <input
                          type="text"
                          name="petName"
                          value={petData.petName}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="e.g. Bruno"
                          required
                        />

                      </div>

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Pet Type <span className="text-danger">*</span>
                        </label>

                        <select
                          name="petType"
                          value={petData.petType}
                          onChange={handleChange}
                          className="form-select form-select-lg"
                          required
                        >
                          <option value="">Select pet type</option>
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                          <option value="Bird">Bird</option>
                          <option value="Rabbit">Rabbit</option>
                          <option value="Other">Other</option>
                        </select>

                      </div>

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Breed
                        </label>

                        <input
                          type="text"
                          name="breed"
                          value={petData.breed}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="e.g. Golden Retriever"
                        />

                      </div>

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Gender <span className="text-danger">*</span>
                        </label>

                        <select
                          name="gender"
                          value={petData.gender}
                          onChange={handleChange}
                          className="form-select form-select-lg"
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>

                      </div>

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Date of Birth
                        </label>

                        <input
                          type="date"
                          name="dateOfBirth"
                          value={petData.dateOfBirth}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          max={new Date().toISOString().split('T')[0]}
                        />

                      </div>

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Weight (kg)
                        </label>

                        <input
                          type="number"
                          name="weight"
                          value={petData.weight}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="e.g. 12.5"
                          min="0"
                          step="0.1"
                        />

                      </div>

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Colour
                        </label>

                        <input
                          type="text"
                          name="colour"
                          value={petData.colour}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="e.g. Brown and white"
                        />

                      </div>

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Identification Number
                        </label>

                        <input
                          type="text"
                          name="identificationNumber"
                          value={petData.identificationNumber}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Microchip number"
                        />

                      </div>

                    </div>

                  </div>

                  <hr className="mb-5" />

                  {/* HEALTH INFORMATION */}

                  <div className="mb-5">

                    <h5 className="fw-bold mb-1"
                      style={{ color: '#263D2C' }}>
                      Health Information
                    </h5>

                    <p className="text-secondary small mb-4">
                      Keep track of your pet's health.
                    </p>

                    <div className="row g-4">

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Vaccination Status
                        </label>

                        <select
                          name="vaccinationStatus"
                          value={petData.vaccinationStatus}
                          onChange={handleChange}
                          className="form-select form-select-lg"
                        >
                          <option value="">Select status</option>
                          <option value="Fully Vaccinated">Fully Vaccinated</option>
                          <option value="Partially Vaccinated">Partially Vaccinated</option>
                          <option value="Not Vaccinated">Not Vaccinated</option>
                          <option value="Unknown">Unknown</option>
                        </select>

                      </div>

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Last Vaccination Date
                        </label>

                        <input
                          type="date"
                          name="lastVaccinationDate"
                          value={petData.lastVaccinationDate}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />

                      </div>

                      <div className="col-12">

                        <label className="form-label fw-semibold">
                          Existing Medical Conditions
                        </label>

                        <textarea
                          name="existingMedicalConditions"
                          value={petData.existingMedicalConditions}
                          onChange={handleChange}
                          className="form-control"
                          rows="3"
                          placeholder="Mention allergies or existing medical conditions..."
                        />

                      </div>

                      <div className="col-12">

                        <label className="form-label fw-semibold">
                          Medical History
                        </label>

                        <textarea
                          name="medicalHistory"
                          value={petData.medicalHistory}
                          onChange={handleChange}
                          className="form-control"
                          rows="3"
                          placeholder="Previous treatments, surgeries, etc..."
                        />

                      </div>

                    </div>

                  </div>

                  <hr className="mb-5" />

                  {/* ADDITIONAL INFORMATION */}

                  <div className="mb-5">

                    <h5 className="fw-bold mb-1"
                      style={{ color: '#263D2C' }}>
                      Additional Information
                    </h5>

                    <p className="text-secondary small mb-4">
                      Other important details.
                    </p>

                    <div className="row g-4">

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Neutered / Spayed
                        </label>

                        <select
                          name="neuteredOrSpayed"
                          value={petData.neuteredOrSpayed}
                          onChange={handleChange}
                          className="form-select form-select-lg"
                        >
                          <option value="">Select option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Not Sure">Not Sure</option>
                        </select>

                      </div>

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">
                          Pet Status
                        </label>

                        <select
                          name="status"
                          value={petData.status}
                          onChange={handleChange}
                          className="form-select form-select-lg"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>

                      </div>

                      <div className="col-12">

                        <label className="form-label fw-semibold">
                          Additional Notes
                        </label>

                        <textarea
                          name="additionalNotes"
                          value={petData.additionalNotes}
                          onChange={handleChange}
                          className="form-control"
                          rows="3"
                          placeholder="Anything else about your pet..."
                        />

                      </div>

                    </div>

                  </div>

                  {/* INFORMATION NOTICE */}

                  <div
                    className="rounded-4 p-3 p-md-4 mb-4"
                    style={{ backgroundColor: '#F2F7F0' }}
                  >

                    <h6 className="fw-bold"
                      style={{ color: '#426B4F' }}>
                      A Little Reminder
                    </h6>

                    <p className="text-secondary small mb-0">
                      Please provide accurate information
                      about your pet. Keeping health records
                      updated helps organize vaccinations,
                      appointments and veterinary visits.
                    </p>

                  </div>

                  {/* BUTTONS */}

                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">

                    <p className="text-secondary small mb-0">
                      <span className="text-danger">*</span>
                      Required fields.
                    </p>

                    <div className="d-flex gap-3">

                      <button
                        type="button"
                        className="btn btn-outline-secondary rounded-pill px-4"
                        onClick={resetForm}
                        disabled={loading}
                      >
                        Reset
                      </button>

                      <button
                        type="submit"
                        className="btn text-white rounded-pill px-4"
                        style={{ backgroundColor: '#426B4F' }}
                        disabled={loading}
                      >
                        {loading ? 'Registering...' : 'Register Pet'}
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* BOTTOM SECTION */}

      <section
        className="py-5"
        style={{ backgroundColor: '#EAF3E8' }}
      >

        <div className="container py-3">

          <div className="row align-items-center text-center text-md-start g-3">

            <div className="col-md-8">

              <h3 className="fw-bold"
                style={{ color: '#263D2C' }}>
                Every Pet Is Special.
              </h3>

              <p className="text-secondary mb-0">
                Let's make their health and happiness our priority.
              </p>

            </div>

            <div className="col-md-4 text-md-end">

              <span className="fw-semibold"
                style={{ color: '#426B4F' }}>
                PetCare — Better Care. Happier Pets.
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}

export default PetRegister