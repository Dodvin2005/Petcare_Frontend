import React from 'react'

function Preloader() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #F7FAF5, #E8F2E5)',
        overflow: 'hidden'
      }}
    >

      {/* Logo and Brand Name */}
      <div className="text-center">

        {/* Animated Paw */}
        <div
          className="d-flex justify-content-center align-items-center rounded-4 shadow-sm mx-auto mb-4"
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#315A3D',
            animation: 'petPulse 1.8s infinite ease-in-out'
          }}
        >
          <span
            style={{
              fontSize: '52px',
              animation: 'pawBounce 1.2s infinite ease-in-out'
            }}
          >
            🐾
          </span>
        </div>

        {/* Brand Name */}
        <h1
          className="fw-bold mb-2"
          style={{
            color: '#315A3D',
            letterSpacing: '3px',
            fontSize: '35px'
          }}
        >
          PET<span style={{ color: '#82A878' }}>CARE</span>
          <span style={{ color: '#315A3D' }}>.</span>
        </h1>

        {/* Tagline */}
        <p
          className="mb-4"
          style={{
            color: '#71816F',
            letterSpacing: '1px',
            fontSize: '14px'
          }}
        >
          Better Care. Happier Pets.
        </p>

        {/* Loading Animation */}
        <div
          className="spinner-border mb-3"
          role="status"
          style={{
            width: '32px',
            height: '32px',
            color: '#527D4F',
            borderWidth: '3px'
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>

        {/* Loading Text */}
        <p
          className="small mb-0"
          style={{
            color: '#6B8068',
            letterSpacing: '1px'
          }}
        >
          Preparing the best care for your pets...
        </p>

        {/* Loading Dots */}
        <div className="d-flex justify-content-center gap-2 mt-3">
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
        </div>

      </div>

      {/* Bottom Text */}
      <div
        className="position-absolute bottom-0 pb-4 text-center"
        style={{ color: '#8A9B86', fontSize: '12px' }}
      >
        Made with love for every paw 🐾
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes petPulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 10px 25px rgba(49, 90, 61, 0.10);
            }
            50% {
              transform: scale(1.06);
              box-shadow: 0 15px 35px rgba(49, 90, 61, 0.20);
            }
          }

          @keyframes pawBounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-7px);
            }
          }

          .loading-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background-color: #527D4F;
            animation: dotLoading 1.2s infinite ease-in-out;
          }

          .loading-dot:nth-child(2) {
            animation-delay: 0.2s;
          }

          .loading-dot:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes dotLoading {
            0%, 80%, 100% {
              transform: scale(0.6);
              opacity: 0.4;
            }
            40% {
              transform: scale(1.2);
              opacity: 1;
            }
          }
        `}
      </style>

    </div>
  )
}

export default Preloader