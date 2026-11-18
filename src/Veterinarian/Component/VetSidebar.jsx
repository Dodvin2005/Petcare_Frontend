import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaPaw,
  FaThLarge,
  FaCalendarCheck,
  FaDog,
  FaFileMedical,
  FaSyringe,
  FaCog,
  FaSignOutAlt,
  FaUserMd
} from 'react-icons/fa'

function VetSidebar() {

  const location = useLocation()

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/vet',
      icon: <FaThLarge />
    },
    {
      title: 'Appointments',
      path: '/vet/appointments',
      icon: <FaCalendarCheck />
    },
    {
      title: 'My Patients',
      path: '/vet/patient-pets',
      icon: <FaDog />
    },
    {
      title: 'Medical Records',
      path: '/vet/medical-records',
      icon: <FaFileMedical />
    },
    {
      title: 'Appoinment Request',
      path: '/vet/appointment-requests',
      icon: <FaSyringe />
    },
    {
      title: 'Settings',
      path: '/vet/profile',
      icon: <FaCog />
    }
  ]

  return (
    <div
      className="d-flex flex-column"
      style={{
        width: '320px',
        height: '100vh',
        background: '#FFFCF7',
        padding: '28px 20px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        borderRight: '1px solid #F0EADF',
        color: '#55594D',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}
    >

      {/* Brand Section */}
      <div className="d-flex align-items-center gap-3 px-2 mb-4">

        <div
          className="d-flex justify-content-center align-items-center rounded-4"
          style={{
            width: '50px',
            height: '50px',
            flexShrink: 0,
            background: '#DDF1E4',
            color: '#579675',
            fontSize: '23px'
          }}
        >
          <FaPaw />
        </div>

        <div>
          <h3
            className="fw-bold mb-1"
            style={{
              color: '#414D43',
              letterSpacing: '0.5px'
            }}
          >
            PETCARE<span style={{ color: '#83B99A' }}>.</span>
          </h3>

          <small
            style={{
              color: '#A0A394',
              fontSize: '11px',
              letterSpacing: '1.5px'
            }}
          >
            VETERINARY PORTAL
          </small>
        </div>

      </div>

      <hr
        className="my-3"
        style={{
          borderColor: '#EDE9DF',
          opacity: 1
        }}
      />

      {/* Veterinarian Profile */}
      <div
        className="d-flex align-items-center gap-3 p-3 rounded-4 mb-4"
        style={{
          background: '#F0F6EC',
          border: '1px solid #E4EDE0'
        }}
      >

        <div
          className="d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: '50px',
            height: '50px',
            flexShrink: 0,
            background: '#DCEBDD',
            color: '#619674',
            fontSize: '21px'
          }}
        >
          <FaUserMd />
        </div>

        <div>
          <h6
            className="fw-semibold mb-1"
            style={{
              color: '#465348',
              fontSize: '14px'
            }}
          >
            Veterinarian
          </h6>

          <small
            style={{
              color: '#929A8C',
              fontSize: '12px'
            }}
          >
            Medical Professional
          </small>
        </div>

      </div>

      {/* Section Heading */}
      <small
        className="fw-bold px-3 mb-3"
        style={{
          color: '#A1A697',
          letterSpacing: '1.5px',
          fontSize: '11px'
        }}
      >
        WORKSPACE
      </small>

      {/* Navigation Menu */}
      <div className="d-flex flex-column gap-2">

        {menuItems.map((item, index) => {

          const isActive =
            location.pathname === item.path ||
            (
              item.path !== '/vet' &&
              location.pathname.startsWith(item.path + '/')
            )

          return (
            <Link
              key={index}
              to={item.path}
              className="d-flex align-items-center gap-3 text-decoration-none"
              style={{
                padding: '15px 18px',
                borderRadius: '13px',
                color: isActive ? '#498568' : '#777D70',
                background: isActive ? '#E5F2E7' : 'transparent',
                fontWeight: isActive ? '600' : '500',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                border: isActive
                  ? '1px solid #D5E9D8'
                  : '1px solid transparent'
              }}

              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#F3F5EC'
                  e.currentTarget.style.color = '#498568'
                }
              }}

              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#777D70'
                }
              }}
            >

              <span
                className="d-flex align-items-center justify-content-center"
                style={{
                  fontSize: '18px',
                  width: '24px',
                  flexShrink: 0
                }}
              >
                {item.icon}
              </span>

              <span>{item.title}</span>

              {isActive && (
                <span
                  className="ms-auto rounded-circle"
                  style={{
                    width: '7px',
                    height: '7px',
                    background: '#83B99A',
                    flexShrink: 0
                  }}
                />
              )}

            </Link>
          )
        })}

      </div>

      {/* Bottom Section */}
      <div className="mt-auto pt-4">

        {/* Pet Care Message */}
        <div
          className="p-3 rounded-4 mb-3"
          style={{
            background: '#F5F3E9',
            border: '1px solid #EDE9DA'
          }}
        >

          <div
            className="d-flex align-items-center gap-2 mb-2"
            style={{
              color: '#66836B',
              fontSize: '14px'
            }}
          >
            <FaPaw />

            <span className="fw-semibold">
              Every Pet Matters
            </span>
          </div>

          <small
            style={{
              color: '#929587',
              fontSize: '12px',
              lineHeight: '1.6'
            }}
          >
            Caring for healthier, happier pets every day.
          </small>

        </div>

        <hr
          style={{
            borderColor: '#EDE9DF',
            opacity: 1
          }}
        />

        {/* Logout */}
        <Link
          to="/"
          className="d-flex align-items-center gap-3 text-decoration-none rounded-3"
          style={{
            padding: '14px 18px',
            color: '#929487',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}

          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FCEEE8'
            e.currentTarget.style.color = '#C47B65'
          }}

          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#929487'
          }}
        >

          <FaSignOutAlt style={{ fontSize: '18px' }} />

          <span>Logout</span>

        </Link>

        {/* Footer */}
        <div
          className="text-center mt-4"
          style={{
            color: '#B0B0A3',
            fontSize: '11px'
          }}
        >
          PETCARE © 2026
          <div className="mt-1">
            Made with care for every paw.
          </div>
        </div>

      </div>

    </div>
  )
}

export default VetSidebar