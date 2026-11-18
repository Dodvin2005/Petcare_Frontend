import React from 'react'
import Footer from '../Component/Footer'
import Header from '../Component/Header'

function Contact() {
  return (
    <div style={{ backgroundColor: '#F7F9F5', minHeight: '100vh' }}>

      {/* Header Section */}
      <div className="container py-2">
<Header/>
        <div className="text-center py-5 mb-5">

          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{ backgroundColor: '#E2F2E5', color: '#2F7048' }}
          >
            WE ARE HERE TO HELP
          </span>

          <h2 className="fw-bold mb-3" style={{ color: '#244B35' }}>
            Contact Us
          </h2>

          <p className="text-secondary mx-auto" style={{ maxWidth: '550px' }}>
            Have questions about your pet's health or appointments?
            Get in touch with our team. We are happy to help!
          </p>

        </div>


        {/* Main Content */}
        <div className="row g-4">

          {/* Contact Information */}
          <div className="col-12 col-lg-5">

            <div
              className="card border-0 rounded-4 h-100 shadow-sm text-white"
              style={{
                background: 'linear-gradient(145deg, #244B35, #438358)'
              }}
            >

              <div className="card-body p-4 p-md-5">

                <h4 className="fw-bold mb-3">
                  Get in Touch
                </h4>

                <p className="mb-5" style={{ color: '#D8E9DB', lineHeight: '1.8' }}>
                  Your pet's well-being is our priority. Contact us for
                  assistance with appointments, pet health records, or
                  any questions about our services.
                </p>


                {/* Email */}
                <div className="d-flex align-items-start gap-3 mb-4">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      width: '48px',
                      height: '48px',
                      minWidth: '48px',
                      fontSize: '22px'
                    }}
                  >
                    ✉
                  </div>

                  <div>
                    <h6 className="fw-bold mb-2">Email Us</h6>
                    <p className="mb-0" style={{ color: '#D8E9DB' }}>
                      support@petcare.com
                    </p>
                  </div>

                </div>


                {/* Phone */}
                <div className="d-flex align-items-start gap-3 mb-4">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      width: '48px',
                      height: '48px',
                      minWidth: '48px',
                      fontSize: '22px'
                    }}
                  >
                    ☎
                  </div>

                  <div>
                    <h6 className="fw-bold mb-2">Call Us</h6>
                    <p className="mb-0" style={{ color: '#D8E9DB' }}>
                      +91 98765 43210
                    </p>
                  </div>

                </div>


                {/* Location */}
                <div className="d-flex align-items-start gap-3 mb-5">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      width: '48px',
                      height: '48px',
                      minWidth: '48px',
                      fontSize: '22px'
                    }}
                  >
                    ⌖
                  </div>

                  <div>
                    <h6 className="fw-bold mb-2">Our Location</h6>
                    <p className="mb-0" style={{ color: '#D8E9DB' }}>
                      Kerala, India
                    </p>
                  </div>

                </div>


                {/* Bottom Message */}
                <div
                  className="rounded-4 p-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                >
                  <h6 className="fw-bold mb-2">
                    Every Paw Matters!
                  </h6>

                  <p className="small mb-0" style={{ color: '#D8E9DB' }}>
                    We are committed to making pet care easier and more
                    accessible for every pet parent.
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Contact Form */}
          <div className="col-12 col-lg-7">

            <div className="card border-0 rounded-4 shadow-sm h-100">

              <div className="card-body p-4 p-md-5">

                <h4 className="fw-bold mb-2" style={{ color: '#244B35' }}>
                  Send Us a Message
                </h4>

                <p className="text-secondary mb-4">
                  Fill out the form below and let us know how we can help.
                </p>


                <form>

                  <div className="row g-3">

                    {/* Name */}
                    <div className="col-12 col-md-6">

                      <label className="form-label fw-semibold">
                        Full Name
                      </label>

                      <input
                        type="text"
                        className="form-control rounded-3 py-2"
                        placeholder="Enter your full name"
                        required
                      />

                    </div>


                    {/* Email */}
                    <div className="col-12 col-md-6">

                      <label className="form-label fw-semibold">
                        Email Address
                      </label>

                      <input
                        type="email"
                        className="form-control rounded-3 py-2"
                        placeholder="Enter your email"
                        required
                      />

                    </div>


                    {/* Phone */}
                    <div className="col-12 col-md-6">

                      <label className="form-label fw-semibold">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        className="form-control rounded-3 py-2"
                        placeholder="Enter your phone number"
                      />

                    </div>


                    {/* Subject */}
                    <div className="col-12 col-md-6">

                      <label className="form-label fw-semibold">
                        Subject
                      </label>

                      <select
                        className="form-select rounded-3 py-2"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>

                        <option>Appointment Enquiry</option>
                        <option>Pet Health Support</option>
                        <option>Vaccination Details</option>
                        <option>Account Support</option>
                        <option>Other</option>
                      </select>

                    </div>


                    {/* Message */}
                    <div className="col-12">

                      <label className="form-label fw-semibold">
                        Your Message
                      </label>

                      <textarea
                        className="form-control rounded-3"
                        rows="5"
                        placeholder="Tell us how we can help..."
                        required
                      ></textarea>

                    </div>


                    {/* Submit */}
                    <div className="col-12 mt-4">

                      <button
                        type="submit"
                        className="btn text-white rounded-pill px-5 py-3 fw-semibold"
                        style={{ backgroundColor: '#2F7048' }}
                      >
                        Send Message <span className="ms-2">→</span>
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>


        {/* Bottom Section */}
        <div className="text-center mt-5">

          <h5 className="fw-bold" style={{ color: '#244B35' }}>
            Caring for Pets, Together.
          </h5>

          <p className="text-secondary mb-0">
            PETCARE — Your trusted partner in pet health and happiness.
          </p>

        </div>

      </div>
<Footer/>
    </div>
  )
}

export default Contact