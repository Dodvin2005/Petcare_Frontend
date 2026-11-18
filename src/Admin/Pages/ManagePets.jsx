import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'

import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
    FaSearch,
    FaPaw,
    FaEye,
    FaEdit,
    FaTrash,
    FaDog,
    FaCat,
    FaFilter
} from 'react-icons/fa'
import { deleteAdminPetAPI, getAllAdminPetsAPI, getSingleAdminPetAPI, updateAdminPetAPI } from '../../../Services/AllApi'


function ManagePets() {

    const [pets, setPets] = useState([])

    const [loading, setLoading] = useState(true)

    const [searchKey, setSearchKey] = useState('')

    const [petType, setPetType] = useState('All')

    const [status, setStatus] = useState('All')

    const [selectedPet, setSelectedPet] = useState(null)

    const [showView, setShowView] = useState(false)

    const [showEdit, setShowEdit] = useState(false)

    const [showDelete, setShowDelete] = useState(false)

    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({})


    // ========================================
    // FETCH ALL PETS
    // ========================================

    const fetchPets = async () => {

        try {

            setLoading(true)

            const result = await getAllAdminPetsAPI(
                searchKey,
                petType,
                status
            )

            if (result.data.success) {

                setPets(result.data.pets || [])

            } else {

                toast.error('Unable to fetch pets')

            }

        }
        catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message || 'Error fetching pets'
            )

        }
        finally {

            setLoading(false)

        }

    }


    // SEARCH AND FILTER
    useEffect(() => {

        const delay = setTimeout(() => {
            fetchPets()
        }, 400)

        return () => clearTimeout(delay)

    }, [searchKey, petType, status])


    // ========================================
    // STATISTICS
    // ========================================

    const totalPets = pets.length

    const activePets = pets.filter(
        pet => pet.status === 'Active'
    ).length

    const inactivePets = pets.filter(
        pet => pet.status === 'Inactive'
    ).length


    // ========================================
    // GET SINGLE PET
    // ========================================

    const handleView = async (id) => {

        try {

            const result = await getSingleAdminPetAPI(id)

            if (result.data.success) {

                setSelectedPet(result.data.pet)

                setShowView(true)

            }

        }
        catch (error) {

            toast.error('Unable to fetch pet details')

        }

    }


    // ========================================
    // OPEN EDIT MODAL
    // ========================================

    const handleEdit = (pet) => {

        setSelectedPet(pet)

        setFormData({

            petName: pet.petName || '',
            petType: pet.petType || 'Dog',
            breed: pet.breed || '',
            gender: pet.gender || 'Male',
            weight: pet.weight ?? '',
            colour: pet.colour || '',
            vaccinationStatus: pet.vaccinationStatus || 'Unknown',
            status: pet.status || 'Active',
            existingMedicalConditions: pet.existingMedicalConditions || '',
            medicalHistory: pet.medicalHistory || '',
            additionalNotes: pet.additionalNotes || ''

        })

        setShowEdit(true)

    }


    // ========================================
    // FORM CHANGE
    // ========================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        })

    }


    // ========================================
    // UPDATE PET
    // ========================================

    const handleUpdate = async (e) => {

        e.preventDefault()

        try {

            setSaving(true)

            const result = await updateAdminPetAPI(
                selectedPet._id,
                formData
            )

            if (result.data.success) {

                toast.success('Pet details updated successfully')

                setShowEdit(false)

                fetchPets()

            }

        }
        catch (error) {

            toast.error(
                error.response?.data?.message || 'Error updating pet'
            )

        }
        finally {

            setSaving(false)

        }

    }


    // ========================================
    // OPEN DELETE MODAL
    // ========================================

    const handleDelete = (pet) => {

        setSelectedPet(pet)

        setShowDelete(true)

    }


    // ========================================
    // DELETE PET
    // ========================================

    const confirmDelete = async () => {

        try {

            setSaving(true)

            const result = await deleteAdminPetAPI(
                selectedPet._id
            )

            if (result.data.success) {

                toast.success('Pet deleted successfully')

                setShowDelete(false)

                fetchPets()

            }

        }
        catch (error) {

            toast.error(
                error.response?.data?.message || 'Error deleting pet'
            )

        }
        finally {

            setSaving(false)

        }

    }


    // ========================================
    // CALCULATE PET AGE
    // ========================================

    const calculateAge = (dob) => {

        if (!dob) return 'Not available'

        const birthDate = new Date(dob)

        const today = new Date()

        let months =
            (today.getFullYear() - birthDate.getFullYear()) * 12 +
            today.getMonth() - birthDate.getMonth()

        if (today.getDate() < birthDate.getDate()) {
            months--
        }

        if (months < 0) return 'Not available'

        if (months < 12) {
            return `${months} Months`
        }

        const years = Math.floor(months / 12)

        return `${years} ${years === 1 ? 'Year' : 'Years'}`

    }


    // ========================================
    // PET IMAGE
    // ========================================

    const getPetImage = (pet) => {

        if (pet.petImage) {

            return `http://localhost:3000/uploads/${pet.petImage}`

        }

        return null

    }


    return (

        <div
            className="d-flex"
            style={{
                minHeight: '100vh',
                backgroundColor: '#F5F8F5',
                overflowX: 'hidden'
            }}
        >

            <ToastContainer position="top-right" />

            {/* SIDEBAR */}

            <div
                style={{
                    width: '250px',
                    minWidth: '250px',
                    flexShrink: 0
                }}
            >
                <AdminSidebar />
            </div>


            {/* MAIN CONTENT */}

            <div
                className="p-3 p-md-4"
                style={{
                    flex: 1,
                    minWidth: 0,
                    marginLeft: '40px'
                }}
            >

                {/* PAGE HEADER */}

                <div className="mb-4">

                    <small className="text-secondary">
                        Dashboard / Manage Pets
                    </small>

                    <h3
                        className="fw-bold mt-2 mb-1"
                        style={{ color: '#234b32' }}
                    >
                        Manage Pets
                    </h3>

                    <p className="text-secondary mb-0">
                        Monitor and manage all pets registered in PetCare.
                    </p>

                </div>


                {/* STATISTICS */}

                <Row className="g-3 mb-4">

                    <Col md={4}>

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between">

                                    <div>

                                        <p className="text-secondary mb-2">
                                            Total Registered Pets
                                        </p>

                                        <h3 className="fw-bold mb-0">
                                            {loading ? '...' : totalPets}
                                        </h3>

                                    </div>

                                    <div
                                        className="rounded-3 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            backgroundColor: '#E1F0E5',
                                            color: '#315A3D'
                                        }}
                                    >
                                        <FaPaw size={22} />
                                    </div>

                                </div>

                            </div>

                        </div>

                    </Col>


                    <Col md={4}>

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <p className="text-secondary mb-2">
                                    Active Pets
                                </p>

                                <h3 className="fw-bold text-success mb-0">
                                    {loading ? '...' : activePets}
                                </h3>

                            </div>

                        </div>

                    </Col>


                    <Col md={4}>

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <p className="text-secondary mb-2">
                                    Inactive Pets
                                </p>

                                <h3 className="fw-bold text-danger mb-0">
                                    {loading ? '...' : inactivePets}
                                </h3>

                            </div>

                        </div>

                    </Col>

                </Row>


                {/* PETS TABLE */}

                <div className="card border-0 shadow-sm rounded-4">

                    {/* HEADER */}

                    <div className="card-header bg-white border-0 p-4">

                        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                            <div>

                                <h5 className="fw-bold mb-1">
                                    Registered Pets
                                </h5>

                                <small className="text-secondary">
                                    Manage pet profiles and owner information.
                                </small>

                            </div>


                            {/* SEARCH */}

                            <div className="d-flex flex-wrap gap-2">

                                <div
                                    className="input-group"
                                    style={{ width: '240px' }}
                                >

                                    <span className="input-group-text bg-white">
                                        <FaSearch />
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search pets..."
                                        value={searchKey}
                                        onChange={(e) => setSearchKey(e.target.value)}
                                    />

                                </div>


                                {/* PET TYPE FILTER */}

                                <select
                                    className="form-select"
                                    style={{ width: '130px' }}
                                    value={petType}
                                    onChange={(e) => setPetType(e.target.value)}
                                >

                                    <option value="All">All Types</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Bird">Bird</option>
                                    <option value="Rabbit">Rabbit</option>
                                    <option value="Other">Other</option>

                                </select>


                                {/* STATUS FILTER */}

                                <select
                                    className="form-select"
                                    style={{ width: '130px' }}
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >

                                    <option value="All">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>

                                </select>

                            </div>

                        </div>

                    </div>


                    {/* TABLE BODY */}

                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table className="table align-middle mb-0">

                                <thead style={{ backgroundColor: '#F0F5F1' }}>

                                    <tr>

                                        <th className="px-4 py-3 text-secondary small">
                                            PET DETAILS
                                        </th>

                                        <th className="py-3 text-secondary small">
                                            OWNER
                                        </th>

                                        <th className="py-3 text-secondary small">
                                            TYPE / BREED
                                        </th>

                                        <th className="py-3 text-secondary small">
                                            AGE
                                        </th>

                                        <th className="py-3 text-secondary small">
                                            STATUS
                                        </th>

                                        <th className="py-3 text-secondary small text-center">
                                            ACTIONS
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {loading ? (

                                        <tr>

                                            <td colSpan="6" className="text-center py-5">

                                                <Spinner animation="border" variant="success" />

                                                <p className="text-secondary mt-2 mb-0">
                                                    Loading registered pets...
                                                </p>

                                            </td>

                                        </tr>

                                    ) : pets.length > 0 ? (

                                        pets.map((pet) => (

                                            <tr key={pet._id}>

                                                {/* PET DETAILS */}

                                                <td className="px-4 py-3">

                                                    <div className="d-flex align-items-center gap-3">

                                                        {getPetImage(pet) ? (

                                                            <img
                                                                src={getPetImage(pet)}
                                                                alt={pet.petName}
                                                                className="rounded-circle"
                                                                style={{
                                                                    width: '45px',
                                                                    height: '45px',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />

                                                        ) : (

                                                            <div
                                                                className="rounded-circle d-flex align-items-center justify-content-center"
                                                                style={{
                                                                    width: '45px',
                                                                    height: '45px',
                                                                    backgroundColor: '#E1F0E5',
                                                                    color: '#315A3D'
                                                                }}
                                                            >
                                                                <FaPaw />
                                                            </div>

                                                        )}

                                                        <div>

                                                            <div className="fw-semibold">
                                                                {pet.petName}
                                                            </div>

                                                            <small className="text-secondary">
                                                                ID: {pet._id.slice(-7)}
                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* OWNER */}

                                                <td className="py-3">

                                                    <div className="fw-semibold">
                                                        {pet.owner?.name || 'Unknown'}
                                                    </div>

                                                    <small className="text-secondary">
                                                        {pet.owner?.email || ''}
                                                    </small>

                                                </td>


                                                {/* TYPE / BREED */}

                                                <td className="py-3">

                                                    <div className="fw-semibold">
                                                        {pet.petType}
                                                    </div>

                                                    <small className="text-secondary">
                                                        {pet.breed || 'Not specified'}
                                                    </small>

                                                </td>


                                                {/* AGE */}

                                                <td className="py-3 text-secondary">

                                                    {calculateAge(pet.dateOfBirth)}

                                                </td>


                                                {/* STATUS */}

                                                <td className="py-3">

                                                    <span
                                                        className={`badge rounded-pill px-3 py-2 ${
                                                            pet.status === 'Active'
                                                                ? 'bg-success-subtle text-success'
                                                                : 'bg-danger-subtle text-danger'
                                                        }`}
                                                    >
                                                        {pet.status}
                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td className="py-3 text-center">

                                                    <div className="d-flex justify-content-center gap-2">

                                                        <button
                                                            className="btn btn-sm btn-light text-primary"
                                                            title="View"
                                                            onClick={() => handleView(pet._id)}
                                                        >
                                                            <FaEye />
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-light text-success"
                                                            title="Edit"
                                                            onClick={() => handleEdit(pet)}
                                                        >
                                                            <FaEdit />
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-light text-danger"
                                                            title="Delete"
                                                            onClick={() => handleDelete(pet)}
                                                        >
                                                            <FaTrash />
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td colSpan="6" className="text-center py-5">

                                                <FaPaw
                                                    size={30}
                                                    className="text-secondary mb-3"
                                                />

                                                <h6 className="text-secondary">
                                                    No pets found
                                                </h6>

                                                <small className="text-secondary">
                                                    Try changing your search or filters.
                                                </small>

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="card-footer bg-white border-0 p-3">

                        <small className="text-secondary">
                            Showing {pets.length} registered pets
                        </small>

                    </div>

                </div>


                {/* PAGE FOOTER */}

                <div className="text-center mt-4">

                    <small className="text-secondary">
                        PetCare Admin Panel © 2026
                    </small>

                </div>

            </div>


            {/* ========================================
                VIEW PET MODAL
            ======================================== */}

            <Modal
                show={showView}
                onHide={() => setShowView(false)}
                centered
                size="lg"
            >

                <Modal.Header closeButton>

                    <Modal.Title className="fw-bold">
                        Pet Details
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    {selectedPet && (

                        <Row className="g-3">

                            <Col md={12} className="text-center mb-3">

                                {getPetImage(selectedPet) && (

                                    <img
                                        src={getPetImage(selectedPet)}
                                        alt={selectedPet.petName}
                                        className="rounded-circle mb-3"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover'
                                        }}
                                    />

                                )}

                                <h5 className="fw-bold">
                                    {selectedPet.petName}
                                </h5>

                                <span className="text-secondary">
                                    {selectedPet.petType} • {selectedPet.breed}
                                </span>

                            </Col>


                            <Col md={6}>
                                <strong>Gender:</strong>
                                <p>{selectedPet.gender}</p>
                            </Col>

                            <Col md={6}>
                                <strong>Age:</strong>
                                <p>{calculateAge(selectedPet.dateOfBirth)}</p>
                            </Col>

                            <Col md={6}>
                                <strong>Weight:</strong>
                                <p>{selectedPet.weight ? `${selectedPet.weight} kg` : 'Not available'}</p>
                            </Col>

                            <Col md={6}>
                                <strong>Colour:</strong>
                                <p>{selectedPet.colour || 'Not available'}</p>
                            </Col>

                            <Col md={6}>
                                <strong>Vaccination:</strong>
                                <p>{selectedPet.vaccinationStatus}</p>
                            </Col>

                            <Col md={6}>
                                <strong>Status:</strong>
                                <p>{selectedPet.status}</p>
                            </Col>

                            <Col md={6}>
                                <strong>Owner:</strong>
                                <p>{selectedPet.owner?.name || 'Unknown'}</p>
                            </Col>

                            <Col md={6}>
                                <strong>Owner Email:</strong>
                                <p>{selectedPet.owner?.email || 'Not available'}</p>
                            </Col>

                            <Col md={12}>
                                <strong>Medical Conditions:</strong>
                                <p>{selectedPet.existingMedicalConditions || 'None'}</p>
                            </Col>

                            <Col md={12}>
                                <strong>Medical History:</strong>
                                <p>{selectedPet.medicalHistory || 'Not available'}</p>
                            </Col>

                            <Col md={12}>
                                <strong>Additional Notes:</strong>
                                <p>{selectedPet.additionalNotes || 'None'}</p>
                            </Col>

                        </Row>

                    )}

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="success"
                        onClick={() => setShowView(false)}
                    >
                        Close
                    </Button>

                </Modal.Footer>

            </Modal>


            {/* ========================================
                EDIT PET MODAL
            ======================================== */}

            <Modal
                show={showEdit}
                onHide={() => setShowEdit(false)}
                centered
                size="lg"
            >

                <Modal.Header closeButton>

                    <Modal.Title className="fw-bold">
                        Edit Pet Details
                    </Modal.Title>

                </Modal.Header>

                <Form onSubmit={handleUpdate}>

                    <Modal.Body>

                        <Row className="g-3">

                            <Col md={6}>
                                <Form.Label>Pet Name</Form.Label>

                                <Form.Control
                                    name="petName"
                                    value={formData.petName || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>


                            <Col md={6}>
                                <Form.Label>Pet Type</Form.Label>

                                <Form.Select
                                    name="petType"
                                    value={formData.petType || 'Dog'}
                                    onChange={handleChange}
                                >
                                    <option>Dog</option>
                                    <option>Cat</option>
                                    <option>Bird</option>
                                    <option>Rabbit</option>
                                    <option>Other</option>
                                </Form.Select>
                            </Col>


                            <Col md={6}>
                                <Form.Label>Breed</Form.Label>

                                <Form.Control
                                    name="breed"
                                    value={formData.breed || ''}
                                    onChange={handleChange}
                                />
                            </Col>


                            <Col md={6}>
                                <Form.Label>Gender</Form.Label>

                                <Form.Select
                                    name="gender"
                                    value={formData.gender || 'Male'}
                                    onChange={handleChange}
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                </Form.Select>
                            </Col>


                            <Col md={6}>
                                <Form.Label>Weight (kg)</Form.Label>

                                <Form.Control
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                />
                            </Col>


                            <Col md={6}>
                                <Form.Label>Colour</Form.Label>

                                <Form.Control
                                    name="colour"
                                    value={formData.colour || ''}
                                    onChange={handleChange}
                                />
                            </Col>


                            <Col md={6}>
                                <Form.Label>Vaccination Status</Form.Label>

                                <Form.Select
                                    name="vaccinationStatus"
                                    value={formData.vaccinationStatus || 'Unknown'}
                                    onChange={handleChange}
                                >
                                    <option>Fully Vaccinated</option>
                                    <option>Partially Vaccinated</option>
                                    <option>Not Vaccinated</option>
                                    <option>Unknown</option>
                                </Form.Select>
                            </Col>


                            <Col md={6}>
                                <Form.Label>Account Status</Form.Label>

                                <Form.Select
                                    name="status"
                                    value={formData.status || 'Active'}
                                    onChange={handleChange}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </Form.Select>
                            </Col>


                            <Col md={12}>
                                <Form.Label>Existing Medical Conditions</Form.Label>

                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="existingMedicalConditions"
                                    value={formData.existingMedicalConditions || ''}
                                    onChange={handleChange}
                                />
                            </Col>


                            <Col md={12}>
                                <Form.Label>Medical History</Form.Label>

                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="medicalHistory"
                                    value={formData.medicalHistory || ''}
                                    onChange={handleChange}
                                />
                            </Col>


                            <Col md={12}>
                                <Form.Label>Additional Notes</Form.Label>

                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="additionalNotes"
                                    value={formData.additionalNotes || ''}
                                    onChange={handleChange}
                                />
                            </Col>

                        </Row>

                    </Modal.Body>


                    <Modal.Footer>

                        <Button
                            variant="light"
                            onClick={() => setShowEdit(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="success"
                            type="submit"
                            disabled={saving}
                        >

                            {saving ? 'Updating...' : 'Save Changes'}

                        </Button>

                    </Modal.Footer>

                </Form>

            </Modal>


            {/* ========================================
                DELETE CONFIRMATION MODAL
            ======================================== */}

            <Modal
                show={showDelete}
                onHide={() => setShowDelete(false)}
                centered
                size="sm"
            >

                <Modal.Body className="text-center p-4">

                    <div
                        className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#FCE8E8',
                            color: '#DC3545'
                        }}
                    >
                        <FaTrash size={22} />
                    </div>

                    <h5 className="fw-bold">
                        Delete Pet?
                    </h5>

                    <p className="text-secondary">
                        Are you sure you want to delete
                        {' '}
                        <strong>{selectedPet?.petName}</strong>?
                        This action cannot be undone.
                    </p>

                    <div className="d-flex gap-2 justify-content-center">

                        <Button
                            variant="light"
                            onClick={() => setShowDelete(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="danger"
                            onClick={confirmDelete}
                            disabled={saving}
                        >
                            {saving ? 'Deleting...' : 'Delete'}
                        </Button>

                    </div>

                </Modal.Body>

            </Modal>

        </div>

    )

}

export default ManagePets