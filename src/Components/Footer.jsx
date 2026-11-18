import React from 'react'

function Footer() {
  return (
    <footer
      className="text-white mt-5"
      style={{
        background: 'linear-gradient(135deg, #244C38, #183D2B)',
      }}
    >

      {/* Newsletter Section */}
      <div className="container pt-5">
        <div
          className="row align-items-center g-4 p-4 p-md-5 rounded-4"
          style={{
            backgroundColor: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <div className="col-lg-7">
            <span
              className="badge rounded-pill px-3 py-2 mb-3"
              style={{
                backgroundColor: '#DDF3D8',
                color: '#28563B',
                letterSpacing: '1px',
              }}
            >
              THE PETCARE COMMUNITY
            </span>

            <h2 className="fw-bold mb-3">
              Better Care.
              <span style={{ color: '#A8D5A0' }}> Happier Pets.</span>
            </h2>

            <p
              className="mb-0"
              style={{
                color: '#C5D7CA',
                lineHeight: '1.8',
                maxWidth: '540px',
              }}
            >
              Every pet deserves a healthy and happy life.
              Discover helpful pet care advice, vaccination guidance,
              and wellness tips for your beloved companions.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="p-3 rounded-4 bg-white bg-opacity-10">
              <h6 className="fw-bold mb-3">
                Stay Connected With PetCare
              </h6>

              <div className="d-flex flex-column flex-sm-row gap-2">
                <input
                  type="email"
                  className="form-control rounded-pill px-3 py-2 border-0"
                  placeholder="Your email address"
                  aria-label="Email address"
                />

                <button
                  type="button"
                  className="btn rounded-pill px-4 fw-semibold text-nowrap"
                  style={{
                    backgroundColor: '#B7DFAE',
                    color: '#244C38',
                  }}
                >
                  Subscribe
                </button>
              </div>

              <small className="d-block mt-3" style={{ color: '#C5D7CA' }}>
                Thoughtful care tips for your furry family members.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-5">
        <div className="row g-5">

          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <a
              href="/"
              className="text-decoration-none d-inline-block mb-3"
            >
              <h2 className="fw-bold mb-0 text-white">
                <span style={{ color: '#B7DFAE' }}>Pet</span>Care
                <span style={{ color: '#B7DFAE' }}>.</span>
              </h2>
            </a>

            <p
              className="pe-lg-4 mb-4"
              style={{
                color: '#C5D7CA',
                lineHeight: '1.9',
              }}
            >
              Your trusted partner in pet wellness. We bring pet profiles,
              vaccination tracking, veterinary appointments, and health
              records together in one convenient place.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <span
                className="rounded-pill px-3 py-2 small"
                style={{
                  backgroundColor: 'rgba(183,223,174,0.12)',
                  color: '#C7E9BE',
                  border: '1px solid rgba(183,223,174,0.2)',
                }}
              >
                Compassionate Care
              </span>

              <span
                className="rounded-pill px-3 py-2 small"
                style={{
                  backgroundColor: 'rgba(183,223,174,0.12)',
                  color: '#C7E9BE',
                  border: '1px solid rgba(183,223,174,0.2)',
                }}
              >
                Healthier Pets
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4">Quick Links</h5>

            <ul className="list-unstyled mb-0">
              {[
                ['Home', '/'],
                ['About Us', '/about'],
                ['Our Services', '/services'],
                ['My Profile', '/profile'],
                ['Contact Us', '/contact'],
              ].map(([name, link]) => (
                <li className="mb-3" key={name}>
                  <a
                    href={link}
                    className="text-decoration-none d-inline-block"
                    style={{ color: '#C5D7CA' }}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4">Our Services</h5>

            <ul className="list-unstyled mb-0">
              {[
                'Pet Profile Management',
                'Vaccination Tracking',
                'Veterinary Appointments',
                'Medical History Records',
                'Pet Wellness Guidance',
              ].map((service, index) => (
                <li
                  className="d-flex align-items-start gap-3 mb-3"
                  key={service}
                >
                  <span
                    className="fw-semibold"
                    style={{ color: '#B7DFAE' }}
                  >
                    0{index + 1}
                  </span>

                  <span style={{ color: '#C5D7CA' }}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4">Get In Touch</h5>

            <div className="mb-4">
              <p className="small mb-1" style={{ color: '#A8D5A0' }} > EMAIL ADDRESS </p>

              <p className="mb-0 text-white"> support@petcare.com </p>
            </div>

            <div className="mb-4">
              <p className="small mb-1" style={{ color: '#A8D5A0' }} > PHONE NUMBER </p>

              <p className="mb-0 text-white"> +91 98765 43210 </p>
            </div>

            <div className="mb-4">
              <p  className="small mb-1"  style={{ color: '#A8D5A0' }} > WORKING HOURS </p>

              <p className="mb-1 text-white"> Monday - Saturday </p>

              <p className="mb-0" style={{ color: '#C5D7CA' }}>  9:00 AM - 6:00 PM </p>
            </div>

            <a href="/contact" className="btn rounded-pill px-4 py-2 fw-semibold"
              style={{ backgroundColor: '#B7DFAE', color: '#244C38', }} >
              Get In Touch <span className="ms-2">→</span>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.15)', borderTop: '1px solid rgba(255,255,255,0.12)', }} >
        <div className="container py-4">
          <div className="row align-items-center text-center text-md-start g-3">

            <div className="col-md-6">
              <p  className="small mb-0" style={{ color: '#C5D7CA' }} >  © 2026 <span className="fw-semibold text-white">PetCare. </span>
                All rights reserved.
              </p>
            </div>

            <div className="col-md-6 text-md-end">
              <p className="small mb-0" style={{ color: '#C5D7CA' }} >
                Made with{' '}
                <span style={{ color: '#B7DFAE' }}>♥ </span>
                 for every pet and every pet parent.
              </p>
            </div>

          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer