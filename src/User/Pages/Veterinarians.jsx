import React, { useEffect, useState } from 'react'

import VeterinarianCard from '../Component/VeterinarianCard'
import Header from '../Component/Header'
import Footer from '../Component/Footer'

import { getAvailableVeterinariansAPI } from '../../../Services/AllApi'

function Veterinarians() {

    // =====================================
    // STATES
    // =====================================

    const [veterinarians, setVeterinarians] = useState([])

    const [search, setSearch] = useState('')

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState('')


    // =====================================
    // FETCH VETERINARIANS
    // =====================================

    const getVeterinarians = async () => {

        try {

            setLoading(true)

            setError('')

            const result = await getAvailableVeterinariansAPI()

            console.log('Veterinarian API Response:', result.data)

            if (result.status === 200) {

                // Handle API response
                const vetList =
                    result.data.veterinarians ||
                    result.data.data ||
                    []

                setVeterinarians(vetList)

            }
            else {

                setError('Unable to fetch veterinarians.')

            }

        }
        catch (error) {

            console.log('Veterinarian Fetch Error:', error)

            setError(
                error.response?.data?.message ||
                'Unable to load veterinarians. Please try again.'
            )

        }
        finally {

            setLoading(false)

        }

    }


    // =====================================
    // INITIAL FETCH
    // =====================================

    useEffect(() => {

        getVeterinarians()

    }, [])


    // =====================================
    // SEARCH FILTER
    // =====================================

    const filteredVeterinarians = veterinarians.filter((vet) => {

        const searchValue = search.toLowerCase().trim()

        return (

            vet.name?.toLowerCase().includes(searchValue) ||

            vet.specialization?.toLowerCase().includes(searchValue) ||

            vet.qualification?.toLowerCase().includes(searchValue) ||

            vet.email?.toLowerCase().includes(searchValue)

        )

    })


    // =====================================
    // CLEAR SEARCH
    // =====================================

    const clearSearch = () => {

        setSearch('')

    }


    // =====================================
    // JSX
    // =====================================

    return (

        <div
            style={{
                backgroundColor: '#F7F9F5',
                minHeight: '100vh'
            }}
        >

            <div className="container-fluid px-3 px-md-4 px-lg-5 py-2">

                {/* HEADER */}

                <Header />


                {/* =====================================
                    PAGE HEADING
                ===================================== */}

                <div className="text-center py-5 mt-3">

                    <span
                        className="badge rounded-pill px-3 py-2 mb-3"
                        style={{
                            backgroundColor: '#E2F2E5',
                            color: '#2F7048',
                            letterSpacing: '1px'
                        }}
                    >
                        MEET OUR EXPERTS
                    </span>

                    <h1
                        className="fw-bold mb-3"
                        style={{
                            color: '#244B35',
                            fontSize: 'clamp(28px, 4vw, 40px)'
                        }}
                    >
                        Our Veterinarians
                    </h1>

                    <p
                        className="text-secondary mx-auto"
                        style={{
                            maxWidth: '650px',
                            lineHeight: '1.8'
                        }}
                    >
                        Meet our dedicated veterinary professionals who are
                        committed to keeping your pets healthy, happy, and safe.
                        Find the right expert for your beloved companion.
                    </p>

                </div>


                {/* =====================================
                    SEARCH SECTION
                ===================================== */}

                <div className="row justify-content-center mb-4">

                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="input-group shadow-sm">

                            <span
                                className="input-group-text border-0 bg-white px-3"
                                style={{
                                    color: '#326B43'
                                }}
                            >

                                <i className="fa-solid fa-magnifying-glass"></i>

                            </span>

                            <input
                                type="text"
                                className="form-control border-0 py-3 shadow-none"
                                placeholder="Search by name, specialization or qualification..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            {search && (

                                <button
                                    className="btn bg-white border-0"
                                    onClick={clearSearch}
                                >

                                    <i className="fa-solid fa-xmark text-secondary"></i>

                                </button>

                            )}

                            <button
                                className="btn text-white px-4"
                                style={{
                                    backgroundColor: '#326B43'
                                }}
                                onClick={getVeterinarians}
                                disabled={loading}
                            >

                                <i className="fa-solid fa-rotate me-2"></i>

                                Refresh

                            </button>

                        </div>

                    </div>

                </div>


                {/* =====================================
                    VETERINARIAN COUNT
                ===================================== */}

                {!loading && !error && (

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">

                        <h6
                            className="mb-0 fw-semibold"
                            style={{
                                color: '#315A3D'
                            }}
                        >

                            Available Veterinarians

                            <span
                                className="badge rounded-pill ms-2"
                                style={{
                                    backgroundColor: '#E2F2E5',
                                    color: '#326B43'
                                }}
                            >

                                {filteredVeterinarians.length}

                            </span>

                        </h6>

                        <small className="text-secondary">

                            Professional care for your pets

                        </small>

                    </div>

                )}


                {/* =====================================
                    LOADING
                ===================================== */}

                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border"
                            style={{
                                color: '#326B43',
                                width: '3rem',
                                height: '3rem'
                            }}
                        ></div>

                        <p className="text-secondary mt-3">

                            Loading available veterinarians...

                        </p>

                    </div>

                )}


                {/* =====================================
                    ERROR
                ===================================== */}

                {!loading && error && (

                    <div className="text-center py-5">

                        <div className="mb-3">

                            <i
                                className="fa-solid fa-circle-exclamation"
                                style={{
                                    fontSize: '45px',
                                    color: '#DC3545'
                                }}
                            ></i>

                        </div>

                        <h5 className="fw-bold text-danger">

                            Something went wrong!

                        </h5>

                        <p className="text-secondary">

                            {error}

                        </p>

                        <button
                            className="btn text-white px-4 mt-2"
                            style={{
                                backgroundColor: '#326B43'
                            }}
                            onClick={getVeterinarians}
                        >

                            <i className="fa-solid fa-rotate me-2"></i>

                            Try Again

                        </button>

                    </div>

                )}


                {/* =====================================
                    VETERINARIAN CARDS
                ===================================== */}

                {!loading && !error && (

                    <div className="row g-4">

                        {filteredVeterinarians.length > 0 ? (

                            filteredVeterinarians.map((vet) => (

                                <div
                                    className="col-12 col-md-6 col-lg-4"
                                    key={vet._id}
                                >

                                    <VeterinarianCard
                                        veterinarian={vet}
                                    />

                                </div>

                            ))

                        ) : (

                            <div className="col-12">

                                <div
                                    className="text-center py-5 rounded-4"
                                    style={{
                                        backgroundColor: '#FFFFFF'
                                    }}
                                >

                                    <i
                                        className="fa-solid fa-user-doctor mb-3"
                                        style={{
                                            fontSize: '50px',
                                            color: '#A8D5A2'
                                        }}
                                    ></i>

                                    <h5
                                        className="fw-bold"
                                        style={{
                                            color: '#315A3D'
                                        }}
                                    >

                                        {search
                                            ? 'No Matching Veterinarians Found'
                                            : 'No Available Veterinarians'
                                        }

                                    </h5>

                                    <p className="text-secondary mb-3">

                                        {search
                                            ? 'Try searching with another name or specialization.'
                                            : 'Currently, there are no veterinarians available for appointments.'
                                        }

                                    </p>

                                    {search && (

                                        <button
                                            className="btn text-white px-4"
                                            style={{
                                                backgroundColor: '#326B43'
                                            }}
                                            onClick={clearSearch}
                                        >

                                            Clear Search

                                        </button>

                                    )}

                                </div>

                            </div>

                        )}

                    </div>

                )}


                {/* =====================================
                    BOTTOM MESSAGE
                ===================================== */}

                {!loading && (

                    <div
                        className="text-center rounded-4 p-4 p-md-5 mt-5 mb-5"
                        style={{
                            backgroundColor: '#E5F2E7'
                        }}
                    >

                        <i
                            className="fa-solid fa-paw mb-3"
                            style={{
                                fontSize: '35px',
                                color: '#326B43'
                            }}
                        ></i>

                        <h4
                            className="fw-bold mb-2"
                            style={{
                                color: '#244B35'
                            }}
                        >

                            Your Pet Deserves the Best Care!

                        </h4>

                        <p className="text-secondary mb-0">

                            Choose a veterinarian and schedule an appointment
                            for your beloved companion.

                        </p>

                    </div>

                )}

            </div>


            {/* FOOTER */}

            <Footer />

        </div>

    )

}

export default Veterinarians