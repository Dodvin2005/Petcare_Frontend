import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function AdminSidebar() {

  const location = useLocation()

  const menuItems = [
    { name: 'Dashboard', icon: 'bi-grid-1x2-fill', path: '/admin' },
    { name: 'Manage Users', icon: 'bi-people-fill', path: '/admin/users' },
    { name: 'Veterinarians', icon: 'bi-heart-pulse-fill', path: '/admin/veterinarians' },
    { name: 'Manage Pets', icon: 'bi-heart-fill', path: '/admin/pets' },
    { name: 'Appointments', icon: 'bi-calendar-check-fill', path: '/admin/appointments' },
    { name: 'Pet Services', icon: 'bi-clipboard2-pulse-fill', path: '/admin/services' },
    { name: 'Settings', icon: 'bi-gear-fill', path: '/admin/settings' }
  ]

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }

    return location.pathname === path
  }

  return (
    <div
      className="d-flex flex-column vh-100"
      style={{width: '290px',minWidth: '290px',position: 'fixed',top: 0,left: 0,backgroundColor: '#ffffff',borderRight: '1px solid #e8eee9',fontFamily: 'Arial, sans-serif',zIndex: 1000}}>

      {/* Logo */}

      <div
        className="d-flex align-items-center px-4"
        style={{
          height: '95px',
          borderBottom: '1px solid #edf1ed'}}>

        <div
          className="d-flex align-items-center justify-content-center rounded-3 me-3"
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#23834a',
            color: '#ffffff',
            fontSize: '23px'}}>
          <i className="bi bi-heart-pulse-fill"></i>
        </div>

        <div>
          <h4 className="fw-bold mb-1" style={{ color: '#247542' }}>
            PetCare<span style={{ color: '#55b878' }}>.</span>
          </h4>

          <small className="text-secondary" style={{ fontSize: '12px' }}>
            Admin Dashboard
          </small>
        </div>

      </div>


      {/* Admin Profile */}

      <div className="px-4 py-2">

      </div>


      {/* Menu Heading */}

      <div className="px-4 mb-3">

        <small
          className="fw-bold"
          style={{
            color: '#98a49b',
            fontSize: '11px',
            letterSpacing: '1.5px'}} >
          MAIN MENU
        </small>

      </div>


      {/* Navigation */}

      <div className="flex-grow-1 px-3">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className="d-flex align-items-center text-decoration-none rounded-3 mb-2"
            style={{
              height: '53px',
              padding: '0 16px',
              gap: '15px',
              backgroundColor: isActive(item.path) ? '#e9f6ec' : 'transparent',
              color: isActive(item.path) ? '#247b43' : '#68756c',
              borderLeft: isActive(item.path)
                ? '4px solid #319653'
                : '4px solid transparent',
              fontWeight: isActive(item.path) ? '600' : '500',
              fontSize: '14px',
              transition: 'all 0.2s ease'}}>

            <i
              className={`bi ${item.icon}`}
              style={{
                fontSize: '19px',
                width: '23px',
                textAlign: 'center'}}
            ></i>

            <span>{item.name}</span>

            {isActive(item.path) && (
              <i
                className="bi bi-chevron-right ms-auto"
                style={{ fontSize: '12px' }}
              ></i>)}

          </Link>

        ))}

      </div>


      {/* Bottom Section */}

      <div
        className="px-4 py-3"
        style={{ borderTop: '1px solid #edf1ed' }}>

        <div className="d-flex align-items-center gap-3 mb-3">

          <i
            className="bi bi-shield-check"
            style={{ color: '#319653', fontSize: '21px' }}
          ></i>

          <span className="text-secondary" style={{ fontSize: '12px' }}>
            PetCare Management System
          </span>

        </div>

        <button
          className="btn w-100 d-flex align-items-center justify-content-center gap-2 rounded-3"
          onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('existingUser')
            window.location.href = '/login'
          }}
          style={{
            height: '46px',
            backgroundColor: '#fff1f1',
            color: '#d64545',
            border: '1px solid #ffe0e0',
            fontSize: '14px',
            fontWeight: '600'}}>
          <i className="bi bi-box-arrow-left"></i>
          Logout
        </button>

      </div>

    </div>
  )
}

export default AdminSidebar