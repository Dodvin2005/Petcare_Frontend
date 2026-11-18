import React from 'react'

function AdminHeader() {
  return (
    <div
      className="d-flex align-items-center justify-content-between bg-white px-4 shadow-sm"
      style={{width: '82%',height: '75px',marginLeft: '300px',borderBottom: '2px solid #e0e5e0',position: 'fixed',top: 10,zIndex: 999}}>

      {/* Left Section */}
      <div>
        <h5 className="fw-bold mb-1" style={{ color: '#263b2c' }}>
          Admin Dashboard
        </h5>

        <small className="text-secondary">
          Welcome to PetCare Management System
        </small>
      </div>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-4">

        {/* Notification */}
        <div
          className="d-flex align-items-center justify-content-center rounded-circle"
          style={{width: '40px',height: '40px',backgroundColor: '#f0f7f1',color: '#32834b',fontSize: '18px'}}>
          <i className="bi bi-bell"></i>
        </div>

        {/* Profile */}
        <div className="d-flex align-items-center gap-2">

          <div
            className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
            style={{width: '40px',height: '40px',backgroundColor: '#e4f3e7',color: '#278348',fontSize: '16px'}}>A
          </div>

          <div>
            <h6 className="mb-0 fw-semibold" style={{ fontSize: '13px' }}>
              Administrator
            </h6>

            <small className="text-secondary" style={{ fontSize: '11px' }}>
              Admin
            </small>
          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminHeader