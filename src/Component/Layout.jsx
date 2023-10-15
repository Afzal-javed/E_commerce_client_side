import React from 'react'
import Header from "./Header.jsx";
const Layout = ({ children }) => {
    return (
        <>

            <div>
                {children}
            </div>
        </>
    )
}

export default Layout