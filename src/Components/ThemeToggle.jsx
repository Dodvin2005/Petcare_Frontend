import React from 'react'

import { useTheme } from '../Context/ThemeContext'

import { FaSun, FaMoon } from 'react-icons/fa'


function ThemeToggle() {

    const { theme, toggleTheme } = useTheme()

    return (

        <button
            onClick={toggleTheme}
            className="btn rounded-pill px-3 py-2"
            style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-color)',
                border: '1px solid var(--border-color)'
            }}
        >

            {theme === 'light' ? (

                <>
                    <FaMoon className="me-2 " />
                    
                </>

            ) : (

                <>
                    <FaSun className="me-2" />
                    
                </>

            )}

        </button>

    )

}

export default ThemeToggle