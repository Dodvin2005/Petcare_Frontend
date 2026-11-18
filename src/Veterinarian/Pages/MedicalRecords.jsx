import React, { useEffect, useState } from 'react'
import VetSidebar from '../Component/VetSidebar'

import {
  FaSearch,
  FaFileMedical,
  FaPaw,
  FaCalendarAlt,
  FaEye,
  FaStethoscope,
  FaSyringe,
  FaPrescriptionBottleAlt,
  FaNotesMedical,
  FaShieldAlt,
  FaAllergies,
  FaHeartbeat,
  FaTimes,
  FaDog,
  FaCat,
  FaSyncAlt
} from 'react-icons/fa'

import { toast } from 'react-toastify'

import {
  getVetMedicalRecordsAPI
} from '../../../Services/AllApi'


function MedicalRecords() {

  const [records, setRecords] = useState([])
  const [search, setSearch] = useState('')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  // =====================================
  // GET VETERINARIAN MEDICAL RECORDS
  // =====================================

  const fetchMedicalRecords = async () => {

    setLoading(true)

    try {

      const response = await getVetMedicalRecordsAPI()

      console.log('Medical Records Response:', response)

      if (response.status === 200 || response.status === 201) {

        const data = response.data

        const recordList =
          Array.isArray(data) ? data :
          Array.isArray(data?.records) ? data.records :
          Array.isArray(data?.medicalRecords) ? data.medicalRecords :
          Array.isArray(data?.data) ? data.data :
          []

        setRecords(recordList)

      } else {

        setRecords([])
        toast.error(response.data?.message || 'Unable to fetch medical records')

      }

    } catch (error) {

      console.log('Medical Records Error:', error)

      setRecords([])

      toast.error(
        error.response?.data?.message ||
        'Failed to load medical records'
      )

    } finally {

      setLoading(false)

    }

  }


  useEffect(() => {

    fetchMedicalRecords()

  }, [])


  // =====================================
  // HELPER FUNCTIONS
  // =====================================

  const getValue = (value, fallback = 'Not recorded') => {

    if (value === undefined || value === null || value === '') {
      return fallback
    }

    return value

  }


  const getPet = (record) => {

    return record?.petId && typeof record.petId === 'object'
      ? record.petId
      : record?.pet || {}

  }


  const getOwner = (record) => {

    return record?.ownerId && typeof record.ownerId === 'object'
      ? record.ownerId
      : record?.userId && typeof record.userId === 'object'
        ? record.userId
        : record?.owner || {}

  }


  const getPetName = (record) => {

    const pet = getPet(record)

    return getValue(
      pet.petName || pet.name || record.petName,
      'Unknown Pet'
    )

  }


  const getOwnerName = (record) => {

    const owner = getOwner(record)

    return getValue(
      owner.name || owner.username || record.ownerName,
      'Unknown Owner'
    )

  }


  const getPetType = (record) => {

    const pet = getPet(record)

    return getValue(
      pet.petType || pet.type || record.petType,
      'Other'
    )

  }


  const getDate = (date) => {

    if (!date) return 'Not recorded'

    const parsedDate = new Date(date)

    if (isNaN(parsedDate.getTime())) {
      return date
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })

  }


  const getArray = (value) => {

    if (Array.isArray(value)) return value

    return []

  }


  const getRecordStatus = (record) => {

    return record.status || record.recordStatus || 'Completed'

  }


  const getStatusStyle = (status) => {

    if (['Completed', 'Vaccinated'].includes(status)) {

      return {
        backgroundColor: '#E5F2E7',
        color: '#39734D'
      }

    }

    if (['Pending', 'Due Soon', 'Follow-up', 'Follow-up Required'].includes(status)) {

      return {
        backgroundColor: '#FFF0D9',
        color: '#A56B18'
      }

    }

    return {
      backgroundColor: '#F0F0F0',
      color: '#555555'
    }

  }


  const cardStyle = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E7EEE5',
    borderRadius: '18px'
  }


  // =====================================
  // SEARCH AND FILTER
  // =====================================

  const filteredRecords = records.filter((record) => {

    const pet = getPet(record)
    const owner = getOwner(record)

    const searchText = `
      ${getPetName(record)}
      ${getOwnerName(record)}
      ${record.diagnosis || ''}
      ${record.breed || pet.breed || ''}
      ${record.treatment || ''}
    `.toLowerCase()

    const matchesSearch = searchText.includes(search.toLowerCase())

    const status = getRecordStatus(record)

    const matchesFilter =
      filter === 'All' ||
      status.toLowerCase() === filter.toLowerCase()

    return matchesSearch && matchesFilter

  })


  // =====================================
  // STATISTICS
  // =====================================

  const totalVaccinations = records.reduce((total, record) => {

    return total + getArray(record.vaccinations).length

  }, 0)


  const totalPrescriptions = records.reduce((total, record) => {

    return total + getArray(record.prescription || record.prescriptions).length

  }, 0)


  const totalFollowUps = records.filter(record => {

    return ['Follow-up', 'Follow-up Required'].includes(
      getRecordStatus(record)
    )

  }).length


  // Unique patients
  const uniquePatients = new Set(
    records.map(record => {

      const pet = getPet(record)

      return pet._id || record.petId || record.petName

    }).filter(Boolean)
  ).size


  // =====================================
  // SECTION HEADING
  // =====================================

  const SectionHeading = ({ icon, title }) => (

    <h6
      className="fw-bold mb-3"
      style={{ color: '#477A54' }}
    >
      <span className="me-2">{icon}</span>
      {title}
    </h6>

  )


  // =====================================
  // MEDICAL RECORD DETAILS
  // =====================================

  const renderRecordDetails = (record) => {

    const pet = getPet(record)
    const owner = getOwner(record)

    const vaccinations = getArray(record.vaccinations)

    const prescriptions = getArray(
      record.prescription || record.prescriptions
    )

    const deworming = getArray(record.deworming)

    const petType = getPetType(record)

    return {

      petName: getPetName(record),

      ownerName: getOwnerName(record),

      petType,

      breed: getValue(pet.breed || record.breed),

      age: getValue(pet.age || record.age),

      gender: getValue(pet.gender || record.gender),

      weight: getValue(pet.weight || record.weight),

      bloodGroup: getValue(pet.bloodGroup || record.bloodGroup),

      phone: getValue(owner.phone || owner.phoneNumber),

      email: getValue(owner.email),

      date: getDate(
        record.createdAt ||
        record.recordDate ||
        record.date
      ),

      diagnosis: getValue(record.diagnosis),

      symptoms: getValue(record.symptoms),

      treatment: getValue(record.treatment),

      notes: getValue(record.notes || record.medicalNotes),

      allergies: getValue(
        pet.allergies ||
        record.allergies
      ),

      precautions: getValue(record.precautions),

      vaccinations,

      prescriptions,

      deworming,

      followUpDate: getDate(record.followUpDate),

      followUpNotes: getValue(record.followUpNotes),

      status: getRecordStatus(record),

      id: record._id || record.id,

      raw: record

    }

  }


  const selectedDetails = selectedRecord
    ? renderRecordDetails(selectedRecord)
    : null


  return (

    <div style={{
      backgroundColor: '#F5F8F3',
      minHeight: '100vh'
    }}>

      <VetSidebar />

      <div
        className="p-4 p-lg-5"
        style={{
          marginLeft: '320px',
          minHeight: '100vh'
        }}
      >

        {/* HEADER */}

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

          <div>

            <p
              className="mb-2"
              style={{
                color: '#83A98B',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '2px'
              }}
            >
              VETERINARIAN PORTAL
            </p>

            <h2
              className="fw-bold mb-2"
              style={{ color: '#304B38' }}
            >
              Medical Records
            </h2>

            <p className="text-secondary mb-0">
              Complete medical history, vaccinations and treatments.
            </p>

          </div>


          <div
            className="d-flex align-items-center gap-3 p-3"
            style={cardStyle}
          >

            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: '#E5F2E7',
                color: '#477A54',
                fontSize: '22px'
              }}
            >
              <FaFileMedical />
            </div>

            <div>

              <small className="text-secondary d-block">
                Medical Records
              </small>

              <h5
                className="fw-bold mb-0"
                style={{ color: '#304B38' }}
              >
                {records.length} Records
              </h5>

            </div>

          </div>

        </div>


        {/* BANNER */}

        <div
          className="p-4 p-lg-5 mb-4"
          style={{
            background: 'linear-gradient(115deg, #DDEEDF, #F0F7EC)',
            border: '1px solid #DCEBDD',
            borderRadius: '22px'
          }}
        >

          <div className="row align-items-center">

            <div className="col-md-8">

              <span
                className="badge px-3 py-2 mb-3"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#477A54',
                  borderRadius: '20px'
                }}
              >
                <FaHeartbeat className="me-2" />
                Complete Pet Healthcare
              </span>

              <h3
                className="fw-bold mb-2"
                style={{ color: '#304B38' }}
              >
                Every Record Matters
              </h3>

              <p
                className="mb-0"
                style={{
                  color: '#607363',
                  lineHeight: '1.8'
                }}
              >
                Access patient diagnoses, prescriptions, vaccinations,
                allergies, treatments and follow-up details.
              </p>

            </div>

            <div className="col-md-4 text-center d-none d-md-block">

              <FaFileMedical
                style={{
                  fontSize: '95px',
                  color: '#83B99A',
                  opacity: 0.75
                }}
              />

            </div>

          </div>

        </div>


        {/* STATISTICS */}

        <div className="row g-3 mb-4">

          {[
            {
              title: 'Medical Records',
              value: records.length,
              icon: <FaFileMedical />,
              note: 'Total recorded histories'
            },
            {
              title: 'Patients',
              value: uniquePatients,
              icon: <FaPaw />,
              note: 'Unique pet patients'
            },
            {
              title: 'Vaccinations',
              value: totalVaccinations,
              icon: <FaSyringe />,
              note: 'Recorded vaccine entries'
            },
            {
              title: 'Follow-ups',
              value: totalFollowUps,
              icon: <FaCalendarAlt />,
              note: 'Records requiring review'
            }
          ].map((item, index) => (

            <div className="col-sm-6 col-xl-3" key={index}>

              <div className="p-4 h-100" style={cardStyle}>

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <span className="small text-secondary">
                    {item.title}
                  </span>

                  <span style={{
                    color: '#83A98B',
                    fontSize: '22px'
                  }}>
                    {item.icon}
                  </span>

                </div>

                <h3
                  className="fw-bold mb-1"
                  style={{ color: '#304B38' }}
                >
                  {loading ? '...' : item.value}
                </h3>

                <small className="text-secondary">
                  {item.note}
                </small>

              </div>

            </div>

          ))}

        </div>


        {/* RECORDS SECTION */}

        <div className="p-4" style={cardStyle}>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

            <div>

              <h5
                className="fw-bold mb-1"
                style={{ color: '#304B38' }}
              >
                Patient Medical History
              </h5>

              <p className="text-secondary small mb-0">
                Medical records associated with your veterinarian account.
              </p>

            </div>


            <div className="d-flex align-items-center gap-2">

              <button
                className="btn btn-sm"
                onClick={fetchMedicalRecords}
                disabled={loading}
                style={{
                  backgroundColor: '#F1F7EF',
                  color: '#477A54',
                  borderRadius: '9px'
                }}
              >
                <FaSyncAlt className={loading ? 'fa-spin me-2' : 'me-2'} />
                Refresh
              </button>

              <span
                className="badge px-3 py-2"
                style={{
                  backgroundColor: '#E5F2E7',
                  color: '#39734D',
                  borderRadius: '20px'
                }}
              >
                {filteredRecords.length} Records
              </span>

            </div>

          </div>


          {/* SEARCH AND FILTER */}

          <div className="row g-3 mb-4">

            <div className="col-lg-7">

              <div className="input-group">

                <span
                  className="input-group-text border-end-0"
                  style={{
                    backgroundColor: '#F8FAF7',
                    borderColor: '#E4EAE2'
                  }}
                >
                  <FaSearch style={{ color: '#83A98B' }} />
                </span>

                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search pet, owner, diagnosis or breed..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    backgroundColor: '#F8FAF7',
                    borderColor: '#E4EAE2',
                    padding: '12px'
                  }}
                />

              </div>

            </div>


            <div className="col-lg-5">

              <select
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  backgroundColor: '#F8FAF7',
                  borderColor: '#E4EAE2',
                  borderRadius: '10px',
                  padding: '12px'
                }}
              >

                <option value="All">All Medical Records</option>
                <option value="Completed">Completed</option>
                <option value="Follow-up">Follow-up Required</option>
                <option value="Pending">Pending</option>

              </select>

            </div>

          </div>


          {/* TABLE */}

          <div className="table-responsive">

            <table className="table align-middle mb-0">

              <thead>

                <tr>
                  <th className="py-3 text-secondary small">PET / OWNER</th>
                  <th className="py-3 text-secondary small">DIAGNOSIS</th>
                  <th className="py-3 text-secondary small">VACCINES</th>
                  <th className="py-3 text-secondary small">VISIT DATE</th>
                  <th className="py-3 text-secondary small">STATUS</th>
                  <th className="py-3 text-secondary small text-center">ACTION</th>
                </tr>

              </thead>


              <tbody>

                {loading ? (

                  <tr>
                    <td colSpan="6" className="text-center py-5">

                      <div
                        className="spinner-border"
                        style={{ color: '#477A54' }}
                      />

                      <p className="text-secondary mt-3 mb-0">
                        Loading medical records...
                      </p>

                    </td>
                  </tr>

                ) : filteredRecords.length > 0 ? (

                  filteredRecords.map((record) => {

                    const pet = getPet(record)
                    const owner = getOwner(record)

                    const petType = getPetType(record)

                    const vaccinations = getArray(record.vaccinations)

                    const status = getRecordStatus(record)

                    return (

                      <tr key={record._id || record.id}>

                        <td className="py-3">

                          <div className="d-flex align-items-center gap-3">

                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '13px',
                                backgroundColor: '#E5F2E7',
                                color: '#477A54',
                                fontSize: '19px'
                              }}
                            >
                              {petType.toLowerCase() === 'cat'
                                ? <FaCat />
                                : petType.toLowerCase() === 'dog'
                                  ? <FaDog />
                                  : <FaPaw />
                              }
                            </div>

                            <div>

                              <div
                                className="fw-bold"
                                style={{ color: '#304B38' }}
                              >
                                {getPetName(record)}
                              </div>

                              <small className="text-secondary">
                                {getOwnerName(record)}
                              </small>

                            </div>

                          </div>

                        </td>


                        <td className="py-3">

                          <span
                            className="fw-semibold small"
                            style={{ color: '#465A49' }}
                          >
                            {getValue(record.diagnosis)}
                          </span>

                          <small className="text-secondary d-block mt-1">
                            {getValue(pet.breed || record.breed)}
                          </small>

                        </td>


                        <td className="py-3">

                          <span
                            className="fw-semibold"
                            style={{ color: '#304B38' }}
                          >
                            {vaccinations.length}
                          </span>

                          <small className="text-secondary d-block">
                            Vaccine entries
                          </small>

                        </td>


                        <td
                          className="py-3 small"
                          style={{ color: '#59685B' }}
                        >
                          {getDate(
                            record.createdAt ||
                            record.recordDate ||
                            record.date
                          )}
                        </td>


                        <td className="py-3">

                          <span
                            className="badge px-3 py-2"
                            style={{
                              ...getStatusStyle(status),
                              borderRadius: '20px'
                            }}
                          >
                            {status}
                          </span>

                        </td>


                        <td className="py-3 text-center">

                          <button
                            className="btn btn-sm fw-semibold"
                            onClick={() => setSelectedRecord(record)}
                            style={{
                              backgroundColor: '#E5F2E7',
                              color: '#39734D',
                              borderRadius: '9px',
                              padding: '9px 13px'
                            }}
                          >
                            <FaEye className="me-1" />
                            View
                          </button>

                        </td>

                      </tr>

                    )

                  })

                ) : (

                  <tr>

                    <td colSpan="6" className="text-center py-5">

                      <FaFileMedical
                        style={{
                          fontSize: '38px',
                          color: '#A9C9AE',
                          marginBottom: '12px'
                        }}
                      />

                      <h6 style={{ color: '#304B38' }}>
                        No medical records found
                      </h6>

                      <p className="text-secondary small mb-0">
                        {records.length === 0
                          ? 'Medical records will appear here after they are added.'
                          : 'Try another search term or filter.'
                        }
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>


        <p className="text-center text-secondary small mt-4 mb-0">
          PETCARE Veterinarian Portal · Caring for every paw
        </p>

      </div>


      {/* =====================================
          MEDICAL RECORD DETAILS MODAL
      ===================================== */}

      {selectedRecord && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
          style={{
            backgroundColor: 'rgba(27, 43, 31, 0.55)',
            zIndex: 2000
          }}
          onClick={() => setSelectedRecord(null)}
        >

          <div
            className="p-4"
            style={{
              width: '100%',
              maxWidth: '760px',
              maxHeight: '92vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '22px'
            }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <h4
                  className="fw-bold mb-1"
                  style={{ color: '#304B38' }}
                >
                  Complete Medical History
                </h4>

                <p className="text-secondary small mb-0">
                  Record ID: {selectedDetails.id || 'Not available'}
                </p>

              </div>

              <button
                className="btn"
                onClick={() => setSelectedRecord(null)}
                style={{
                  backgroundColor: '#F1F5EF',
                  color: '#477A54',
                  borderRadius: '10px'
                }}
              >
                <FaTimes />
              </button>

            </div>


            {/* PATIENT INFORMATION */}

            <div
              className="p-4 mb-4"
              style={{
                backgroundColor: '#F1F7EF',
                borderRadius: '16px'
              }}
            >

              <div className="d-flex align-items-center gap-3 mb-4">

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '65px',
                    height: '65px',
                    borderRadius: '18px',
                    backgroundColor: '#E5F2E7',
                    color: '#477A54',
                    fontSize: '26px'
                  }}
                >
                  {selectedDetails.petType.toLowerCase() === 'cat'
                    ? <FaCat />
                    : selectedDetails.petType.toLowerCase() === 'dog'
                      ? <FaDog />
                      : <FaPaw />
                  }
                </div>

                <div>

                  <h4
                    className="fw-bold mb-1"
                    style={{ color: '#304B38' }}
                  >
                    {selectedDetails.petName}
                  </h4>

                  <p className="text-secondary mb-1">
                    {selectedDetails.breed} · {selectedDetails.petType}
                  </p>

                  <small className="text-secondary">
                    Owner: {selectedDetails.ownerName}
                  </small>

                </div>

              </div>


              <div className="row g-3">

                {[
                  ['Age', selectedDetails.age],
                  ['Gender', selectedDetails.gender],
                  ['Weight', selectedDetails.weight],
                  ['Blood Group', selectedDetails.bloodGroup]
                ].map(([label, value]) => (

                  <div className="col-6 col-md-3" key={label}>

                    <small className="text-secondary d-block">
                      {label}
                    </small>

                    <strong
                      style={{
                        color: '#304B38',
                        fontSize: '13px'
                      }}
                    >
                      {value}
                    </strong>

                  </div>

                ))}

              </div>

            </div>


            {/* OWNER INFORMATION */}

            <div className="mb-4">

              <SectionHeading
                icon={<FaPaw />}
                title="Pet Owner Information"
              />

              <div className="p-3" style={{
                backgroundColor: '#F8FAF7',
                borderRadius: '12px'
              }}>

                <div className="mb-3">

                  <small className="text-secondary d-block">
                    Owner Name
                  </small>

                  <strong>{selectedDetails.ownerName}</strong>

                </div>

                <div className="mb-3">

                  <small className="text-secondary d-block">
                    Phone Number
                  </small>

                  <strong>{selectedDetails.phone}</strong>

                </div>

                <div>

                  <small className="text-secondary d-block">
                    Email Address
                  </small>

                  <strong>{selectedDetails.email}</strong>

                </div>

              </div>

            </div>


            {/* DIAGNOSIS */}

            <div className="mb-4">

              <SectionHeading
                icon={<FaStethoscope />}
                title="Diagnosis & Symptoms"
              />

              <div
                className="p-3 mb-2"
                style={{
                  backgroundColor: '#F8FAF7',
                  borderRadius: '12px'
                }}
              >

                <small className="text-secondary d-block mb-1">
                  Diagnosis
                </small>

                <strong style={{ color: '#304B38' }}>
                  {selectedDetails.diagnosis}
                </strong>

              </div>

              <div
                className="p-3"
                style={{
                  backgroundColor: '#F8FAF7',
                  borderRadius: '12px'
                }}
              >

                <small className="text-secondary d-block mb-1">
                  Symptoms
                </small>

                <span>{selectedDetails.symptoms}</span>

              </div>

            </div>


            {/* TREATMENT */}

            <div className="mb-4">

              <SectionHeading
                icon={<FaNotesMedical />}
                title="Treatment & Clinical Notes"
              />

              <div
                className="p-3 mb-2"
                style={{
                  backgroundColor: '#F8FAF7',
                  borderRadius: '12px'
                }}
              >

                <small className="text-secondary d-block mb-1">
                  Treatment
                </small>

                <span>{selectedDetails.treatment}</span>

              </div>

              <div
                className="p-3"
                style={{
                  backgroundColor: '#F8FAF7',
                  borderRadius: '12px'
                }}
              >

                <small className="text-secondary d-block mb-1">
                  Medical Notes
                </small>

                <span>{selectedDetails.notes}</span>

              </div>

            </div>


            {/* VACCINATIONS */}

            <div className="mb-4">

              <SectionHeading
                icon={<FaSyringe />}
                title="Vaccination History"
              />

              {selectedDetails.vaccinations.length > 0 ? (

                <div className="table-responsive">

                  <table className="table table-bordered align-middle">

                    <thead>

                      <tr>
                        <th className="small">Vaccine</th>
                        <th className="small">Vaccination Date</th>
                        <th className="small">Next Due Date</th>
                        <th className="small">Status</th>
                      </tr>

                    </thead>

                    <tbody>

                      {selectedDetails.vaccinations.map((vaccine, index) => (

                        <tr key={vaccine._id || index}>

                          <td className="small fw-semibold">
                            {getValue(vaccine.vaccine || vaccine.vaccineName)}
                          </td>

                          <td className="small">
                            {getDate(vaccine.date || vaccine.vaccinationDate)}
                          </td>

                          <td className="small">
                            {getDate(vaccine.nextDue || vaccine.nextDueDate)}
                          </td>

                          <td>

                            <span
                              className="badge"
                              style={{
                                ...getStatusStyle(vaccine.status || 'Completed'),
                                borderRadius: '15px'
                              }}
                            >
                              {getValue(vaccine.status, 'Completed')}
                            </span>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              ) : (

                <div
                  className="p-3"
                  style={{
                    backgroundColor: '#F8FAF7',
                    borderRadius: '12px'
                  }}
                >
                  No vaccination details recorded.
                </div>

              )}

            </div>


            {/* PRESCRIPTIONS */}

            <div className="mb-4">

              <SectionHeading
                icon={<FaPrescriptionBottleAlt />}
                title="Prescription & Medication"
              />

              {selectedDetails.prescriptions.length > 0 ? (

                selectedDetails.prescriptions.map((medicine, index) => (

                  <div
                    className="p-3 mb-3"
                    key={medicine._id || index}
                    style={{
                      backgroundColor: '#F8FAF7',
                      borderRadius: '12px',
                      border: '1px solid #E7EEE5'
                    }}
                  >

                    <h6
                      className="fw-bold mb-3"
                      style={{ color: '#304B38' }}
                    >
                      {getValue(medicine.medicine || medicine.medicineName)}
                    </h6>

                    <div className="row g-3">

                      <div className="col-6">

                        <small className="text-secondary d-block">
                          Dosage
                        </small>

                        <span className="small">
                          {getValue(medicine.dosage)}
                        </span>

                      </div>

                      <div className="col-6">

                        <small className="text-secondary d-block">
                          Frequency
                        </small>

                        <span className="small">
                          {getValue(medicine.frequency)}
                        </span>

                      </div>

                      <div className="col-6">

                        <small className="text-secondary d-block">
                          Duration
                        </small>

                        <span className="small">
                          {getValue(medicine.duration)}
                        </span>

                      </div>

                      <div className="col-12">

                        <small className="text-secondary d-block">
                          Instructions
                        </small>

                        <span className="small">
                          {getValue(medicine.instructions)}
                        </span>

                      </div>

                    </div>

                  </div>

                ))

              ) : (

                <div
                  className="p-3"
                  style={{
                    backgroundColor: '#F8FAF7',
                    borderRadius: '12px'
                  }}
                >
                  No prescription recorded for this visit.
                </div>

              )}

            </div>


            {/* ALLERGIES */}

            <div className="mb-4">

              <SectionHeading
                icon={<FaAllergies />}
                title="Allergies & Precautions"
              />

              <div
                className="p-3 mb-2"
                style={{
                  backgroundColor: '#FFF8EC',
                  borderRadius: '12px'
                }}
              >

                <small className="text-secondary d-block mb-1">
                  Known Allergies
                </small>

                <span>{selectedDetails.allergies}</span>

              </div>

              <div
                className="p-3"
                style={{
                  backgroundColor: '#F8FAF7',
                  borderRadius: '12px'
                }}
              >

                <small className="text-secondary d-block mb-1">
                  Precautions
                </small>

                <span>{selectedDetails.precautions}</span>

              </div>

            </div>


            {/* DEWORMING */}

            <div className="mb-4">

              <SectionHeading
                icon={<FaShieldAlt />}
                title="Deworming History"
              />

              {selectedDetails.deworming.length > 0 ? (

                selectedDetails.deworming.map((item, index) => (

                  <div
                    className="p-3 mb-2"
                    key={item._id || index}
                    style={{
                      backgroundColor: '#F8FAF7',
                      borderRadius: '12px',
                      border: '1px solid #E7EEE5'
                    }}
                  >

                    <div className="d-flex flex-wrap justify-content-between gap-2 mb-2">

                      <strong style={{ color: '#304B38' }}>
                        {getValue(item.medicine || item.medicineName)}
                      </strong>

                      <span
                        className="badge"
                        style={{
                          ...getStatusStyle(item.status),
                          borderRadius: '15px'
                        }}
                      >
                        {getValue(item.status, 'Completed')}
                      </span>

                    </div>

                    <div className="row g-2">

                      <div className="col-6">

                        <small className="text-secondary d-block">
                          Last Treatment
                        </small>

                        <span className="small">
                          {getDate(item.date || item.treatmentDate)}
                        </span>

                      </div>

                      <div className="col-6">

                        <small className="text-secondary d-block">
                          Next Due
                        </small>

                        <span className="small">
                          {getDate(item.nextDue || item.nextDueDate)}
                        </span>

                      </div>

                    </div>

                  </div>

                ))

              ) : (

                <div
                  className="p-3"
                  style={{
                    backgroundColor: '#F8FAF7',
                    borderRadius: '12px'
                  }}
                >
                  No deworming history recorded.
                </div>

              )}

            </div>


            {/* FOLLOW-UP */}

            <div className="mb-4">

              <SectionHeading
                icon={<FaCalendarAlt />}
                title="Follow-up Details"
              />

              <div
                className="p-3"
                style={{
                  backgroundColor: '#F8FAF7',
                  borderRadius: '12px'
                }}
              >

                <div className="mb-3">

                  <small className="text-secondary d-block mb-1">
                    Next Follow-up
                  </small>

                  <strong style={{ color: '#304B38' }}>
                    {selectedDetails.followUpDate}
                  </strong>

                </div>

                <div>

                  <small className="text-secondary d-block mb-1">
                    Follow-up Notes
                  </small>

                  <span>{selectedDetails.followUpNotes}</span>

                </div>

              </div>

            </div>


            {/* FOOTER */}

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

              <div>

                <small className="text-secondary d-block">
                  Consultation Date
                </small>

                <strong>{selectedDetails.date}</strong>

              </div>

              <span
                className="badge px-3 py-2"
                style={{
                  ...getStatusStyle(selectedDetails.status),
                  borderRadius: '20px'
                }}
              >
                {selectedDetails.status}
              </span>

            </div>


            <button
              className="btn w-100 fw-semibold"
              onClick={() => setSelectedRecord(null)}
              style={{
                backgroundColor: '#477A54',
                color: '#FFFFFF',
                borderRadius: '10px',
                padding: '12px'
              }}
            >
              Close Medical Record
            </button>

          </div>

        </div>

      )}

    </div>

  )

}

export default MedicalRecords