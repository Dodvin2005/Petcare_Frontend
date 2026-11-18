import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import { getPublicServicesAPI } from '../../../Services/AllApi'

function Services() {

  // =====================================
  // STATES
  // =====================================

  const [services, setServices] = useState([])

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')

  const [selectedCategory, setSelectedCategory] = useState('All')

  const [error, setError] = useState('')


  // =====================================
  // FETCH ALL SERVICES
  // =====================================

  const getServices = async () => {

    try {

      setLoading(true)

      setError('')

      const result = await getPublicServicesAPI()
      console.log('ALL SERVICES:', result.data)

      if (result.status === 200) {

        setServices(result.data.services || [])

      }

    }

    catch (error) {

      console.log('Error fetching services:', error)

      setServices([])

      setError(
        error.response?.data?.message ||
        'Unable to load services. Please try again.'
      )

    }

    finally {

      setLoading(false)

    }

  }


  // =====================================
  // USE EFFECT
  // =====================================

  useEffect(() => {

    getServices()

  }, [])


  // =====================================
  // GET UNIQUE CATEGORIES
  // =====================================

  const categories = [

    'All',

    ...new Set(

      services.map(service => service.category)

        .filter(Boolean)

    )

  ]


  // =====================================
  // SEARCH AND CATEGORY FILTER
  // =====================================

  const filteredServices = services.filter(service => {

    const matchesSearch =

      service.name?.toLowerCase().includes(search.toLowerCase()) ||

      service.description?.toLowerCase().includes(search.toLowerCase()) ||

      service.category?.toLowerCase().includes(search.toLowerCase())


    const matchesCategory =

      selectedCategory === 'All' ||

      service.category === selectedCategory


    return matchesSearch && matchesCategory

  })


  // =====================================
  // MAIN UI
  // =====================================

  return (

    <div className="bg-white">


      {/* =====================================
                HERO SECTION
            ===================================== */}

      <section

        className="py-2"

        style={{ backgroundColor: '#F2F7F0' }}

      >

        <Header />


        <div className="container py-5">

          <div className="row align-items-center g-5">


            {/* HERO CONTENT */}

            <div className="col-lg-6">

              <span

                className="badge rounded-pill px-3 py-2 mb-4"

                style={{

                  backgroundColor: '#DDEBDD',

                  color: '#426B4F'

                }}

              >

                OUR SERVICES

              </span>


              <h1

                className="display-4 fw-bold mb-4"

                style={{ color: '#263D2C' }}

              >

                Everything Your Pet Needs, All in One Place.

              </h1>


              <p className="fs-5 text-secondary mb-4">

                From regular health checkups to daily essentials,

                we provide everything you need to keep your

                furry friends healthy, happy, and full of life.

              </p>


              <div className="d-flex flex-wrap gap-3">

                <a

                  href="#our-services"

                  className="btn btn-lg text-white px-4 py-3 rounded-pill"

                  style={{ backgroundColor: '#426B4F' }}

                >

                  Explore Our Services

                </a>


                <a

                  href="#why-choose-us"

                  className="btn btn-lg btn-outline-success px-4 py-3 rounded-pill"

                >

                  Why PetCare?

                </a>

              </div>


              <div className="d-flex flex-wrap gap-4 mt-5">


                <div>

                  <h3

                    className="fw-bold mb-1"

                    style={{ color: '#426B4F' }}

                  >

                    24/7

                  </h3>


                  <p className="text-secondary mb-0">

                    Pet Care Support

                  </p>

                </div>


                <div>

                  <h3

                    className="fw-bold mb-1"

                    style={{ color: '#426B4F' }}

                  >

                    Expert

                  </h3>


                  <p className="text-secondary mb-0">

                    Veterinary Care

                  </p>

                </div>


                <div>

                  <h3

                    className="fw-bold mb-1"

                    style={{ color: '#426B4F' }}

                  >

                    {services.length}+

                  </h3>


                  <p className="text-secondary mb-0">

                    Available Services

                  </p>

                </div>

              </div>

            </div>



            {/* HERO IMAGE */}

            <div className="col-lg-6">

              <div

                className="rounded-5 p-3 p-md-4"

                style={{ backgroundColor: '#DDEBDD' }}

              >

                <img

                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1000&q=85"

                  alt="Happy pets receiving care"

                  className="img-fluid rounded-5 w-100"

                  style={{

                    height: '430px',

                    objectFit: 'cover'

                  }}

                />


                <div className="bg-white rounded-4 p-3 shadow-sm mt-3">

                  <h5

                    className="fw-bold mb-1"

                    style={{ color: '#426B4F' }}

                  >

                    A Happier Life for Every Pet

                  </h5>


                  <p className="text-secondary mb-0">

                    Loving care, better health, and happier moments.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================
                INTRODUCTION SECTION
            ===================================== */}

      <section className="py-5">

        <div className="container py-4 text-center">

          <span

            className="badge rounded-pill px-3 py-2 mb-3"

            style={{

              backgroundColor: '#E7F0E5',

              color: '#426B4F'

            }}

          >

            CARE THAT MATTERS

          </span>


          <h2

            className="display-6 fw-bold mb-3"

            style={{ color: '#263D2C' }}

          >

            Quality Care for Every Little Paw

          </h2>


          <p

            className="text-secondary mx-auto fs-5"

            style={{ maxWidth: '750px' }}

          >

            Every pet deserves love, attention, and the best care possible.

            PetCare brings essential pet services together to make caring for

            your beloved companions easier and more convenient.

          </p>

        </div>

      </section>



      {/* =====================================
                SERVICES SECTION
            ===================================== */}

      <section

        id="our-services"

        className="py-5"

        style={{ backgroundColor: '#FAFBF9' }}

      >

        <div className="container py-4">


          {/* SECTION HEADING */}

          <div className="text-center mb-5">

            <span

              className="badge rounded-pill px-3 py-2 mb-3"

              style={{

                backgroundColor: '#E7F0E5',

                color: '#426B4F'

              }}

            >

              WHAT WE OFFER

            </span>


            <h2

              className="display-6 fw-bold mb-3"

              style={{ color: '#263D2C' }}

            >

              Our PetCare Services

            </h2>


            <p

              className="text-secondary fs-5 mx-auto"

              style={{ maxWidth: '650px' }}

            >

              Discover thoughtful services designed to support your pet's

              health, comfort, nutrition, and everyday happiness.

            </p>

          </div>



          {/* =====================================
                        SEARCH AND CATEGORY FILTER
                    ===================================== */}

          {!loading && services.length > 0 && (

            <div className="row g-3 mb-5">


              {/* SEARCH */}

              <div className="col-lg-6">

                <input

                  type="text"

                  className="form-control form-control-lg rounded-3"

                  placeholder="Search services..."

                  value={search}

                  onChange={(e) => setSearch(e.target.value)}

                />

              </div>



              {/* CATEGORY FILTER */}

              <div className="col-lg-6">

                <select

                  className="form-select form-select-lg rounded-3"

                  value={selectedCategory}

                  onChange={(e) => setSelectedCategory(e.target.value)}

                >

                  {categories.map((category, index) => (

                    <option

                      key={index}

                      value={category}

                    >

                      {category === 'All'

                        ? 'All Categories'

                        : category

                      }

                    </option>

                  ))}

                </select>

              </div>

            </div>

          )}



          {/* =====================================
                        LOADING
                    ===================================== */}

          {loading ? (

            <div className="text-center py-5">

              <div

                className="spinner-border"

                style={{ color: '#426B4F' }}

              />

              <p className="text-secondary mt-3">

                Loading our services...

              </p>

            </div>

          ) : error ? (

            <div className="text-center py-5">

              <h4 className="fw-bold text-danger">

                Unable to Load Services

              </h4>

              <p className="text-secondary">

                {error}

              </p>

              <button

                className="btn text-white rounded-pill px-4"

                style={{ backgroundColor: '#426B4F' }}

                onClick={getServices}

              >

                Try Again

              </button>

            </div>

          ) : services.length === 0 ? (

            <div className="text-center py-5">

              <div style={{ fontSize: '55px' }}>

                🐾

              </div>


              <h4

                className="fw-bold mt-3"

                style={{ color: '#263D2C' }}

              >

                No Services Available

              </h4>


              <p className="text-secondary">

                Our pet care services will be available soon.

              </p>

            </div>

          ) : filteredServices.length > 0 ? (


            /* =====================================
                SERVICE CARDS
            ===================================== */

            <div className="row g-4">

              {filteredServices.map((service) => (

                <div

                  className="col-md-6 col-lg-4"

                  key={service._id}

                >

                  <div

                    className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"

                  >


                    {/* SERVICE ICON */}

                    <div

                      className="d-flex align-items-center justify-content-center"

                      style={{

                        height: '150px',

                        backgroundColor: '#EAF3E8'

                      }}

                    >

                      <span style={{ fontSize: '65px' }}>

                        {service.icon || '🐾'}

                      </span>

                    </div>



                    {/* SERVICE DETAILS */}

                    <div className="card-body p-4 d-flex flex-column">


                      {/* CATEGORY */}

                      <span

                        className="badge rounded-pill align-self-start mb-3 px-3 py-2"

                        style={{

                          backgroundColor: '#E2EFE1',

                          color: '#426B4F'

                        }}

                      >

                        {service.category}

                      </span>



                      {/* SERVICE NAME */}

                      <h4

                        className="fw-bold mb-3"

                        style={{ color: '#263D2C' }}

                      >

                        {service.name}

                      </h4>



                      {/* DESCRIPTION */}

                      <p className="text-secondary mb-4">

                        {service.description}

                      </p>



                      {/* PRICE AND DURATION */}

                      <div

                        className="d-flex justify-content-between align-items-center p-3 rounded-3 mb-4 mt-auto"

                        style={{

                          backgroundColor: '#F2F7F0'

                        }}

                      >

                        <div>

                          <small className="text-secondary d-block">

                            Service Price

                          </small>


                          <h5

                            className="fw-bold mb-0"

                            style={{ color: '#426B4F' }}

                          >

                            ₹{service.price}

                          </h5>

                        </div>



                        <div className="text-end">

                          <small className="text-secondary d-block">

                            Duration

                          </small>


                          <h6

                            className="fw-semibold mb-0"

                            style={{ color: '#263D2C' }}

                          >

                            {service.duration}

                          </h6>

                        </div>

                      </div>



                      {/* BOOK BUTTON */}

                      <a
                        href="/book-appointment"
                        className="btn text-white rounded-pill py-2 fw-semibold"
                        style={{ backgroundColor: '#426B4F' }}
                      >
                        Book This Service →
                      </a>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="text-center py-5">

              <div style={{ fontSize: '50px' }}>

                🔍

              </div>


              <h4

                className="fw-bold mt-3"

                style={{ color: '#263D2C' }}

              >

                No Matching Services

              </h4>


              <p className="text-secondary">

                Try another search term or category.

              </p>


              <button

                className="btn btn-outline-success rounded-pill px-4"

                onClick={() => {

                  setSearch('')

                  setSelectedCategory('All')

                }}

              >

                Clear Filters

              </button>

            </div>

          )}



          {/* SERVICE COUNT */}

          {!loading && services.length > 0 && (

            <div className="text-center mt-5">

              <p className="text-secondary mb-0">

                Showing {filteredServices.length} of {services.length} services

              </p>

            </div>

          )}

        </div>

      </section>



      {/* =====================================
                WHY CHOOSE US SECTION
            ===================================== */}

      <section id="why-choose-us" className="py-5">

        <div className="container py-5">

          <div className="row align-items-center g-5">


            <div className="col-lg-5">

              <span

                className="badge rounded-pill px-3 py-2 mb-3"

                style={{

                  backgroundColor: '#E7F0E5',

                  color: '#426B4F'

                }}

              >

                WHY PETCARE

              </span>


              <h2

                className="display-6 fw-bold mb-4"

                style={{ color: '#263D2C' }}

              >

                More Than Care. A Better Life for Your Pets.

              </h2>


              <p className="text-secondary fs-5 mb-4">

                We believe that caring for a pet should be simple,

                organized, and filled with love. Our services are designed

                to help pet owners make better decisions for their

                companions.

              </p>


              <a

                href="/about"

                className="btn btn-lg text-white rounded-pill px-4 py-3"

                style={{ backgroundColor: '#426B4F' }}

              >

                Learn About PetCare

              </a>

            </div>



            <div className="col-lg-7">

              <div className="row g-4">

                {[

                  {

                    number: '01',

                    title: 'Pet-First Approach',

                    description: "Every service is designed around your pet's comfort, safety, and wellbeing.",

                    bg: '#F2F7F0',

                    iconBg: '#DDEBDD',

                    color: '#426B4F'

                  },

                  {

                    number: '02',

                    title: 'Easy Management',

                    description: 'Keep track of appointments, vaccination details, and medical records conveniently.',

                    bg: '#FFF5E9',

                    iconBg: '#FBE7CC',

                    color: '#94651C'

                  },

                  {

                    number: '03',

                    title: 'Trusted Guidance',

                    description: 'Make informed pet care decisions with appropriate veterinary guidance.',

                    bg: '#EAF5F4',

                    iconBg: '#D3EAE7',

                    color: '#28736F'

                  },

                  {

                    number: '04',

                    title: 'All-in-One Platform',

                    description: 'Access essential pet care information through one convenient platform.',

                    bg: '#F0EDFA',

                    iconBg: '#E0DAF4',

                    color: '#6353A2'

                  }

                ].map((item, index) => (

                  <div className="col-md-6" key={index}>

                    <div

                      className="p-4 rounded-4 h-100"

                      style={{ backgroundColor: item.bg }}

                    >

                      <div

                        className="rounded-4 d-flex align-items-center justify-content-center mb-3"

                        style={{

                          width: '60px',

                          height: '60px',

                          backgroundColor: item.iconBg,

                          color: item.color

                        }}

                      >

                        <span className="fs-3 fw-bold">

                          {item.number}

                        </span>

                      </div>


                      <h5

                        className="fw-bold"

                        style={{ color: '#263D2C' }}

                      >

                        {item.title}

                      </h5>


                      <p className="text-secondary mb-0">

                        {item.description}

                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================
                PET CARE PROCESS
            ===================================== */}

      <section

        className="py-5"

        style={{ backgroundColor: '#F2F7F0' }}

      >

        <div className="container py-4">


          <div className="text-center mb-5">

            <span

              className="badge rounded-pill px-3 py-2 mb-3"

              style={{

                backgroundColor: '#DDEBDD',

                color: '#426B4F'

              }}

            >

              SIMPLE & CONVENIENT

            </span>


            <h2

              className="display-6 fw-bold mb-3"

              style={{ color: '#263D2C' }}

            >

              Caring for Your Pet Made Easy

            </h2>


            <p className="text-secondary fs-5">

              A simple approach to managing your pet's everyday needs.

            </p>

          </div>



          <div className="row g-4">

            {[

              {

                number: '1',

                title: 'Create a Pet Profile',

                description: "Organize your pet's basic information, health details, and vaccination history.",

                bg: '#DDEBDD',

                color: '#426B4F'

              },

              {

                number: '2',

                title: 'Choose a Service',

                description: 'Explore available care options and find the services that best suit your pet.',

                bg: '#FBE7CC',

                color: '#94651C'

              },

              {

                number: '3',

                title: 'Enjoy Better Care',

                description: "Keep up with appointments, health updates, and your pet's everyday wellness needs.",

                bg: '#D3EAE7',

                color: '#28736F'

              }

            ].map((item, index) => (

              <div className="col-md-4" key={index}>

                <div className="bg-white rounded-4 p-4 p-lg-5 text-center h-100 shadow-sm">

                  <div

                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"

                    style={{

                      width: '75px',

                      height: '75px',

                      backgroundColor: item.bg,

                      color: item.color

                    }}

                  >

                    <span className="display-6 fw-bold">

                      {item.number}

                    </span>

                  </div>


                  <h4

                    className="fw-bold mb-3"

                    style={{ color: '#263D2C' }}

                  >

                    {item.title}

                  </h4>


                  <p className="text-secondary mb-0">

                    {item.description}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* =====================================
                FINAL CTA SECTION
            ===================================== */}

      <section className="py-5">

        <div className="container py-4">

          <div

            className="rounded-5 p-4 p-md-5 text-center text-white"

            style={{

              background: 'linear-gradient(135deg, #426B4F, #294C36)'

            }}

          >

            <div

              className="mx-auto py-3"

              style={{ maxWidth: '750px' }}

            >

              <span className="badge bg-white text-success rounded-pill px-3 py-2 mb-4">

                YOUR PET DESERVES THE BEST

              </span>


              <h2 className="display-5 fw-bold mb-4">

                Give Your Best Friend the Care They Deserve.

              </h2>


              <p

                className="fs-5 mb-4"

                style={{ color: '#E1EDE2' }}

              >

                Start your PetCare journey today and make your pet's

                health, happiness, and wellbeing a priority.

              </p>


              <div className="d-flex flex-wrap justify-content-center gap-3">

                <a

                  href="/register"

                  className="btn btn-light btn-lg rounded-pill px-4 py-3 fw-semibold"

                  style={{ color: '#426B4F' }}

                >

                  Get Started Today

                </a>


                <a

                  href="/contact"

                  className="btn btn-outline-light btn-lg rounded-pill px-4 py-3"

                >

                  Contact Us

                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}

export default Services