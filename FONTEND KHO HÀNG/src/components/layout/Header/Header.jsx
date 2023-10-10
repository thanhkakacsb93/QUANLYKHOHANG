import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div className="flex justify-between">
            <NavLink to="/repository"><span className='text-[red]'>logo/repository</span></NavLink>
            <NavLink to="/repository/shelves"><span>shelves</span></NavLink>
            <NavLink to="/repository/importhistory"><span>import histori</span></NavLink>
            <NavLink to="/repository/exporthistory"><span>export history</span></NavLink>
            <NavLink to="/repository/exportcommand"><span>export command</span></NavLink>
            <NavLink to="/repository/inventory"><span>inventory</span></NavLink>
            <NavLink to="/repository/sigup"><span>sigup</span></NavLink>

        </div>
    )
}

export default Header