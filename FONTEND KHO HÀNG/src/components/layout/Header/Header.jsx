import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'



const Header = () => {
    const { Roleadmin } = useSelector((state) => state.login)

    const handleLogout = () => {

    }
    const headerLogged = (
        <>
            {/* <NavLink to="/repository/sigup"><span>sigup</span></NavLink> */}
            <NavLink to="/repository/accounts"><span>accounts</span></NavLink>
        </>
    )
    return (
        <div className="flex flex-col gap-3">
            <NavLink to="/repository"><span className='text-[#47bf77]'>logo/repository</span></NavLink>
            {/* <NavLink to="/repository/shelves"><span>shelves</span></NavLink> */}
            <NavLink to="/repository/importhistory"><span>import histori</span></NavLink>
            <NavLink to="/repository/exporthistory"><span>export history</span></NavLink>
            <NavLink to="/repository/exportcommand"><span>export command</span></NavLink>
            <NavLink to="/repository/inventory"><span>inventory</span></NavLink>
            {
                Roleadmin ? headerLogged : ""
            }
            {/* <NavLink to="/repository/accounts"><span>accounts</span></NavLink> */}
            <p onClick={handleLogout}>Logout</p>


        </div>
    )
}

export default Header