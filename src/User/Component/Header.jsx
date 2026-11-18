import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from '../../Components/ThemeToggle'

function Header() {

  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // CHECK LOGIN STATUS
  useEffect(() => {

    const checkLogin = () => {

      const token =
        localStorage.getItem('token') ||
        sessionStorage.getItem('token')

      setIsLoggedIn(!!token)

    }

    checkLogin()

    window.addEventListener('storage', checkLogin)

    return () => {
      window.removeEventListener('storage', checkLogin)
    }

  }, [])

  // LOGOUT FUNCTION
  const handleLogout = () => {

    localStorage.removeItem('token')
    sessionStorage.removeItem('token')

    localStorage.removeItem('user')
    sessionStorage.removeItem('user')

    setIsLoggedIn(false)

    navigate('/login')

  }

  return (

    <div className="container-fluid px-3 px-md-4 px-lg-5 pt-3">

      <nav
        className="bg-white shadow-sm px-4 py-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
        style={{
          borderRadius: '22px',
          border: '1px solid #f0eaf7',
          minHeight: '92px',
          width: '100%'
        }}
      >

        {/* LOGO */}
        <Link
          to="/"
          className="text-decoration-none d-flex align-items-center gap-2"
          style={{ flexShrink: 0 }}
        >

          <div
            className="d-flex align-items-center justify-content-center shadow-sm"
            style={{
              width: '47px',
              height: '47px',
              backgroundColor: '#26986a',
              borderRadius: '16px',
              fontSize: '24px'
            }}
          >
            🐾
          </div>

          <div className="d-flex flex-column">

            <span
              className="fw-bold"
              style={{
                fontSize: '22px',
                color: '#35145f',
                lineHeight: '1.2'
              }}
            >
              PetCare<span style={{ color: '#7838f5' }}>.</span>
            </span>

            <small
              style={{
                fontSize: '9px',
                letterSpacing: '1.2px',
                color: '#64748b',
                marginTop: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              BETTER CARE. HAPPIER PETS.
            </small>

          </div>

        </Link>


        {/* NAVIGATION LINKS */}
        <div
          className="d-flex align-items-center justify-content-center flex-wrap gap-3 gap-xl-4"
          style={{ flex: '1 1 400px' }}
        >

          <Link
            to="/"
            className="text-decoration-none fw-semibold"
            style={{ color: '#343047' }}
          >
            Home
          </Link>

          <Link
            to="/services"
            className="text-decoration-none fw-semibold"
            style={{ color: '#343047' }}
          >
            Services
          </Link>

          <Link
            to="/my-pets"
            className="text-decoration-none fw-semibold"
            style={{ color: '#343047' }}
          >
            My Pets
          </Link>

          <Link
            to="/my-appointments"
            className="text-decoration-none fw-semibold"
            style={{ color: '#343047' }}
          >
            Appointments
          </Link>

          <Link
            to="/veterinarians"
            className="text-decoration-none fw-semibold"
            style={{ color: '#343047' }}
          >
            Veterinarians
          </Link>

          <Link
            to="/about"
            className="text-decoration-none fw-semibold"
            style={{ color: '#343047' }}
          >
            About Us
          </Link>

          <Link
            to="/profile"
            className="text-decoration-none fw-semibold"
            style={{ color: '#343047' }}
          >
            Profile
          </Link>

        </div>


        {/* RIGHT SIDE BUTTONS */}
        <div
          className="d-flex align-items-center justify-content-center gap-3"
          style={{ flexShrink: 0 }}
        >

          {/* WHEN USER IS NOT LOGGED IN */}
          {!isLoggedIn ? (

            <>
              <Link
                to="/login"
                className="text-decoration-none fw-semibold"
                style={{ color: '#343047' }}
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="btn text-white fw-semibold px-4 py-3"
                style={{
                  backgroundColor: '#26986a',
                  borderRadius: '15px',
                  border: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                Get Started →
              </Link>
            </>

          ) : (

            /* WHEN USER IS LOGGED IN */
            <button
              onClick={handleLogout}
              className="btn text-white fw-semibold px-4 py-3"
              style={{
                backgroundColor: '#dc3545',
                borderRadius: '15px',
                border: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              Logout ↗
            </button>

          )}

          {/* THEME TOGGLE */}
          <ThemeToggle />

        </div>

      </nav>

    </div>

  )
}

export default Header