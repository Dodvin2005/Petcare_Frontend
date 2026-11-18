import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'

function About() {
  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="py-2" style={{ backgroundColor: '#F2F7F0' }}>
        <Header/>
        <div className="container py-5">
          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <span
                className="badge rounded-pill px-3 py-2 mb-4"
                style={{ backgroundColor: '#DDEBDD', color: '#426B4F' }}
              >
                ABOUT PETCARE
              </span>

              <h1 className="display-4 fw-bold mb-4" style={{ color: '#263D2C' }}>
                Every Pet Deserves a Life Full of Love.
              </h1>

              <p className="fs-5 text-secondary mb-4">
                At PetCare, we believe pets are more than companions.
                They are family. Our mission is to make pet healthcare
                simple, accessible, and stress-free for every pet owner.
              </p>

              <p className="text-secondary mb-4">
                From managing health records and vaccinations to booking
                veterinary appointments, we bring essential pet care
                services together in one convenient platform.
              </p>

              <a
                href="/services"
                className="btn btn-lg rounded-pill px-4 py-3 text-white"
                style={{ backgroundColor: '#426B4F' }}
              >
                Explore Our Services
              </a>

            </div>

            <div className="col-lg-6">
              <div
                className="p-3 p-md-4 rounded-5"
                style={{ backgroundColor: '#DDEBDD' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1000&q=85"
                  alt="Pets enjoying a happy life"
                  className="img-fluid rounded-5 w-100"
                  style={{ height: '420px', objectFit: 'cover' }}
                />

                <div className="bg-white rounded-4 p-3 mt-3 shadow-sm">
                  <h5 className="fw-bold mb-1" style={{ color: '#426B4F' }}>
                    Love Them. Care for Them. Always.
                  </h5>

                  <p className="text-secondary mb-0">
                    Because every little paw matters.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* About Us Section */}
      <section className="py-5">
        <div className="container py-5">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85"
                alt="Dogs playing together"
                className="img-fluid rounded-5 shadow-sm w-100"
                style={{ height: '430px', objectFit: 'cover' }}
              />
            </div>

            <div className="col-lg-6">

              <span
                className="badge rounded-pill px-3 py-2 mb-3"
                style={{ backgroundColor: '#E7F0E5', color: '#426B4F' }}
              >
                WHO WE ARE
              </span>

              <h2 className="display-6 fw-bold mb-4" style={{ color: '#263D2C' }}>
                Making Pet Care Easier for Everyone
              </h2>

              <p className="text-secondary fs-5">
                PetCare is a web-based pet health and appointment
                management platform designed to simplify the way pet
                owners care for their beloved animals.
              </p>

              <p className="text-secondary">
                We understand that keeping track of vaccinations,
                medical history, treatments, and veterinary visits
                can sometimes be difficult. PetCare brings these
                essential details together in one organized place.
              </p>

              <p className="text-secondary">
                Our platform connects pet owners with veterinary
                services while helping veterinarians manage appointments
                and maintain pet health records more efficiently.
              </p>

              <div className="row g-3 mt-3">

                <div className="col-sm-6">
                  <div className="p-3 rounded-4 h-100" style={{ backgroundColor: '#F2F7F0' }}>
                    <h5 className="fw-bold" style={{ color: '#426B4F' }}>
                      Pet First
                    </h5>

                    <p className="text-secondary mb-0">
                      Your pet's health and happiness come first.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="p-3 rounded-4 h-100" style={{ backgroundColor: '#F2F7F0' }}>
                    <h5 className="fw-bold" style={{ color: '#426B4F' }}>
                      Easy Access
                    </h5>

                    <p className="text-secondary mb-0">
                      Essential pet information in one place.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* Mission and Vision Section */}
      <section className="py-5" style={{ backgroundColor: '#F8FAF7' }}>
        <div className="container py-5">

          <div className="text-center mb-5">

            <span
              className="badge rounded-pill px-3 py-2 mb-3"
              style={{ backgroundColor: '#DDEBDD', color: '#426B4F' }}
            >
              OUR PURPOSE
            </span>

            <h2 className="display-6 fw-bold mb-3" style={{ color: '#263D2C' }}>
              What Drives Us Every Day
            </h2>

            <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: '650px' }}>
              We are committed to creating a better and more convenient
              pet care experience for owners and veterinarians.
            </p>

          </div>


          <div className="row g-4">

            {/* Mission */}
            <div className="col-md-6">
              <div
                className="card border-0 rounded-5 h-100 p-4 p-md-5 shadow-sm"
                style={{ backgroundColor: '#EAF3E8' }}
              >

                <div
                  className="rounded-4 d-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: '75px',
                    height: '75px',
                    backgroundColor: '#D3E5D1',
                    color: '#426B4F'
                  }}
                >
                  <span className="fs-2 fw-bold">01</span>
                </div>

                <h3 className="fw-bold mb-3" style={{ color: '#263D2C' }}>
                  Our Mission
                </h3>

                <p className="text-secondary fs-5 mb-0">
                  To simplify pet healthcare by providing an accessible
                  platform for managing pet profiles, health records,
                  vaccinations, and veterinary appointments while
                  encouraging responsible pet ownership.
                </p>

              </div>
            </div>


            {/* Vision */}
            <div className="col-md-6">
              <div
                className="card border-0 rounded-5 h-100 p-4 p-md-5 shadow-sm"
                style={{ backgroundColor: '#FFF3E5' }}
              >

                <div
                  className="rounded-4 d-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: '75px',
                    height: '75px',
                    backgroundColor: '#FBE3C6',
                    color: '#98652B'
                  }}
                >
                  <span className="fs-2 fw-bold">02</span>
                </div>

                <h3 className="fw-bold mb-3" style={{ color: '#263D2C' }}>
                  Our Vision
                </h3>

                <p className="text-secondary fs-5 mb-0">
                  To create a world where every pet receives timely
                  healthcare, every owner can manage their pet's needs
                  confidently, and technology makes responsible pet
                  care easier for everyone.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Our Values Section */}
      <section className="py-5">
        <div className="container py-5">

          <div className="text-center mb-5">

            <span
              className="badge rounded-pill px-3 py-2 mb-3"
              style={{ backgroundColor: '#E7F0E5', color: '#426B4F' }}
            >
              WHAT WE BELIEVE IN
            </span>

            <h2 className="display-6 fw-bold mb-3" style={{ color: '#263D2C' }}>
              The Values Behind PetCare
            </h2>

            <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: '650px' }}>
              Everything we do is guided by our commitment to pets,
              their families, and better healthcare experiences.
            </p>

          </div>


          <div className="row g-4">

            <div className="col-sm-6 col-lg-3">
              <div className="border rounded-4 p-4 h-100 text-center">

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#E2EFE1',
                    color: '#426B4F'
                  }}
                >
                  <span className="fs-2 fw-bold">01</span>
                </div>

                <h5 className="fw-bold mb-3" style={{ color: '#263D2C' }}>
                  Compassion
                </h5>

                <p className="text-secondary mb-0">
                  Every pet deserves kindness, patience, and loving care.
                </p>

              </div>
            </div>


            <div className="col-sm-6 col-lg-3">
              <div className="border rounded-4 p-4 h-100 text-center">

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#FFF0DA',
                    color: '#98652B'
                  }}
                >
                  <span className="fs-2 fw-bold">02</span>
                </div>

                <h5 className="fw-bold mb-3" style={{ color: '#263D2C' }}>
                  Responsibility
                </h5>

                <p className="text-secondary mb-0">
                  We encourage responsible ownership and regular pet healthcare.
                </p>

              </div>
            </div>


            <div className="col-sm-6 col-lg-3">
              <div className="border rounded-4 p-4 h-100 text-center">

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#DDF2F1',
                    color: '#28736F'
                  }}
                >
                  <span className="fs-2 fw-bold">03</span>
                </div>

                <h5 className="fw-bold mb-3" style={{ color: '#263D2C' }}>
                  Trust
                </h5>

                <p className="text-secondary mb-0">
                  We value reliable information and organized health records.
                </p>

              </div>
            </div>


            <div className="col-sm-6 col-lg-3">
              <div className="border rounded-4 p-4 h-100 text-center">

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#EAE5F8',
                    color: '#6353A2'
                  }}
                >
                  <span className="fs-2 fw-bold">04</span>
                </div>

                <h5 className="fw-bold mb-3" style={{ color: '#263D2C' }}>
                  Innovation
                </h5>

                <p className="text-secondary mb-0">
                  We use technology to make everyday pet care simpler.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Why Choose PetCare Section */}
      <section className="py-5" style={{ backgroundColor: '#F2F7F0' }}>
        <div className="container py-5">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <span
                className="badge rounded-pill px-3 py-2 mb-3"
                style={{ backgroundColor: '#DDEBDD', color: '#426B4F' }}
              >
                THE PETCARE DIFFERENCE
              </span>

              <h2 className="display-6 fw-bold mb-4" style={{ color: '#263D2C' }}>
                Why Pet Owners Choose PetCare
              </h2>

              <p className="text-secondary fs-5 mb-4">
                We bring important pet care activities together so
                managing your companion's health becomes more organized
                and convenient.
              </p>

              <div className="d-flex mb-4">

                <div
                  className="rounded-3 flex-shrink-0 d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#DDEBDD',
                    color: '#426B4F'
                  }}
                >
                  <span className="fw-bold fs-5">01</span>
                </div>

                <div>
                  <h5 className="fw-bold" style={{ color: '#263D2C' }}>
                    Organized Health Information
                  </h5>

                  <p className="text-secondary mb-0">
                    Maintain pet profiles, vaccination details, and
                    medical history in one place.
                  </p>
                </div>

              </div>


              <div className="d-flex mb-4">

                <div
                  className="rounded-3 flex-shrink-0 d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#DDEBDD',
                    color: '#426B4F'
                  }}
                >
                  <span className="fw-bold fs-5">02</span>
                </div>

                <div>
                  <h5 className="fw-bold" style={{ color: '#263D2C' }}>
                    Convenient Appointments
                  </h5>

                  <p className="text-secondary mb-0">
                    Make appointment management simpler for pet owners
                    and veterinary professionals.
                  </p>
                </div>

              </div>


              <div className="d-flex">

                <div
                  className="rounded-3 flex-shrink-0 d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#DDEBDD',
                    color: '#426B4F'
                  }}
                >
                  <span className="fw-bold fs-5">03</span>
                </div>

                <div>
                  <h5 className="fw-bold" style={{ color: '#263D2C' }}>
                    A User-Friendly Experience
                  </h5>

                  <p className="text-secondary mb-0">
                    Access essential pet care features through a clear
                    and easy-to-use platform.
                  </p>
                </div>

              </div>

            </div>


            <div className="col-lg-6">

              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=85"
                alt="Happy dog"
                className="img-fluid rounded-5 shadow-sm w-100"
                style={{ height: '500px', objectFit: 'cover' }}
              />

            </div>

          </div>
        </div>
      </section>


      {/* Final Call To Action */}
      <section className="py-5">
        <div className="container py-4">

          <div
            className="rounded-5 text-center text-white p-4 p-md-5"
            style={{
              background: 'linear-gradient(135deg, #426B4F, #294C36)'
            }}
          >

            <div className="mx-auto py-3" style={{ maxWidth: '750px' }}>

              <span className="badge bg-white rounded-pill px-3 py-2 mb-4" style={{ color: '#426B4F' }}>
                JOIN THE PETCARE FAMILY
              </span>

              <h2 className="display-5 fw-bold mb-4">
                Because They Are Family, Not Just Pets.
              </h2>

              <p className="fs-5 mb-4" style={{ color: '#E1EDE2' }}>
                Make every moment count by giving your beloved companion
                the attention, care, and healthy life they deserve.
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3">

                <a
                  href="/register"
                  className="btn btn-light btn-lg rounded-pill px-4 py-3 fw-semibold"
                  style={{ color: '#426B4F' }}
                >
                  Join PetCare Today
                </a>

                <a
                  href="/contact"
                  className="btn btn-outline-light btn-lg rounded-pill px-4 py-3"
                >
                  Get in Touch
                </a>

              </div>

            </div>

          </div>
        </div>
        <Footer/>
      </section>

    </div>
  )
}

export default About