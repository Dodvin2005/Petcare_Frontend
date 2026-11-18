import React from 'react'
import Header from '../Component/Header'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'

function Home() {
  return (
    <div
      style={{ minHeight: '100vh', backgroundColor: '#F7F8F2', color: '#203B30', overflow: 'hidden' }}>

      {/* HERO SECTION */}

      <section
        style={{ background: 'linear-gradient(135deg, #F7F8F2 0%, #EDF4E9 55%, #E2EFE2 100%)', paddingBottom: '70px' }}>
        <Container fluid className="px-3 px-md-4 px-lg-5">

          {/* HEADER */}

          <Header />

          <Row className="align-items-center g-4 g-lg-5 py-5">

            {/* LEFT CONTENT */}

            <Col lg={7}>

              <div
                className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 mb-4"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #DCE8D8', color: '#416B50', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 16px rgba(38, 75, 48, 0.05)' }}>
                <span style={{ color: '#6E9B72', fontSize: '16px' }}>★</span>
                Trusted Care for Every Paw
              </div>

              <h1
                className="fw-bold mb-4"
                style={{ fontSize: 'clamp(42px, 5.5vw, 76px)', lineHeight: '1.12', letterSpacing: '-2.5px', color: '#203B30' }}>
                Healthy Pets.
                <br />
                Happier Lives.
                <br />
                <span style={{ color: '#719B76' }}>
                  Better Care.
                </span>
              </h1>

              <p
                className="mb-4"
                style={{ fontSize: 'clamp(16px, 1.5vw, 19px)', lineHeight: '1.9', color: '#66756A', maxWidth: '650px' }}>
                Give your beloved companions the care they deserve.
                Manage health records, track vaccinations, and organise
                veterinary appointments with ease — all in one place.
              </p>

              {/* SEARCH BAR DESIGN ONLY */}

              <div
                className="rounded-4 p-2 mb-4"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E8DD', boxShadow: '0 12px 35px rgba(40, 73, 48, 0.07)', maxWidth: '760px' }}>
                <Row className="g-2 align-items-center">

                  <Col md={5}>
                    <InputGroup>
                      <InputGroup.Text
                        className="border-0"
                        style={{ backgroundColor: 'transparent', color: '#719B76', fontSize: '22px' }}>
                        ⌕
                      </InputGroup.Text>

                      <Form.Control
                        placeholder="Search pet care services..."
                        className="border-0 shadow-none"
                        style={{ backgroundColor: 'transparent', color: '#203B30', minHeight: '48px', fontSize: '14px' }} />
                    </InputGroup>
                  </Col>

                  <Col md={3}>
                    <Form.Select
                      className="border-0 shadow-none"
                      style={{ backgroundColor: '#F7F9F5', color: '#53675A', minHeight: '48px', fontSize: '14px', borderRadius: '12px' }}>
                      <option>Select Service</option>
                      <option>Vaccination</option>
                      <option>Vet Appointment</option>
                      <option>Health Records</option>
                      <option>Pet Grooming</option>
                    </Form.Select>
                  </Col>

                  <Col md={4}>
                    <Button
                      className="w-100 border-0 fw-semibold rounded-3"
                      style={{ backgroundColor: '#426B4F', color: '#FFFFFF', minHeight: '50px', fontSize: '14px' }}>
                      Explore Services →
                    </Button>
                  </Col>

                </Row>
              </div>

              {/* POPULAR SERVICES */}

              <div className="d-flex flex-wrap align-items-center gap-2">

                <span
                  className="me-1"
                  style={{ color: '#7B887D', fontSize: '13px', fontWeight: '600' }}>
                  Popular:
                </span>

                {[
                  'Vaccination',
                  'Vet Appointment',
                  'Health Records',
                  'Pet Grooming'
                ].map((service, index) => (
                  <span
                    key={index}
                    className="rounded-pill px-3 py-2"
                    style={{ backgroundColor: '#FFFFFF', color: '#496B50', border: '1px solid #DDE8DA', fontSize: '12px' }}>
                    {service}
                  </span>
                ))}

              </div>

              {/* TRUST TEXT */}

              <div className="mt-4">
                <span
                  className="d-inline-flex align-items-center gap-2"
                  style={{ color: '#6A8A6D', fontSize: '12px', fontWeight: '700', letterSpacing: '1.5px' }}>
                  <span
                    style={{ width: '25px', height: '2px', backgroundColor: '#8BAC8A' }} />
                  YOUR PET'S HEALTH PARTNER
                </span>
              </div>

            </Col>

            {/* RIGHT REGISTRATION CARD */}

            <Col lg={5}>

              <div
                className="p-4 p-md-5 rounded-5 mx-auto"
                style={{ maxWidth: '500px', backgroundColor: '#FFFFFF', border: '1px solid #E2EAE0', boxShadow: '0 25px 70px rgba(42, 76, 48, 0.10)', position: 'relative', overflow: 'hidden' }}>

                <div
                  style={{ position: 'absolute', top: '-65px', right: '-65px', width: '180px', height: '180px', borderRadius: '50%', backgroundColor: '#EFF5EB' }} />

                <div style={{ position: 'relative' }}>

                  <span
                    className="d-inline-block rounded-pill px-3 py-2 mb-4"
                    style={{ backgroundColor: '#EDF5EB', color: '#527A58', border: '1px solid #DCE9D8', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px' }}>
                    A HEALTHIER FUTURE STARTS HERE
                  </span>

                  <h2
                    className="fw-bold mb-3"
                    style={{ fontSize: 'clamp(28px, 3vw, 38px)', lineHeight: '1.25', letterSpacing: '-1px', color: '#203B30' }}>
                    Every Paw Deserves
                    <br />
                    <span style={{ color: '#719B76' }}>
                      Exceptional Care.
                    </span>
                  </h2>

                  <p
                    className="mb-4"
                    style={{ color: '#748076', lineHeight: '1.8', fontSize: '15px' }}>
                    Make your pet's healthcare simpler with organised
                    medical records, convenient appointment booking,
                    and vaccination tracking.
                  </p>

                  <Link to="/register" className="text-decoration-none">
                    <Button
                      className="w-100 py-3 rounded-3 border-0 fw-semibold mb-3"
                      style={{ backgroundColor: '#426B4F', color: '#FFFFFF', fontSize: '15px', boxShadow: '0 8px 20px rgba(66, 107, 79, 0.18)' }}>
                      Get Started Today →
                    </Button>
                  </Link>

                  {/* DIVIDER */}

                  <div className="d-flex align-items-center gap-3 my-4">

                    <div
                      className="flex-grow-1"
                      style={{ height: '1px', backgroundColor: '#E8EDE5' }} />

                    <small
                      style={{ color: '#94A096', fontSize: '11px', fontWeight: '700', letterSpacing: '1px' }}>
                      WHY PETCARE?
                    </small>

                    <div
                      className="flex-grow-1"
                      style={{ height: '1px', backgroundColor: '#E8EDE5' }} />

                  </div>

                  {/* BENEFITS */}

                  {[
                    {
                      title: 'Organised Health Records',
                      description: 'Keep important medical details in one place.'
                    },
                    {
                      title: 'Easy Appointment Booking',
                      description: 'Manage veterinary visits conveniently.'
                    },
                    {
                      title: 'Vaccination Tracking',
                      description: 'Stay informed about your pet’s healthcare.'
                    }
                  ].map((feature, index) => (

                    <div key={index} className="d-flex align-items-start gap-3 mb-4">

                      <div
                        className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: '42px', height: '42px', backgroundColor: '#EDF5EB', color: '#527A58', fontSize: '19px', fontWeight: '700' }}>
                        ✓
                      </div>

                      <div>
                        <h6
                          className="fw-semibold mb-1"
                          style={{ color: '#304B37', fontSize: '14px' }}>
                          {feature.title}
                        </h6>

                        <p
                          className="mb-0"
                          style={{ color: '#879187', fontSize: '12px', lineHeight: '1.6' }}>
                          {feature.description}
                        </p>
                      </div>

                    </div>

                  ))}

                  {/* SIGN IN */}

                  <div
                    className="text-center pt-3"
                    style={{ borderTop: '1px solid #E8EDE5' }}>
                    <p
                      className="mb-0"
                      style={{ color: '#7C887E', fontSize: '14px' }}>
                      Already a PetCare member?

                      <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#426B4F' }}>
                        Sign In
                      </Link>
                    </p>
                  </div>

                </div>

              </div>

            </Col>

          </Row>

        </Container>
      </section>

      {/* SERVICES SECTION */}

      <section className="py-5" style={{ backgroundColor: '#FFFFFF' }}>
        <Container className="py-4">

          <div className="text-center mb-5">

            <span
              className="d-inline-block rounded-pill px-3 py-2 mb-3"
              style={{ backgroundColor: '#EDF5EB', color: '#527A58', fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }}>
              CARE THAT MATTERS
            </span>

            <h2
              className="fw-bold mb-3"
              style={{ color: '#203B30', fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-1px' }}>
              Everything Your Pet Needs.
            </h2>

            <p
              className="mx-auto"
              style={{ maxWidth: '600px', color: '#7A877C', lineHeight: '1.8' }}>
              From routine vaccinations to veterinary appointments,
              keep your companion's healthcare organised and accessible.
            </p>

          </div>

          <Row className="g-4">

            {[
              {
                number: '01',
                title: 'Vaccination Care',
                description: 'Keep vaccination details organised and stay on top of your pet’s preventive healthcare.',
                background: '#F0F6EC',
                accent: '#638A66'
              },
              {
                number: '02',
                title: 'Vet Appointments',
                description: 'Keep veterinary visits organised and view your appointment details conveniently.',
                background: '#F2F4EC',
                accent: '#7E9160'
              },
              {
                number: '03',
                title: 'Health Records',
                description: 'Keep your pet’s medical history, treatments, and important health information together.',
                background: '#F2F4EC',
                accent: '#7E9160'
              }
            ].map((service, index) => (

              <Col md={4} key={index}>

                <div
                  className="h-100 p-4 rounded-4"
                  style={{
                    backgroundColor: service.background,
                    border: '1px solid rgba(70, 100, 75, 0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 mb-4"
                    style={{ width: '48px', height: '48px', backgroundColor: '#FFFFFF', color: service.accent, fontWeight: '700', fontSize: '14px' }}>
                    {service.number}
                  </div>

                  <h4
                    className="fw-bold mb-3"
                    style={{ color: '#294332', fontSize: '21px' }}>
                    {service.title}
                  </h4>

                  <p
                    className="mb-0"
                    style={{ color: '#748176', lineHeight: '1.8', fontSize: '14px' }}>
                    {service.description}
                  </p>

                </div>

              </Col>

            ))}

          </Row>

          {/* BOTTOM CALL TO ACTION */}

          <div
            className="text-center mt-5 p-4 p-md-5 rounded-4"
            style={{
              background: 'linear-gradient(135deg, #EAF3E7, #F5F7EE)',
              border: '1px solid #E0EBDD'
            }}>

            <h3
              className="fw-bold mb-3" style={{ color: '#294332' }}>
              Your Pet's Wellbeing Comes First.
            </h3>

            <p
              className="mb-4"
              style={{ color: '#758277', lineHeight: '1.8' }}>
              Give your beloved companion the attention, care, and
              healthier future they deserve.
            </p>

            <Link to="/register" className="text-decoration-none">
              <Button
                className="border-0 rounded-3 px-4 py-3 fw-semibold"
                style={{ backgroundColor: '#426B4F', color: '#FFFFFF' }}>
                Join PetCare Today →
              </Button>
            </Link>

          </div>


          {/* About petcare */}

          <div  className="container my-5">

            <div className=" p-4 p-md-5 rounded-4 shadow-sm"
              style={{ border: '1px solid #f8f7f6',backgroundColor:'#E2EFE2' }}>

              <div className="row align-items-center g-4">

                {/* About Content */}
                <div className="col-lg-5">

                  <span className="badge rounded-pill px-3 py-2 mb-4"
                    style={{ backgroundColor: '#f3e8ff', color: '#426B4F' }}>
                    ♥ OUR PLATFORM & CORE PURPOSE
                  </span>

                  <h1 className="fw-bold mb-4">About <span style={{ color: '#2c361b', fontFamily: 'Georgia', fontStyle: 'italic' }}>
                    PetCare 
                  </span>
                  </h1>

                  <p className="text-secondary">
                    PetCare is a pet healthcare platform that helps pet
                    owners connect with trusted veterinarians. Our goal is to
                    make pet healthcare, vaccination tracking, and appointment
                    booking simple and convenient.
                  </p>

                  <p className="text-secondary mb-0">
                    We provide an easy way to manage pet profiles, medical
                    records, and appointments in one place, helping pets stay
                    healthy and happy.
                  </p>

                </div>

                {/* Information Cards */}
                <div className="col-lg-7">

                  <div className="row g-4">

                    {/* Pet Owners */}
                    <div className="col-md-6">

                      <div className="p-4 rounded-4 h-100"
                        style={{ backgroundColor: 'white', border: '1px solid #333' }}>

                        <div className="rounded-3 d-flex align-items-center justify-content-center mb-3"
                          style={{ backgroundColor: '#F0F6EC', color: '#8338ec', width: '50px', height: '50px', fontSize: '25px' }}>
                          🐾
                        </div>

                        <h5 className="fw-bold mb-3">For Pet Parents</h5>

                        <p className="text-secondary mb-0">
                          Manage your pet's profile, book veterinary appointments,
                          track vaccination schedules, and keep medical records
                          organized in one place. Give your pet the care they
                          deserve with ease.
                        </p>

                      </div>

                    </div>

                    {/* Veterinarians */}
                    <div className="col-md-6">

                      <div className="p-4 rounded-4 h-100"
                        style={{ backgroundColor: 'white', border: '1px solid #333' }}>

                        <div className="rounded-3 d-flex align-items-center justify-content-center mb-3"
                          style={{ backgroundColor: '#f3edff', color: '#8338ec', width: '50px', height: '50px', fontSize: '25px' }}> ♡
                        </div>

                        <h5 className="fw-bold mb-3"> For Veterinarians </h5>

                        <p className="text-secondary mb-0">
                          Manage appointments, view pet medical histories, update
                          vaccination details, and maintain treatment records.
                          Our platform helps veterinarians organize their work
                          and provide better care.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* services */}
           <div className="container py-5">

      {/* Section Heading */}
      <div className="text-center mb-4">
        <span className="badge rounded-pill px-3 py-2 mb-3"
          style={{ backgroundColor: '#c9efd5', color: '#426B4F' }}>
          OUR SERVICES
        </span>

        <h2 className="fw-bold">Everything Your Pet Needs</h2>

        <p className="text-secondary">
          Simple and reliable care for your beloved companions.
        </p>
      </div>

      {/* Service Cards */}
      <div className="row g-3">

        <div className="col-6 col-md-4 col-lg-2">
          <div style={{backgroundColor:'#F0F6EC'}} className="card border-0 shadow-sm rounded-4 text-center p-3 h-100">
            <Link to={'/services'} style={{textDecoration:'none'}} className="fs-1 mb-2">🦴</Link>
            <h6 className="fw-bold">Pet Food</h6>
            <p className="text-secondary small mb-0">
              Healthy food for happy pets.
            </p>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div  style={{backgroundColor:'#F0F6EC'}} className="card border-0 shadow-sm rounded-4 text-center p-3 h-100">
            <Link to={'/veterinarians'} style={{textDecoration:'none'}} className="fs-1 mb-2">🩺</Link>
            <h6 className="fw-bold">Pet Vets</h6>
            <p className="text-secondary small mb-0">
              Find trusted veterinarians.
            </p>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div  style={{backgroundColor:'#F0F6EC'}} className="card border-0 shadow-sm rounded-4 text-center p-3 h-100">
            <Link to={'/book-appointment'} style={{textDecoration:'none'}} className="fs-1 mb-2">📅</Link>
            <h6 className="fw-bold">Appointments</h6>
            <p className="text-secondary small mb-0">
              Book visits with ease.
            </p>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div  style={{backgroundColor:'#F0F6EC'}} className="card border-0 shadow-sm rounded-4 text-center p-3 h-100">
            <Link to={'/services'} style={{textDecoration:'none'}} className="fs-1 mb-2">💉</Link>
            <h6 className="fw-bold">Vaccination</h6>
            <p className="text-secondary small mb-0">
              Track vaccination schedules.
            </p>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div  style={{backgroundColor:'#F0F6EC'}} className="card border-0 shadow-sm rounded-4 text-center p-3 h-100">
            <Link to={'/services'} style={{textDecoration:'none'}} className="fs-1 mb-2">📋</Link>
            <h6 className="fw-bold">Medical Records</h6>
            <p className="text-secondary small mb-0">
              Keep health records organized.
            </p>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div  style={{backgroundColor:'#F0F6EC'}} className="card border-0 shadow-sm rounded-4 text-center p-3 h-100">
            <Link to={'/services'} style={{textDecoration:'none'}} className="fs-1 mb-2">🛁</Link>
            <h6 className="fw-bold">Pet Grooming</h6>
            <p className="text-secondary small mb-0">
              Keep your pets clean and fresh.
            </p>
          </div>
        </div>

      </div>

    </div>




{/* APPOINTMENT BOOKING ROADMAP */}

{/* PETCARE BOOKING ROADMAP */}

<section className="py-5" style={{ backgroundColor: '#F5F8F3' }}>
  <Container className="py-4">

    {/* HEADING */}

    <div className="text-center mb-5">

      <span style={{
        color: '#719B76',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '3px'
      }}>
        THE PETCARE PROCESS
      </span>

      <h2 className="mt-2" style={{
        color: '#203B30',
        fontWeight: '750',
        fontSize: '32px'
      }}>
        From Registration to Better Care
      </h2>

      <p style={{
        color: '#849087',
        fontSize: '14px',
        maxWidth: '480px',
        margin: '10px auto 0'
      }}>
        A simple and seamless journey designed to make your
        pet's healthcare experience easier.
      </p>

    </div>


    {/* ROADMAP CONTAINER */}

    <div className="mx-auto p-3 p-md-5 rounded-4"
      style={{
        maxWidth: '950px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E4EBE1',
        boxShadow: '0 15px 45px rgba(32,59,48,0.06)'
      }}>

      {[
        [
          {
            number: '01',
            title: 'Create Your Account',
            description: 'Sign up and create your personal PetCare account to get started.',
            tag: 'GET STARTED'
          },
          {
            number: '02',
            title: 'Register Your Pet',
            description: 'Add your pet profile, breed, age and important health information.',
            tag: 'PET PROFILE'
          }
        ],
        [
          {
            number: '03',
            title: 'Choose Veterinary Care',
            description: 'Explore available veterinary services and select your preferred care.',
            tag: 'EXPLORE SERVICES'
          },
          {
            number: '04',
            title: 'Schedule Appointment',
            description: 'Select your preferred veterinarian, appointment date and time.',
            tag: 'BOOK A VISIT'
          }
        ],
        [
          {
            number: '05',
            title: 'Confirm Your Booking',
            description: 'Review your appointment details and complete the payment securely.',
            tag: 'CONFIRMATION'
          },
          {
            number: '06',
            title: 'Receive Expert Care',
            description: 'Visit your veterinarian and give your pet the professional care it deserves.',
            tag: 'BETTER HEALTH'
          }
        ]
      ].map((row, index) => (

        <div key={index}>

          {/* STEP CARDS */}

          <Row className="align-items-center g-2">

            {/* FIRST CARD */}

            <Col xs={12} md={5}>

              <div className="p-3 p-md-4 rounded-4 h-100"
                style={{
                  background: index === 2
                    ? '#EDF5EA'
                    : '#F8FAF7',
                  border: '1px solid #E5EBE2',
                  borderTop: '3px solid #719B76',
                  minHeight: '145px',
                  transition: '0.3s'
                }}>

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <span style={{
                    fontSize: '11px',
                    color: '#719B76',
                    fontWeight: '700',
                    letterSpacing: '1px'
                  }}>
                    {row[0].tag}
                  </span>

                  <span style={{
                    fontSize: '25px',
                    fontWeight: '800',
                    color: '#D7E5D3'
                  }}>
                    {row[0].number}
                  </span>

                </div>

                <h6 style={{
                  color: '#294332',
                  fontWeight: '700',
                  fontSize: '15px',
                  marginBottom: '8px'
                }}>
                  {row[0].title}
                </h6>

                <p style={{
                  color: '#849087',
                  fontSize: '12px',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  {row[0].description}
                </p>

              </div>

            </Col>


            {/* CURLY ARROW */}

            <Col xs={12} md={2}>

              <div className="d-flex justify-content-center align-items-center">

                <svg
                  width="100%"
                  height="65"
                  viewBox="0 0 100 65"
                  fill="none"
                  style={{ maxWidth: '100px' }}
                >

                  <path
                    d="M5 32 C25 -2, 75 65, 92 32"
                    stroke="#91B38C"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                    fill="none"
                  />

                  <path
                    d="M84 25 L93 32 L84 39"
                    stroke="#719B76"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                </svg>

              </div>

            </Col>


            {/* SECOND CARD */}

            <Col xs={12} md={5}>

              <div className="p-3 p-md-4 rounded-4 h-100"
                style={{
                  background: index === 2
                    ? '#EDF5EA'
                    : '#F8FAF7',
                  border: '1px solid #E5EBE2',
                  borderTop: '3px solid #719B76',
                  minHeight: '145px'
                }}>

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <span style={{
                    fontSize: '11px',
                    color: '#719B76',
                    fontWeight: '700',
                    letterSpacing: '1px'
                  }}>
                    {row[1].tag}
                  </span>

                  <span style={{
                    fontSize: '25px',
                    fontWeight: '800',
                    color: '#D7E5D3'
                  }}>
                    {row[1].number}
                  </span>

                </div>

                <h6 style={{
                  color: '#294332',
                  fontWeight: '700',
                  fontSize: '15px',
                  marginBottom: '8px'
                }}>
                  {row[1].title}
                </h6>

                <p style={{
                  color: '#849087',
                  fontSize: '12px',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  {row[1].description}
                </p>

              </div>

            </Col>

          </Row>


          {/* CURVED DOWNWARD CONNECTOR */}

          {index !== 2 && (

            <div className="d-flex justify-content-center"
              style={{ height: '65px' }}>

              <svg
                width="160"
                height="65"
                viewBox="0 0 160 65"
                fill="none"
              >

                {index === 0 ? (

                  <path
                    d="M80 0 C80 45, 145 15, 145 55"
                    stroke="#91B38C"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                  />

                ) : (

                  <path
                    d="M145 0 C145 45, 80 15, 80 55"
                    stroke="#91B38C"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                  />

                )}

                <path
                  d={index === 0
                    ? "M139 48 L145 56 L151 48"
                    : "M74 48 L80 56 L86 48"
                  }
                  stroke="#719B76"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />

              </svg>

            </div>

          )}

        </div>

      ))}


      {/* FINAL MESSAGE */}

      <div className="text-center mt-4 pt-4"
        style={{ borderTop: '1px solid #EAF0E7' }}>

        <h5 style={{
          color: '#294332',
          fontWeight: '700',
          fontSize: '19px'
        }}>
          Better Care. Happier Pets.
        </h5>

        <p style={{
          color: '#849087',
          fontSize: '12px',
          marginBottom: '18px'
        }}>
          Your pet's health journey starts with one simple step.
        </p>

        <Link to="/book-appointment"
          style={{ textDecoration: 'none' }}>

          <Button style={{
            backgroundColor: '#315A3D',
            border: 'none',
            borderRadius: '8px',
            padding: '11px 28px',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            Book an Appointment →
          </Button>

        </Link>

      </div>

    </div>

  </Container>
</section>














    

        </Container>

      </section>



      {/* FOOTER */}

      <Footer />

    </div>
  )
}

export default Home